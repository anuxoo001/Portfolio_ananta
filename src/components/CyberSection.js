import React from 'react';

export default function CyberSection({ title, subtitle, children }) {
  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
          {subtitle ? <p className="text-sm text-neutral-400 mt-1">{subtitle}</p> : null}
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-neon-cyan/40 via-white/10 to-neon-magenta/30" />
      </div>
      {children}
    </section>
  );
}

