'use client';
import { useRef, useEffect } from 'react';

const EXPERIENCE = [
  {
    num: '01',
    title: 'Athenatec',
    jp: '現職',
    desc: 'Software Engineer. Migrated WordPress to Next.js, ~35% faster loads, Node.js integration, SEO tooling.',
    time: '2026 — now',
  },
  {
    num: '02',
    title: 'Zibtek',
    jp: '前職',
    desc: 'Software Engineer. Cross-browser apps, 20% faster loads, 15% better retention, 5+ shipped features.',
    time: '2024 — 2026',
  },
  {
    num: '03',
    title: 'Marketing Website',
    jp: '改善',
    desc: 'Next.js redesign: Core Web Vitals, +25% organic rankings and +30% lead generation.',
    time: '2024 — 2025',
  },
  {
    num: '04',
    title: 'Internal Tools',
    jp: '自動',
    desc: 'ASP.NET, JavaScript and SQL Server interfaces, forms, validation and workflows.',
    time: 'ASP.NET',
  },
  {
    num: '05',
    title: 'Education',
    jp: '学び',
    desc: 'B.Sc. Botany, Periyar University College, Harur: a research-driven way of solving problems.',
    time: '2019 — 2022',
  },
];

export default function Experience() {
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
    <section className="sec" id="lessons" data-cam="3" ref={sectionRef}>
      {/* Foreground */}
      <div className="fg" data-fg="lessons" aria-hidden="true">
        <span className="fg-el fg-wall fg-el--flip" data-fg-in="right">
          <img src="/secret-pathways-assets/foreground/png/temple-wall.webp" alt="" width="1536" height="884" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-stones" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/basalt-stones.webp" alt="" width="1536" height="996" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-grass" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/tall-grass.webp" alt="" width="1717" height="916" loading="lazy" decoding="async"/>
        </span>
      </div>

      <div className="sec-head" data-rv="fade">
        <span className="k"><b>03</b> — Experience</span>
        <span className="rule"></span>
        <span className="k jp">経験</span>
      </div>

      <div className="cur-head">
        <h2 className="display h-sec" data-rv="up">Two roles. Real performance wins.</h2>
        <p className="body-lg" data-rv="up">
          From WordPress migrations to marketing platforms and internal tools, here is
          the work, the stack and the measurable results behind it.
        </p>
      </div>

      <div className="cur" id="cur">
        {EXPERIENCE.map((item, i) => (
          <div className="les" key={i} data-les={i}>
            <span className="k">{item.num}</span>
            <h3>{item.title}<em className="jp">{item.jp}</em></h3>
            <p>{item.desc}</p>
            <span className="t">{item.time}</span>
            <i className="bar"></i>
          </div>
        ))}
      </div>
    </section>
  );
}
