import { useState, useCallback } from 'react';
import { sendMessage } from '../services/aiService';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Heyy bestie! ✨ I'm Kitschy, your AI companion! I'm here to help you find amazing content, answer questions, or just chat! What's on your mind? 💖",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(text.trim(), messages);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setError('Oops! Something went wrong. Try again? 💫');
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! I had a little glitch ✨ Could you try asking again? I promise I'll do better! 💕",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const clearHistory = useCallback(() => {
    setMessages([
      {
        id: '0',
        role: 'assistant',
        content: "Heyy bestie! ✨ I'm Kitschy, your AI companion! I'm here to help you find amazing content, answer questions, or just chat! What's on your mind? 💖",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  return { messages, isLoading, error, send, clearHistory };
}
