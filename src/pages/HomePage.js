import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import RegistrationForm from '../components/RegistrationForm';
import ContactForm from '../components/ContactForm';
import AIChatBot from '../components/AIChatBot';
import HealthTips from '../components/HealthTips';
import Footer from '../components/Footer';

const HomePage = () => {
    const [redirecting, setRedirecting] = useState(false);

    const handleRedirect = () => {
        setRedirecting(true);
        setTimeout(() => {
            window.location.href = "https://www.who.int";
        }, 1000);
    };

    return ( <
        div className = "healthcare-app" > { /* Redirect Overlay */ } {
            redirecting && ( <
                div className = "redirect-overlay d-flex justify-content-center align-items-center" >
                <
                div className = "redirect-content text-center p-4 rounded shadow bg-white" >
                <
                h2 > Redirecting to WHO Website < /h2> <
                div className = "loading-spinner my-3" > < /div> <
                p > Please wait... < /p> <
                /div> <
                /div>
            )
        }

        <
        Header / >
        <
        Hero / >
        <
        Stats / >
        <
        RegistrationForm / >
        <
        ContactForm / >
        <
        AIChatBot / >
        <
        HealthTips / >
        <
        Footer / >
        <
        /div>
    );
};

export default HomePage;