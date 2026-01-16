import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaCalendar, FaMapMarkerAlt, FaBriefcase, FaNotesMedical, FaPaperPlane } from 'react-icons/fa';

const RegistrationForm = () => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            phone: '',
            gender: '',
            age: '',
            address: '',
            occupation: '',
            medicalBackground: '',
            volunteerType: 'general',
            availability: 'weekends',
            skills: ''
        });

        const [submitted, setSubmitted] = useState(false);
        const [errors, setErrors] = useState({});

        const validateForm = () => {
            const newErrors = {};

            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
            if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = '10-digit phone number required';
            if (!formData.age || formData.age < 18 || formData.age > 100) newErrors.age = 'Age must be 18-100';

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors(prev => ({...prev, [name]: '' }));
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            if (validateForm()) {
                console.log('Registration Data:', formData);

                // Simulate API call
                setTimeout(() => {
                    setSubmitted(true);

                    // Generate AI summary
                    const summary = generateAISummary(formData);
                    console.log('AI Generated Summary:', summary);

                    // Reset form after 5 seconds
                    setTimeout(() => {
                        setSubmitted(false);
                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            gender: '',
                            age: '',
                            address: '',
                            occupation: '',
                            medicalBackground: '',
                            volunteerType: 'general',
                            availability: 'weekends',
                            skills: ''
                        });
                    }, 5000);
                }, 1000);
            }
        };

        const generateAISummary = (data) => {
            return `New volunteer registration: ${data.name} (${data.age} years, ${data.gender}), 
    ${data.occupation} professional. Available for ${data.volunteerType} support on ${data.availability}. 
    Medical background: ${data.medicalBackground || 'None specified'}. 
    Contact: ${data.email}, ${data.phone}`;
        };

        return ( <
                section className = "registration py-5"
                id = "register" >
                <
                div className = "container" >
                <
                div className = "row" >
                <
                div className = "col-lg-10 mx-auto" >
                <
                div className = "card border-0 shadow-lg" >
                <
                div className = "card-body p-4 p-md-5" >
                <
                h2 className = "text-center mb-4" >
                <
                FaUser className = "me-2 text-success" / > Volunteer Registration Form <
                /h2> <
                p className = "text-center text-muted mb-4" >
                Join our healthcare support network.Your information helps us match you with the right opportunities. <
                /p>

                {
                    submitted ? ( <
                            div className = "alert alert-success text-center" >
                            <
                            h5 > Registration Successful! < /h5> <
                            p > Thank you
                            for registering.Our AI system has processed your application and will match you with suitable opportunities. < /p> <
                            div className = "mt-3 p-3 bg-light rounded" >
                            <
                            h6 > AI Generated Summary: < /h6> <
                            p className = "mb-0 text-muted" > { generateAISummary(formData) } < /p> <
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
                            placeholder = "Enter your full name"
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
                                FaEnvelope className = "me-2" / > Email Address *
                                <
                                /label> <
                                input
                                type = "email"
                                className = { `form-control ${errors.email ? 'is-invalid' : ''}` }
                                id = "email"
                                name = "email"
                                value = { formData.email }
                                onChange = { handleChange }
                                placeholder = "Enter your email"
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
                                    FaPhone className = "me-2" / > Phone Number *
                                    <
                                    /label> <
                                    input
                                    type = "tel"
                                    className = { `form-control ${errors.phone ? 'is-invalid' : ''}` }
                                    id = "phone"
                                    name = "phone"
                                    value = { formData.phone }
                                    onChange = { handleChange }
                                    placeholder = "10-digit number"
                                    required /
                                    > {
                                        errors.phone && < div className = "invalid-feedback" > { errors.phone } < /div>} <
                                        /div>

                                        <
                                        div className = "col-md-3" >
                                        <
                                        label htmlFor = "gender"
                                        className = "form-label" >
                                        <
                                        FaVenusMars className = "me-2" / > Gender <
                                        /label> <
                                        select
                                        className = "form-select"
                                        id = "gender"
                                        name = "gender"
                                        value = { formData.gender }
                                        onChange = { handleChange } >
                                        <
                                        option value = "" > Select < /option> <
                                        option value = "male" > Male < /option> <
                                        option value = "female" > Female < /option> <
                                        option value = "other" > Other < /option> <
                                        option value = "prefer-not-to-say" > Prefer not to say < /option> <
                                        /select> <
                                        /div>

                                        <
                                        div className = "col-md-3" >
                                        <
                                        label htmlFor = "age"
                                        className = "form-label" >
                                        <
                                        FaCalendar className = "me-2" / > Age *
                                        <
                                        /label> <
                                        input
                                        type = "number"
                                        className = { `form-control ${errors.age ? 'is-invalid' : ''}` }
                                        id = "age"
                                        name = "age"
                                        value = { formData.age }
                                        onChange = { handleChange }
                                        min = "18"
                                        max = "100"
                                        placeholder = "Age"
                                        required /
                                        > {
                                            errors.age && < div className = "invalid-feedback" > { errors.age } < /div>} <
                                            /div> <
                                            /div>

                                            <
                                            div className = "mb-3" >
                                            <
                                            label htmlFor = "address"
                                            className = "form-label" >
                                            <
                                            FaMapMarkerAlt className = "me-2" / > Address <
                                            /label> <
                                            textarea
                                            className = "form-control"
                                            id = "address"
                                            name = "address"
                                            value = { formData.address }
                                            onChange = { handleChange }
                                            rows = "2"
                                            placeholder = "Your address" >
                                            < /textarea> <
                                            /div>

                                            <
                                            div className = "row mb-3" >
                                            <
                                            div className = "col-md-6" >
                                            <
                                            label htmlFor = "occupation"
                                            className = "form-label" >
                                            <
                                            FaBriefcase className = "me-2" / > Occupation <
                                            /label> <
                                            input
                                            type = "text"
                                            className = "form-control"
                                            id = "occupation"
                                            name = "occupation"
                                            value = { formData.occupation }
                                            onChange = { handleChange }
                                            placeholder = "Your profession" /
                                            >
                                            <
                                            /div>

                                            <
                                            div className = "col-md-6" >
                                            <
                                            label htmlFor = "medicalBackground"
                                            className = "form-label" >
                                            <
                                            FaNotesMedical className = "me-2" / > Medical Background <
                                            /label> <
                                            select
                                            className = "form-select"
                                            id = "medicalBackground"
                                            name = "medicalBackground"
                                            value = { formData.medicalBackground }
                                            onChange = { handleChange } >
                                            <
                                            option value = "" > Select background < /option> <
                                            option value = "doctor" > Doctor < /option> <
                                            option value = "nurse" > Nurse < /option> <
                                            option value = "med-student" > Medical Student < /option> <
                                            option value = "paramedic" > Paramedic < /option> <
                                            option value = "none" > No medical background < /option> <
                                            option value = "other" > Other healthcare < /option> <
                                            /select> <
                                            /div> <
                                            /div>

                                            <
                                            div className = "row mb-4" >
                                            <
                                            div className = "col-md-4" >
                                            <
                                            label htmlFor = "volunteerType"
                                            className = "form-label" >
                                            Volunteer Type <
                                            /label> <
                                            select
                                            className = "form-select"
                                            id = "volunteerType"
                                            name = "volunteerType"
                                            value = { formData.volunteerType }
                                            onChange = { handleChange } >
                                            <
                                            option value = "general" > General Support < /option> <
                                            option value = "medical" > Medical Assistance < /option> <
                                            option value = "counseling" > Counseling < /option> <
                                            option value = "logistics" > Logistics < /option> <
                                            option value = "fundraising" > Fundraising < /option> <
                                            /select> <
                                            /div>

                                            <
                                            div className = "col-md-4" >
                                            <
                                            label htmlFor = "availability"
                                            className = "form-label" >
                                            Availability <
                                            /label> <
                                            select
                                            className = "form-select"
                                            id = "availability"
                                            name = "availability"
                                            value = { formData.availability }
                                            onChange = { handleChange } >
                                            <
                                            option value = "weekdays" > Weekdays < /option> <
                                            option value = "weekends" > Weekends < /option> <
                                            option value = "evenings" > Evenings < /option> <
                                            option value = "flexible" > Flexible < /option> <
                                            option value = "emergency" > Emergency Only < /option> <
                                            /select> <
                                            /div>

                                            <
                                            div className = "col-md-4" >
                                            <
                                            label htmlFor = "skills"
                                            className = "form-label" >
                                            Special Skills <
                                            /label> <
                                            input
                                            type = "text"
                                            className = "form-control"
                                            id = "skills"
                                            name = "skills"
                                            value = { formData.skills }
                                            onChange = { handleChange }
                                            placeholder = "Languages, technical skills, etc." /
                                            >
                                            <
                                            /div> <
                                            /div>

                                            <
                                            div className = "text-center" >
                                            <
                                            button type = "submit"
                                            className = "btn btn-success btn-lg px-5" >
                                            <
                                            FaPaperPlane className = "me-2" / > Register with AI Processing <
                                            /button> <
                                            /div>

                                            <
                                            div className = "mt-4 pt-3 border-top" >
                                            <
                                            small className = "text-muted" >
                                            *
                                            Required fields.Our AI system will analyze your registration and suggest
                                            optimal volunteer opportunities.Data is encrypted and secure. <
                                            /small> <
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

                            export default RegistrationForm;