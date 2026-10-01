'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function KageScript() {
  return (
    <>
      <Script
        src="/secret-pathways-assets/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/secret-pathways-assets/kage.js"
        strategy="afterInteractive"
      />
    </>
  );
}
