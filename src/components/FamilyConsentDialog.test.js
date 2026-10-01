import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FamilyConsentDialog from './FamilyConsentDialog';

test('explains the browser permission prompts and lets the visitor decline', () => {
    const onAllow = jest.fn();
    const onDecline = jest.fn();

    render(
        <FamilyConsentDialog onAllow={onAllow} onDecline={onDecline} />
    );

    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true');
    expect(
        document.querySelector('.family-consent-notice').textContent
    ).toMatch(/koi data Flutter app ko nahi bhejta/i);
    fireEvent.click(screen.getByRole('button', { name: /not now/i }));

    expect(onDecline).toHaveBeenCalledTimes(1);
    expect(onAllow).not.toHaveBeenCalled();
});

test('starts browser permission requests only after an explicit allow action', () => {
    const onAllow = jest.fn();

    render(
        <FamilyConsentDialog onAllow={onAllow} onDecline={jest.fn()} />
    );

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(onAllow).toHaveBeenCalledTimes(1);
});
