import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--bg-main)] text-center relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none blur-[120px] rounded-full"
        style={{ background: "var(--color-primary-red)" }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-[120px] md:text-[200px] font-bold font-[var(--font-display)] leading-none tracking-tighter drop-shadow-xl mb-4" style={{ color: "var(--text-strong)" }}>
          4<span className="text-[var(--color-primary-red)]">0</span>4
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--text-strong)] tracking-tight">
          Lost in Space
        </h2>
        <p className="text-lg md:text-xl max-w-md mb-12 font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
          The page you are looking for has vanished into the digital void. Let's get you back home.
        </p>
        
        <Link 
          href="/"
          className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden border border-transparent hover:border-[var(--color-primary-red)]"
          style={{
            background: "var(--bg-card)",
            color: "var(--text-strong)",
          }}
        >
          <Home size={20} className="text-[var(--text-muted)] group-hover:text-[var(--color-primary-red)] transition-colors" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
