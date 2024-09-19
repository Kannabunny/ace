document.getElementById('submit').addEventListener('click', function() {
    const userNameInput = document.getElementById('user_name');
    const userQuestion = userNameInput.value.trim();
    const imageUpload = document.getElementById('image_upload');
    const chatWindow = document.querySelector('.chat_window');

    if (userQuestion !== "" || imageUpload.files.length > 0) {
        // Display the user's message
        if (userQuestion !== "") {
            const userMessage = document.createElement('div');
            userMessage.className = 'user_message';
            userMessage.textContent = `You: ${userQuestion}`;
            chatWindow.appendChild(userMessage);

            // Generate a response based on the user's input
            generateResponse(userQuestion, chatWindow);
        }

        // Handle image uploads
        if (imageUpload.files.length > 0) {
            const file = imageUpload.files[0];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            // Check if the uploaded file is a JPG
            if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
                const reader = new FileReader();

                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    chatWindow.appendChild(img);

                    // Compliment the user's fashion choice based on the uploaded image
                    let botMessage = document.createElement('div');
                    botMessage.className = 'bot_message';

                    if (userQuestion.toLowerCase().includes('accessory') || userQuestion.toLowerCase().includes('accessories')) {
                        botMessage.textContent = `Hi! User: Those accessories really enhance your look! Consider layering them for added impact.`;
                    } else {
                        botMessage.textContent = `Hi! User: That looks fantastic! Consider pairing it with some bold accessories to make it pop.`;
                    }
                    
                    chatWindow.appendChild(botMessage);
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                };

                reader.readAsDataURL(file);
            } else {
                const botMessage = document.createElement('div');
                botMessage.className = 'bot_message';
                botMessage.textContent = `Hi! User: Please upload a JPG image so I can take a look!`;
                chatWindow.appendChild(botMessage);
            }
        }

        // Scroll to the bottom of the chat window
        chatWindow.scrollTop = chatWindow.scrollHeight;
        userNameInput.value = '';
        imageUpload.value = '';
    }
});

// Function to generate a fashion-related response based on user input
function generateResponse(userQuestion, chatWindow) {
    let response = '';

    // Simple keyword-based responses
    if (userQuestion.toLowerCase().includes('dress')) {
        response = 'Hi! User: A dress is always a timeless choice. Pair it with some statement accessories!';
    } else if (userQuestion.toLowerCase().includes('shoes')) {
        response = 'Hi! User: Shoes can make or break an outfit. Go for something bold to stand out!';
    } else if (userQuestion.toLowerCase().includes('jacket')) {
        response = 'Hi! User: A jacket is perfect for layering. Consider a leather jacket for an edgy look!';
    } else if (userQuestion.toLowerCase().includes('color')) {
        response = 'Hi! User: Playing with colors is so much fun! Try color-blocking for a vibrant look.';
    } else if (userQuestion.toLowerCase().includes('style')) {
        response = 'Hi! User: Everyone has their own style! What matters is how confident you feel in it.';
    } else if (userQuestion.toLowerCase().includes('accessory') || userQuestion.toLowerCase().includes('accessories')) {
        response = 'Hi! User: Accessories are key to personalizing your style. Layer necklaces or mix metals for a trendy look!';
    } else {
        response = 'Hi! User: That sounds great! I’m sure you’ll look amazing.';
    }

    // Display the bot's response
    const botMessage = document.createElement('div');
    botMessage.className = 'bot_message';
    botMessage.textContent = response;
    chatWindow.appendChild(botMessage);

    // Scroll to the bottom of the chat window
    chatWindow.scrollTop = chatWindow.scrollHeight;
}