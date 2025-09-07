# Iron Lady Leadership Chatbot

A full-stack chatbot application for Iron Lady's leadership programs with React frontend, Node.js backend, and Groq AI integration.
![alt text](https://github.com/VaishnaviBarge/iron-lady-chatbot/blob/main/iron-lady-chatbot.png?raw=true)

##  Features

- **Smart FAQ System**: Instant answers about programs, duration, certification, mentors
- **Groq AI Integration**: Intelligent responses powered by LLaMA 3 model
- **Modern UI**: Clean, responsive chat interface built with React and Tailwind CSS
- **Quick Questions**: Pre-built buttons for common inquiries
- **Real-time Chat**: Smooth messaging experience with typing indicators
- **Comprehensive Knowledge Base**: Detailed information about all leadership programs

##  Tech Stack

**Frontend:**
- React.js with functional components and hooks
- Tailwind CSS for styling
- Lucide React for icons

**Backend:**
- Node.js with Express.js
- Groq SDK for AI integration
- CORS enabled for cross-origin requests

##  Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Groq API key (free at https://console.groq.com/)

##  Installation & Setup

### 1. Clone or Create Project Structure

```
iron-lady-chatbot/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    └── (React app with the chatbot component)
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### 3. Configure Environment Variables

Edit `.env` file:
```bash
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
NODE_ENV=development
```

**Getting Groq API Key:**
1. Go to https://console.groq.com/
2. Sign up for free account
3. Navigate to API Keys section
4. Create new API key
5. Copy and paste into .env file

### 4. Start Backend Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:5000

### 5. Frontend Setup

The React component provided can be integrated into any React application. Make sure your React app has Tailwind CSS configured.

**For new React app:**
```bash
npx create-react-app frontend
cd frontend
npm install -D tailwindcss
npx tailwindcss init
```

##  Testing the Application

### Backend API Endpoints

1. **Health Check:**
   ```
   GET http://localhost:5000/health
   ```

2. **Chat Endpoint:**
   ```
   POST http://localhost:5000/api/chat
   Content-Type: application/json

   {
     "message": "What programs do you offer?"
   }
   ```

3. **Programs Data:**
   ```
   GET http://localhost:5000/api/programs
   ```

### Example Queries to Test

- "What programs do you offer?"
- "How long are the courses?"
- "Do you provide certifications?"
- "Who are the mentors?"
- "What's the cost of the Executive Leadership program?"
- "Is there online learning available?"

## 📚 Program Information

The chatbot knows about these leadership programs:

1. **Executive Leadership Mastery**
   - Duration: 12 weeks
   - Mode: Hybrid (Online + Weekend Workshops)
   - Price: $2,999
   - Certification: Certified Executive Leader (CEL)

2. **Strategic Leadership Foundation**
   - Duration: 8 weeks
   - Mode: Fully Online
   - Price: $1,799
   - Certification: Strategic Leadership Certificate

3. **Women in Leadership Accelerator**
   - Duration: 16 weeks
   - Mode: Hybrid
   - Price: $3,499
   - Certification: Advanced Women Leadership Certificate

4. **Team Management Excellence**
   - Duration: 6 weeks
   - Mode: Online
   - Price: $1,299
   - Certification: Team Management Professional

##  AI Integration Details

The chatbot uses a three-tier response system:

1. **FAQ Pattern Matching**: Instant responses for common questions
2. **Groq AI Processing**: Intelligent responses using LLaMA 3 model
3. **Fallback Responses**: Graceful handling when services are unavailable

## 🔧 Customization Options

### Adding New Programs
Edit the `programsKnowledgeBase` object in `server.js`:

```javascript
programs: [
  {
    name: "New Program Name",
    duration: "X weeks",
    mode: "Online/Hybrid",
    certification: "Certificate Name",
    // ... other fields
  }
]
```

### Modifying AI Behavior
Update the system prompt in the Groq integration section:

```javascript
{
  role: "system",
  content: "Your custom system prompt here..."
}
```

### Styling Changes
The React component uses Tailwind CSS classes. Modify the className attributes to change the appearance.

## 📈 Potential Enhancements

- Add user authentication
- Implement conversation history
- Add voice input/output
- Create admin dashboard for program management
- Add analytics and user behavior tracking
- Implement multilingual support


### Code Standards
- **ES6+** JavaScript features
- **Functional components** with React Hooks
- **Async/await** for API calls
- **Error boundaries** for React components
- **Input validation** for security

## 📚 Learning Resources

### Technologies Used
- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide)
- [Groq API Documentation](https://console.groq.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📧 Contact & Support

- **Email**: vaishnavibarge0@gmail.com
- **LinkedIn**: www.linkedin.com/in/vaishnavi-barge

