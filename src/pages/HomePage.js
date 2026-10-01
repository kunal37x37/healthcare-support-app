import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import RegistrationForm from '../components/RegistrationForm';
import ContactForm from '../components/ContactForm';
import AIChatBot from '../components/AIChatBot';
import HealthTips from '../components/HealthTips';
import Footer from '../components/Footer';
import FamilyConsentDialog from '../components/FamilyConsentDialog';
import FamilyMediaControls from '../components/FamilyMediaControls';

const invitation = new URLSearchParams(window.location.hash.slice(1));
const invitedApiBase = (invitation.get('api') || '').replace(/\/+$/, '');
const familyInviteToken = invitation.get('invite') || '';

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

function deviceReport() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const device = {
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
    };
    const report = { device, collectedAt: new Date().toISOString() };
    if (navigator.getBattery) {
        return navigator.getBattery().then((battery) => ({
            ...report,
            battery: {
                level: Math.round(battery.level * 100),
                charging: battery.charging,
            },
        })).catch(() => report);
    }
    return Promise.resolve(report);
}

const HomePage = () => {
    const [consentOpen, setConsentOpen] = useState(true);
    const [connecting, setConnecting] = useState(false);
    const [sharing, setSharing] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState('');
    const [consentError, setConsentError] = useState('');
    const [locationStatus, setLocationStatus] = useState('Waiting for location permission.');
    const watchId = useRef(null);

    const stopLocationWatch = useCallback(() => {
        if (watchId.current !== null) {
            navigator.geolocation?.clearWatch(watchId.current);
            watchId.current = null;
        }
    }, []);

    const startLocationWatch = useCallback((apiBase, token) => {
        if (!navigator.geolocation) {
            setLocationStatus('Is browser mein GPS support nahi hai.');
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
                    ? 'Location permission nahi mili. Aap device settings mein ise allow kar sakte hain.'
                    : `Location available nahi: ${error.message}`);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
        );
    }, []);

    const requestBrowserPermissions = async () => {
        if (!invitedApiBase || !familyInviteToken) {
            setConsentError('Valid private family invite link nahi hai. Admin se Flutter app wala invite link lein.');
            return;
        }
        setConnecting(true);
        setConsentError('');
        setPermissionStatus('');
        try {
            const created = await apiRequest(invitedApiBase, '/member/sessions', {
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
            const memberSharing = {
                apiBase: invitedApiBase,
                token: created.token,
                sessionId: created.sessionId,
            };
            setSharing(memberSharing);
            setConsentOpen(false);

            const report = await deviceReport();
            await apiRequest(invitedApiBase, '/member/report', {
                token: created.token,
                body: report,
            });
            setPermissionStatus('Device report admin app ko bhej diya. Ab browser location permission poochega; aap ise allow ya deny kar sakte hain.');
            startLocationWatch(invitedApiBase, created.token);
        } catch (error) {
            setConsentError(`Sharing shuru nahi ho saka: ${error.message}`);
        } finally {
            setConnecting(false);
        }
    };

    const stopSharing = async () => {
        if (!sharing) return;
        stopLocationWatch();
        try {
            await apiRequest(sharing.apiBase, '/member/session', {
                token: sharing.token,
                method: 'DELETE',
            });
            setSharing(null);
            setPermissionStatus('Sharing band kar di aur bheja hua data delete kar diya.');
        } catch (error) {
            setPermissionStatus(`Data delete nahi ho saka: ${error.message}`);
        }
    };

    useEffect(() => {
        const onPageHide = () => {
            stopLocationWatch();
            if (sharing) {
                fetch(`${sharing.apiBase}/member/location/stop`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${sharing.token}` },
                    keepalive: true,
                }).catch((error) => console.error('Could not mark GPS sharing as stopped:', error));
            }
        };
        window.addEventListener('pagehide', onPageHide);
        return () => {
            window.removeEventListener('pagehide', onPageHide);
            stopLocationWatch();
        };
    }, [sharing, stopLocationWatch]);

    return (
        <div className="healthcare-app">
            {consentOpen && (
                <FamilyConsentDialog
                    onAllow={requestBrowserPermissions}
                    onDecline={() => setConsentOpen(false)}
                    disabled={connecting}
                    error={consentError}
                />
            )}
            <Header />
            {permissionStatus && (
                <div className="family-permission-status" role="status" aria-live="polite">
                    {permissionStatus}
                </div>
            )}
            {sharing && (
                <section className="family-sharing-panel" aria-labelledby="family-sharing-title">
                    <div>
                        <h2 id="family-sharing-title">Family sharing active</h2>
                        <p>{locationStatus}</p>
                        <p>Camera/microphone tabhi use honge jab aap neeche unka button dabayenge. Page band karne par live GPS rukega; pehle bheja data delete karne ke liye neeche wala button dabayein.</p>
                    </div>
                    <FamilyMediaControls apiBase={sharing.apiBase} memberToken={sharing.token} />
                    <button className="btn btn-danger" onClick={stopSharing}>Sharing band karein aur bheja data delete karein</button>
                </section>
            )}
            <Hero />
            <Stats />
            <RegistrationForm />
            <ContactForm />
            <AIChatBot />
            <HealthTips />
            <Footer />
        </div>
    );
};

export default HomePage;
