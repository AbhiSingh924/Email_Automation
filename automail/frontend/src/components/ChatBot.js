import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: input }],
        }),
      });

      const data = await response.json();

      const botMessage = {
        sender: 'bot',
        text: data.choices?.[0]?.message?.content || 'No response received.',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with OpenRouter:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'Sorry, I am unable to process your request at the moment.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput('');
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" className="mt-2" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
};

export default ChatBot;
