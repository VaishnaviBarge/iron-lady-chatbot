const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());


const programsKnowledgeBase = {
  programs: [
    {
      name: "Executive Leadership Mastery",
      duration: "12 weeks",
      mode: "Hybrid (Online + Weekend Workshops)",
      certification: "Certified Executive Leader (CEL)",
      mentors: "Former Fortune 500 CEOs and Industry Veterans",
      description: "Comprehensive leadership program focusing on strategic thinking, decision making, and team management.",
      price: "$2,999",
      schedule: "Flexible online modules + 3 weekend intensives"
    },
    {
      name: "Strategic Leadership Foundation",
      duration: "8 weeks",
      mode: "Fully Online",
      certification: "Strategic Leadership Certificate",
      mentors: "Senior Corporate Leaders and Consultants",
      description: "Foundation course covering leadership fundamentals and strategic planning.",
      price: "$1,799",
      schedule: "Self-paced with weekly live sessions"
    },
    {
      name: "Women in Leadership Accelerator",
      duration: "16 weeks",
      mode: "Hybrid",
      certification: "Advanced Women Leadership Certificate",
      mentors: "Successful Female Executives and Entrepreneurs",
      description: "Specialized program addressing unique challenges faced by women in leadership roles.",
      price: "$3,499",
      schedule: "Weekly cohort sessions + monthly workshops"
    },
    {
      name: "Team Management Excellence",
      duration: "6 weeks",
      mode: "Online",
      certification: "Team Management Professional",
      mentors: "HR Directors and Team Building Experts",
      description: "Intensive course on building high-performing teams and managing diverse groups.",
      price: "$1,299",
      schedule: "Intensive 6-week sprint format"
    }
  ],
  generalInfo: {
    company: "Iron Lady Leadership Academy",
    founded: "2015",
    students: "10,000+ graduates",
    satisfaction: "96% satisfaction rate",
    support: "24/7 student support",
    networking: "Exclusive alumni network",
    resources: "Lifetime access to course materials"
  }
};

// Function to get contextual response using FAQ data
function getFAQResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Program-specific responses
  if (lowerMessage.includes('program') || lowerMessage.includes('course')) {
    return `We offer ${programsKnowledgeBase.programs.length} flagship programs:
    
1. Executive Leadership Mastery - 12 weeks, Hybrid format
2. Strategic Leadership Foundation - 8 weeks, Online
3. Women in Leadership Accelerator - 16 weeks, Hybrid
4. Team Management Excellence - 6 weeks, Online

Each program includes mentorship, certification, and lifetime access to materials. Which program interests you most?`;
  }

  if (lowerMessage.includes('duration') || lowerMessage.includes('long') || lowerMessage.includes('time')) {
    return `Our program durations vary:
- Executive Leadership Mastery: 12 weeks
- Women in Leadership Accelerator: 16 weeks  
- Strategic Leadership Foundation: 8 weeks
- Team Management Excellence: 6 weeks

All programs are designed to fit around your work schedule with flexible timing options.`;
  }

  if (lowerMessage.includes('mentor') || lowerMessage.includes('instructor')) {
    return `Our mentors are industry leaders:
- Former Fortune 500 CEOs and executives
- Successful female entrepreneurs and leaders
- Senior corporate strategists and consultants
- HR directors and team building experts

Each student gets personal mentorship and access to our exclusive network of ${programsKnowledgeBase.generalInfo.students} graduates.`;
  }

  if (lowerMessage.includes('certification') || lowerMessage.includes('certificate')) {
    return `Yes! We provide industry-recognized certifications:
- Certified Executive Leader (CEL)
- Strategic Leadership Certificate
- Advanced Women Leadership Certificate  
- Team Management Professional

All certifications include digital badges for LinkedIn and lifetime verification.`;
  }

  if (lowerMessage.includes('mode') || lowerMessage.includes('online') || lowerMessage.includes('format')) {
    return `We offer flexible learning modes:
- Fully Online: Self-paced with live weekly sessions
- Hybrid: Online modules + weekend workshops
- Intensive Formats: Accelerated learning options

All programs include 24/7 platform access and recorded sessions for your convenience.`;
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
    return `Our program pricing:
- Team Management Excellence: $1,299
- Strategic Leadership Foundation: $1,799
- Executive Leadership Mastery: $2,999
- Women in Leadership Accelerator: $3,499

We offer payment plans and corporate discounts. All programs include lifetime access to materials and ongoing support.`;
  }

  if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
    return `We provide comprehensive support:
- 24/7 student support team
- Personal mentorship sessions
- Peer learning groups
- Technical assistance
- Career guidance and networking

Our ${programsKnowledgeBase.generalInfo.satisfaction} satisfaction rate reflects our commitment to student success!`;
  }

  return null;
}

// API Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Iron Lady Leadership Chatbot API',
    status: 'active',
    version: '1.0.0'
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // First try to get FAQ response
    const faqResponse = getFAQResponse(message);
    
    if (faqResponse) {
      return res.json({ response: faqResponse });
    }

    // If no FAQ match, use Groq AI for more intelligent responses
    if (process.env.GROQ_API_KEY) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant for Iron Lady Leadership Academy. You help people learn about our leadership programs. Here's our program information:

Programs:
1. Executive Leadership Mastery (12 weeks, Hybrid, $2,999) - For senior leaders
2. Strategic Leadership Foundation (8 weeks, Online, $1,799) - Foundation course  
3. Women in Leadership Accelerator (16 weeks, Hybrid, $3,499) - For women leaders
4. Team Management Excellence (6 weeks, Online, $1,299) - Team management focus

All programs include:
- Industry expert mentors (Fortune 500 CEOs, successful entrepreneurs)
- Professional certification
- 24/7 support
- Lifetime access to materials
- Alumni network of 10,000+ graduates
- 96% satisfaction rate

Keep responses helpful, professional, and focused on our leadership programs. If asked about topics outside our programs, politely redirect to our offerings.`
            },
            {
              role: "user",
              content: message
            }
          ],
          model: "llama-3.1-8b-instant",
          temperature: 0.7,
          max_tokens: 300,
        });

        const aiResponse = completion.choices[0]?.message?.content || "I'd be happy to help you learn about our leadership programs. What specific information are you looking for?";
        
        return res.json({ response: aiResponse });
      } catch (groqError) {
        console.error('Groq API error:', groqError);
        // Fall back to default response if Groq fails
      }
    }

    // Fallback response when no FAQ match and no AI available
    res.json({ 
      response: `Thank you for your question about "${message}". I'd be happy to help you learn about Iron Lady's leadership programs! We offer comprehensive leadership training with expert mentors, industry certifications, and flexible learning formats. 

      Our flagship programs include Executive Leadership Mastery (12 weeks), Strategic Leadership Foundation (8 weeks), Women in Leadership Accelerator (16 weeks), and Team Management Excellence (6 weeks).

Could you ask me something specific about program details, duration, certification, mentors, or pricing?`
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      response: 'I apologize for the technical difficulty. Please try asking about our leadership programs, mentors, certifications, or course duration.'
    });
  }
});

// Get all programs endpoint
app.get('/api/programs', (req, res) => {
  res.json(programsKnowledgeBase);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    groqEnabled: !!process.env.GROQ_API_KEY
  });
});

app.listen(PORT, () => {
  console.log(` Iron Lady Chatbot Server running on port ${PORT}`);
  console.log(` Groq AI integration: ${process.env.GROQ_API_KEY ? ' Enabled' : ' Disabled (set GROQ_API_KEY)'}`);
});

module.exports = app;