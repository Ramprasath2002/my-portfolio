'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#gate', label: 'About', alt: '概要' },
  { href: '#pathways', label: 'Projects', alt: '作品' },
  { href: '#lessons', label: 'Experience', alt: '経験' },
  { href: '#connect', label: 'Contact', alt: '連絡' },
];

export default function Nav() {
  const navRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setStuck(y > 10);
      setHidden(y > lastScrollY.current + 5 && y > 80);
      if (y < lastScrollY.current || y < 80) setHidden(false);
      lastScrollY.current = y;

      // Active section detection
      const sections = [
        { id: 'gate', link: '#gate' },
        { id: 'pathways', link: '#pathways' },
        { id: 'lessons', link: '#lessons' },
        { id: 'connect', link: '#connect' },
        { id: 'eternity', link: '#connect' },
      ];
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 0) {
            setActiveLink(s.link);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add('nav-open');
    } else {
      document.documentElement.classList.remove('nav-open');
    }
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = (href === '#eternity' || href === '#connect') ? 'connect' : href.replace('#', '');
    const el = document.getElementById(targetId) || document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`nav${stuck ? ' stuck' : ''}${hidden ? ' hide' : ''}${menuOpen ? ' menu-open' : ''}`}
      id="nav"
      ref={navRef}
    >
      <a className="brand" href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <circle cx="22" cy="25" r="8.6" fill="#e0231c" fillOpacity=".9"/>
          <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" strokeWidth="1.5"/>
          <path d="M14 35.5h16" stroke="#dfe7e0" strokeWidth="1.2" strokeOpacity=".6"/>
        </svg>
        <span className="brand-tx"><b>RAM</b><i>FULL-STACK WEB DEVELOPER</i></span>
      </a>

      <nav className="nav-links" id="navlinks">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            className={`nav-link${activeLink === link.href ? ' on' : ''}`}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
          >
            <span>{link.label}</span>
            <span className="alt">{link.alt}</span>
          </a>
        ))}
      </nav>

      <button
        className={`nav-burger${menuOpen ? ' active' : ''}`}
        aria-label="Menu"
        onClick={() => setMenuOpen(o => !o)}
      >
        <i></i><i></i>
      </button>
    </header>
  );
}
