'use client';
import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function GLCanvas() {
  return (
    <>
      <canvas id="gl" aria-hidden="true"></canvas>
      <div id="vignette"></div>
      <div id="grain"></div>
    </>
  );
}
