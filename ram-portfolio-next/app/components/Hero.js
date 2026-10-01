'use client';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Staggered reveal on load
    const items = heroRef.current?.querySelectorAll('[data-rv], .mask-line');
    if (!items) return;
    setTimeout(() => {
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('rv-in'), 120 + i * 95);
      });
    }, 340);
  }, []);

  const handleChipClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero" data-cam="0" ref={heroRef}>
      <div className="hero-top">
        <div className="eyebrow" data-rv="fade">
          <span className="dot"></span> Portfolio — Bengaluru, India
        </div>
        <h1 className="display h-hero">
          <span className="mask-line"><span>Fast, accessible</span></span>
          <span className="mask-line"><span>web experiences</span></span>
          <span className="mask-line"><span>that convert.</span></span>
        </h1>
        <p className="hero-sub body" data-rv="up">
          I&apos;m Ram Prasath, a software engineer building responsive, SEO-optimized
          React and Next.js applications, from the interface down to the API.
        </p>
      </div>

      <div className="hero-spacer"></div>

      <div className="hero-foot">
        <div className="hero-cue" data-rv="fade">
          <span>Scroll to enter</span>
          <span className="track"><i></i></span>
        </div>
        <div className="chapters" id="chips">
          {[
            { num: '01', label: 'Frontend', desc: 'React, Next.js, Angular and Vue interfaces that feel effortless.' },
            { num: '02', label: 'Performance', desc: 'Core Web Vitals, lazy loading and code splitting that cut load times.' },
            { num: '03', label: 'SEO & Analytics', desc: 'Search Console, GA and GTM turning traffic into measurable growth.' },
            { num: '04', label: 'Full-Stack', desc: 'Node.js, ASP.NET and SQL Server behind every interface.' },
          ].map((chip, i) => (
            <div
              key={i}
              className="chip"
              data-rv="up"
              onClick={() => handleChipClick('#pathways')}
            >
              <span className="num">{chip.num}</span>
              <span className="tx"><b>{chip.label}</b><p>{chip.desc}</p></span>
            </div>
          ))}
        </div>
      </div>

      <a
        className="peek"
        href="#pathways"
        onClick={e => { e.preventDefault(); document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' }); }}
        data-rv="fade"
        aria-label="Preview: Selected work"
      >
        <span className="peek-fr"></span>
        <span className="peek-play">
          <svg viewBox="0 0 22 22" fill="none">
            <path d="M8 5.6 16.4 11 8 16.4z" fill="#dfe7e0"/>
          </svg>
        </span>
        <span className="peek-cap">
          <b className="jp">作品</b>
          <i>Selected work</i>
        </span>
      </a>

      <div className="hero-side" data-rv="up">
        <span className="v jp">開発者</span>
      </div>
    </section>
  );
}
