// AI Service for healthcare support application

class AIService {
    constructor() {
        this.healthKeywords = {
            emergency: ['emergency', 'urgent', '911', 'help now', 'critical', 'life threatening'],
            symptoms: ['pain', 'fever', 'cough', 'headache', 'nausea', 'vomit', 'dizzy', 'rash'],
            mental: ['depressed', 'anxious', 'stress', 'sad', 'mental health', 'therapy'],
            general: ['info', 'information', 'question', 'query', 'help', 'assist']
        };
    }

    // Analyze query and categorize
    analyzeQuery(text) {
        const lowerText = text.toLowerCase();
        const categories = [];

        for (const [category, keywords] of Object.entries(this.healthKeywords)) {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                categories.push(category);
            }
        }

        return categories.length > 0 ? categories : ['general'];
    }

    // Generate AI summary for registration data
    generateRegistrationSummary(data) {
        const skills = data.skills ? `Skills: ${data.skills}. ` : '';
        const medicalBg = data.medicalBackground ? `Medical background: ${data.medicalBackground}. ` : 'No medical background. ';

        return `New volunteer: ${data.name} (${data.age} years, ${data.gender}). 
    ${medicalBg}Occupation: ${data.occupation || 'Not specified'}. 
    Available for ${data.volunteerType} work on ${data.availability}. 
    ${skills}Contact: ${data.email}, ${data.phone}. 
    AI Recommendation: ${this.getVolunteerRecommendation(data)}`;
    }

    // Get volunteer recommendation based on data
    getVolunteerRecommendation(data) {
        const recommendations = [];

        if (data.medicalBackground && data.medicalBackground !== 'none') {
            recommendations.push('Medical support team');
        }

        if (data.availability === 'emergency' || data.availability === 'flexible') {
            recommendations.push('Emergency response team');
        }

        if (data.skills && data.skills.toLowerCase().includes('language')) {
            recommendations.push('Translation services');
        }

        if (data.volunteerType === 'counseling' || data.medicalBackground === 'none') {
            recommendations.push('Patient support & counseling');
        }

        return recommendations.length > 0 ?
            `Suggested roles: ${recommendations.join(', ')}` :
            'General volunteer assignments';
    }

    // Generate automated response for contact form
    generateContactResponse(category, subject) {
        const responses = {
            emergency: {
                title: 'URGENT RESPONSE REQUIRED',
                message: `Your query about "${subject}" has been flagged as urgent. Our emergency team will contact you within 15 minutes. Please ensure you are in a safe location.`,
                priority: 'HIGH',
                followUp: 'Immediate phone call'
            },
            medical: {
                title: 'MEDICAL QUERY RECEIVED',
                message: `Your medical question about "${subject}" has been received. Our medical team will review and respond within 2 hours. Please monitor symptoms.`,
                priority: 'MEDIUM',
                followUp: 'Email response within 2 hours'
            },
            mental: {
                title: 'MENTAL HEALTH SUPPORT',
                message: `Thank you for reaching out about "${subject}". Our mental health support team will contact you within 24 hours. You're not alone.`,
                priority: 'HIGH',
                followUp: 'Counselor appointment scheduling'
            },
            general: {
                title: 'QUERY RECEIVED',
                message: `We've received your query about "${subject}". Our team will respond within 24 hours. Thank you for contacting us.`,
                priority: 'LOW',
                followUp: 'Standard email response'
            }
        };

        return responses[category] || responses.general;
    }

    // Simulate AI processing delay
    simulateAIProcessing() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    success: true,
                    timestamp: new Date().toISOString(),
                    processingTime: Math.random() * 1000 + 500 // 500-1500ms
                });
            }, Math.random() * 1000 + 500);
        });
    }
}

export default new AIService();