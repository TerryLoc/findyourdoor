import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { SITE } from '@/constants/content';
import styles from './Contact.module.css';

function Contact() {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const messageLimit = 1000;
  const errorId = 'contact-form-error';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSending(true);

    const formData = new FormData(formRef.current);
    const honey = formData.get('_honey');
    if (honey) {
      setIsSending(false);
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError('Email service is not configured yet. Please add your EmailJS credentials.');
      setIsSending(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setIsSuccess(true);
    } catch {
      setError('Something went wrong. Please try again or email directly.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container section-pad">
        <div className={styles.wrap}>
          <h2 className={styles.headline}>Send a message</h2>
          <p className={styles.sub}>Prefer email directly? {SITE.email}</p>

          {isSuccess ? (
            <p className={styles.success}>Thank you. I will get back to you shortly.</p>
          ) : (
            <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className={styles.honeypot}
                aria-hidden="true"
              />

              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                aria-required="true"
                aria-describedby={error ? errorId : undefined}
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-describedby={error ? errorId : undefined}
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
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <p id="message-counter" className={styles.counter}>
                {message.length}/{messageLimit}
              </p>

              <button type="submit" disabled={isSending}>
                <span className={styles.buttonContent}>
                  {isSending && <span className={styles.spinner} aria-hidden="true" />}
                  {isSending ? 'Sending...' : 'Send message'}
                </span>
              </button>
              {error && (
                <p id={errorId} className={styles.error} role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
