import { useState, useEffect } from 'react';

const moods = [
  { emoji: '✨', label: 'Sparkling', color: 'bg-gold/20' },
  { emoji: '💖', label: 'Loving', color: 'bg-hotpink/20' },
  { emoji: '🌸', label: 'Blooming', color: 'bg-bubblegum/30' },
  { emoji: '🎮', label: 'Gaming', color: 'bg-lavender/20' },
  { emoji: '🎵', label: 'Vibing', color: 'bg-lime/20' },
  { emoji: '😴', label: 'Sleepy', color: 'bg-aqua/20' },
  { emoji: '🔥', label: 'On Fire', color: 'bg-hotpink/30' },
  { emoji: '🌙', label: 'Dreamy', color: 'bg-lavender/30' },
];

const MOOD_KEY = 'kitsch-io-mood';

export default function MoodBoardWidget() {
  const [currentMood, setCurrentMood] = useState(() => {
    try {
      const saved = localStorage.getItem(MOOD_KEY);
      return saved ? JSON.parse(saved) : moods[0];
    } catch {
      return moods[0];
    }
  });
  const [showPicker, setShowPicker] = useState(false);

  const selectMood = (mood: typeof moods[0]) => {
    setCurrentMood(mood);
    localStorage.setItem(MOOD_KEY, JSON.stringify(mood));
    setShowPicker(false);
  };

  return (
    <div className="glossy-card rounded-2xl p-3 text-center min-w-[120px] shadow-kitsch relative">
      <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Mood</div>
      <button
        onClick={() => setShowPicker(!showPicker)}
        className={`w-full rounded-xl py-1.5 ${currentMood.color} transition-all hover:scale-105`}
      >
        <div className="text-2xl">{currentMood.emoji}</div>
        <div className="text-[9px] font-bold text-foreground">{currentMood.label}</div>
      </button>

      {showPicker && (
        <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-kitsch-lg border border-hotpink/20 p-2 grid grid-cols-4 gap-1 z-50 w-40">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => selectMood(mood)}
              className={`rounded-lg p-1.5 ${mood.color} hover:scale-110 transition-transform text-center`}
              title={mood.label}
            >
              <div className="text-base">{mood.emoji}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
