'use client';
import { useRef, useEffect } from 'react';

export default function About() {
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
    <section className="sec" id="gate" data-cam="1" ref={sectionRef}>
      {/* Foreground */}
      <div className="fg" data-fg="gate" aria-hidden="true">
        <span className="fg-el fg-wall" data-fg-in="left">
          <img src="/secret-pathways-assets/foreground/png/temple-wall.webp" alt="" width="1536" height="884" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-pine" data-fg-in="right">
          <img src="/secret-pathways-assets/foreground/png/pine-tree.webp" alt="" width="1024" height="1438" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-grass" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/tall-grass.webp" alt="" width="1717" height="916" loading="lazy" decoding="async"/>
        </span>
      </div>

      <div className="sec-head" data-rv="fade">
        <span className="k"><b>01</b> — About</span>
        <span className="rule"></span>
        <span className="k jp">概要</span>
      </div>

      <div className="gate-grid">
        <h2 className="display h-sec" data-rv="up">Clean code, fast pages, one open door.</h2>
        <div className="gate-copy">
          <p className="lead" data-rv="up">
            Front-end and full-stack developer with hands-on experience building responsive,
            high-performance web applications in React.js, Next.js, Node.js and TypeScript. My work has cut page
            load times by up to 35% and lifted organic search rankings by 25%.
          </p>
          <p className="body" data-rv="up">
            I build accessible (WCAG), data-driven interfaces and work closely with designers,
            marketers and back-end engineers to ship production-ready features. Currently at Athena Technology
            Solutions, open to Software Engineer and Full-Stack roles.
          </p>
          <a
            className="arrowlink"
            href="#pathways"
            onClick={e => { e.preventDefault(); document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' }); }}
            data-rv="fade"
          >
            <span>See the work</span>
            <span className="ar">
              <svg viewBox="0 0 14 14" fill="none">
                <path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" strokeWidth="1.3"/>
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div className="gate-stats" data-rv="up">
        <div><b>35%</b><span>Faster loads</span></div>
        <div><b>25%</b><span>Better rankings</span></div>
        <div><b>30%</b><span>More leads</span></div>
        <div><b>5+</b><span>Features shipped</span></div>
      </div>
    </section>
  );
}
