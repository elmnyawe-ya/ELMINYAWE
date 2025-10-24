
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { AIMessage } from '../types';
import { getAIChatResponse, getAvailableModels } from '../services/aiService';
import { Button } from '../components/ui/Button';

// highlight.js is loaded via CDN
declare const hljs: any;

// Get models from AI service
const models = getAvailableModels();

const useTypingEffect = (text: string, speed = 30) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText(''); // Reset on new text
        if (text) {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
                if (i > text.length -1) {
                    clearInterval(intervalId);
                }
            }, speed);
            return () => clearInterval(intervalId);
        }
    }, [text, speed]);

    return displayedText;
}

const ChatMessage: React.FC<{ message: AIMessage }> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  const displayedContent = isAssistant ? useTypingEffect(message.content) : message.content;

  useEffect(() => {
    // Highlight after the typing effect is complete
    if (displayedContent.length === message.content.length) {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
  }, [displayedContent, message.content]);

  const renderContent = () => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = displayedContent.split(codeBlockRegex);

    return parts.map((part, index) => {
        if (index % 3 === 2) { // Code block
            const lang = parts[index - 1] || 'plaintext';
            return (
              <pre key={index} className="bg-black/70 rounded-md my-2"><code className={`language-${lang}`}>{part}</code></pre>
            );
        }
        if (index % 3 === 0 && part) { // Regular text
            return <span key={index} className="whitespace-pre-wrap">{part}</span>;
        }
        return null;
    });
  }

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-lg ${
        message.role === 'user' 
          ? 'bg-neon-red text-white shadow-red-glow' 
          : 'bg-card border border-neon-red/20 text-foreground holographic-card'
      }`}>
         <div className="prose prose-invert prose-sm max-w-none">
            {renderContent()}
            {isAssistant && displayedContent.length !== message.content.length && <span className="inline-block w-2 h-4 bg-neon-red animate-glow-pulse ml-1" />}
        </div>
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState(models[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const newMessages: AIMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIChatResponse(newMessages, model);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, an error occurred in the simulation." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-black/50 border-2 border-neon-red/30 rounded-lg overflow-hidden holographic-border animate-fade-in">
      <div className="p-4 border-b-2 border-neon-red/30 bg-black/80">
        <div className="flex justify-between items-center">
             <h1 className="text-2xl font-bold text-neon-red glow-text">{t('chat_title', 'AI Chat')}</h1>
             <details className="relative">
                <summary className="text-sm text-muted-foreground cursor-pointer list-none flex items-center gap-2 hover:text-neon-red transition">
                    <span>{models.find(m => m.id === model)?.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </summary>
                <div className="absolute right-0 mt-2 w-64 bg-black border-2 border-neon-red/30 rounded-md shadow-red-glow z-10">
                     <div className="p-2">
                        <label htmlFor="model-select" className="block text-sm font-medium text-neon-red mb-1 px-2 glow-text-subtle">{t('model', 'Model')}</label>
                        <select id="model-select" value={model} onChange={e => setModel(e.target.value)} className="w-full px-3 py-2 bg-background border border-neon-red/30 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-neon-red transition">
                            {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                    </div>
                </div>
            </details>
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto space-y-4 scan-lines">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-lg bg-card border border-neon-red/20 text-muted-foreground animate-glow-pulse">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t-2 border-neon-red/30 bg-black/80">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('type_message', 'Type your message...')}
            className="flex-grow px-4 py-2 bg-background border-2 border-neon-red/30 rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-red transition"
          />
          <Button onClick={handleSend} disabled={isLoading} size="lg">
            {t('send', 'Send')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
