'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let mx = 0, my = 0;
    const handleMove = e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const handleEnter = () => dot.classList.add('act');
    const handleLeave = () => dot.classList.remove('act');

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return <div className="cur-dot" id="cursor" ref={dotRef} style={{ transform: 'translate(-100px,-100px)' }}></div>;
}
