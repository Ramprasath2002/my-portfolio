'use client';
import { useRef, useEffect, useState, useCallback } from 'react';

/* ─── validation helpers ─────────────────────────────────────────── */
const RULES = {
  name: {
    required: true,
    minLen: 2,
    pattern: /^[a-zA-Z\s\-'.]+$/,
    messages: {
      required: 'Name is required',
      minLen:   'At least 2 characters',
      pattern:  'Letters only please',
    },
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: 'Email is required',
      pattern:  'Enter a valid email address',
    },
  },
  role: {
    required: true,
    messages: { required: 'Please select an option' },
  },
  subject: {
    required: true,
    minLen: 4,
    messages: {
      required: 'Subject is required',
      minLen:   'At least 4 characters',
    },
  },
  message: {
    required: true,
    minLen: 20,
    maxLen: 1200,
    messages: {
      required: 'Message is required',
      minLen:   'Tell me a bit more (20 chars min)',
      maxLen:   'Keep it under 1200 characters',
    },
  },
};

function validate(field, value) {
  const r = RULES[field];
  if (!r) return '';
  if (r.required && !value.trim()) return r.messages.required;
  if (r.minLen && value.trim().length < r.minLen) return r.messages.minLen;
  if (r.maxLen && value.trim().length > r.maxLen) return r.messages.maxLen;
  if (r.pattern && !r.pattern.test(value.trim())) return r.messages.pattern;
  return '';
}

const INITIAL = { name: '', email: '', role: '', subject: '', message: '' };

const ROLES = [
  { value: '', label: 'Select opportunity…' },
  { value: 'full-stack',   label: 'Full-Stack Role' },
  { value: 'frontend',     label: 'Frontend Role' },
  { value: 'freelance',    label: 'Freelance Project' },
  { value: 'collaboration',label: 'Open-Source / Collaboration' },
  { value: 'other',        label: 'Just saying hello' },
];

/* ─── animated field ─────────────────────────────────────────────── */
function Field({ id, label, type = 'text', tag = 'input', children, value, error, touched, onChange, onBlur, maxLen, rows }) {
  const filled = value && value.length > 0;
  const invalid = touched && error;
  const valid   = touched && !error && filled;

  const Tag = tag;
  return (
    <div className={`cf-field${invalid ? ' cf-field--err' : ''}${valid ? ' cf-field--ok' : ''}`}>
      <Tag
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="cf-input"
        autoComplete={type === 'email' ? 'email' : 'off'}
        rows={rows}
        maxLength={maxLen}
        aria-describedby={invalid ? `${id}-err` : undefined}
        aria-invalid={invalid ? 'true' : 'false'}
      >
        {children}
      </Tag>
      <label htmlFor={id} className={`cf-label${filled ? ' cf-label--up' : ''}`}>
        {label}
      </label>
      <span className="cf-line">
        <span className="cf-line-inner"></span>
      </span>
      {invalid && (
        <span className="cf-err" id={`${id}-err`} role="alert">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5.3" stroke="#e0231c" strokeWidth="1.3"/>
            <path d="M6 3.5v3M6 8.5v.5" stroke="#e0231c" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          {error}
        </span>
      )}
      {valid && (
        <span className="cf-ok" aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5.8" stroke="#4ade80" strokeWidth="1.2"/>
            <path d="M3.8 6.6 5.7 8.5 9.2 4.5" stroke="#4ade80" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
      {maxLen && tag === 'textarea' && (
        <span className={`cf-count${value.length > maxLen * 0.9 ? ' cf-count--warn' : ''}`}>
          {value.length} / {maxLen}
        </span>
      )}
    </div>
  );
}

/* ─── main form ──────────────────────────────────────────────────── */
export default function ContactForm() {
  const sectionRef  = useRef(null);
  const formRef     = useRef(null);
  const [values,  setValues]  = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [charAnim, setCharAnim] = useState(false);

  /* scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sectionRef.current?.querySelectorAll('[data-rv]').forEach((el, i) =>
          setTimeout(() => el.classList.add('rv-in'), i * 80));
        observer.disconnect();
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* trigger char cascade on success */
  useEffect(() => {
    if (status === 'success') setCharAnim(true);
  }, [status]);

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors(er => ({ ...er, [name]: validate(name, value) }));
    }
  }, [touched]);

  const handleBlur = useCallback(e => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(er => ({ ...er, [name]: validate(name, value) }));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    // mark all touched
    const allTouched = Object.keys(INITIAL).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const allErrors = Object.keys(INITIAL).reduce((a, k) => ({ ...a, [k]: validate(k, values[k]) }), {});
    setErrors(allErrors);
    if (Object.values(allErrors).some(Boolean)) {
      // shake first error field
      const firstErr = formRef.current?.querySelector('.cf-field--err .cf-input');
      firstErr?.focus();
      firstErr?.closest('.cf-field')?.classList.add('cf-shake');
      setTimeout(() => firstErr?.closest('.cf-field')?.classList.remove('cf-shake'), 500);
      return;
    }
    setStatus('loading');
    // simulate async submit (replace with real API call)
    await new Promise(r => setTimeout(r, 1800));
    setStatus('success');
  };

  const handleReset = () => {
    setValues(INITIAL);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setCharAnim(false);
  };

  return (
    <section className="sec cf-section" id="connect" ref={sectionRef}>
      {/* foreground elements */}
      <div className="fg" data-fg="lessons" aria-hidden="true">
        <span className="fg-el fg-stones" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/basalt-stones.webp" alt="" width="1536" height="996" loading="lazy" decoding="async"/>
        </span>
        <span className="fg-el fg-grass" data-fg-in="up">
          <img src="/secret-pathways-assets/foreground/png/tall-grass.webp" alt="" width="1717" height="916" loading="lazy" decoding="async"/>
        </span>
      </div>

      {/* section header */}
      <div className="sec-head" data-rv="fade">
        <span className="k"><b>05</b> — Connect</span>
        <span className="rule"></span>
        <span className="k jp">連絡</span>
      </div>

      <div className="cf-layout">
        {/* left: heading + meta */}
        <div className="cf-intro">
          <h2 className="display h-sec cf-heading" data-rv="up">
            Let&apos;s build<br/>something<br/>great.
          </h2>
          <p className="body-lg cf-sub" data-rv="up">
            Have an idea, a role, or just want to say hello?
            Fill in the form — I read every message.
          </p>
          <div className="cf-meta" data-rv="fade">
            <div className="cf-meta-item">
              <span className="cf-meta-label">Response time</span>
              <span className="cf-meta-value">≤ 24 hours</span>
            </div>
            <div className="cf-meta-item">
              <span className="cf-meta-label">Location</span>
              <span className="cf-meta-value">Bengaluru, India</span>
            </div>
            <div className="cf-meta-item">
              <span className="cf-meta-label">Open to</span>
              <span className="cf-meta-value">Remote · On-site</span>
            </div>
          </div>
          <a className="cf-email-link" href="mailto:ramprasathdevelop@gmail.com" data-rv="fade">
            <span className="cf-email-icon">
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <rect x="2" y="4.5" width="16" height="11" rx="1.5" stroke="#dfe7e0" strokeWidth="1.3"/>
                <path d="M2 6.5 10 12l8-5.5" stroke="#dfe7e0" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </span>
            ramprasathdevelop@gmail.com
          </a>
        </div>

        {/* right: form */}
        <div className="cf-form-wrap" data-rv="up">
          {status === 'success' ? (
            <div className={`cf-success${charAnim ? ' cf-success--in' : ''}`} role="status">
              <div className="cf-success-icon">
                <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
                  <circle cx="32" cy="32" r="29" stroke="#e0231c" strokeWidth="1.5" className="cf-suc-ring"/>
                  <path d="M18 32 27 41 46 22" stroke="#dfe7e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cf-suc-check"/>
                </svg>
              </div>
              <p className="cf-success-jp jp">ありがとう</p>
              <h3 className="cf-success-title">Message received.</h3>
              <p className="cf-success-body body">
                Thanks for reaching out, {values.name.split(' ')[0]}. I&apos;ll get back to you within 24 hours.
              </p>
              <button className="cf-reset" onClick={handleReset}>
                <i></i><span>Send another</span>
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              className="cf-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              {/* honeypot */}
              <input type="text" name="_hp" tabIndex="-1" aria-hidden="true" style={{display:'none'}} autoComplete="off"/>

              <div className="cf-row">
                <Field id="name" label="Your name" value={values.name} error={errors.name} touched={touched.name} onChange={handleChange} onBlur={handleBlur}/>
                <Field id="email" label="Email address" type="email" value={values.email} error={errors.email} touched={touched.email} onChange={handleChange} onBlur={handleBlur}/>
              </div>

              <div className="cf-row cf-row--full">
                <div className={`cf-field cf-field--select${touched.role && errors.role ? ' cf-field--err' : ''}${touched.role && !errors.role && values.role ? ' cf-field--ok' : ''}`}>
                  <select
                    id="role"
                    name="role"
                    className={`cf-input cf-select${values.role ? ' cf-select--filled' : ''}`}
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={touched.role && errors.role ? 'role-err' : undefined}
                  >
                    {ROLES.map(r => (
                      <option key={r.value} value={r.value} disabled={!r.value}>{r.label}</option>
                    ))}
                  </select>
                  <label htmlFor="role" className={`cf-label${values.role ? ' cf-label--up' : ''}`}>
                    Opportunity type
                  </label>
                  <span className="cf-line"><span className="cf-line-inner"></span></span>
                  <span className="cf-select-arrow" aria-hidden="true">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1 5 5 9 1" stroke="#78837c" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </span>
                  {touched.role && errors.role && (
                    <span className="cf-err" id="role-err" role="alert">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <circle cx="6" cy="6" r="5.3" stroke="#e0231c" strokeWidth="1.3"/>
                        <path d="M6 3.5v3M6 8.5v.5" stroke="#e0231c" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      {errors.role}
                    </span>
                  )}
                </div>
              </div>

              <div className="cf-row cf-row--full">
                <Field id="subject" label="Subject" value={values.subject} error={errors.subject} touched={touched.subject} onChange={handleChange} onBlur={handleBlur}/>
              </div>

              <div className="cf-row cf-row--full">
                <Field id="message" label="Your message" tag="textarea" rows={6} maxLen={1200} value={values.message} error={errors.message} touched={touched.message} onChange={handleChange} onBlur={handleBlur}/>
              </div>

              <div className="cf-footer-row">
                <p className="cf-privacy body">
                  No spam, no third parties. Your message goes straight to my inbox.
                </p>
                <button
                  type="submit"
                  className={`cf-submit${status === 'loading' ? ' cf-submit--loading' : ''}`}
                  disabled={status === 'loading'}
                  aria-label={status === 'loading' ? 'Sending…' : 'Send message'}
                >
                  <i className="cf-submit-fill"></i>
                  <span className="cf-submit-text">
                    {status === 'loading' ? (
                      <>
                        <span className="cf-spinner" aria-hidden="true"></span>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <svg viewBox="0 0 14 14" fill="none" width="13" height="13" aria-hidden="true">
                          <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3"/>
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
