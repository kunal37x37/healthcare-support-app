import React, { useState, useEffect } from 'react';
import { FaHeartbeat, FaAppleAlt, FaRunning, FaBed, FaBrain, FaHandsHelping } from 'react-icons/fa';

const HealthTips = () => {
    const [tips, setTips] = useState([]);
    const [currentTip, setCurrentTip] = useState(0);

    const healthTips = [{
            icon: < FaAppleAlt / > ,
            title: 'Balanced Nutrition',
            description: 'Eat a variety of fruits, vegetables, and whole grains. Stay hydrated with 8 glasses of water daily.',
            category: 'Nutrition'
        },
        {
            icon: < FaRunning / > ,
            title: 'Regular Exercise',
            description: '30 minutes of moderate exercise daily can improve cardiovascular health and mental well-being.',
            category: 'Fitness'
        },
        {
            icon: < FaBed / > ,
            title: 'Adequate Sleep',
            description: '7-9 hours of quality sleep helps in recovery, memory consolidation, and immune function.',
            category: 'Wellness'
        },
        {
            icon: < FaBrain / > ,
            title: 'Mental Health',
            description: 'Practice mindfulness, meditation, or deep breathing exercises to reduce stress and anxiety.',
            category: 'Mental Health'
        },
        {
            icon: < FaHeartbeat / > ,
            title: 'Regular Check-ups',
            description: 'Annual health check-ups can detect issues early and prevent serious health problems.',
            category: 'Prevention'
        },
        {
            icon: < FaHandsHelping / > ,
            title: 'Community Support',
            description: 'Join support groups and stay connected with family and friends for emotional well-being.',
            category: 'Social Health'
        }
    ];

    useEffect(() => {
        setTips(healthTips);

        // Rotate tips every 5 seconds
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % healthTips.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return ( <
        section className = "health-tips py-5 bg-light" >
        <
        div className = "container" >
        <
        h2 className = "text-center mb-5" > AI - Generated Health Tips < /h2>

        <
        div className = "row" >
        <
        div className = "col-lg-6 mb-4" >
        <
        div className = "tip-card p-4 rounded shadow-sm h-100" >
        <
        div className = "d-flex align-items-center mb-3" >
        <
        div className = "tip-icon me-3" > { tips[currentTip] && tips[currentTip].icon } <
        /div> <
        div >
        <
        h4 className = "mb-1" > { tips[currentTip] ? tips[currentTip].title : 'Loading...' } < /h4> <
        span className = "badge bg-success" > { tips[currentTip] ? tips[currentTip].category : 'Health' } <
        /span> <
        /div> <
        /div> <
        p className = "mb-0" > { tips[currentTip] ? tips[currentTip].description : 'Loading health tips...' } <
        /p> <
        div className = "mt-3 pt-3 border-top" >
        <
        small className = "text-muted" >
        Tip { currentTip + 1 }
        of { tips.length }•
        Updates automatically <
        /small> <
        /div> <
        /div> <
        /div>

        <
        div className = "col-lg-6" >
        <
        div className = "row g-3" > {
            tips.map((tip, index) => ( <
                div className = "col-md-6"
                key = { index } >
                <
                div className = { `tip-card p-3 rounded shadow-sm ${index === currentTip ? 'border-success border-2' : ''}` }
                onClick = {
                    () => setCurrentTip(index) }
                style = {
                    { cursor: 'pointer' } } >
                <
                div className = "d-flex align-items-center" >
                <
                div className = "text-success me-2" > { tip.icon } <
                /div> <
                div >
                <
                h6 className = "mb-1" > { tip.title } < /h6> <
                small className = "text-muted" > { tip.category } < /small> <
                /div> <
                /div> <
                /div> <
                /div>
            ))
        } <
        /div>

        <
        div className = "mt-4 p-3 bg-info bg-opacity-10 rounded" >
        <
        h6 className = "text-info" > AI Health Monitoring Concept: < /h6> <
        p className = "small mb-0" >
        Our AI system analyzes health data to provide personalized tips.In a full implementation, it would track your health metrics and suggest customized wellness plans based on your profile and history. <
        /p> <
        /div> <
        /div> <
        /div> <
        /div> <
        /section>
    );
};

export default HealthTips;