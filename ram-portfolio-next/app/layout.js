import './globals.css';

export const metadata = {
  title: 'Ram Prasath — Software Engineer | Full-Stack Web Developer',
  description: 'Portfolio of Ram Prasath, a front-end and full-stack web developer in Bengaluru building fast, accessible, SEO-friendly apps with React, Next.js, TypeScript and Node.js.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2305070a'/%3E%3Ccircle cx='16' cy='17' r='8' fill='%23e0231c'/%3E%3Crect x='4' y='8' width='24' height='2.6' fill='%23dfe7e0'/%3E%3Crect x='7' y='13' width='18' height='2' fill='%23dfe7e0'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500&family=Noto+Sans+JP:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
