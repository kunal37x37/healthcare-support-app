import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaComment, FaPaperPlane, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const ContactForm = () => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            category: 'general'
        });

        const [submitted, setSubmitted] = useState(false);
        const [errors, setErrors] = useState({});
        const [aiResponse, setAiResponse] = useState('');

        const validateForm = () => {
            const newErrors = {};

            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
            if (!formData.message.trim() || formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const generateAIResponse = (data) => {
            const responses = {
                emergency: `URGENT: Your ${data.subject} query has been flagged as emergency. Our team will contact you within 15 minutes. Suggested immediate steps: Stay calm, ensure patient is in safe position, have medical history ready.`,
                medical: `MEDICAL QUERY: Thank you for your medical inquiry about "${data.subject}". Our medical team will review and respond within 2 hours. Please monitor symptoms and seek immediate care if condition worsens.`,
                general: `GENERAL: Thank you for contacting us regarding "${data.subject}". We'll respond within 24 hours. For faster response, you can also try our AI chatbot for instant answers to common questions.`,
                volunteer: `VOLUNTEER: Thanks for your interest in volunteering! Based on your query "${data.subject}", we'll connect you with our volunteer coordinator within 48 hours. Check our registration form for immediate application.`,
                donation: `DONATION: Thank you for considering a donation! Your support for "${data.subject}" will help us provide healthcare services. Our fundraising team will contact you with details.`
            };

            return responses[data.category] || responses.general;
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));

            if (errors[name]) {
                setErrors(prev => ({...prev, [name]: '' }));
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            if (validateForm()) {
                console.log('Contact Form Data:', formData);

                // Generate AI response
                const aiReply = generateAIResponse(formData);
                setAiResponse(aiReply);

                // Simulate API call
                setTimeout(() => {
                    setSubmitted(true);

                    // Reset form after 8 seconds
                    setTimeout(() => {
                        setSubmitted(false);
                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            subject: '',
                            message: '',
                            category: 'general'
                        });
                        setAiResponse('');
                    }, 8000);
                }, 1500);
            }
        };

        return ( <
                section className = "contact py-5 bg-light"
                id = "contact" >
                <
                div className = "container" >
                <
                div className = "row" >
                <
                div className = "col-lg-8 mx-auto" >
                <
                div className = "card border-0 shadow-lg" >
                <
                div className = "card-body p-5" >
                <
                h2 className = "text-center mb-4" > Contact & Support Form < /h2> <
                p className = "text-center text-muted mb-4" >
                Get help, ask questions, or report issues.Our AI system provides instant guidance. <
                /p>

                {
                    submitted ? ( <
                        div className = "text-center" >
                        <
                        div className = "alert alert-success" >
                        <
                        FaCheckCircle className = "me-2"
                        size = { 24 }
                        /> <
                        h5 > Message Sent Successfully! < /h5> <
                        p > We 've received your message and our AI system has analyzed it.</p> <
                        /div>

                        <
                        div className = "mt-4 p-4 bg-info bg-opacity-10 border-start border-info border-4" >
                        <
                        h6 className = "text-info" >
                        <
                        FaExclamationTriangle className = "me-2" / >
                        AI Generated Response:
                        <
                        /h6> <
                        p className = "mt-2" > { aiResponse } < /p> <
                        div className = "mt-3 p-2 bg-light rounded" >
                        <
                        small className = "text-muted" >
                        This AI response is generated based on your query category and content.A human representative will follow up as indicated. <
                        /small> <
                        /div> <
                        /div>

                        <
                        div className = "mt-4" >
                        <
                        button className = "btn btn-outline-primary"
                        onClick = {
                            () => {
                                setSubmitted(false);
                                setAiResponse('');
                            }
                        } >
                        Send Another Message <
                        /button> <
                        /div> <
                        /div>
                    ) : ( <
                        form onSubmit = { handleSubmit } >
                        <
                        div className = "row mb-3" >
                        <
                        div className = "col-md-6" >
                        <
                        label htmlFor = "name"
                        className = "form-label" >
                        <
                        FaUser className = "me-2" / > Full Name *
                        <
                        /label> <
                        input type = "text"
                        className = { `form-control ${errors.name ? 'is-invalid' : ''}` }
                        id = "name"
                        name = "name"
                        value = { formData.name }
                        onChange = { handleChange }
                        placeholder = "Your name"
                        required /
                        > {
                            errors.name && < div className = "invalid-feedback" > { errors.name } < /div>} <
                            /div>

                            <
                            div className = "col-md-6" >
                            <
                            label htmlFor = "email"
                            className = "form-label" >
                            <
                            FaEnvelope className = "me-2" / > Email *
                            <
                            /label> <
                            input
                            type = "email"
                            className = { `form-control ${errors.email ? 'is-invalid' : ''}` }
                            id = "email"
                            name = "email"
                            value = { formData.email }
                            onChange = { handleChange }
                            placeholder = "Your email"
                            required /
                            > {
                                errors.email && < div className = "invalid-feedback" > { errors.email } < /div>} <
                                /div> <
                                /div>

                                <
                                div className = "row mb-3" >
                                <
                                div className = "col-md-6" >
                                <
                                label htmlFor = "phone"
                                className = "form-label" >
                                <
                                FaPhone className = "me-2" / > Phone(Optional) <
                                /label> <
                                input
                                type = "tel"
                                className = "form-control"
                                id = "phone"
                                name = "phone"
                                value = { formData.phone }
                                onChange = { handleChange }
                                placeholder = "Your phone number" /
                                >
                                <
                                /div>

                                <
                                div className = "col-md-6" >
                                <
                                label htmlFor = "category"
                                className = "form-label" >
                                Query Category *
                                <
                                /label> <
                                select
                                className = "form-select"
                                id = "category"
                                name = "category"
                                value = { formData.category }
                                onChange = { handleChange }
                                required >
                                <
                                option value = "general" > General Inquiry < /option> <
                                option value = "medical" > Medical Question < /option> <
                                option value = "emergency" > Emergency < /option> <
                                option value = "volunteer" > Volunteer Opportunity < /option> <
                                option value = "donation" > Donation < /option> <
                                option value = "feedback" > Feedback / Suggestion < /option> <
                                option value = "technical" > Technical Issue < /option> <
                                /select> <
                                /div> <
                                /div>

                                <
                                div className = "mb-3" >
                                <
                                label htmlFor = "subject"
                                className = "form-label" >
                                Subject *
                                <
                                /label> <
                                input
                                type = "text"
                                className = "form-control"
                                id = "subject"
                                name = "subject"
                                value = { formData.subject }
                                onChange = { handleChange }
                                placeholder = "Brief subject of your message"
                                required /
                                >
                                <
                                /div>

                                <
                                div className = "mb-4" >
                                <
                                label htmlFor = "message"
                                className = "form-label" >
                                <
                                FaComment className = "me-2" / > Message *
                                <
                                /label> <
                                textarea
                                className = { `form-control ${errors.message ? 'is-invalid' : ''}` }
                                id = "message"
                                name = "message"
                                value = { formData.message }
                                onChange = { handleChange }
                                rows = "5"
                                placeholder = "Describe your issue, question, or request in detail..."
                                required >
                                < /textarea> {
                                    errors.message && < div className = "invalid-feedback" > { errors.message } < /div>} <
                                        div className = "form-text text-end" > { formData.message.length }
                                    /500 characters • AI will analyze this text <
                                    /div> <
                                    /div>

                                    <
                                    div className = "alert alert-info" >
                                        <
                                        FaExclamationTriangle className = "me-2" / >
                                        <
                                        strong > AI Processing: < /strong> Our system will analyze your message and provide 
                                    instant guidance
                                    while routing it to the appropriate team. <
                                        /div>

                                    <
                                    div className = "text-center" >
                                        <
                                        button type = "submit"
                                    className = "btn btn-primary btn-lg px-5" >
                                        <
                                        FaPaperPlane className = "me-2" / > Send with AI Analysis <
                                        /button> <
                                        /div> <
                                        /form>
                                )
                            } <
                            /div> <
                            /div> <
                            /div> <
                            /div> <
                            /div> <
                            /section>
                        );
                    };

                    export default ContactForm;