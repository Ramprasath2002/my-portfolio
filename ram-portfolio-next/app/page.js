import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import GLCanvas from './components/GLCanvas';
import Rail from './components/Rail';
import Cursor from './components/Cursor';
import KageScript from './components/KageScript';

export default function Home() {
  return (
    <>
      {/* Fixed layers */}
      <GLCanvas />
      <Cursor />
      <Preloader />

      {/* Navigation */}
      <Nav />

      {/* Main page content */}
      <div className="page" id="top">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <ContactForm />
        <Contact />
        <Footer />
      </div>

      {/* Foreground sky plane */}
      <div id="fg-sky" aria-hidden="true"></div>

      {/* Progress rail */}
      <Rail />

      {/* WebGL scene script */}
      <KageScript />
    </>
  );
}
