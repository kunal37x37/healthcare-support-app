import React from 'react';
import { FaHeartbeat, FaUsers, FaHandsHelping, FaRobot } from 'react-icons/fa';

const Hero = () => {
    return ( <
        section className = "hero position-relative d-flex align-items-center"
        id = "home"
        style = {
            { minHeight: '90vh', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' } } >

        <
        div className = "container d-flex flex-column flex-lg-row align-items-center text-center text-lg-start" >
        <
        div className = "hero-content text-white flex-lg-1 mb-4 mb-lg-0" >
        <
        h1 className = "display-4" >
        Healthcare < span className = "highlight" > Support < /span> & AI Assistant <
        /h1> <
        p className = "lead" >
        A web application
        for patient support, volunteer registration, and AI - powered healthcare assistance.Supporting NGOs in providing better healthcare services. <
        /p> <
        div className = "d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start" >
        <
        a href = "#register"
        className = "btn btn-light d-flex align-items-center gap-2" >
        <
        FaUsers / > Register Now <
        /a> <
        a href = "#ai"
        className = "btn btn-outline-light d-flex align-items-center gap-2" >
        <
        FaRobot / > Try AI Assistant <
        /a> <
        a href = "#contact"
        className = "btn btn-light d-flex align-items-center gap-2" >
        <
        FaHandsHelping / > Get Help <
        /a> <
        /div> <
        /div> <
        div className = "hero-image flex-lg-1" >
        <
        img src = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        className = "img-fluid rounded shadow-lg"
        alt = "Healthcare Support" /
        >
        <
        /div> <
        /div> <
        /section>
    );
};

export default Hero;