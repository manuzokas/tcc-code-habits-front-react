interface TimerDisplayProps {
  elapsedSeconds: number;
}

export const TimerDisplay = ({ elapsedSeconds }: TimerDisplayProps) => {
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <span className="font-mono text-lg text-yellow-300">
      {formatTime(elapsedSeconds)}
    </span>
  );
};
