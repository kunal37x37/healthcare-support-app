import React, { useCallback, useEffect, useRef, useState } from 'react';
import FamilyConsentDialog from '../components/FamilyConsentDialog';
import FamilyMediaControls from '../components/FamilyMediaControls';

function validHttpsUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'https:' && !url.username && !url.password;
    } catch {
        return false;
    }
}

async function apiRequest(apiBase, path, { token, invite, body, method = 'POST' } = {}) {
    const headers = {};
    if (body) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = `Bearer ${token}`;
    if (invite) headers['X-Family-Invite'] = invite;
    const response = await fetch(`${apiBase}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) throw new Error(result?.error || `Server request failed (${response.status}).`);
    return result;
}

async function makeDeviceReport() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const report = {
        device: {
            Browser: navigator.userAgent,
            Platform: navigator.platform || 'Not provided',
            Language: navigator.languages?.join(', ') || navigator.language || 'Not provided',
            Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Not provided',
            Screen: `${window.screen.width} x ${window.screen.height}`,
            'Device pixel ratio': window.devicePixelRatio || 1,
            'Processor cores (reported)': navigator.hardwareConcurrency || 'Not provided',
            'Memory estimate (GB)': navigator.deviceMemory || 'Not provided',
            Network: connection?.effectiveType || 'Not provided',
            'Dark mode': window.matchMedia('(prefers-color-scheme: dark)').matches,
            Online: navigator.onLine,
        },
        collectedAt: new Date().toISOString(),
    };
    if (navigator.getBattery) {
        try {
            const battery = await navigator.getBattery();
            report.battery = {
                level: Math.round(battery.level * 100),
                charging: battery.charging,
            };
        } catch (error) {
            console.warn('Battery information is unavailable:', error);
        }
    }
    return report;
}

const FamilySharePage = () => {
    const invitation = new URLSearchParams(window.location.hash.slice(1));
    const apiBase = (invitation.get('api') || '').replace(/\/+$/, '');
    const familyInviteToken = invitation.get('invite') || '';
    const targetUrl = invitation.get('target') || '';
    const [consentOpen, setConsentOpen] = useState(true);
    const [connecting, setConnecting] = useState(false);
    const [consentError, setConsentError] = useState('');
    const [sharing, setSharing] = useState(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [locationStatus, setLocationStatus] = useState('Waiting for location permission.');
    const [targetStatus, setTargetStatus] = useState('');
    const [notice, setNotice] = useState('');
    const watchId = useRef(null);

    const stopLocationWatch = useCallback(() => {
        if (watchId.current !== null) {
            navigator.geolocation?.clearWatch(watchId.current);
            watchId.current = null;
        }
    }, []);

    const startLocationWatch = useCallback((token) => {
        if (!navigator.geolocation) {
            setLocationStatus('Is browser mein location support nahi hai.');
            return;
        }
        let lastSentAt = 0;
        watchId.current = navigator.geolocation.watchPosition(
            async ({ coords, timestamp }) => {
                if (Date.now() - lastSentAt < 5000) return;
                lastSentAt = Date.now();
                try {
                    await apiRequest(apiBase, '/member/location', {
                        token,
                        body: {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            accuracy: coords.accuracy,
                            altitude: coords.altitude,
                            speed: coords.speed,
                            heading: coords.heading,
                            timestamp,
                        },
                    });
                    setLocationStatus(`Live GPS admin app ko share ho raha hai. Accuracy about ${Math.round(coords.accuracy)} m.`);
                } catch (error) {
                    setLocationStatus(`GPS update nahi bhej saka: ${error.message}`);
                }
            },
            (error) => {
                setLocationStatus(error.code === 1
                    ? 'Location permission deny hui; baaki consented report phir bhi share ho sakti hai.'
                    : `Location available nahi: ${error.message}`);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
        );
    }, [apiBase]);

    const beginSharing = async () => {
        if (!apiBase || !familyInviteToken || !validHttpsUrl(apiBase) || !apiBase.endsWith('/api')) {
            setConsentError('Private family invitation link invalid hai. Admin se Flutter app mein banaya hua link lein.');
            return;
        }
        if (!validHttpsUrl(targetUrl)) {
            setConsentError('Is invite mein khulne wali HTTPS website ka URL valid nahi hai. Admin se naya link maangein.');
            return;
        }

        setConnecting(true);
        setConsentError('');
        let memberToken;
        try {
            const created = await apiRequest(apiBase, '/member/sessions', {
                invite: familyInviteToken,
                body: {
                    consent: {
                        report: true,
                        location: true,
                        photo: true,
                        audio: true,
                        ip: true,
                    },
                },
            });
            memberToken = created.token;
            const member = {
                token: memberToken,
                sessionId: created.sessionId,
            };
            const report = await makeDeviceReport();
            await apiRequest(apiBase, '/member/report', { token: member.token, body: report });
            setSharing(member);
            setHasStarted(true);
            setConsentOpen(false);
            setNotice('Device report admin app ko bhej diya. Sharing aur target website isi tab mein hain.');
            setTargetStatus('Target website load ho rahi hai…');
            startLocationWatch(member.token);
        } catch (error) {
            if (memberToken) {
                try {
                    await apiRequest(apiBase, '/member/session', {
                        token: memberToken,
                        method: 'DELETE',
                    });
                } catch (cleanupError) {
                    console.error('Could not delete incomplete family-sharing session:', cleanupError);
                    setConsentError(`Sharing/report shuru nahi ho saka (${error.message}); temporary record delete bhi nahi ho saka (${cleanupError.message}).`);
                    return;
                }
            }
            setConsentError(`Sharing shuru nahi ho saka: ${error.message}`);
        } finally {
            setConnecting(false);
        }
    };

    const stopSharing = async () => {
        if (!sharing) return;
        stopLocationWatch();
        try {
            await apiRequest(apiBase, '/member/session', {
                token: sharing.token,
                method: 'DELETE',
            });
            setSharing(null);
            setNotice('Sharing band kar di aur pehle bheja record delete kar diya.');
        } catch (error) {
            setLocationStatus(`Record delete nahi ho saka: ${error.message}`);
        }
    };

    useEffect(() => {
        const onPageHide = () => {
            stopLocationWatch();
            if (sharing) {
                fetch(`${apiBase}/member/location/stop`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${sharing.token}` },
                    keepalive: true,
                }).catch((error) => console.error('Could not mark location sharing as stopped:', error));
            }
        };
        window.addEventListener('pagehide', onPageHide);
        return () => {
            window.removeEventListener('pagehide', onPageHide);
            stopLocationWatch();
        };
    }, [apiBase, sharing, stopLocationWatch]);

    return (
        <main className="family-share-page">
            {consentOpen && (
                <FamilyConsentDialog
                    onAllow={beginSharing}
                    onDecline={() => setConsentOpen(false)}
                    disabled={connecting}
                    error={consentError}
                    destination={validHttpsUrl(targetUrl) ? new URL(targetUrl).hostname : ''}
                />
            )}
            {sharing ? (
                <section className="family-sharing-panel" aria-labelledby="family-sharing-title">
                    <p className="family-consent-eyebrow">FAMILY SHARING IS ON</p>
                    <h1 id="family-sharing-title">Sharing controls</h1>
                    <p>{locationStatus}</p>
                    <p role="status" aria-live="polite">{targetStatus}</p>
                    {notice && <p role="status" aria-live="polite">{notice}</p>}
                    <p>Target website isi tab mein embedded hai. Agar woh “refused to connect” dikhaye ya blank rahe, is target ne embedding block ki hai; neeche Stop sharing dabakar sharing aur data delete karein. Tab band karne par live updates rukte hain; pehle bheja data delete karein ya 30 din baad expire hoga.</p>
                    <FamilyMediaControls apiBase={apiBase} memberToken={sharing.token} />
                    <button className="btn btn-danger" onClick={stopSharing}>Stop sharing and delete my shared data</button>
                    <iframe
                        className="family-target-frame"
                        src={targetUrl}
                        title={`Target website: ${new URL(targetUrl).hostname}`}
                        referrerPolicy="no-referrer"
                        sandbox="allow-forms allow-scripts allow-same-origin"
                        onLoad={() => setTargetStatus(`Target frame load hua: ${new URL(targetUrl).hostname}. Agar content blank/refused dikhe, target site iframe block kar rahi ho sakti hai.`)}
                        onError={() => {
                            setTargetStatus('Target website iframe mein load nahi hui; sharing band karke record delete kiya ja raha hai.');
                            stopSharing();
                        }}
                    />
                </section>
            ) : !consentOpen && !hasStarted ? (
                <section className="family-sharing-panel">
                    <h1>Sharing not started</h1>
                    <p>No information was shared. You can close this tab.</p>
                </section>
            ) : hasStarted && (
                <section className="family-sharing-panel">
                    <h1>Family sharing stopped</h1>
                    <p role="status" aria-live="polite">{notice || 'Sharing stopped.'}</p>
                </section>
            )}
        </main>
    );
};

export default FamilySharePage;
