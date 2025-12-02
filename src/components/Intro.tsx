import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress from 0 to 90 over 1800ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          return prev + Math.random() * 30;
        }
        return prev;
      });
    }, 300);

    // Navigate and complete progress at 2000ms
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        navigate("/home");
      }, 200);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-background relative overflow-hidden">
      {/* Animated Blue Square Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-float-square w-32 h-32 bg-primary/20 rounded-lg blur-xl"></div>
          <div className="animate-float-square-delayed w-24 h-24 bg-blue-500/15 rounded-lg blur-xl" style={{animationDelay: "0.5s"}}></div>
        </div>
      </div>

      {/* Content */}
      <div className="text-center p-6 relative z-10">
        <div className="mb-8 flex justify-center">
          <span className="loader"></span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">UHBC CS Resources</h1>
        <p className="text-sm text-muted-foreground">Organized, fast, and student-focused — loading…</p>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/20">
        <div
          className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>

      <style>{`
        .loader {
          display: block;
          position: relative;
          height: 48px;
          width: 140px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .loader:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 6px;
          width: 36px;
          height: 36px;
          animation: ballbns 2s ease-in infinite;
          background: hsl(217 91% 60%);
          will-change: transform;
        }

        @keyframes ballbns {
          0% {
            transform: translateX(0%) rotate(0deg);
            border-radius: 0;
            background: hsl(217 91% 60%);
          }
          100% {
            transform: translateX(calc(140px - 36px)) rotate(360deg);
            border-radius: 50%;
            background: hsl(217 91% 60%);
          }
        }

        /* Dark mode colors */
        :root.dark .loader:before {
          background: hsl(215 100% 58%);
        }

        @keyframes float-square {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateX(100px) translateY(-20px) rotate(45deg);
            opacity: 0.5;
          }
          50% {
            transform: translateX(200px) translateY(0) rotate(90deg);
            opacity: 0.2;
          }
          75% {
            transform: translateX(100px) translateY(20px) rotate(135deg);
            opacity: 0.4;
          }
        }

        @keyframes float-square-delayed {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateX(-80px) translateY(30px) rotate(-45deg);
            opacity: 0.4;
          }
          50% {
            transform: translateX(-160px) translateY(0) rotate(-90deg);
            opacity: 0.15;
          }
          75% {
            transform: translateX(-80px) translateY(-30px) rotate(-135deg);
            opacity: 0.35;
          }
        }

        .animate-float-square {
          animation: float-square 3s ease-in-out infinite;
          will-change: transform;
        }

        .animate-float-square-delayed {
          animation: float-square-delayed 3.5s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </main>
  );
}
