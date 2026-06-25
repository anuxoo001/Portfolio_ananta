import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import BootScreen from './components/BootScreen';
import MouseGlow from './components/MouseGlow';
import Terminal from './components/Terminal';
import R3FScene from './components/R3FScene';
import CyberSection from './components/CyberSection';
import ProjectCard from './components/ProjectCard';
import Navbar from './components/Navbar';
import SectionWrap from './components/SectionWrap';

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
      detail: 'Balipatna & Banamalipur (as per records)',
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
      tags: ['Chat', 'Realtime', 'Auth', 'React'],
      image: '/clixter.svg',
      liveUrl: 'https://clixter.vercel.app/',
    },
    {
      title: 'TourSafe',
      category: 'Tourist Safety App',
      description:
        'Tourist safety app with route alerts, safe-zone mapping, and travel guidance powered by Node, Express, and MongoDB.',
      tags: ['Safety', 'Mapping', 'Alerts', 'React'],
      image: '/toursafe.svg',
      liveUrl: '',
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
  return (
    <div className="mt-6 grid gap-3">
      {PROFILE.skills.map((s) => (
        <div key={s.label} className="glass border border-white/10 rounded-2xl p-3">
          <div className="flex items-center justify-between text-xs text-neutral-300 mb-2">
            <span className="font-mono">{s.label}</span>
            <span className="text-neon-magenta">{s.value}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan/80 via-neon-magenta/70 to-neon-cyan/80"
              style={{ width: `${s.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Timeline() {
  return (
    <div className="grid gap-3">
      {PROFILE.experience.map((e) => (
        <div key={e.role} className="glass border border-white/10 rounded-2xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold">{e.role}</h3>
              <p className="text-sm text-neutral-400">{e.org}</p>
            </div>
            <div className="text-xs text-neon-cyan font-mono whitespace-nowrap">{e.duration}</div>
          </div>
          <ul className="mt-3 list-disc list-inside text-sm text-neutral-300 space-y-1">
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function EducationList() {
  return (
    <div className="grid gap-3">
      {PROFILE.education.map((ed) => (
        <div key={ed.title} className="glass border border-white/10 rounded-2xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold">{ed.title}</h3>
              <p className="text-sm text-neutral-400">{ed.org}</p>
            </div>
            <div className="text-xs text-neon-magenta font-mono whitespace-nowrap">{ed.year}</div>
          </div>
          <p className="mt-2 text-sm text-neutral-300">{ed.detail}</p>
        </div>
      ))}
    </div>
  );
}

function AchievementsGrid() {

  return (
    <div className="mt-6 grid gap-3 md:grid-cols-2">
      {PROFILE.achievements.map((a) => (
        <div key={a} className="glass border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-neutral-400 mb-2">ACHIEVEMENT</div>
          <div className="text-sm text-neutral-200 leading-relaxed">{a}</div>
        </div>
      ))}
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
    if (!blobs) return;

    gsap.to(blobs, {
      y: '+=30',
      x: '+=20',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: 6,
      stagger: {
        each: 0.4,
        repeat: -1,
        yoyo: true,
      },
    });
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
<div className="flex items-center gap-3">
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
                <div>
                  <h1 className="text-lg font-semibold">{PROFILE.name}</h1>
                  <p className="text-sm text-neutral-400">{PROFILE.title}</p>
                </div>
              </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 md:items-center">
              <div className="space-y-3">
                <div className="text-3xl md:text-4xl font-bold leading-tight">
                  MERN Stack Developer
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed max-w-xl">
                  {PROFILE.objective}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-2xl border border-white/10 bg-black/30 hover:bg-black/50 transition text-xs"
                  >
                    GitHub
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-2xl border border-neon-magenta/30 bg-black/30 hover:bg-black/50 transition text-xs text-neon-magenta"
                  >
                    LinkedIn
                  </a>
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
          <CyberSection title="About" subtitle="Career Objective + Core Profile">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="glass border border-white/10 rounded-2xl p-5">
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

              <div className="glass border border-white/10 rounded-2xl p-5">
                <h3 className="text-base font-semibold">Strengths</h3>
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
          <CyberSection title="Skills" subtitle="Approx. proficiency">
            <SkillBars />
          </CyberSection>

          <SectionWrap id="experience" className="scroll-mt-24" />
          <CyberSection title="Experience" subtitle="Internships & Projects Impact">
            <Timeline />
          </CyberSection>

          <SectionWrap id="education" className="scroll-mt-24" />
          <CyberSection title="Education" subtitle="Academic Timeline">
            <EducationList />
          </CyberSection>

          <SectionWrap id="projects" className="scroll-mt-24" />
          <CyberSection title="Projects" subtitle="Selected MERN Stack work">
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {PROFILE.projects.map((p) => (
                <ProjectCard
                  key={p.title}
                  title={p.title}
                  category={p.category}
                  description={p.description}
                  image={p.image}
                  tags={p.tags}
                  liveUrl={p.liveUrl}
                />
              ))}
            </div>
          </CyberSection>

          <SectionWrap id="achievements" className="scroll-mt-24" />
          <CyberSection title="Achievements" subtitle="Recognitions & Performance">
            <AchievementsGrid />
          </CyberSection>

          <SectionWrap id="terminal" className="scroll-mt-24" />
          <CyberSection title="Terminal" subtitle="Signals & Identity">
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
          <CyberSection title="Contact" subtitle="Send a signal">
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="glass border border-white/10 rounded-2xl p-5">
                <h3 className="text-base font-semibold">Direct</h3>
                <div className="mt-4 text-sm text-neutral-300 space-y-3">
                  <div>
                    <div className="text-neutral-500">Email</div>
                    {PROFILE.emails.map((email) => (
                      <a key={email} className="text-neon-cyan font-mono block" href={`mailto:${email}`}>
                        {email}
                      </a>
                    ))}
                  </div>
                  <div>
                    <div className="text-neutral-500">Phone</div>
                    <a className="text-neon-magenta font-mono" href={`tel:${PROFILE.phone.replaceAll(' ', '')}`}>
                      {PROFILE.phone}
                    </a>
                  </div>
                  <div>
                    <div className="text-neutral-500">Location</div>
                    <div>{PROFILE.address}</div>
                  </div>
                </div>
              </div>

              <div className="glass border border-white/10 rounded-2xl p-5">
                <h3 className="text-base font-semibold">Quick Form (UI)</h3>
                <p className="text-sm text-neutral-400 mt-2">Share your message, request a callback, or start a new project conversation.</p>
                <div className="mt-4">
                  {/* Simple horizontal CTA button to open the Google Form */}
                  <div className="w-full">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSf-5o32h6XXqDxlZBuqbP0RiGFegHI9ZZZXeeUp_o4DqgY4Zg/viewform"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-neon-cyan/70 via-neon-magenta/70 to-neon-cyan/70 text-sm font-semibold shadow-neon"
                    >
                      Open Quick Form
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CyberSection>

          <footer className="mt-10 text-xs text-neutral-500">
            Declaration: I hereby declare that the information above is true to my knowledge and I shall be liable for any misinformation.
          </footer>
        </div>
      </main>
    </div>
  );
}

