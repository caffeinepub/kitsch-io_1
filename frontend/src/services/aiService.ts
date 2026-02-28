import type { ChatMessage } from '../hooks/useChat';

const API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3';

const SYSTEM_PROMPT = `You are Kitschy, a fun, helpful, and cute AI assistant for Kitsch-io — a Y2K-inspired entertainment platform with games, music, movies, anime, K-drama, J-drama, and C-drama. You have a bubbly, friendly personality. Use occasional emojis (✨💖🌸🎮🎵🎬) but keep responses concise and helpful. You help users find content, answer questions about shows/games/music, and provide general assistance.`;

export async function sendMessage(
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  // Build conversation context
  const recentHistory = history.slice(-6);
  let prompt = `<s>[INST] ${SYSTEM_PROMPT}\n\n`;

  for (const msg of recentHistory) {
    if (msg.role === 'user') {
      prompt += `User: ${msg.content}\n`;
    } else if (msg.role === 'assistant' && msg.id !== '0') {
      prompt += `Kitschy: ${msg.content}\n`;
    }
  }

  prompt += `User: ${userMessage} [/INST]`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      // Fallback to a simpler model if main one fails
      return await fallbackResponse(userMessage);
    }

    const data = await response.json();

    if (Array.isArray(data) && data[0]?.generated_text) {
      let text = data[0].generated_text.trim();
      // Clean up any leftover instruction tokens
      text = text.replace(/\[INST\].*?\[\/INST\]/gs, '').trim();
      text = text.replace(/^(Kitschy:|Assistant:)/i, '').trim();
      return text || fallbackResponse(userMessage);
    }

    return await fallbackResponse(userMessage);
  } catch {
    return await fallbackResponse(userMessage);
  }
}

async function fallbackResponse(userMessage: string): Promise<string> {
  const lower = userMessage.toLowerCase();

  if (lower.includes('game') || lower.includes('play')) {
    return "I love games! 🎮 Head over to our Games page to find 1000+ free games across all genres — action, puzzle, RPG, arcade and more! ✨";
  }
  if (lower.includes('music') || lower.includes('song') || lower.includes('listen')) {
    return "Music time! 🎵 Check out our Music page for tons of public domain and Creative Commons tracks across all genres. You can listen right in your browser! 💖";
  }
  if (lower.includes('movie') || lower.includes('film') || lower.includes('watch')) {
    return "Movie night! 🎬 Our Movies page has a great collection of public domain films you can watch for free. From classics to hidden gems! ✨";
  }
  if (lower.includes('anime')) {
    return "Anime fan! 🌸 Check out our Anime page for a curated list of shows with watch links. So many great series to discover! ✨";
  }
  if (lower.includes('drama') || lower.includes('kdrama') || lower.includes('k-drama')) {
    return "Drama lover! 💕 We have dedicated pages for K-Drama, J-Drama, and C-Drama! Each has curated shows with descriptions and watch links. 🌸";
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Heyy! 💖 So glad you're here! I'm Kitschy, your Kitsch-io guide. Ask me anything about our content — games, music, movies, anime, dramas — or just chat! ✨";
  }
  if (lower.includes('help')) {
    return "Of course! 💕 I can help you find games 🎮, music 🎵, movies 🎬, anime 🌸, or dramas! I can also tell you about our personalization features. What are you looking for? ✨";
  }
  if (lower.includes('personali') || lower.includes('background') || lower.includes('widget')) {
    return "Ooh, love the customization spirit! 🎨 Head to the Personalize page to change your background and add widgets like a clock, mood board, and more! ✨";
  }

  return `Great question! ✨ I'm here to help you explore Kitsch-io's amazing content — games 🎮, music 🎵, movies 🎬, anime 🌸, and dramas! What would you like to discover today? 💖`;
}
