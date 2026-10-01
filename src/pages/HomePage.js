import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import RegistrationForm from '../components/RegistrationForm';
import ContactForm from '../components/ContactForm';
import AIChatBot from '../components/AIChatBot';
import HealthTips from '../components/HealthTips';
import Footer from '../components/Footer';

const HomePage = () => (
    <div className="healthcare-app">
        <Header />
        <Hero />
        <Stats />
        <RegistrationForm />
        <ContactForm />
        <AIChatBot />
        <HealthTips />
        <Footer />
    </div>
);

export default HomePage;