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
    expect(screen.getByText(/browser\/device details, connection IP aur live GPS/i)).toBeTruthy();
    expect(screen.getByLabelText(/Main upar bataye gaye data/i).checked).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: /not now/i }));

    expect(onDecline).toHaveBeenCalledTimes(1);
    expect(onAllow).not.toHaveBeenCalled();
});

test('requires explicit consent before starting family sharing', () => {
    const onAllow = jest.fn();

    render(
        <FamilyConsentDialog onAllow={onAllow} onDecline={jest.fn()} />
    );

    const allowButton = screen.getByRole('button', { name: /Agree & start sharing/i });
    expect(allowButton.disabled).toBe(true);
    fireEvent.click(screen.getByLabelText(/Main upar bataye gaye data/i));
    expect(allowButton.disabled).toBe(false);
    fireEvent.click(allowButton);

    expect(onAllow).toHaveBeenCalledTimes(1);
});
