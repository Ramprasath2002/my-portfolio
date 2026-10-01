'use client';
import { useRef, useEffect } from 'react';

// Projects with their background images (webp from generated folder) and video GIFs
const PROJECTS = [
  {
    id: 'card-0',
    label: 'Marketing Site',
    jp: '公開',
    meta: 'Next.js platform redesign',
    num: '01 / 03',
    // Main large card - uses gif as video loop
    video: '/secret-pathways-assets/videos/project-marketing.gif',
    bgImage: '/secret-pathways-assets/generated/kage-approach.webp',
    glow: { gx: '80.2%', gy: '23.9%', gr: '22%', gt: '6.1s', gt2: '9.7s', gc1: 'rgba(255,142,108,.50)', gc2: 'rgba(212,56,38,.24)' },
  },
  {
    id: 'card-1',
    label: 'Automation UI',
    jp: '自動',
    meta: 'ASP.NET + SQL Server',
    num: '02 / 03',
    video: '/secret-pathways-assets/videos/project-automation.gif',
    bgImage: '/secret-pathways-assets/generated/kage-lantern-court.webp',
    glow: { gx: '70.5%', gy: '47.2%', gr: '14%', gt: '3.7s', gt2: '5.3s', gc1: 'rgba(255,198,124,.62)', gc2: 'rgba(226,118,40,.30)', flame: true },
  },
  {
    id: 'card-2',
    label: 'PatchLoader',
    jp: '更新',
    meta: 'ASP.NET application',
    num: '03 / 03',
    video: '/secret-pathways-assets/videos/project-patchloader.gif',
    bgImage: '/secret-pathways-assets/generated/kage-moonwater.webp',
    glow: { gx: '48.0%', gy: '16.8%', gr: '20%', gt: '7.3s', gt2: '11.2s', gc1: 'rgba(255,138,104,.52)', gc2: 'rgba(208,54,36,.24)' },
  },
];

function ProjectCard({ project, isFirst }) {
  const { id, label, jp, meta, num, video, bgImage, glow } = project;

  return (
    <article className={`card`} data-rv="up">
      <div className="card-fr">
        {/* Looping GIF/video as background */}
        <img
          src={video}
          alt={label}
          className="card-video"
          aria-hidden="true"
        />
        {/* Gradient overlay */}
        <div className="card-overlay"></div>
        {/* Arrow icon */}
        <span className="card-ar">
          <svg viewBox="0 0 14 14" fill="none">
            <path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" strokeWidth="1.3"/>
          </svg>
        </span>
        {/* Glow effect */}
        <i
          className={`glow${glow.flame ? ' glow--flame' : ''}`}
          style={{
            '--gx': glow.gx, '--gy': glow.gy, '--gr': glow.gr,
            '--gt': glow.gt, '--gt2': glow.gt2,
            '--gc1': glow.gc1, '--gc2': glow.gc2,
          }}
        ></i>
        {/* Label */}
        <div className="card-lab">
          <b>{label}</b>
          <span className="jp">{jp}</span>
        </div>
      </div>
      <div className="card-meta">
        <span>{meta}</span>
        <span>{num}</span>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Reveal observer
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
    <section className="sec" id="pathways" data-cam="2" ref={sectionRef}>
      {/* Foreground decorative elements */}
      <div className="fg" data-fg="pathways" aria-hidden="true">
        <span className="fg-el fg-sakura fg-el--sway" data-fg-in="left">
          <img src="/secret-pathways-assets/foreground/png/sakura-branch.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-leaves fg-el--sway" data-fg-in="right">
          <img src="/secret-pathways-assets/foreground/png/maple-leaves.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-lantern" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/stone-lantern.webp" alt="" width="1024" height="1499" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-bush" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/garden-bush.webp" alt="" width="1717" height="876" loading="lazy" decoding="async"/>
        </span>
      </div>

      <div className="sec-head" data-rv="fade">
        <span className="k"><b>02</b> — Projects</span>
        <span className="rule"></span>
        <span className="k jp">作品</span>
      </div>

      <div className="cards" id="cards">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} isFirst={i === 0} />
        ))}
      </div>
    </section>
  );
}
