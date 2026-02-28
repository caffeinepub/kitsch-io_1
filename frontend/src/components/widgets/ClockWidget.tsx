import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className="glossy-card rounded-2xl p-3 text-center min-w-[120px] shadow-kitsch">
      <div className="flex items-center justify-center gap-1 mb-1">
        <Clock size={10} className="text-hotpink" />
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Clock</span>
      </div>
      <div className="font-mono text-lg font-bold text-hotpink leading-none">
        {hours}:{minutes}
      </div>
      <div className="font-mono text-xs text-muted-foreground">{seconds}s</div>
      <div className="text-[9px] text-muted-foreground mt-1">
        {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </div>
    </div>
  );
}
