import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const COMMANDS = {
  help: () => [
    'Available commands:',
    '  about      — who is Ananta?',
    '  skills     — top tech stack',
    '  projects   — list deployments',
    '  experience — internships',
    '  contact    — email / phone',
    '  gym        — GymPro project info',
    '  clear      — wipe terminal',
  ],
  about: () => ['Ananta Kumar Parida — MERN Stack Web Developer, Bhubaneswar.', 'B.Tech Computer Engineering @ GIFT Autonomous. Java DSA (100+ LeetCode).'],
  skills: () => ['React 88% • Node/Express 84% • MongoDB 82% • Java DSA 80% • JS 78% • Tailwind/SQL 76%'],
  projects: () => [
    '1. Clixter — https://clixter.vercel.app/',
    '2. TourSafe — https://toursafe-s.vercel.app/',
    '3. Smart Campus — https://smart-campus-management-system-nu.vercel.app',
    '4. ShopKart (E-Commerce)',
    '5. BookNest (Bookstore)',
    '6. TaskFlow (Task Manager)',
    '7. DevMatch (Developer Match Maker)',
    '8. InterviewAI (AI Interview Simulator)',
    '9. MediCare (Hospital EMR)',
    '10. Evalify AI (Mock Interviews)',
    '11. GymPro (last) — https://gym-management01-theta.vercel.app/',
  ],
  experience: () => ['Full Stack Intern @ Envistream Smartech Pvt. Ltd. (2026 – Present) [Current]', 'MERN Stack Intern @ glucian (May–Jul 2025, 45 days)', 'Core Java Intern @ CTTC (Jul 2024)'],
  contact: () => ['Email: anuxoo001@gmail.com', 'Phone: +91 8144685376', 'LinkedIn: /in/ananta-kumar-parida-24b991294'],
  gym: () => ['GymPro — Gym Management System (last project).', 'BMI calculator, ₹999–₹3499 plans, trainers, schedule, free-trial booking.', 'Live: https://gym-management01-theta.vercel.app/'],
};

export default function Terminal() {
  const [lines, setLines] = useState([
    { text: 'ANANTA_PORTFOLIO_OS v1.0 — type `help` ↓', c: 'text-neon-cyan' },
  ]);
  const [input, setInput] = useState('');
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 99999 });
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const next = [...lines, { text: `> ${raw}`, c: 'text-white' }];
    if (!cmd) { setLines(next); return; }
    if (cmd === 'clear') { setLines([]); return; }
    const fn = COMMANDS[cmd];
    if (fn) fn().forEach((t) => next.push({ text: t, c: 'text-neutral-300' }));
    else next.push({ text: `Unknown: ${cmd} — try 'help'`, c: 'text-neon-magenta' });
    setLines(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => inputRef.current?.focus()}
      className="glass border border-white/10 rounded-2xl overflow-hidden cursor-text"
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-black/30">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[11px] font-mono text-neutral-500">guest@ananta: ~/portfolio — interactive, try help</span>
      </div>
      <div className="px-4 pt-3">
        <div className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] leading-tight font-mono">
          <span className="text-white">ANANTA</span>
          <span className="text-neon-cyan ml-2">KUMAR</span>
          <span className="text-neon-magenta ml-2">PARIDA</span>
        </div>
      </div>
      <div ref={bodyRef} className="h-44 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed space-y-1">
        {lines.map((l, i) => (
          <div key={i} className={l.c}>{l.text}</div>
        ))}
        <div className="flex items-center gap-1.5 text-[12px] font-mono">
          <span className="text-neon-cyan">➜</span>
          <span className="text-neon-magenta">~</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { run(input); setHist((h) => [input, ...h]); setHi(-1); setInput(''); }
              if (e.key === 'ArrowUp') { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); if (hist[n]) { setHi(n); setInput(hist[n]); } }
              if (e.key === 'ArrowDown') { e.preventDefault(); const n = hi - 1; setHi(Math.max(-1, n)); setInput(n >= 0 ? hist[n] : ''); }
            }}
            placeholder="type help…"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-neutral-600"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
        {['help', 'projects', 'skills', 'gym', 'contact', 'clear'].map((c) => (
          <button key={c} onClick={() => run(c)}
            className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[11px] text-neutral-400 hover:text-neon-cyan hover:border-neon-cyan/40 transition">
            {c}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
