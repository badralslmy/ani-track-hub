
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

export default function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        // العد التنازلي انتهى
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onComplete?.();
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  // تنسيق الأرقام ليكون دائما من خانتين
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.days)}</div>
        <div className="text-xs text-white/80">أيام</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.hours)}</div>
        <div className="text-xs text-white/80">ساعات</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-xs text-white/80">دقائق</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-xs text-white/80">ثواني</div>
      </div>
    </div>
  );
}
