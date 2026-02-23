import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { queryAuri } from './api/auriApi';
import { PRODUCT_OPTIONS } from './data/demoData';

const SUGGESTED_QUESTIONS = [
  "What are the top field insights about biosimilar switching readiness?",
  "Summarize competitive threats from oral complement inhibitors",
  "Which KOLs are most aligned with our C5 franchise?",
  "Show me the latest publications from PubMed for this product",
  "What active clinical trials are running right now?",
  "What are the landmark pivotal trials for our complement franchise?",
  "What's the sentiment trend on breakthrough hemolysis management?",
  "Tell me about the pipeline — gefurulimab, Voydeya, and emerging assets",
];

function AuriChat({ selectedProduct }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const productName = PRODUCT_OPTIONS.find(p => p.id === selectedProduct)?.name;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [selectedProduct]);

  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage = { role: 'user', content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await queryAuri(newMessages, selectedProduct);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `I encountered an error processing your request. Please try again.\n\n*Error: ${err.message}*` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-fade-in">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 bg-auri-blue/20 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-auri-blue" />
            </div>
            <h2 className="text-2xl font-semibold text-auri-white mb-2 font-michroma">Auri Intelligence</h2>
            <p className="text-auri-gray mb-8 max-w-lg">
              AI-powered medical affairs intelligence for Alexion's complement franchise.
              Currently viewing <span className="text-auri-blue font-medium">{productName}</span> context.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
              {SUGGESTED_QUESTIONS.map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(question)}
                  className="text-left px-4 py-3 bg-auri-dark border border-auri-gray/20 rounded-lg text-sm text-auri-gray hover:text-auri-white hover:border-auri-blue/30 hover:bg-auri-blue/5 transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-auri-blue/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-auri-blue" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-lg px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-auri-blue text-white'
                  : 'bg-auri-dark border border-auri-gray/20 text-auri-white'
              }`}>
                {msg.role === 'assistant' ? (
                  <div className="chat-message text-sm leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-auri-gray/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={16} className="text-auri-gray" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-auri-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-auri-blue" />
            </div>
            <div className="bg-auri-dark border border-auri-gray/20 rounded-lg px-4 py-3">
              <Loader2 size={16} className="text-auri-blue animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-auri-gray/20 pt-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask Auri about ${productName}, competitors, KOLs, or strategic insights...`}
              rows={1}
              className="w-full px-4 py-3 bg-auri-dark border border-auri-gray/30 rounded-lg text-sm text-auri-white placeholder:text-auri-gray/60 focus:outline-none focus:border-auri-blue/50 resize-none"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-4 py-3 bg-auri-blue rounded-lg hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
        <div className="text-xs text-auri-gray/40 mt-2 text-center">
          Auri uses AI to generate insights. Verify critical information with primary sources.
        </div>
      </div>
    </div>
  );
}

export default AuriChat;
