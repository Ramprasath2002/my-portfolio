'use client';

export default function Footer() {
  return (
    <footer className="foot" data-cam="5">
      {/* Foreground */}
      <div className="fg" data-fg="foot" aria-hidden="true">
        <span className="fg-el fg-bush" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/garden-bush.webp" alt="" width="1717" height="876" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-grass" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/tall-grass.webp" alt="" width="1717" height="916" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-stones" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/basalt-stones.webp" alt="" width="1536" height="996" loading="lazy" decoding="async"/>
        </span>
      </div>

      <div className="foot-grid">
        <div className="foot-brand">
          <svg viewBox="0 0 44 44" fill="none" width="54" height="54" aria-hidden="true">
            <circle cx="22" cy="25" r="8.6" fill="#e0231c" fillOpacity=".9"/>
            <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" strokeWidth="1.5"/>
          </svg>
          <p>Ram Prasath — software engineer and full-stack web developer in Bengaluru, building fast, accessible, SEO-friendly products.</p>
        </div>
        <div>
          <h4>Sections</h4>
          <ul>
            <li><a href="#gate" onClick={e => { e.preventDefault(); document.getElementById('gate')?.scrollIntoView({ behavior: 'smooth' }); }}>About</a></li>
            <li><a href="#pathways" onClick={e => { e.preventDefault(); document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' }); }}>Projects</a></li>
            <li><a href="#lessons" onClick={e => { e.preventDefault(); document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth' }); }}>Experience</a></li>
            <li><a href="#connect" onClick={e => { e.preventDefault(); (document.getElementById('connect') || document.getElementById('eternity'))?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Stack</h4>
          <ul>
            <li><a href="#lessons">React &amp; Next.js</a></li>
            <li><a href="#lessons">TypeScript &amp; Node.js</a></li>
            <li><a href="#lessons">Angular &amp; Vue</a></li>
            <li><a href="#lessons">ASP.NET &amp; SQL Server</a></li>
          </ul>
        </div>
        <div>
          <h4>Elsewhere</h4>
          <ul>
            <li><a href="https://github.com/Ramprasath2002" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://claytech.site" target="_blank" rel="noopener">Clay Tech</a></li>
            <li><a href="mailto:ramprasathdevelop@gmail.com">Email</a></li>
          </ul>
        </div>
      </div>

      <div className="foot-base">
        <span>© 2026 Ram Prasath</span>
        <span className="jp">ベンガルール</span>
        <span>Next.js · Onest · Bengaluru</span>
      </div>
    </footer>
  );
}
