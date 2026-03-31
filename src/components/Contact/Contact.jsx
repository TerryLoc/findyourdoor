import { useState } from 'react';
import emailjs from 'emailjs-com';
import { SITE } from '@/constants/content';
import styles from './Contact.module.css';

function Contact() {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _honey: '',
  });

  const messageLimit = 1000;
  const errorId = 'contact-form-error';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check — if bot filled this field, silently return
    if (formData._honey) return;

    // Prevent double submission
    if (sending) return;
    setSending(true);

    const templateData = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      date: new Date().toLocaleDateString('en-IE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      // Send 1 — notification email to Terry
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY,
        templateData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Send 2 — auto-reply to the person who contacted
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_REPLY,
        templateData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Success state
      setSuccess(true);
      setFormData({ name: '', email: '', message: '', _honey: '' });

    } catch (error) {
      console.error('EmailJS error:', error);
      setError('Something went wrong. Please email us directly at findyourdoor.ie@gmail.com');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container section-pad">
        <div className={styles.wrap}>
          <h2 className={styles.headline}>Get in touch</h2>
          <p className={styles.sub}>Send Terry a message and he will get back to you as soon as possible.</p>

          {success ? (
            <div className={styles.success}>
              <h3>Message received.</h3>
              <p>Thank you for reaching out. I'll be back to you personally within 24 hours.</p>
              <p>Or if you'd prefer — <a href="https://calendly.com/findyourdoor/discovery-call">book a free call directly</a>.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className={styles.honeypot}
                aria-hidden="true"
                value={formData._honey}
                onChange={(e) => setFormData({ ...formData, _honey: e.target.value })}
              />

              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                aria-required="true"
                aria-describedby={error ? errorId : undefined}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-describedby={error ? errorId : undefined}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                maxLength={messageLimit}
                aria-required="true"
                aria-describedby={`${error ? `${errorId} ` : ''}message-counter`.trim()}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <p id="message-counter" className={styles.counter}>
                {formData.message.length}/{messageLimit}
              </p>

              <button type="submit" disabled={sending}>
                <span className={styles.buttonContent}>
                  {sending && <span className={styles.spinner} aria-hidden="true" />}
                  {sending ? 'Sending...' : 'Send message'}
                </span>
              </button>
              {error && <p className={styles.error}>{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
