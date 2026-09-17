import React, { useState } from 'react';

export default function ContactSection({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState('');

  const copy = async (text, key) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(''), 1500); } catch {}
  };

  const submit = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setErr('Please enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setErr('Please enter a valid email.');
    if (form.message.trim().length < 10) return setErr('Message should be at least 10 characters.');
    setErr('');
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.emails[1]}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <div className="reveal glass border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Direct</h3>
          <span className="rounded-full bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 text-[10px] font-mono text-emerald-300">↯ replies in ~2 hrs</span>
        </div>
        <div className="mt-4 text-sm text-neutral-300 space-y-3">
          <div>
            <div className="text-neutral-500 text-xs">Email</div>
            {profile.emails.map((email) => (
              <div key={email} className="flex items-center gap-2 mt-1">
                <a className="text-neon-cyan font-mono text-[13px] break-all" href={`mailto:${email}`}>{email}</a>
                <button onClick={() => copy(email, email)} className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-neutral-400 hover:text-white transition">
                  {copied === email ? '✓' : '⧉'}
                </button>
              </div>
            ))}
          </div>
          <div>
            <div className="text-neutral-500 text-xs">Phone / WhatsApp</div>
            <div className="flex items-center gap-2 mt-1">
              <a className="text-neon-magenta font-mono" href={`tel:${profile.phone.replaceAll(' ', '')}`}>{profile.phone}</a>
              <button onClick={() => copy(profile.phone, 'phone')} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-neutral-400 hover:text-white transition">
                {copied === 'phone' ? '✓' : '⧉'}
              </button>
              <a href={`https://wa.me/${profile.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-400/15 border border-emerald-400/25 px-2.5 py-0.5 text-[11px] text-emerald-300 hover:bg-emerald-400/25 transition">WhatsApp ↗</a>
            </div>
          </div>
          <div>
            <div className="text-neutral-500 text-xs">Location</div>
            <div className="mt-1">{profile.address} <a className="text-neon-cyan text-xs ml-1 hover:underline" target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Puri+Odisha+752046">map ↗</a></div>
          </div>
          <div className="flex gap-2 pt-1">
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex-1 text-center rounded-xl border border-white/10 px-3 py-2 text-xs hover:border-white/30 transition">⌁ GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex-1 text-center rounded-xl border border-neon-magenta/30 px-3 py-2 text-xs text-neon-magenta hover:bg-neon-magenta/10 transition">⇪ LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="reveal glass border border-white/10 rounded-2xl p-5">
        <h3 className="text-base font-semibold">Quick message ✉️</h3>
        <p className="text-[13px] text-neutral-400 mt-1">Validated inline — opens your mail app. Prefer forms? <a className="text-neon-cyan underline" target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSf-5o32h6XXqDxlZBuqbP0RiGFegHI9ZZZXeeUp_o4DqgY4Zg/viewform">Google Form ↗</a></p>
        <form onSubmit={submit} className="mt-3 space-y-2.5">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name *"
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-neon-cyan/50 placeholder:text-neutral-600" />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com *"
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-neon-cyan/50 placeholder:text-neutral-600" />
          <div className="relative">
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 500) })} rows={4}
              placeholder="Project idea, internship, or just hi… (min 10 chars) *"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-neon-cyan/50 placeholder:text-neutral-600 resize-none" />
            <span className="absolute bottom-2 right-2.5 text-[10px] font-mono text-neutral-600">{form.message.length}/500</span>
          </div>
          {err && <div className="text-[12px] text-red-300 bg-red-500/10 border border-red-500/25 rounded-xl px-3 py-2">{err}</div>}
          {sent && <div className="text-[12px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-3 py-2">✓ Opening your mail app — talk soon!</div>}
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-neon-cyan/70 via-neon-magenta/70 to-neon-cyan/70 px-5 py-3 text-sm font-bold text-black shadow-neon hover:opacity-90 transition">
            Send message →
          </button>
        </form>
      </div>
    </div>
  );
}
