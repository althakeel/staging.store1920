import React, { useState, useEffect, useRef } from 'react';
import ChatBotIcon from '../../assets/images/chatbot/chatbot.png';

const ChatBot = () => {
  const API_URL = 'https://db.store1920.com/wp-json/ai-chatbot/v1/chat';

  const [open, setOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: '👋 Hello! I’m your AI assistant. Ask me about any product or category. 💡 Try: "شامبو", "serum", or "مرطب"',
    },
  ]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);
  const chatWindowRef = useRef(null); // Ref for detecting outside click

  const funnyReplies = [
    "😅 Hmm, that sounds like something only a cat would understand!",
    "😂 I wish I knew that… maybe one day AI will!",
    "🤔 I think my circuits are confused. Can you try something else?",
    "😎 Did you just invent a new word? Impressive!",
    "🤖 Beep boop… I have no clue about that, but I like your style!",
    "🙃 I'm not sure about that, but I can show you some cool products!",
    "💡 Fun fact: Asking me random stuff doesn’t always break me!",
    "🎯 You missed the target, but let’s try again!",
    "🍕 I’d recommend pizza, but maybe you meant shampoo?",
    "🐱 Meow! I mean… I don’t understand that either!"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowIcon(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, typing]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  if (isMobile) return null;

  const toggleChat = () => {
    setOpen(prev => !prev);
    if (!open) {
      setInput('');
      setMessages([
        {
          from: 'bot',
          text: '👋 Hello! I’m your AI assistant. Ask me about any product or category. 💡 Try: "شامبو", "serum", or "مرطب"',
        },
      ]);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    setTyping(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setTyping(false);

      if (data.error) {
        setMessages(prev => [...prev, { from: 'bot', text: '❌ Oops! ' + data.error }]);
        setLoading(false);
        return;
      }

      if (data.intent === 'redirect_category' && data.categorySlug) {
        setMessages(prev => [...prev, { from: 'bot', text: `Redirecting to category: ${data.categorySlug}...` }]);
        setTimeout(() => {
          window.location.href = `https://store1920.com/product-category/${data.categorySlug}`;
        }, 1500);
        setLoading(false);
        return;
      }

      if (data.intent === 'redirect_product' && data.productSlug) {
        setMessages(prev => [...prev, { from: 'bot', text: `Redirecting to product: ${data.productSlug}...` }]);
        setTimeout(() => {
          window.open(`https://store1920.com/product/${data.productSlug}`, '_blank');
        }, 1500);
        setLoading(false);
        return;
      }

      if (data.products && data.products.length > 0) {
        setMessages(prev => [
          ...prev,
          { from: 'bot', text: 'Here are some products you might like:', products: data.products },
        ]);
      } else {
        const randomReply = funnyReplies[Math.floor(Math.random() * funnyReplies.length)];
        setMessages(prev => [...prev, { from: 'bot', text: randomReply }]);
      }
    } catch (e) {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: '❌ Something went wrong. Please try again later.' }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) sendMessage();
  };

  const renderProducts = (products) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 10 }}>
      {products.map(p => {
        const fixedUrl = p.url.replace('https://db.store1920.com', 'https://store1920.com');
        return (
          <div
            key={p.id}
            onClick={() => window.open(fixedUrl, '_blank')}
            style={{
              cursor: 'pointer',
              width: '48%',
              backgroundColor: '#f0f4f8',
              borderRadius: 12,
              padding: 10,
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                style={{ width: '100%', height: 100, objectFit: 'contain', borderRadius: 8 }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 100,
                  backgroundColor: '#ffe0b2',
                  borderRadius: 8,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#bf360c',
                  fontWeight: '600',
                  fontSize: 14,
                }}
              >
                No Image
              </div>
            )}
            <div
              style={{
                marginTop: 8,
                color: '#e65100',
                fontWeight: '700',
                fontSize: 14,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
              }}
            >
              {p.name}
            </div>
            <button
              onClick={e => { e.stopPropagation(); window.open(fixedUrl, '_blank'); }}
              style={{
                marginTop: 6,
                backgroundColor: '#e65100',
                color: '#fff',
                border: 'none',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 13,
                cursor: 'pointer',
                width: '100%',
                fontWeight: '600',
              }}
            >
              View Product
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: 50,
            right: 24,
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
            display: showIcon ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 0,
            transform: showIcon ? 'translateY(0)' : 'translateY(100px)',
            opacity: showIcon ? 1 : 0,
            transition: 'all 0.6s ease-out',
          }}
        >
          <img
            src={ChatBotIcon}
            alt="ChatBot"
            style={{ width: '70%', height: '70%', objectFit: 'contain' }}
          />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          ref={chatWindowRef}
          style={{
            position: 'fixed',
            bottom: 50,
            right: 24,
            width: '90vw',
            maxWidth: 420,
            height: 520,
            borderRadius: 20,
            boxShadow: '0 14px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: '#000',
            zIndex: 9999,
            backgroundColor: '#fff',
            animation: 'slideUp 0.5s ease-out',
          }}
        >
          <style>
            {`
              @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}
          </style>

          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: '#e65100',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
            }}
          >
            ×
          </button>

          {/* Messages */}
          <div
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: 16,
              borderRadius: '20px 20px 0 0',
              backgroundColor: '#fff',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 14,
                  flexDirection: 'column',
                  alignItems: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'fadeIn 0.3s',
                }}
              >
                <div
                  style={{
                    maxWidth: '75%',
                    backgroundColor: msg.from === 'user' ? '#ff8f00' : '#f5f5f5',
                    color: msg.from === 'user' ? 'white' : '#333',
                    padding: '14px 20px',
                    borderRadius: 25,
                    fontSize: 15,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                  {msg.products && renderProducts(msg.products)}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ color: '#555', fontStyle: 'italic', marginBottom: 10 }}>
                🤖 AI is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              borderRadius: '0 0 20px 20px',
              boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.05)',
              backgroundColor: '#fff',
            }}
          >
            <input
              type="text"
              placeholder={loading ? 'Loading...' : 'Ask me anything about products...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              autoFocus
              style={{
                flexGrow: 1,
                padding: '14px 20px',
                fontSize: 16,
                borderRadius: 9999,
                border: '1px solid #ffd54f',
                outline: 'none',
                marginRight: 14,
                color: '#4e342e',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                backgroundColor: loading || !input.trim() ? '#ffffffff' : '#e67b3eff',
                color: '#4e342e',
                border: 'none',
                borderRadius: '50%',
                width: 46,
                height: 46,
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
