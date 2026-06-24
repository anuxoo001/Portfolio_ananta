import React from 'react';

export default function SectionWrap({ id, className = '', children }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}

