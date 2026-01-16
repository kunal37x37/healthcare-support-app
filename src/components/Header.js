import React, { useState } from 'react';
import { FaHeartbeat, FaHome, FaUserMd, FaHandsHelping, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return ( <
        header className = "header sticky-top bg-dark bg-opacity-25 backdrop-blur py-3 shadow-sm" >
        <
        div className = "container d-flex justify-content-between align-items-center flex-wrap" >
        <
        div className = "d-flex align-items-center gap-2" >
        <
        FaHeartbeat className = "logo-icon fs-2 text-success" / >
        <
        span className = "logo-text fs-3 fw-bold text-white" > Healthcare Support < /span> <
        /div>

        { /* Desktop Navigation */ } <
        nav className = "d-none d-md-flex align-items-center gap-3 flex-wrap" >
        <
        a className = "text-white nav-link"
        href = "#home" >
        <
        FaHome className = "me-1" / > Home <
        /a> <
        a className = "text-white nav-link"
        href = "#register" >
        <
        FaUserMd className = "me-1" / > Register <
        /a> <
        a className = "text-white nav-link"
        href = "#contact" >
        <
        FaHandsHelping className = "me-1" / > Contact <
        /a> <
        a className = "text-white nav-link"
        href = "#ai" >
        <
        span className = "ai-badge" > AI Assistant < /span> <
        /a> <
        /nav>

        { /* Mobile Menu Button */ } <
        button className = "d-md-none btn btn-success d-flex align-items-center gap-1"
        onClick = {
            () => setMenuOpen(!menuOpen) } >
        { menuOpen ? < FaTimes / > : < FaBars / > } <
        /button> <
        /div>

        { /* Mobile Navigation */ } {
            menuOpen && ( <
                div className = "d-md-none container mt-3" >
                <
                div className = "bg-dark bg-opacity-75 rounded p-3" >
                <
                a className = "text-white nav-link d-block py-2"
                href = "#home"
                onClick = {
                    () => setMenuOpen(false) } >
                <
                FaHome className = "me-2" / > Home <
                /a> <
                a className = "text-white nav-link d-block py-2"
                href = "#register"
                onClick = {
                    () => setMenuOpen(false) } >
                <
                FaUserMd className = "me-2" / > Register <
                /a> <
                a className = "text-white nav-link d-block py-2"
                href = "#contact"
                onClick = {
                    () => setMenuOpen(false) } >
                <
                FaHandsHelping className = "me-2" / > Contact <
                /a> <
                a className = "text-white nav-link d-block py-2"
                href = "#ai"
                onClick = {
                    () => setMenuOpen(false) } >
                <
                span className = "ai-badge" > AI Assistant < /span> <
                /a> <
                /div> <
                /div>
            )
        } <
        /header>
    );
};

export default Header;