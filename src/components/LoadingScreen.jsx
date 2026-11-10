
import { useEffect, useState } from "react";
import { CarFront, Zap } from "lucide-react";

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 1, 100);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
        }

        return next;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#090909]">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0805] via-black to-[#100b0a]" />

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-600/10 blur-[130px] rounded-full" />

      {/* Racing Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-speed-line"
            style={{
              top: `${10 + i * 7}%`,
              width: `${100 + (i % 3) * 80}px`,
              animationDelay: `${i * 0.2}s`,
              left: `${i % 2 === 0 ? "100%" : "-300px"}`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xl px-6 flex flex-col items-center">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-500 shadow-lg shadow-orange-500/30">
            <CarFront size={28} className="text-white" />
          </div>

          <h1 className="text-3xl font-black text-white tracking-wide">
            Drive<span className="text-orange-500">Now</span>
          </h1>
        </div>

        {/* Racing Car */}
        <div className="relative w-full h-48 flex items-center justify-center">

          {/* Speed Glow */}
          <div className="absolute left-0 w-52 h-16 bg-orange-500/20 blur-2xl animate-pulse" />

          {/* Speed Lines */}
          <div className="absolute left-0 w-36 space-y-3">
            <div className="h-1 w-28 bg-orange-500/80 rounded-full animate-speed-line" />
            <div className="h-1 w-20 bg-red-500/70 rounded-full animate-speed-line delay-100" />
            <div className="h-1 w-32 bg-orange-400/60 rounded-full animate-speed-line delay-200" />
          </div>

          {/* Car */}
          <div className="relative z-10 animate-racing-car">

            <svg
              viewBox="0 0 420 180"
              className="w-80 sm:w-[420px] drop-shadow-[0_0_25px_rgba(249,115,22,0.5)]"
            >
              <defs>
                <linearGradient id="raceBody" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="50%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#7c2d12" />
                </linearGradient>
              </defs>

              {/* Car Body */}
              <path
                d="M25 120 L48 91 L111 80 L155 39 Q170 25 200 25 L278 25 Q302 25 322 54 L359 89 L395 103 L405 130 L405 142 L15 142 L15 126Z"
                fill="url(#raceBody)"
                stroke="#fdba74"
                strokeWidth="2"
              />

              {/* Windows */}
              <path
                d="M124 78 L162 39 Q172 30 198 30 L221 30 L221 78Z"
                fill="#171717"
                stroke="#fed7aa"
                strokeWidth="2"
              />

              <path
                d="M232 30 L278 30 Q297 30 312 55 L330 78 L232 78Z"
                fill="#171717"
                stroke="#fed7aa"
                strokeWidth="2"
              />

              {/* Racing Stripe */}
              <path
                d="M225 82 L340 82"
                stroke="#fff7ed"
                strokeWidth="4"
              />

              {/* Front Light */}
              <path
                d="M375 98 L400 107 L400 119 L370 112Z"
                fill="#fff7ed"
              />

              {/* Wheels */}
              <g className="animate-wheel" style={{ transformOrigin: "105px 137px" }}>
                <circle cx="105" cy="137" r="29" fill="#090909" stroke="#737373" strokeWidth="5" />
                <circle cx="105" cy="137" r="15" fill="#f97316" />
                <circle cx="105" cy="137" r="5" fill="#171717" />
                <path d="M105 122 V152 M90 137 H120 M95 127 L115 147 M115 127 L95 147" stroke="#fff" strokeWidth="3" />
              </g>

              <g className="animate-wheel" style={{ transformOrigin: "320px 137px" }}>
                <circle cx="320" cy="137" r="29" fill="#090909" stroke="#737373" strokeWidth="5" />
                <circle cx="320" cy="137" r="15" fill="#f97316" />
                <circle cx="320" cy="137" r="5" fill="#171717" />
                <path d="M320 122 V152 M305 137 H335 M310 127 L330 147 M330 127 L310 147" stroke="#fff" strokeWidth="3" />
              </g>
            </svg>
          </div>
        </div>

        {/* Road */}
        <div className="relative w-full h-3 mt-2 bg-neutral-800 rounded-full overflow-hidden border-y border-neutral-700">
          <div className="flex gap-10 w-max animate-road">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-1.5 bg-orange-400 rounded-full shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-2 text-orange-500 mb-3">
            <Zap size={18} />
            <span className="text-xs font-bold tracking-[5px]">
              FULL SPEED AHEAD
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            GET READY TO
            <span className="text-orange-500"> DRIVE</span>
          </h2>

          <p className="text-neutral-500 text-sm mt-3">
            Your dream car is just a moment away...
          </p>
        </div>

        {/* Progress */}
        <div className="w-full mt-12">
          <div className="flex justify-between mb-3 text-xs">
            <span className="text-neutral-400 tracking-widest font-semibold">
              ENGINE STARTING
            </span>

            <span className="text-orange-500 font-bold">
              {progress}%
            </span>
          </div>

          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <p className="mt-9 text-neutral-600 text-[10px] tracking-[4px]">
          DRIVE YOUR DREAMS WITH DRIVE EASE
        </p>

      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes racingCar {
          0%, 100% {
            transform: translateX(-12px) translateY(0);
          }
          50% {
            transform: translateX(12px) translateY(-4px);
          }
        }

        @keyframes wheelSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes roadMove {
          from { transform: translateX(0); }
          to { transform: translateX(-200px); }
        }

        @keyframes speedLine {
          from { transform: translateX(0); opacity: 0; }
          30% { opacity: 1; }
          to { transform: translateX(-350px); opacity: 0; }
        }

        .animate-racing-car {
          animation: racingCar 0.7s ease-in-out infinite;
        }

        .animate-wheel {
          animation: wheelSpin 0.4s linear infinite;
        }

        .animate-road {
          animation: roadMove 0.7s linear infinite;
        }

        .animate-speed-line {
          animation: speedLine 1.2s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-racing-car,
          .animate-wheel,
          .animate-road,
          .animate-speed-line {
            animation: none;
          }
        }
      `}</style>

    </div>
  );
}

export default LoadingScreen;
