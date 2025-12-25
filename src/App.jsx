import { useState, useEffect } from 'react'

function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    // Target date: January 3rd, 2026 (Since current date is Dec 2025)
    // Adjust year dynamically if needed, but for this specific request:
    const targetDate = new Date('January 3, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B1120] to-black text-white flex flex-col items-center justify-center p-4 selection:bg-cyan-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[4s]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000 duration-[5s]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[130px] mix-blend-screen animate-pulse delay-2000 duration-[6s]"></div>
      </div>

      <div className="z-10 text-center w-full max-w-7xl px-4 flex flex-col items-center justify-center h-full relative">
        
        {/* Brand Chip */}
        <div className="mb-6 md:mb-10 relative group cursor-pointer hover:scale-105 transition-transform duration-300">
           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
           <div className="relative px-6 py-2 md:px-8 md:py-3 bg-black/50 backdrop-blur-xl border border-white/20 rounded-full text-lg md:text-2xl font-bold tracking-[0.2em] text-white shadow-2xl flex items-center gap-3">
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-500 to-white animate-text-shimmer bg-[length:200%_auto]">
               EARNHUBOFFICIAL
             </span>
           </div>
        </div>

        {/* Hero Text */}
        <div className="mb-6 relative w-full">
          <h1 className="text-5xl md:text-9xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] break-words">
            COMING SOON
          </h1>
          <div className="h-1 w-24 md:w-48 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto opacity-50"></div>
        </div>
        
        {/* Description Text */}
        <div className="w-full max-w-4xl mx-auto mb-8 md:mb-12 relative px-4 text-center">
          <p className="text-lg md:text-2xl text-blue-200/80 font-light tracking-wide leading-relaxed">
            We are crafting something extraordinary.<br className="hidden md:block" /> Get ready to experience the future of earning.
          </p>
        </div>

        {/* Glass Countdown Timer */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 mb-8 md:mb-16 p-6 md:p-8 rounded-none bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all duration-500 w-full md:w-auto">
          <TimeBox value={timeLeft.days} label="DAYS" />
          <div className="hidden md:flex flex-col justify-center pb-4 text-4xl text-blue-500/30 font-thin">:</div>
          <TimeBox value={timeLeft.hours} label="HOURS" />
          <div className="hidden md:flex flex-col justify-center pb-4 text-4xl text-blue-500/30 font-thin">:</div>
          <TimeBox value={timeLeft.minutes} label="MINUTES" />
          <div className="hidden md:flex flex-col justify-center pb-4 text-4xl text-blue-500/30 font-thin">:</div>
          <TimeBox value={timeLeft.seconds} label="SECONDS" />
        </div>

        {/* Modern Notify Input - Square Design */}
        <div className="w-full max-w-md relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-none opacity-30 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex bg-black rounded-none p-1.5 focus-within:ring-2 focus-within:ring-cyan-500/50 items-center">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent text-white px-4 py-3 md:px-6 rounded-none focus:outline-none placeholder-gray-500 font-light text-sm md:text-base w-full"
            />
            <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 md:px-8 rounded-none transition-all shadow-lg hover:shadow-cyan-500/30 whitespace-nowrap text-sm md:text-base">
              Notify Me
            </button>
          </div>
        </div>

        <footer className="mt-8 md:mt-16 text-white/60 text-[10px] md:text-xs tracking-[0.2em] font-light hover:text-white/80 transition-colors">
          &copy; 2026 EARNHUB OFFICIAL. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </div>
  )
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-16 h-20 md:w-28 md:h-36 flex items-center justify-center mb-2 md:mb-4 perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-lg md:rounded-xl border-t border-white/20 backdrop-blur-sm shadow-xl transform transition-transform duration-500 group-hover:rotate-x-12"></div>
        <span className="relative text-3xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-blue-500 font-mono tracking-tighter drop-shadow-lg">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-cyan-500/60 uppercase tracking-[0.2em] text-[8px] md:text-xs font-bold group-hover:text-cyan-400 transition-colors">{label}</span>
    </div>
  )
}

export default App
