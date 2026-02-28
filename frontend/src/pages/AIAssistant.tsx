import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, User, Loader2 } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function AIAssistant() {
  const { messages, isLoading, send, clearHistory } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    await send(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            {avatarError ? (
              <div className="w-16 h-16 rounded-full bg-hotpink/10 border-4 border-hotpink/30 flex items-center justify-center text-3xl">
                🤖
              </div>
            ) : (
              <img
                src="/assets/generated/ai-avatar.dim_200x200.png"
                alt="Kitschy AI"
                className="w-16 h-16 rounded-full object-cover border-4 border-hotpink/30 shadow-glow"
                onError={() => setAvatarError(true)}
              />
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-lime rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-[8px]">✦</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-display text-hotpink">Kitschy AI ✨</h1>
            <p className="text-xs text-muted-foreground font-bold">Your cute entertainment companion</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-muted-foreground hover:text-destructive rounded-full"
        >
          <Trash2 size={16} className="mr-1" /> Clear
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm ${
              msg.role === 'user'
                ? 'bg-hotpink text-white'
                : 'bg-lavender/20 text-lavender-dark'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-hotpink text-white rounded-tr-sm'
                  : 'glossy-card rounded-tl-sm text-foreground'
              }`}
            >
              {msg.content}
              <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-muted-foreground'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-lavender/20 flex items-center justify-center">
              <Bot size={14} className="text-lavender-dark" />
            </div>
            <div className="glossy-card rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-hotpink" />
              <span className="text-sm text-muted-foreground">Kitschy is thinking...</span>
              <span className="animate-pulse">✨</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="glossy-card rounded-2xl p-3 flex gap-3 items-end">
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Kitschy anything... ✨"
          className="flex-1 resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[44px] max-h-32 text-sm"
          rows={1}
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="rounded-full bg-hotpink hover:bg-hotpink-dark text-white h-10 w-10 p-0 shrink-0 shadow-glow"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </Button>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mt-3">
        {['Find me a game 🎮', 'Recommend music 🎵', 'Classic movies 🎬', 'Best anime 🌸'].map(s => (
          <button
            key={s}
            onClick={() => { setInput(s); }}
            className="text-xs px-3 py-1.5 rounded-full bg-hotpink/10 text-hotpink font-bold hover:bg-hotpink/20 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
