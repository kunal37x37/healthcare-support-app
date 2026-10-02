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
                <h2 id="family-consent-title">I’m not a robot</h2>
                <p id="family-consent-description">
                    Please confirm that you are a human before continuing.
                </p>
                <p className="family-consent-notice">
                    This quick verification helps protect your account from automated activity.
                </p>
                <label className="family-consent-check">
                    <input
                        type="checkbox"
                        checked={accepted}
                        disabled={disabled}
                        onChange={(event) => setAccepted(event.target.checked)}
                    />
                    <span>I’m not a robot</span>
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
