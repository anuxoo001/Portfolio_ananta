import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsShowcase({ projects = [] }) {
  const rootRef = useRef(null);
  const spotlightGlow = useRef(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('');
  const [sort, setSort] = useState('original');
  const [view, setView] = useState('grid');
  const [selected, setSelected] = useState(null);
  const [lightIdx, setLightIdx] = useState(0);

  const categories = useMemo(() => {
    const set = new Map();
    projects.forEach((p) => set.set(p.category, (set.get(p.category) || 0) + 1));
    return [{ name: 'All', count: projects.length }, ...[...set.entries()].map(([name, count]) => ({ name, count }))];
  }, [projects]);

  const allTags = useMemo(() => [...new Set(projects.flatMap((p) => p.tags || []))], [projects]);

  const stats = useMemo(() => ({
    total: projects.length,
    live: projects.filter((p) => p.liveUrl).length,
    tech: allTags.length,
  }), [projects, allTags]);

  // Spotlight only if a project is explicitly marked featured — otherwise hidden
  // so data order is preserved (GymPro stays last).
  const featured = useMemo(() => projects.find((p) => p.featured) || null, [projects]);

  const filtered = useMemo(() => {
    let list = [...projects];
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (activeTag) list = list.filter((p) => (p.tags || []).includes(activeTag));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) =>
        [p.title, p.description, p.category, ...(p.tags || []), ...(p.features || [])].join(' ').toLowerCase().includes(q)
      );
    }
    if (sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'newest') list.sort((a, b) => String(b.year || '').localeCompare(String(a.year || '')));
    else if (sort === 'featured') list.sort((a, b) => Number(b.featured || 0) - Number(a.featured || 0));
    // 'original' => keep data order (GymPro last)
    return list;
  }, [projects, category, activeTag, query, sort]);

  // ---- GSAP: entrance + spotlight float + counters ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ps-head', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
      });
      gsap.fromTo('.ps-bar', { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.ps-spot', { opacity: 0, scale: 0.97, y: 24 }, {
        opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      });
      if (spotlightGlow.current) {
        gsap.to(spotlightGlow.current, { x: 60, y: -30, scale: 1.15, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }
      // animated counters
      document.querySelectorAll('.ps-count').forEach((el) => {
        const target = Number(el.dataset.count || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => { el.textContent = Math.round(obj.v); },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // re-animate cards on filter change
  useEffect(() => {
    if (!rootRef.current) return;
    gsap.fromTo(rootRef.current.querySelectorAll('.proj-reveal'),
      { opacity: 0, y: 26, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', overwrite: true, clearProps: 'scale' });
  }, [category, query, activeTag, sort, view]);

  // ---- modal keyboard + scroll lock ----
  useEffect(() => {
    if (!selected) return;
    setLightIdx(0);
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      const g = selected.gallery?.length ? selected.gallery : [selected.image];
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight') setLightIdx((p) => (p + 1) % g.length);
      if (e.key === 'ArrowLeft') setLightIdx((p) => (p - 1 + g.length) % g.length);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [selected]);

  const resetAll = () => { setQuery(''); setCategory('All'); setActiveTag(''); setSort('original'); };
  const hasFilter = query || category !== 'All' || activeTag || sort !== 'original';
  const modalGallery = selected ? (selected.gallery?.length ? selected.gallery : [selected.image]) : [];

  return (
    <div ref={rootRef} className="mt-6">
      <style>{`
        .ps-marquee { display:flex; gap:2.5rem; width:max-content; animation: ps-scroll 22s linear infinite; }
        @keyframes ps-scroll { to { transform: translateX(-50%); } }
        .ps-ring { position:relative; }
        .ps-ring::before { content:''; position:absolute; inset:-1px; border-radius:1rem; padding:1px;
          background: linear-gradient(135deg, rgba(0,255,255,.6), transparent 30%, transparent 70%, rgba(255,43,214,.6));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events:none; }
        .ps-spot-img { transition: transform .6s cubic-bezier(.2,.8,.2,1); }
        .ps-spot:hover .ps-spot-img { transform: scale(1.05); }
      `}</style>

      {/* 1+2: STATS */}
      <div className="ps-head grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: 'Projects', value: stats.total, c: 'text-neon-cyan' },
          { label: 'Live deployments', value: stats.live, c: 'text-emerald-300' },
          { label: 'Tech tags', value: stats.tech, c: 'text-violet-300' },
        ].map((s) => (
          <div key={s.label} className="glass border border-white/10 rounded-2xl p-4 text-center">
            <div className={`text-2xl font-bold font-mono ${s.c}`}><span className="ps-count" data-count={s.value}>0</span></div>
            <div className="text-[11px] uppercase tracking-widest text-neutral-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 3: FEATURED SPOTLIGHT */}
      {featured && !hasFilter && (
        <div className="ps-spot ps-ring relative mt-5 overflow-hidden rounded-2xl glass border border-white/10">
          <div ref={spotlightGlow} className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gradient-to-br from-neon-magenta/30 to-neon-cyan/20 blur-3xl pointer-events-none" />
          <div className="grid md:grid-cols-2">
            <div className="relative h-60 md:h-full md:min-h-[320px] overflow-hidden">
              <img src={featured.gallery?.[0] || featured.image} alt={featured.title}
                className="ps-spot-img absolute inset-0 h-full w-full object-cover"
                onError={(e) => { e.currentTarget.src = '/logo192.png'; }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07050f]/60" />
              <div className="absolute left-4 bottom-4 flex gap-2">
                {(featured.gallery || [featured.image]).slice(0, 3).map((g, i) => (
                  <button key={i} onClick={() => { setSelected(featured); setLightIdx(i); }}
                    className="h-12 w-20 overflow-hidden rounded-lg border border-white/20 hover:border-neon-cyan transition">
                    <img src={g} alt={`thumb ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5 md:p-7">
              <div className="flex items-center gap-2 text-[11px]">
                <span className="rounded-full bg-gradient-to-r from-neon-magenta to-neon-cyan px-3 py-1 font-bold text-black">★ Spotlight</span>
                <span className="text-neutral-400 font-mono">{featured.category} • {featured.year}</span>
              </div>
              <h3 className="mt-3 text-2xl font-bold leading-tight">{featured.title}</h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{featured.description}</p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-1.5">
                {(featured.features || []).slice(0, 4).map((f) => (
                  <li key={f} className="flex gap-2 text-[12px] text-neutral-300"><span className="text-neon-cyan">✓</span>{f}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {featured.liveUrl && <a href={featured.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-neon-cyan px-5 py-2.5 text-xs font-bold text-black hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] transition">↗ Launch Live Site</a>}
                <button onClick={() => setSelected(featured)} className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold hover:bg-white/10 transition">View case study</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4-7: SEARCH / FILTER / SORT / VIEW */}
      <div className="ps-bar mt-5 glass border border-white/10 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects, tags, features… (e.g. gym, BMI, realtime)"
              className="w-full rounded-xl bg-black/40 border border-white/10 pl-9 pr-9 py-2.5 text-sm outline-none focus:border-neon-cyan/50 placeholder:text-neutral-500" />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">✕</button>}
          </div>
          <div className="flex items-center gap-2">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-xs outline-none focus:border-neon-cyan/50">
              <option value="original">Sort: Original order</option>
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="az">Sort: A → Z</option>
            </select>
            <div className="flex rounded-xl overflow-hidden border border-white/10">
              <button onClick={() => setView('grid')} title="Grid view" className={`px-3 py-2.5 text-sm ${view === 'grid' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-black/40 text-neutral-400'}`}>▦</button>
              <button onClick={() => setView('list')} title="List view" className={`px-3 py-2.5 text-sm ${view === 'list' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-black/40 text-neutral-400'}`}>☰</button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c.name} onClick={() => setCategory(c.name)}
              className={`rounded-full px-3.5 py-1.5 text-xs border transition ${category === c.name ? 'bg-gradient-to-r from-neon-cyan/30 to-neon-magenta/30 border-neon-cyan/40 text-white' : 'border-white/10 bg-black/30 text-neutral-400 hover:text-white'}`}>
              {c.name} <span className="ml-1 font-mono opacity-70">{c.count}</span>
            </button>
          ))}
        </div>
        {activeTag && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500">Tag:</span>
            <span className="rounded-full bg-neon-magenta/20 border border-neon-magenta/30 px-3 py-1 text-neon-magenta">#{activeTag}</span>
            <button onClick={() => setActiveTag('')} className="text-neutral-400 hover:text-white">clear ✕</button>
          </div>
        )}
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Showing {filtered.length}/{projects.length} projects</span>
          {hasFilter && <button onClick={resetAll} className="text-neon-cyan hover:underline">Reset all filters</button>}
        </div>
      </div>

      {/* tech marquee */}
      <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-black/20 py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="ps-marquee text-[11px] font-mono text-neutral-400">
          {[...allTags, ...allTags].map((t, i) => (
            <span key={i} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-neon-cyan" />{t}</span>
          ))}
        </div>
      </div>

      {/* CARDS */}
      {filtered.length ? (
        <div className={`mt-5 grid gap-4 ${view === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.title} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProjectCard project={p} index={i} view={view} onOpen={setSelected} onTagClick={(t) => { setActiveTag(t); }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-white/15 p-10 text-center">
          <div className="text-3xl">🛰️</div>
          <h4 className="mt-2 font-semibold">No projects match your signal</h4>
          <p className="text-sm text-neutral-400 mt-1">Try “gym”, “chat”, “safety” or clear filters.</p>
          <button onClick={resetAll} className="mt-4 rounded-full bg-neon-cyan/15 px-5 py-2 text-xs font-semibold text-neon-cyan hover:bg-neon-cyan/25">Reset filters</button>
        </div>
      )}

      {/* 9+10: DETAIL MODAL + LIGHTBOX */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/70 backdrop-blur-md"
            onClick={() => setSelected(null)}>
            <motion.div
              initial={{ y: 60, scale: 0.97, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl glass border border-white/15 bg-[#0a0716]/95">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img key={modalGallery[lightIdx]} src={modalGallery[lightIdx]} alt={`${selected.title} ${lightIdx + 1}`}
                    initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35 }} className="absolute inset-0 h-full w-full object-cover" />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0716] via-transparent to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute right-4 top-4 h-9 w-9 rounded-full bg-black/60 border border-white/15 hover:bg-black/90">✕</button>
                {modalGallery.length > 1 && (
                  <>
                    <button onClick={() => setLightIdx((p) => (p - 1 + modalGallery.length) % modalGallery.length)} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 border border-white/15 text-lg hover:bg-black/90">‹</button>
                    <button onClick={() => setLightIdx((p) => (p + 1) % modalGallery.length)} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 border border-white/15 text-lg hover:bg-black/90">›</button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[11px] font-mono">{lightIdx + 1} / {modalGallery.length} — use ← → keys</div>
                  </>
                )}
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-black/60 border border-white/10 px-3 py-1 text-[11px]">{selected.category}</span>
                  {selected.year && <span className="rounded-full bg-black/60 border border-neon-cyan/30 px-3 py-1 text-[11px] font-mono text-neon-cyan">{selected.year}</span>}
                </div>
              </div>
              <div className="p-5 md:p-7">
                <h3 className="text-xl md:text-2xl font-bold">{selected.title}</h3>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{selected.description}</p>
                {modalGallery.length > 1 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {modalGallery.map((g, i) => (
                      <button key={i} onClick={() => setLightIdx(i)} className={`overflow-hidden rounded-xl border transition ${i === lightIdx ? 'border-neon-cyan shadow-[0_0_18px_rgba(0,255,255,0.3)]' : 'border-white/10 opacity-70 hover:opacity-100'}`}>
                        <img src={g} alt={`thumb ${i + 1}`} className="h-20 w-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-5 grid md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-neutral-500">Key features ({selected.features?.length || 0})</h4>
                    <ul className="mt-2 space-y-2">
                      {(selected.features || []).map((f, i) => (
                        <motion.li key={f} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                          className="flex gap-2.5 rounded-xl border border-white/5 bg-black/25 p-2.5 text-[13px] text-neutral-200">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon-cyan/15 text-[11px] text-neon-cyan">✓</span>{f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-neutral-500">Stack & links</h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(selected.tags || []).map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-neutral-300">{t}</span>
                      ))}
                    </div>
                    <div className="mt-4 grid gap-2">
                      {selected.liveUrl && <a href={selected.liveUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-gradient-to-r from-neon-cyan to-neon-magenta px-4 py-3 text-center text-sm font-bold text-black hover:opacity-90">↗ Open Live Deployment</a>}
                      {selected.githubUrl && <a href={selected.githubUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm hover:bg-white/5">⌁ View on GitHub</a>}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
