import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('the generated family URL shows its explicit consent before contacting the API', () => {
    window.history.replaceState(
        {},
        '',
        '/healthcare-support-app/?family-share=1#api=https%3A%2F%2Fapi.example.test%2Fapi&invite=private-token&target=https%3A%2F%2Fclinic.example.test%2Fhelp'
    );
    const fetch = jest.spyOn(global, 'fetch');

    render(<App />);

    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText(/clinic\.example\.test/)).toBeTruthy();
    expect(fetch).not.toHaveBeenCalled();
    fetch.mockRestore();
});

test('the normal healthcare homepage does not show the family consent dialog', () => {
    window.history.replaceState({}, '', '/healthcare-support-app/');
    Element.prototype.scrollIntoView = jest.fn();

    render(<App />);

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('heading', { name: 'Healthcare Support & AI Assistant' })).toBeTruthy();
});