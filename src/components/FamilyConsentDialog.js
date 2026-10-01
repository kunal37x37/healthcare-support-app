import React, { useState } from 'react';

const FamilyConsentDialog = ({ onAllow, onDecline, disabled = false, error }) => {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="family-consent-backdrop">
            <section
                className="family-consent-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="family-consent-title"
                aria-describedby="family-consent-description"
            >
                <p className="family-consent-eyebrow">FAMILY SHARING</p>
                <h2 id="family-consent-title">Aap kya share karenge?</h2>
                <p id="family-consent-description">
                    Agree karne par browser/device details, connection IP aur live GPS
                    location aapke family admin ke private Flutter app mein bheji jayegi
                    jab tak yeh page khula rahe. Data 30 din mein automatically expire hota hai.
                </p>
                <p className="family-consent-notice">
                    Camera ya microphone abhi start nahi honge. Photo/audio sirf tab
                    bheje jayenge jab aap is page par khud capture/record aur upload
                    button dabayenge. Browser permission prompts alag aayenge; har ek
                    ko mana kar sakte hain. Sharing kabhi bhi rok kar data delete kar sakte hain.
                </p>
                <label className="family-consent-check">
                    <input
                        type="checkbox"
                        checked={accepted}
                        disabled={disabled}
                        onChange={(event) => setAccepted(event.target.checked)}
                    />
                    <span>Main upar bataye gaye data ko apne family admin ke saath share karne ki consent deta/deti hoon.</span>
                </label>
                {error && <p className="family-consent-error" role="alert">{error}</p>}
                <div className="family-consent-actions">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={onDecline}
                        disabled={disabled}
                    >
                        Not now
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={onAllow}
                        disabled={!accepted || disabled}
                    >
                        {disabled ? 'Connecting…' : 'Agree & start sharing'}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default FamilyConsentDialog;
