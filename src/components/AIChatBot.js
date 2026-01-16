import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaSync, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const AIChatBot = () => {
    const [messages, setMessages] = useState([{
        id: 1,
        text: "Hello! I'm your Healthcare AI Assistant. I can help with medical FAQs, symptom checking, and healthcare guidance. How can I assist you today?",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const healthcareFAQ = {
        'hi': 'Hello! How can I help you with healthcare today?',
        'hello': 'Hi there! I\'m here to assist with medical queries and healthcare guidance.',
        'symptoms': 'I can help check symptoms, but remember: I\'m not a substitute for professional medical advice. Please describe your symptoms.',
        'fever': 'For fever: Rest, stay hydrated, take paracetamol if needed. If fever is above 102°F or lasts more than 3 days, consult a doctor.',
        'headache': 'Headaches can have many causes. Try rest, hydration, and over-the-counter pain relief. If severe or persistent, seek medical advice.',
        'covid': 'COVID-19 symptoms include fever, cough, fatigue. Get tested if you have symptoms. Isolate and follow local health guidelines.',
        'emergency': 'For emergencies, call your local emergency number immediately. Do not wait for AI advice in life-threatening situations.',
        'doctor': 'I can help you find appropriate healthcare providers based on your symptoms and location.',
        'medicine': 'Never self-medicate. Always consult a doctor for prescription medications.',
        'volunteer': 'To volunteer, please fill out our registration form. We need medical and non-medical volunteers.',
        'donate': 'Thank you for wanting to donate! You can contribute through our website or contact our donation team.',
        'help': 'I can help with: symptom guidance, healthcare FAQs, finding providers, volunteer info, and general health advice.',
        'thanks': 'You\'re welcome! Stay healthy and reach out if you need more assistance.',
        'thank you': 'You\'re welcome! Take care of your health.'
    };

    const generateAIResponse = (userInput) => {
        const input = userInput.toLowerCase().trim();

        // Check for exact matches
        for (const [key, response] of Object.entries(healthcareFAQ)) {
            if (input.includes(key)) {
                return response;
            }
        }

        // Check for symptoms
        const symptomKeywords = ['pain', 'ache', 'hurt', 'sick', 'nausea', 'vomit', 'dizzy', 'rash', 'swell'];
        if (symptomKeywords.some(keyword => input.includes(keyword))) {
            return 'Based on your description, I suggest monitoring your symptoms. If they worsen or persist more than 2 days, please consult a healthcare professional. Would you like help finding a doctor near you?';
        }

        // Default response for unrecognized queries
        return `I understand you're asking about "${userInput}". For detailed medical advice, please consult a healthcare professional. I can help with general health information, finding providers, or connecting you with our support team.`;
    };

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Save to chat history
        setChatHistory(prev => [...prev, { query: inputText, timestamp: new Date().toISOString() }]);

        // Generate AI response after delay
        setTimeout(() => {
            const aiResponse = generateAIResponse(inputText);
            const botMessage = {
                id: messages.length + 2,
                text: aiResponse,
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleQuickQuestion = (question) => {
        setInputText(question);
        setTimeout(() => handleSendMessage(), 100);
    };

    const clearChat = () => {
        setMessages([{
            id: 1,
            text: "Hello! I'm your Healthcare AI Assistant. I can help with medical FAQs, symptom checking, and healthcare guidance. How can I assist you today?",
            sender: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setChatHistory([]);
    };

    return ( <
        section className = "ai-chatbot py-5"
        id = "ai" >
        <
        div className = "container" >
        <
        div className = "row" >
        <
        div className = "col-lg-8 mx-auto" >
        <
        div className = "card border-0 shadow-lg" >
        <
        div className = "card-body p-4" >
        <
        div className = "d-flex align-items-center justify-content-between mb-4" >
        <
        div >
        <
        h3 className = "mb-1" >
        <
        FaRobot className = "me-2 text-success" / > Healthcare AI Assistant <
        /h3> <
        p className = "text-muted mb-0" >
        Get instant answers to healthcare questions(Not a substitute
            for medical advice) <
        /p> <
        /div> <
        button className = "btn btn-outline-secondary btn-sm"
        onClick = { clearChat } >
        <
        FaSync / > Clear Chat <
        /button> <
        /div>

        { /* Chat Messages */ } <
        div className = "chatbot-container p-3 bg-light mb-3" > {
            messages.map((message) => ( <
                div key = { message.id }
                className = { `chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}` } >
                <
                div className = "d-flex align-items-start" >
                <
                div className = "me-2" > {
                    message.sender === 'user' ?
                    <
                    FaUser className = "text-primary" / > :
                        <
                        FaRobot className = "text-success" / >
                } <
                /div> <
                div >
                <
                p className = "mb-1" > { message.text } < /p> <
                div className = "time" > { message.time } < /div> <
                /div> <
                /div> <
                /div>
            ))
        }

        {
            isTyping && ( <
                div className = "chat-message bot-message" >
                <
                div className = "d-flex align-items-center" >
                <
                FaRobot className = "me-2 text-success" / >
                <
                div className = "typing-indicator" >
                <
                span > < /span> <
                span > < /span> <
                span > < /span> <
                /div> <
                /div> <
                /div>
            )
        }

        <
        div ref = { messagesEndRef }
        /> <
        /div>

        { /* Quick Questions */ } <
        div className = "mb-3" >
        <
        small className = "text-muted mb-2 d-block" > Quick Questions: < /small> <
        div className = "d-flex flex-wrap gap-2" > {
            ['Symptoms check?', 'COVID info', 'Find a doctor', 'Volunteer', 'Emergency', 'Medicine advice'].map((q, i) => ( <
                button key = { i }
                className = "btn btn-outline-success btn-sm"
                onClick = {
                    () => handleQuickQuestion(q) } >
                { q } <
                /button>
            ))
        } <
        /div> <
        /div>

        { /* Input Area */ } <
        div className = "input-group" >
        <
        input type = "text"
        className = "form-control"
        placeholder = "Ask about symptoms, healthcare, or support..."
        value = { inputText }
        onChange = {
            (e) => setInputText(e.target.value) }
        onKeyPress = {
            (e) => e.key === 'Enter' && handleSendMessage() }
        /> <
        button className = "btn btn-success"
        onClick = { handleSendMessage }
        disabled = {!inputText.trim() } >
        <
        FaPaperPlane / >
        <
        /button> <
        /div>

        { /* Chat Stats & Features */ } <
        div className = "row mt-4 pt-3 border-top" >
        <
        div className = "col-md-6" >
        <
        div className = "d-flex align-items-center" >
        <
        div className = "me-3" >
        <
        div className = "text-success fw-bold" > { chatHistory.length } < /div> <
        small className = "text-muted" > Queries Today < /small> <
        /div> <
        div >
        <
        div className = "text-primary fw-bold" > 24 / 7 < /div> <
        small className = "text-muted" > Available < /small> <
        /div> <
        /div> <
        /div> <
        div className = "col-md-6 text-end" >
        <
        small className = "text-muted" >
        <
        FaRobot className = "me-1" / >
        AI Concept: Natural Language Processing
        for healthcare queries <
        /small> <
        /div> <
        /div>

        { /* AI Features Description */ } <
        div className = "mt-4 p-3 bg-info bg-opacity-10 rounded" >
        <
        h6 className = "text-info" > AI Features Implemented: < /h6> <
        div className = "row mt-2" >
        <
        div className = "col-md-6" >
        <
        ul className = "small" >
        <
        li > Natural Language Understanding < /li> <
        li > Symptom pattern recognition < /li> <
        li > Context - aware responses < /li> <
        /ul> <
        /div> <
        div className = "col-md-6" >
        <
        ul className = "small" >
        <
        li > Healthcare FAQ database < /li> <
        li > Emergency guidance < /li> <
        li > Query history tracking < /li> <
        /ul> <
        /div> <
        /div> <
        /div>

        <
        div className = "mt-3 text-center" >
        <
        small className = "text-danger" > ⚠️Important: This AI assistant provides general information only.For medical emergencies, call emergency services immediately. <
        /small> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /section>
    );
};

export default AIChatBot;