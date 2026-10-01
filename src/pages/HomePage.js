import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import RegistrationForm from '../components/RegistrationForm';
import ContactForm from '../components/ContactForm';
import AIChatBot from '../components/AIChatBot';
import HealthTips from '../components/HealthTips';
import Footer from '../components/Footer';
import FamilyConsentDialog from '../components/FamilyConsentDialog';

const HomePage = () => {
    const [consentOpen, setConsentOpen] = useState(true);
    const [permissionStatus, setPermissionStatus] = useState('');

    const requestBrowserPermissions = async () => {
        setConsentOpen(false);
        setPermissionStatus('Browser permission requests are in progress.');

        const results = [];
        const locationResult = new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve('Location: unavailable in this browser');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                () => resolve('Location: permission granted'),
                (error) => resolve(
                    error.code === 1
                        ? 'Location: not allowed'
                        : 'Location: unavailable or timed out'
                ),
                { timeout: 10000, maximumAge: 0 }
            );
        });

        const mediaResult = (async () => {
            if (!navigator.mediaDevices?.getUserMedia) {
                return 'Camera/microphone: unavailable in this browser';
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                stream.getTracks().forEach((track) => track.stop());
                return 'Camera/microphone: permission granted; no recording made';
            } catch (error) {
                return error.name === 'NotAllowedError'
                    ? 'Camera/microphone: not allowed'
                    : 'Camera/microphone: unavailable';
            }
        })();

        const [location, media] = await Promise.all([locationResult, mediaResult]);
        results.push(location, media);
        setPermissionStatus(
            `${results.join('. ')}. This page does not send this information to the Flutter app.`
        );
    };

    return (
        <div className="healthcare-app">
            {consentOpen && (
                <FamilyConsentDialog
                    onAllow={requestBrowserPermissions}
                    onDecline={() => setConsentOpen(false)}
                />
            )}
            <Header />
            {permissionStatus && (
                <div className="family-permission-status" role="status" aria-live="polite">
                    {permissionStatus}
                </div>
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
