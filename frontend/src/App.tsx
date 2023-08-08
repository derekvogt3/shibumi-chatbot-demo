// pages/chatbot.tsx

import { useState } from 'react';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Message = {
  type: 'user' | 'bot';
  content: string;
};

function sendChat(query: string): Promise<any> {
  // Define the endpoint URL
  const apiUrl = 'http://localhost:5050/chat';

  // Send the POST request
  return fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query })  // Convert the query object to JSON string
  })
  .then(response => {
      // Check if the request was successful
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();  // Parse the response body as JSON
  });
}


export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    setIsLoading(true);
    if (input.trim()) {
      setMessages([...messages, { type: 'user', content: input.trim() }]);
      sendChat(input)
        .then(data => {
          const botMessage = data.message;
          setMessages(prevMessages => [...prevMessages, { type: 'bot', content: botMessage }]);  
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });

      setInput('');
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Demo Shibumi Chatbot
      </Typography>
      <Paper elevation={3} style={{ height: '500px', width: '80%', overflowY: 'auto', padding: '20px' }}>
      {messages.map((message, index) => (
        <div 
          key={index} 
          style={{
            display: 'flex',
            justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '10px'
          }}
        >
          <Typography 
            align="left" 
            style={{ 
              whiteSpace: 'pre-line',
              padding: '10px 15px',
              borderRadius: '20px',
              background: message.type === 'user' ? '#0f7adf' : '#e5e5ea',
              color: message.type === 'user' ? 'white' : 'black',
              maxWidth: '70%',
              wordBreak: 'break-word'
            }}
          >
            {message.content}
          </Typography>
        </div>
      ))}
      {isLoading && (
        <Typography align="left" style={{ padding: '10px 15px', borderRadius: '20px', background: '#e5e5ea' }}>
          ...
        </Typography>
      )}
      </Paper>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <TextField
          variant="outlined"
          fullWidth
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </Container>
  );
}

