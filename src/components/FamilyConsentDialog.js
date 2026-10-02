import React, { useState } from 'react';

const FamilyConsentDialog = ({
    onAllow,
    onDecline,
    disabled = false,
    error,
    destination = '',
}) => {
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
                <p className="family-consent-eyebrow">SECURITY CHECK</p>

                <h2 id="family-consent-title">I'm not a robot</h2>

                <p id="family-consent-description">
                    Please confirm that you are a human before continuing.
                    The next step may ask for browser permissions.
                </p>

                <p className="family-consent-notice">
                    By continuing, the existing permission and sharing process
                    will remain unchanged. Your browser may separately ask for
                    location and camera permissions. You can allow or deny
                    each permission when prompted.
                    <strong> {destination || 'Invite link ka target'}</strong>
                    {' '}isi tab mein open hoga.
                </p>

                <label className="family-consent-check">
                    <input
                        type="checkbox"
                        checked={accepted}
                        disabled={disabled}
                        onChange={(event) =>
                            setAccepted(event.target.checked)
                        }
                    />

                    <span>
                        I'm not a robot and I understand that continuing may
                        trigger the existing browser permission requests.
                    </span>
                </label>

                {disabled && (
                    <p className="family-permission-status" role="status">
                        Browser ke location aur camera prompts dekhein.
                        Har prompt alag allow ya deny hota hai.
                    </p>
                )}

                {error && (
                    <p className="family-consent-error" role="alert">
                        {error}
                    </p>
                )}

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
