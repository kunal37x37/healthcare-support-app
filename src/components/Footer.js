import React from 'react';
import { FaHeartbeat, FaGithub, FaLinkedin, FaEnvelope, FaCode, FaRobot } from 'react-icons/fa';

const Footer = () => {
    return ( <
        footer className = "footer py-5 bg-dark text-light" >
        <
        div className = "container" >
        <
        div className = "row g-4" >
        <
        div className = "col-md-4 text-center text-md-start" >
        <
        div className = "d-flex align-items-center gap-2 mb-2 justify-content-center justify-content-md-start" >
        <
        FaHeartbeat className = "fs-3 text-success" / >
        <
        span className = "fs-4 fw-bold" > Healthcare Support < /span> < /
        div > <
        p className = "mb-3" >
        A concept web application
        for healthcare support with AI integration.Designed
        for NGOs to manage volunteers and provide patient support. <
        /p> <
        div className = "d-flex gap-2 justify-content-center justify-content-md-start" >
        <
        a href = "https://github.com/kunal37x37"
        className = "text-light" >
        <
        FaGithub size = { 20 }
        /> < /
        a > <
        a href = "https://linkedin.com"
        className = "text-light" >
        <
        FaLinkedin size = { 20 }
        /> < /
        a > <
        a href = "mailto:contact@healthcaresupport.org"
        className = "text-light" >
        <
        FaEnvelope size = { 20 }
        /> < /
        a > <
        /div> < /
        div >

        <
        div className = "col-md-4 text-center text-md-start" >
        <
        h5 className = "text-success mb-3" > AI Features < /h5> <
        ul className = "list-unstyled" >
        <
        li className = "mb-2" >
        <
        FaRobot className = "me-2 text-info" / > Healthcare Chatbot <
        /li> <
        li className = "mb-2" >
        <
        FaCode className = "me-2 text-info" / > Automated Form Processing <
        /li> <
        li className = "mb-2" >
        <
        FaRobot className = "me-2 text-info" / > AI Response Generation <
        /li> <
        li className = "mb-2" >
        <
        FaCode className = "me-2 text-info" / > Data Analysis & Summaries <
        /li> < /
        ul > <
        /div>

        <
        div className = "col-md-4 text-center text-md-start" >
        <
        h5 className = "text-success mb-3" > Project Links < /h5> <
        div className = "d-flex flex-column gap-2" >
        <
        a href = "https://github.com/kunal37x37/healthcare-support-app"
        className = "btn btn-outline-light d-flex align-items-center gap-2" >
        <
        FaGithub / > GitHub Repository <
        /a> <
        a href = "#ai"
        className = "btn btn-outline-light d-flex align-items-center gap-2" >
        <
        FaRobot / > AI Assistant Demo <
        /a> <
        a href = "#register"
        className = "btn btn-outline-success d-flex align-items-center gap-2" >
        Volunteer Registration <
        /a> < /
        div > <
        /div> < /
        div >

        <
        div className = "text-center mt-4 border-top border-secondary pt-3" >
        <
        div className = "row" >
        <
        div className = "col-md-6" >
        <
        small >
        Internship Assignment• Healthcare Support Web App with AI Integration <
        /small> < /
        div > <
        div className = "col-md-6" >
        <
        small className = "text-muted" > ©{ new Date().getFullYear() }•
        Submission
        for Healthcare NGO Support System <
        /small> < /
        div > <
        /div> < /
        div > <
        /div> < /
        footer >
    );
};

export default Footer;