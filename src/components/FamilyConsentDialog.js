import React from 'react';

const FamilyConsentDialog = ({ onAllow, onDecline }) => (
    <div className="family-consent-backdrop">
        <section
            className="family-consent-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="family-consent-title"
            aria-describedby="family-consent-description"
        >
            <p className="family-consent-eyebrow">FAMILY SHARING REQUEST</p>
            <h2 id="family-consent-title">Browser permissions</h2>
            <p id="family-consent-description">
                Continue karne par browser location aur camera/microphone ke alag
                permission prompts dikha sakta hai. Aap har prompt ko allow ya deny
                kar sakte hain. Camera ya microphone se koi recording nahi hogi.
            </p>
            <p className="family-consent-notice">
                Important: family-sharing API abhi is website se connected nahi hai.
                Isliye yeh page permission status ke alawa koi data Flutter app ko
                nahi bhejta. Browser permissions baad mein browser settings se badli
                ja sakti hain.
            </p>
            <div className="family-consent-actions">
                <button className="btn btn-outline-secondary" onClick={onDecline}>
                    Not now
                </button>
                <button className="btn btn-primary" onClick={onAllow}>
                    Continue
                </button>
            </div>
        </section>
    </div>
);

export default FamilyConsentDialog;
