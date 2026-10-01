'use client';
import { useEffect, useRef } from 'react';

export default function Preloader() {
  const fillRef = useRef(null);
  const pctRef = useRef(null);
  const preRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const total = 12;
    const step = () => {
      i++;
      const p = i / total;
      if (fillRef.current) fillRef.current.style.right = ((1 - p) * 100).toFixed(1) + '%';
      if (pctRef.current) pctRef.current.textContent = Math.round(p * 100);
      if (i < total) setTimeout(step, 120);
      else {
        setTimeout(() => {
          if (preRef.current) preRef.current.classList.add('done');
          document.body.classList.remove('is-locked');
        }, 220);
      }
    };
    document.body.classList.add('is-locked');
    setTimeout(step, 60);
  }, []);

  return (
    <div id="pre" ref={preRef}>
      <div className="pre-in">
        <div className="pre-mark">
          <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
            <circle cx="22" cy="24" r="9.5" stroke="#e0231c" strokeWidth="1.2"/>
            <path d="M6 12h32M9.5 17h25M22 8v28" stroke="#dfe7e0" strokeWidth="1.2"/>
          </svg>
        </div>
        <div className="pre-jp jp">ポートフォリオ</div>
        <div className="pre-bar"><i ref={fillRef} id="pre-fill"></i></div>
        <div className="pre-meta">
          <span>Loading portfolio</span>
          <b><span ref={pctRef} id="pre-pct">0</span>%</b>
        </div>
      </div>
    </div>
  );
}
