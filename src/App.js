import React from 'react';
import HomePage from './pages/HomePage';
import FamilySharePage from './pages/FamilySharePage';
import './styles/App.css';

function App() {
    const isFamilyShare = new URLSearchParams(window.location.search).get('family-share') === '1';
    return isFamilyShare ? <FamilySharePage /> : <HomePage />;
}

export default App;