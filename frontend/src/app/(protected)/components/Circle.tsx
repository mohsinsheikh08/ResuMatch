

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress = ({ percentage }: CircularProgressProps) => {
   
  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="56"
          stroke="#2A2E37"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="64"
          cy="64"
          r="56"
          stroke="#FF7F00"
          strokeWidth="8"
          fill="none"
          strokeDasharray={351.86}
          strokeDashoffset={351.86 - (percentage / 100) * 351.86}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-[#FF7F00]">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;