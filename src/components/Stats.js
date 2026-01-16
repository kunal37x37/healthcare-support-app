import React, { useState, useEffect } from 'react';
import { FaUsers, FaHandsHelping, FaHeartbeat, FaRobot } from 'react-icons/fa';

const Stats = () => {
    const [stats, setStats] = useState([
        { number: 0, text: 'Patients Supported', icon: < FaHeartbeat / > },
        { number: 0, text: 'Volunteers Registered', icon: < FaUsers / > },
        { number: 0, text: 'AI Queries Handled', icon: < FaRobot / > },
        { number: 0, text: 'NGOs Partnered', icon: < FaHandsHelping / > }
    ]);

    useEffect(() => {
        const intervals = [
            setInterval(() => {
                setStats(prev => {
                    const newStats = [...prev];
                    if (newStats[0].number < 1500) newStats[0].number += 10;
                    return newStats;
                });
            }, 10),
            setInterval(() => {
                setStats(prev => {
                    const newStats = [...prev];
                    if (newStats[1].number < 500) newStats[1].number += 2;
                    return newStats;
                });
            }, 50),
            setInterval(() => {
                setStats(prev => {
                    const newStats = [...prev];
                    if (newStats[2].number < 2500) newStats[2].number += 15;
                    return newStats;
                });
            }, 10),
            setInterval(() => {
                setStats(prev => {
                    const newStats = [...prev];
                    if (newStats[3].number < 50) newStats[3].number += 1;
                    return newStats;
                });
            }, 100)
        ];

        return () => intervals.forEach(interval => clearInterval(interval));
    }, []);

    return ( <
        section className = "stats py-5"
        style = {
            { background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)' } } >
        <
        div className = "container" >
        <
        h2 className = "text-center mb-5" > Our Impact < /h2> <
        div className = "row text-center g-4" > {
            stats.map((stat, index) => ( <
                div className = "col-6 col-md-3"
                key = { index } >
                <
                div className = "stat-item p-3 rounded shadow-sm bg-white" >
                <
                div className = "stat-icon fs-1 text-success" > { stat.icon } < /div> <
                div className = "stat-number fs-3 fw-bold" > { stat.number.toLocaleString() } + < /div> <
                div className = "stat-text" > { stat.text } < /div> <
                /div> <
                /div>
            ))
        } <
        /div> <
        /div> <
        /section>
    );
};

export default Stats;