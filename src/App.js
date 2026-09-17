import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BootScreen from './components/BootScreen';
import MouseGlow from './components/MouseGlow';
import Terminal from './components/Terminal';
import TypingText from './components/TypingText';
import R3FScene from './components/R3FScene';
import CyberSection from './components/CyberSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import ContactSection from './components/ContactSection';
import { ScrollProgress, BackToTop, FloatingGitHub } from './components/SiteChrome';
import Navbar from './components/Navbar';
import SectionWrap from './components/SectionWrap';

gsap.registerPlugin(ScrollTrigger);

const PROFILE = {
  name: 'Ananta Kumar Parida',
  title: 'MERN Stack Web Developer',
  address: 'At-Satasankha, Puri, Odisha - 752046',
  phone: '+91 8144685376',
  emails: ['aparida2023@gift.edu.in', 'anuxoo001@gmail.com'],
  linkedin: 'https://www.linkedin.com/in/ananta-kumar-parida-24b991294',
  github: 'https://github.com/anuxoo001',
  objective:
    'To build a career in Software Engineering with MERN Stack Web Development knowledge, apply full-stack development skills and problem-solving to contribute to organizational growth.',
  education: [
    {
      title: 'B. Tech Computer Engineering',
      org: 'GIFT Autonomous, Bhubaneswar',
      year: 'Pursuing',
      detail: 'Affiliated to Biju Patnaik University of Technology',
    },
    {
      title: 'Matriculation (CBSE)',
      org: 'The Mother Public School, Banamalipur',
      year: '2021',
      detail: 'Balipatna & Banamalipur',
    },
    {
      title: 'Intermediate (CHSE)',
      org: 'Swadhin Residential H S School, Nimapada',
      year: '2023',
      detail: 'CHSE Board',
    },
  ],
  experience: [
    {
      role: 'Full Stack Intern',
      org: 'Envistream Smartech Pvt. Ltd.',
      duration: '2026 – Present',
      current: true,
      bullets: [
        'Building and maintaining full-stack web applications with React.js, Node.js, Express.js, and MongoDB.',
        'Developing REST APIs and integrating frontend interfaces with backend services.',
        'Collaborating with the team on feature development, debugging, and deployment.',
      ],
    },
    {
      role: 'Core Java Intern',
      org: 'CTTC, Bhubaneswar',
      duration: 'July 2024 (1 Month)',
      bullets: [
        'Hands-on Java programming with OOP, classes/objects, inheritance, polymorphism, and exception handling.',
        'Developed Java-based applications and strengthened debugging/problem-solving skills.',
      ],
    },
    {
      role: 'MERN Stack Intern',
      org: 'Glucian, Bhubaneswar',
      duration: 'May 2025 – July 2025 (45 Days)',
      bullets: [
        'Built full-stack web applications with MongoDB, Express.js, React.js, and Node.js.',
        'Implemented secure authentication and integrated backend services.',
        'Optimized application performance via MongoDB schema design and API development.',
      ],
    },
  ],
  skills: [
    { label: 'React.js', value: 88 },
    { label: 'Node.js / Express.js', value: 84 },
    { label: 'MongoDB', value: 82 },
    { label: 'Java (DSA & OOP)', value: 80 },
    { label: 'JavaScript', value: 78 },
    { label: 'Python', value: 74 },
    { label: 'C', value: 70 },
    { label: 'Tailwind CSS / SQL', value: 76 },
  ],
  tools: [
    'Git',
    'GitHub',
    'Postman',
    'Thunder Client',
  ],
  deploymentTools: [
    'GitHub Pages',
    'Vercel',
    'Render',
  ],
  achievements: [
    'Core team member in a 6-member team that won an internal hackathon and advanced through competitive evaluation.',
    'Selected for National-SPARC Workshop, IIT Bhubaneswar (2026): Frontiers of AI, cloud and quantum computing for next-generation healthcare applications.',
    'Solved 100+ DSA problems using Java on LeetCode, improving algorithmic thinking and coding proficiency.',
  ],
  projects: [
    {
      title: 'Clixter',
      category: 'MERN Chat App',
      description:
        'Chat-focused MERN app with real-time messaging, secure auth, and a responsive interface for quick conversations.',
      tags: ['Chat', 'Realtime', 'Auth', 'React', 'Socket.io', 'MongoDB'],
      image: '/clixter.svg',
      gallery: ['/clixter.svg', '/clixter-2.svg', '/clixter-3.svg'],
      liveUrl: 'https://clixter.vercel.app/',
      githubUrl: 'https://github.com/anuxoo001',
      year: '2024',
      featured: false,
      accent: 'from-neon-cyan/30 via-transparent to-neon-magenta/20',
      features: [
        'Realtime 1-1 messaging with Socket.io',
        'Secure JWT auth + protected routes',
        'Online presence + typing indicators',
        'Group chats + responsive mobile UI',
        'Optimized MongoDB message schema',
      ],
    },
    {
      title: 'TourSafe',
      category: 'Tourist Safety App',
      description:
        'Tourist safety app with route alerts, safe-zone mapping, and travel guidance powered by Node, Express, and MongoDB.',
      tags: ['Safety', 'Mapping', 'Alerts', 'React', 'Node.js'],
      image: '/toursafe.svg',
      gallery: ['/toursafe.svg', '/toursafe-2.svg', '/toursafe-3.svg'],
      liveUrl: 'https://toursafe-s.vercel.app/',
      githubUrl: 'https://github.com/anuxoo001',
      year: '2024',
      featured: false,
      accent: 'from-emerald-400/25 via-transparent to-neon-cyan/20',
      features: [
        'Route alerts + safe-zone mapping',
        'SOS + live location sharing',
        'Travel guidance + safety feed',
        'Node / Express / MongoDB backend',
        'Mobile-first responsive UI',
      ],
    },
    {
      title: 'Smart Campus Management System',
      category: 'Campus Management App',
      description:
        'Full-stack campus platform with student, teacher, and admin dashboards, quizzes, exams, attendance, marks, assignments, events, notices, forums, and placement tracking.',
      tags: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
      image: '/campus.svg',
      gallery: ['/campus.svg', '/campus-2.svg', '/campus-3.svg'],
      liveUrl: 'https://smart-campus-management-system-nu.vercel.app',
      githubUrl: 'https://github.com/anuxoo001',
      year: '2025',
      featured: false,
      accent: 'from-violet-500/25 via-transparent to-neon-cyan/20',
      features: [
        'Student / Teacher / Admin dashboards',
        'Quizzes, exams, attendance, marks',
        'Assignments, events, notices, forums',
        'Placement tracking + reports',
        'Redux + REST APIs + role auth',
      ],
    },
    {
      title: 'ShopKart - E-Commerce Store',
      category: 'E-Commerce App',
      description:
        'Full-stack online store with product catalog, cart, secure auth, and order flow built on Node, Express, and MongoDB.',
      tags: ['E-Commerce', 'Cart', 'Auth', 'React', 'Node.js', 'MongoDB'],
      image: '/toursafe.svg',
      gallery: ['/toursafe.svg'],
      githubUrl: 'https://github.com/anuxoo001',
      year: '2024',
      featured: false,
      accent: 'from-emerald-400/25 via-transparent to-neon-cyan/20',
      features: [
        'Product catalog + search & filters',
        'Cart + checkout order flow',
        'Secure auth + protected routes',
        'Node / Express / MongoDB backend',
        'Responsive storefront UI',
      ],
    },
    {
      title: 'BookNest - Online Bookstore',
      category: 'Bookstore App',
      description:
        'MERN bookstore with book catalog, search, cart, and order management for readers and admins.',
      tags: ['Books', 'Search', 'Cart', 'React', 'Express', 'MongoDB'],
      image: '/campus.svg',
      gallery: ['/campus.svg'],
      githubUrl: 'https://github.com/anuxoo001',
      year: '2024',
      featured: false,
      accent: 'from-violet-500/25 via-transparent to-neon-cyan/20',
      features: [
        'Book catalog + instant search',
        'Cart + order placement',
        'Admin book management',
        'REST APIs + MongoDB models',
        'Clean responsive UI',
      ],
    },
    {
      title: 'TaskFlow - Task Manager',
      category: 'Productivity App',
      description:
        'Task management app with auth, task CRUD, status tracking, and per-user workspaces.',
      tags: ['Tasks', 'CRUD', 'Auth', 'React', 'Node.js', 'MongoDB'],
      image: '/clixter.svg',
      gallery: ['/clixter.svg'],
      githubUrl: 'https://github.com/anuxoo001',
      year: '2025',
      featured: false,
      accent: 'from-neon-cyan/30 via-transparent to-neon-magenta/20',
      features: [
        'Task CRUD + status workflow',
        'User auth + private workspaces',
        'Filter / search tasks',
        'Express + MongoDB backend',
        'Fast responsive UI',
      ],
    },
    {
      title: 'DevMatch - Developer Match Maker',
      category: 'Open-Source Platform',
      description:
        'Platform that showcases developer skill graphs and matches them with active GitHub open-source issues by stack and level.',
      tags: ['Open Source', 'GitHub API', 'Matching', 'React', 'Node.js'],
      image: '/campus-2.svg',
      gallery: ['/campus-2.svg'],
      githubUrl: 'https://github.com/anuxoo001',
      year: '2025',
      featured: false,
      accent: 'from-violet-500/25 via-transparent to-neon-magenta/20',
      features: [
        'Skill-graph developer profiles',
        'Smart issue matching by stack',
        'GitHub integration + live issues',
        'Beginner / intermediate / advanced filters',
        'Contribution tracking',
      ],
    },
    {
      title: 'InterviewAI - AI Interview Simulator',
      category: 'AI Interview App',
      description:
        'AI-powered mock interview simulator with voice input, streaming feedback, and performance tracking.',
      tags: ['AI', 'Voice', 'Interviews', 'React', 'Node.js', 'MongoDB'],
      image: '/clixter-2.svg',
      gallery: ['/clixter-2.svg'],
      githubUrl: 'https://github.com/anuxoo001',
      year: '2025',
      featured: false,
      accent: 'from-neon-cyan/30 via-transparent to-violet-500/20',
      features: [
        'Voice-based answer input',
        'Streaming AI interview feedback',
        'Role-wise mock interview sets',
        'Score history + analytics',
        'Dark-mode practice UI',
      ],
    },
    {
      title: 'MediCare - Hospital Management (EMR)',
      category: 'Healthcare EMR',
      description:
        'Enterprise-style hospital management app covering registration, appointments, billing, pharmacy, and lab workflows.',
      tags: ['EMR', 'Billing', 'Pharmacy', 'Appointments', 'React'],
      image: '/toursafe-2.svg',
      gallery: ['/toursafe-2.svg'],
      githubUrl: 'https://github.com/anuxoo001',
      year: '2025',
      featured: false,
      accent: 'from-emerald-400/25 via-transparent to-neon-magenta/20',
      features: [
        'Patient registration + visits',
        'Appointment scheduling',
        'Billing + pharmacy + inventory',
        'Role-based staff access',
        'Reports + record management',
      ],
    },
    {
      title: 'Evalify AI - Mock Interview Platform',
      category: 'AI Interview Platform',
      description:
        'Full-stack AI mock interview platform with realtime voice, streaming Gemini feedback, code scratchpad, and analytics dashboard.',
      tags: ['Gemini AI', 'Voice', 'Analytics', 'React', 'MongoDB'],
      image: '/clixter-3.svg',
      gallery: ['/clixter-3.svg'],
      githubUrl: 'https://github.com/anuxoo001',
      year: '2025',
      featured: false,
      accent: 'from-neon-magenta/25 via-transparent to-neon-cyan/20',
      features: [
        'Realtime voice recognition',
        'Streaming Gemini AI feedback',
        'Split-screen code scratchpad',
        'Performance dashboard + PDF scorecards',
        'Freemium RBAC + dark mode',
      ],
    },
    {
      title: 'GymPro - Gym Management System',
      category: 'Gym Management System',
      description:
        'Premium gym website for Bhubaneswar with membership plans, BMI calculator, trainer profiles, class schedule, programs gallery, and free-trial booking with contact integration.',
      tags: ['Fitness', 'Membership', 'BMI Calculator', 'Trainers', 'Booking'],
      image: '/gym.svg',
      gallery: ['/gym.svg', '/gym-2.svg', '/gym-3.svg'],
      liveUrl: 'https://gym-management01-theta.vercel.app/',
      githubUrl: 'https://github.com/anuxoo001',
      year: '2025',
      featured: false,
      accent: 'from-neon-magenta/30 via-transparent to-neon-cyan/25',
      features: [
        'Membership plans ₹999 – ₹3499 with yearly save',
        'Instant BMI calculator + diet counselling',
        'Trainer profiles + daily class timetable',
        'Programs gallery + virtual tour + facilities',
        'Free-trial booking + WhatsApp / call integration',
        'Testimonials, FAQ, contact + maps',
      ],
    },
  ],
  strengths: ['Quick learner', 'Teamwork & collaboration', 'Ability to work under pressure'],
  hobbies: ['Playing Cricket', 'Basic video editing'],
  image: '/dp.jpg.jpeg',
  personal: {
    father: 'Mr. Duryodhan Parida',
    mother: 'Mrs. Bhanumati Parida',
    nationality: 'Indian',
    maritalStatus: 'Unmarried',
    dob: '15/10/2003',
    gender: 'Male',
    languages: ['English', 'Hindi', 'Odia'],
  },
};

function SkillBars() {
  const [q, setQ] = useState('');
  const barsRef = useRef(null);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return PROFILE.skills;
    return PROFILE.skills.filter((s) => s.label.toLowerCase().includes(t));
  }, [q]);
  const avg = Math.round(PROFILE.skills.reduce((a, s) => a + s.value, 0) / PROFILE.skills.length);
  const top = [...PROFILE.skills].sort((a, b) => b.value - a.value)[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.skill-fill').forEach((el) => {
        const w = el.dataset.w || '0%';
        gsap.fromTo(el, { width: '0%' }, {
          width: w, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        });
      });
    }, barsRef);
    return () => ctx.revert();
  }, [list.length]);

  return (
    <div ref={barsRef} className="mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="flex gap-2">
          <span className="rounded-full bg-neon-cyan/10 border border-neon-cyan/25 px-3 py-1.5 text-[11px] font-mono text-neon-cyan">AVG {avg}%</span>
          <span className="rounded-full bg-neon-magenta/10 border border-neon-magenta/25 px-3 py-1.5 text-[11px] font-mono text-neon-magenta">TOP: {top.label} {top.value}%</span>
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter skills… (e.g. react, java)"
          className="sm:ml-auto w-full sm:w-64 rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-xs outline-none focus:border-neon-cyan/50 placeholder:text-neutral-600" />
      </div>
      <div className="grid gap-3">
        {list.map((s) => (
          <div key={s.label} className="reveal glass border border-white/10 rounded-2xl p-3 hover:border-neon-cyan/30 transition group">
            <div className="flex items-center justify-between text-xs text-neutral-300 mb-2">
              <span className="font-mono group-hover:text-white transition">{s.label}</span>
              <span className="text-neon-magenta font-mono">{s.value}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div data-w={`${s.value}%`}
                className="skill-fill h-full rounded-full bg-gradient-to-r from-neon-cyan/80 via-neon-magenta/70 to-neon-cyan/80"
                style={{ width: `${s.value}%` }}
              />
            </div>
          </div>
        ))}
        {!list.length && <div className="text-sm text-neutral-500">No skills match “{q}”. <button className="text-neon-cyan underline" onClick={() => setQ('')}>Clear</button></div>}
      </div>
    </div>
  );
}

function Timeline() {
  const [open, setOpen] = useState(0);
  return (
    <div className="relative mt-2 pl-6">
      <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-neon-cyan/60 via-white/10 to-neon-magenta/60" />
      <div className="grid gap-3">
        {PROFILE.experience.map((e, i) => {
          const isOpen = open === i;
          return (
            <div key={e.role} className="reveal relative glass border border-white/10 rounded-2xl p-4 hover:border-neon-cyan/25 transition">
              <span className={`absolute -left-6 top-5 h-4 w-4 rounded-full border-2 ${isOpen ? 'bg-neon-cyan border-neon-cyan shadow-[0_0_16px_rgba(0,255,255,0.8)]' : 'bg-black border-white/20'}`} />
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full text-left">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">
                      {i + 1}. {e.role}{' '}
                      {e.current && (
                        <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 align-middle text-[10px] font-mono font-normal text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />Current
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-neutral-400">{e.org}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neon-cyan font-mono whitespace-nowrap">{e.duration}</div>
                    <div className="text-[11px] text-neutral-500 mt-1">{isOpen ? '− collapse' : '+ expand'}</div>
                  </div>
                </div>
              </button>
              {isOpen && (
                <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 list-disc list-inside text-sm text-neutral-300 space-y-1 overflow-hidden">
                  {e.bullets.map((b) => (<li key={b}>{b}</li>))}
                </motion.ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EducationList() {
  const icons = ['🎓', '📘', '🏫'];
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {PROFILE.education.map((ed, i) => (
        <div key={ed.title} className="reveal glass border border-white/10 rounded-2xl p-4 hover:-translate-y-1 hover:border-neon-magenta/30 transition duration-300">
          <div className="flex items-center justify-between">
            <span className="text-2xl">{icons[i % icons.length]}</span>
            <span className="text-[11px] font-mono rounded-full bg-neon-magenta/10 border border-neon-magenta/25 text-neon-magenta px-2.5 py-1">{ed.year}</span>
          </div>
          <h3 className="mt-3 text-base font-semibold leading-snug">{ed.title}</h3>
          <p className="text-sm text-neutral-400 mt-1">{ed.org}</p>
          <p className="mt-2 text-[13px] text-neutral-300">{ed.detail}</p>
        </div>
      ))}
    </div>
  );
}

function AchievementsGrid() {
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const total = PROFILE.achievements.length;
  const medals = ['🥇', '🚀', '💻'];
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.achievements[idx]); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <div className="mt-6">
      <div className="reveal relative glass border border-white/10 rounded-2xl p-5 overflow-hidden">
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-neon-magenta/15 blur-3xl pointer-events-none" />
        <div className="text-xs text-neutral-400 font-mono">HIGHLIGHT {idx + 1}/{total}</div>
        <div className="mt-2 flex items-start gap-3">
          <span className="text-3xl">{medals[idx % medals.length]}</span>
          <p className="text-sm md:text-base text-neutral-100 leading-relaxed min-h-[56px]">{PROFILE.achievements[idx]}</p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button onClick={() => setIdx((idx - 1 + total) % total)} className="h-9 w-9 rounded-full border border-white/10 hover:border-neon-cyan/40 hover:text-neon-cyan transition">‹</button>
          <div className="flex gap-1.5">
            {PROFILE.achievements.map((_, i) => (
              <button key={i} aria-label={`Go to ${i + 1}`} onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-neon-cyan' : 'w-1.5 bg-white/25'}`} />
            ))}
          </div>
          <button onClick={() => setIdx((idx + 1) % total)} className="h-9 w-9 rounded-full border border-white/10 hover:border-neon-cyan/40 hover:text-neon-cyan transition">›</button>
          <button onClick={copy} className="ml-auto rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-neutral-300 hover:text-white transition">
            {copied ? '✓ Copied!' : '⧉ Copy'}
          </button>
        </div>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {PROFILE.achievements.map((a, i) => (
          <button key={a} onClick={() => setIdx(i)}
            className={`reveal text-left rounded-2xl border p-3 text-[12px] leading-relaxed transition ${i === idx ? 'border-neon-cyan/40 bg-neon-cyan/5 text-white' : 'border-white/10 bg-black/20 text-neutral-400 hover:text-neutral-200'}`}>
            <span className="mr-1.5">{medals[i % medals.length]}</span>{a.slice(0, 90)}{a.length > 90 ? '…' : ''}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const blobContainer = useRef(null);

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const blobs = blobContainer.current?.querySelectorAll('.animated-blob');
    if (blobs?.length) {
      gsap.to(blobs, {
        y: '+=30',
        x: '+=20',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 6,
        stagger: { each: 0.4, repeat: -1, yoyo: true },
      });
    }
    // Global section reveals
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 26 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen relative bg-[#05010a]">
      <style>{`
        .glass{ background: rgba(10,10,20,0.35); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);} 
        .shadow-neon{ box-shadow: 0 0 45px rgba(0,255,255,0.18), 0 0 90px rgba(255,43,214,0.08);} 
        .bg-grid { background: radial-gradient(circle at top, #0b0916 0%, #07050f 24%, #020207 56%, #020107 100%); }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at top left, rgba(0,255,255,0.12), transparent 18%), radial-gradient(circle at bottom right, rgba(255,45,200,0.12), transparent 18%);
          opacity: 0.5;
          pointer-events: none;
        }
        .bg-ambient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 20%, rgba(0,255,255,0.12), transparent 24%), radial-gradient(circle at 80% 15%, rgba(255,45,200,0.12), transparent 20%), radial-gradient(circle at 50% 80%, rgba(112, 79, 255, 0.08), transparent 28%);
          animation: ambient-pulse 16s ease-in-out infinite;
          pointer-events: none;
          opacity: 0.75;
        }
        .noise-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.02) 50%, transparent 100%);
          opacity: 0.4;
          animation: noise-move 14s ease-in-out infinite;
          pointer-events: none;
        }
        .animated-blob-1 { animation: float-blob-1 18s ease-in-out infinite; }
        .animated-blob-2 { animation: float-blob-2 14s ease-in-out infinite; }
        .animated-blob-3 { animation: float-blob-3 20s ease-in-out infinite; }
        @keyframes ambient-pulse { 0%,100% { opacity: 0.72; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.02); } }
        @keyframes noise-move { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-14px, 12px) scale(1.01); opacity: 0.5; } }
        @keyframes float-blob-1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(18px, -30px) scale(1.08); } }
        @keyframes float-blob-2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-26px, 26px) scale(0.94); } }
        @keyframes float-blob-3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(28px, 18px) scale(1.05); } }
      `}</style>

      <BootScreen onDone={() => {}} />
      <MouseGlow />
      <ScrollProgress />
      <BackToTop />
      <FloatingGitHub url={PROFILE.github} />

      <div className="fixed inset-0 overflow-hidden z-0 bg-grid">
        <div className="grid-overlay" />
        <div className="bg-ambient" />
        <div className="noise-overlay" />
        <div ref={blobContainer} className="absolute inset-0">
          <div className="absolute top-8 left-10 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-[#00fff2]/25 via-transparent to-[#8c3cff]/10 blur-3xl animated-blob-1" />
          <div className="absolute top-20 right-16 h-[320px] w-[320px] rounded-full bg-gradient-to-br from-[#ff2fa0]/25 via-transparent to-[#12d8ff]/10 blur-3xl animated-blob-2" />
          <div className="absolute bottom-8 left-1/4 h-[360px] w-[360px] rounded-full bg-gradient-to-br from-[#6e5cff]/25 via-transparent to-[#00ffd5]/10 blur-3xl animated-blob-3" />
        </div>
      </div>

      <Navbar sections={sections} />

      <main className="relative z-20">
        <header id="hero" className="px-5 pt-28 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-6xl mx-auto"
          >
<div className="flex items-center gap-3 flex-wrap">
                <div className="h-16 w-16 rounded-full border border-neon-cyan/30 overflow-hidden bg-black/20 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                  <img
                    src={PROFILE.image}
                    alt="Ananta Kumar Parida"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/logo192.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <h1 className="text-lg font-semibold">{PROFILE.name}</h1>
                  <p className="text-sm text-neutral-400">{PROFILE.title}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-mono text-emerald-300">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" /></span>
                  Full Stack Intern @ Envistream Smartech
                </span>
              </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 md:items-center">
              <div className="space-y-3">
                <div className="text-3xl md:text-4xl font-bold leading-tight">
                  MERN Stack Developer
                </div>
                <div className="text-sm md:text-base font-mono text-neon-cyan min-h-[28px]">
                  <TypingText lines={['React • Node • Express • MongoDB', 'Realtime Chat Apps', 'Campus Platforms', 'Gym Management Systems', 'Java DSA • 100+ LeetCode']} />
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed max-w-xl">
                  {PROFILE.objective}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-2xl border border-white/10 bg-black/30 hover:bg-black/50 hover:border-neon-cyan/40 transition text-xs"
                  >
                    ⌁ GitHub
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-2xl border border-neon-magenta/30 bg-black/30 hover:bg-black/50 transition text-xs text-neon-magenta"
                  >
                    ⇪ LinkedIn
                  </a>
                  <a href="#projects" className="px-4 py-2 rounded-2xl bg-neon-cyan text-black text-xs font-bold hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition">
                    View Projects ↓
                  </a>
                  <a href="#contact" className="px-4 py-2 rounded-2xl border border-neon-cyan/30 text-neon-cyan text-xs hover:bg-neon-cyan/10 transition">
                    Hire Me →
                  </a>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 max-w-xl">
                  {[
                    { n: PROFILE.projects.length, l: 'Projects' },
                    { n: '100+', l: 'DSA solved' },
                    { n: PROFILE.experience.length, l: 'Internships' },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl border border-white/10 bg-black/25 p-2.5 text-center">
                      <div className="text-lg font-bold font-mono text-white">{s.n}</div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-500">{s.l}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Terminal />
                </div>
              </div>

              <div className="relative h-[340px] md:h-[420px] rounded-3xl overflow-hidden glass border border-white/10">
                <div className="absolute inset-0 opacity-90">
                  <R3FScene />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#05010a] via-transparent to-transparent" />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-4 top-4 w-[calc(100%-2rem)] max-w-[220px] space-y-2 text-[11px] text-neutral-200">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-xl">
                      <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan shadow-[0_0_14px_rgba(0,255,255,0.85)]" />
                      <span>Tools</span>
                    </div>
                    <div className="grid gap-2">
                      {PROFILE.tools.map((tool) => (
                        <div key={tool} className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-neutral-100 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,255,0.08)]">
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute right-4 bottom-4 w-[calc(100%-2rem)] max-w-[220px] space-y-2 text-[11px] text-neutral-200 text-right">
                    <div className="inline-flex items-center justify-end gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-xl">
                      <span>Deploy</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-neon-magenta shadow-[0_0_18px_rgba(255,45,214,0.6)]" />
                    </div>
                    <div className="grid gap-2">
                      {PROFILE.deploymentTools.map((tool) => (
                        <div key={tool} className="inline-flex justify-end rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-neutral-100 backdrop-blur-xl shadow-[0_0_18px_rgba(255,45,214,0.08)]">
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="px-5 pb-16 max-w-6xl mx-auto">
          
          {/* Sections */}
          <SectionWrap id="about" className="scroll-mt-24" />
          <CyberSection title="About" subtitle="Career Objective + Core Profile • quick facts">
            <div className="flex flex-wrap gap-2 mt-1 mb-4">
              {['📍 Bhubaneswar, Odisha', '🗣 English • Hindi • Odia', '💼 Full Stack Intern @ Envistream Smartech', '⚡ MERN + Java DSA'].map((c) => (
                <span key={c} className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-neutral-300">{c}</span>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="reveal glass border border-white/10 rounded-2xl p-5">
                <h3 className="text-base font-semibold">Career Objective</h3>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{PROFILE.objective}</p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl border border-white/10 bg-black/20">
                    <div className="text-neutral-500">Phone</div>
                    <div className="text-neon-cyan mt-1 font-mono">{PROFILE.phone}</div>
                  </div>
                  <div className="p-3 rounded-2xl border border-white/10 bg-black/20">
                    <div className="text-neutral-500">Email</div>
                    <div className="text-neutral-200 mt-1 font-mono">{PROFILE.emails.join(' | ')}</div>
                  </div>
                  <div className="p-3 rounded-2xl border border-white/10 bg-black/20 col-span-2">
                    <div className="text-neutral-500">Location</div>
                    <div className="text-neutral-200 mt-1 text-sm">{PROFILE.address}</div>
                  </div>
                </div>
              </div>

              <div className="reveal glass border border-white/10 rounded-2xl p-5">
                <h3 className="text-base font-semibold">💪 Strengths</h3>
                <ul className="mt-3 list-disc list-inside text-sm text-neutral-300 space-y-2">
                  {PROFILE.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>

                <h3 className="text-base font-semibold mt-6">Hobbies</h3>
                <ul className="mt-3 list-disc list-inside text-sm text-neutral-300 space-y-2">
                  {PROFILE.hobbies.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CyberSection>

          <SectionWrap id="skills" className="scroll-mt-24" />
          <CyberSection title="Skills" subtitle="Animated bars • filter to explore • avg + top highlighted">
            <SkillBars />
          </CyberSection>

          <SectionWrap id="experience" className="scroll-mt-24" />
          <CyberSection title="Experience" subtitle="Timeline • click a card to expand">
            <Timeline />
          </CyberSection>

          <SectionWrap id="education" className="scroll-mt-24" />
          <CyberSection title="Education" subtitle="Academic Timeline">
            <EducationList />
          </CyberSection>

          <SectionWrap id="projects" className="scroll-mt-24" />
          <CyberSection title="Projects" subtitle="In order • GymPro last • search, filter & open case studies">
            <ProjectsShowcase projects={PROFILE.projects} />
          </CyberSection>

          <SectionWrap id="achievements" className="scroll-mt-24" />
          <CyberSection title="Achievements" subtitle="Recognitions & Performance">
            <AchievementsGrid />
          </CyberSection>

          <SectionWrap id="terminal" className="scroll-mt-24" />
          <CyberSection title="Terminal" subtitle="Interactive — type help, projects, gym, contact">
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="glass border border-white/10 rounded-2xl p-4">
                <h3 className="text-base font-semibold">SIPs Undertaken</h3>
                <ul className="mt-3 text-sm text-neutral-300 space-y-2 list-disc list-inside">
                  {PROFILE.experience.map((e) => (
                    <li key={e.role}>
                      <span className="text-neon-cyan font-mono">{e.role}</span> — {e.duration}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass border border-white/10 rounded-2xl p-4">
                <h3 className="text-base font-semibold">Personal Details</h3>
                <div className="mt-3 text-sm text-neutral-300 space-y-2">
                  <div>
                    <span className="text-neutral-500">DOB:</span>{' '}
                    <span className="font-mono">{PROFILE.personal.dob}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Languages:</span>{' '}
                    {PROFILE.personal.languages.join(', ')}
                  </div>
                  <div>
                    <span className="text-neutral-500">Marital Status:</span>{' '}
                    {PROFILE.personal.maritalStatus}
                  </div>
                </div>
              </div>
            </div>
          </CyberSection>

          <SectionWrap id="contact" className="scroll-mt-24" />
          <CyberSection title="Contact" subtitle="Send a signal • validated form + one-tap copy">
            <ContactSection profile={PROFILE} />
          </CyberSection>

          <footer className="mt-10 rounded-2xl border border-white/10 bg-black/25 p-5">
            <div className="flex flex-col md:flex-row md:items-center gap-3 text-xs text-neutral-500">
              <div className="flex-1">
                <div className="text-neutral-300 font-semibold">Ananta Kumar Parida • MERN Stack Developer</div>
                <div className="mt-1">© {new Date().getFullYear()} • Bhubaneswar, Odisha • {PROFILE.projects.length} projects (GymPro last) • Built with React + GSAP</div>
                <div className="mt-2 italic">Declaration: I hereby declare that the information above is true to my knowledge and I shall be liable for any misinformation.</div>
              </div>
              <div className="flex gap-2">
                <a href="#hero" className="rounded-full border border-white/10 px-3 py-1.5 hover:text-white transition">↑ Top</a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-1.5 hover:text-white transition">GitHub</a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-1.5 hover:text-white transition">LinkedIn</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

