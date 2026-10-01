'use client';
import { useRef, useEffect } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = sectionRef.current?.querySelectorAll('[data-rv]');
            items?.forEach((el, i) => {
              setTimeout(() => el.classList.add('rv-in'), i * 85);
            });
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.04 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sec fin" id="eternity" data-cam="4" ref={sectionRef}>
      {/* Foreground */}
      <div className="fg" data-fg="eternity" aria-hidden="true">
        <span className="fg-el fg-hill" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/hill.webp" alt="" width="1774" height="887" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-ruins" data-fg-in="left">
          <img src="/secret-pathways-assets/foreground/png/shrine-ruins.webp" alt="" width="1536" height="1001" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-grass" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/tall-grass.webp" alt="" width="1717" height="916" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-sakura" data-fg-in="left">
          <img src="/secret-pathways-assets/foreground/png/sakura-branch.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async"/>
        </span>
      </div>

      <div className="eyebrow" data-rv="fade">Chapter 04 — Contact</div>
      <h2 className="display" data-rv="up">Let&apos;s build.</h2>
      <p className="body-lg" data-rv="up">
        Open to Software Engineer and Full-Stack Developer roles. Say hello at ramprasathdevelop@gmail.com.
      </p>
      <a className="cta" href="mailto:ramprasathdevelop@gmail.com" data-rv="fade">
        <i></i>
        <span>Say hello</span>
        <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
          <path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" strokeWidth="1.3"/>
        </svg>
      </a>
    </section>
  );
}
