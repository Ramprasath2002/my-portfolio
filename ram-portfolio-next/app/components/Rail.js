'use client';
import { useEffect, useState } from 'react';

const SECTIONS = ['hero', 'gate', 'pathways', 'lessons', 'connect'];

export default function Rail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + window.innerHeight / 2;
      let found = 0;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id) || (id === 'connect' ? document.getElementById('eternity') : null);
        if (el && el.offsetTop <= y) found = i;
      });
      setActive(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    (document.getElementById(id) || document.getElementById('eternity'))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="rail" id="rail">
      {SECTIONS.map((id, i) => (
        <button
          key={id}
          className={active === i ? 'on' : ''}
          aria-label={`Go to ${id}`}
          onClick={() => scrollTo(id)}
        >
          <i></i>
        </button>
      ))}
    </div>
  );
}
