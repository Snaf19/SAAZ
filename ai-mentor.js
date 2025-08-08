// This script enables the AI Mentor to function as a conversational chatbot
// by integrating with the Gemini API to generate dynamic, relevant responses.

document.addEventListener('DOMContentLoaded', () => {
    const contentWrapper = document.getElementById('content-wrapper');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatForm = document.getElementById('chatForm');

    // Helper function to load user data from localStorage
    const getUserProfile = () => {
        const profile = localStorage.getItem('userProfile');
        return profile ? JSON.parse(profile) : null;
    };

    // Checks if the user is logged in and displays content accordingly
    const checkLoginStatus = () => {
        const currentUser = getUserProfile();
        if (currentUser) {
            contentWrapper.style.display = 'block';
        } else {
            contentWrapper.innerHTML = `
                <div class="not-logged-in-message" style="text-align: center; margin-top: 5rem;">
                    <p>You must be logged in to view this content.</p>
                    <button class="nav-button" id="loginRedirect">Login / Signup</button>
                </div>
            `;
            document.getElementById('loginRedirect').addEventListener('click', () => {
                document.getElementById('openLoginModal').click();
            });
        }
    };
    checkLoginStatus();

    // Sends a message to the chat window with a specific sender (user or AI)
    const sendMessage = (message, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    
    // Asynchronous function to call the generative model API
    const getAIResponse = async (userMessage) => {
        // Show a loading message while waiting for the API
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'chat-message ai-message loading';
        loadingMessage.innerHTML = '<p>The AI is thinking...</p>';
        chatMessages.appendChild(loadingMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // This is the fetch call to the generative model API
            const prompt = `You are a helpful and friendly AI assistant named SAAZ AI, created to support Pakistani students with their educational and career journeys. You can provide advice, information, and encouragement. Keep your answers concise and relevant. Respond to the user's question: "${userMessage}"`;
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };

            // The API key is now assigned directly as a string
            const apiKey = "AIzaSyC8zPHkorJtqVtALsvcP0B1Knpffps5YbA"; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const result = await response.json();
            
            chatMessages.removeChild(loadingMessage);
            
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
              const aiResponseText = result.candidates[0].content.parts[0].text;
              sendMessage(aiResponseText, 'ai');
            } else {
              sendMessage("I'm sorry, I couldn't generate a response. Please try again.", 'ai');
            }
        } catch (error) {
            console.error('Error fetching from API:', error);
            chatMessages.removeChild(loadingMessage);
            sendMessage("I'm sorry, something went wrong. Please try again later.", 'ai');
        }
    };

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        sendMessage(userMessage, 'user');
        chatInput.value = '';
        
        getAIResponse(userMessage);
    });
});
