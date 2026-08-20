'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { track } from '@/lib/analytics';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Support/contact form, submitting to our own /api/support route (SMTP via
 * team@soma4health.com) — no third-party form service. Anti-bot without
 * CAPTCHA: honeypot field + time gate, same pattern as WaitlistForm.
 */
export const SupportForm: React.FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations('supportForm');
  const pathname = usePathname();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hp, setHp] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const mountedAt = useRef(0);
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email) || !message.trim()) {
      setStatus('error');
      return;
    }
    // Honeypot filled or submitted too fast: pretend success, never contact the API.
    if (hp || Date.now() - mountedAt.current < 2000) {
      setStatus('success');
      return;
    }
    setStatus('submitting');
    track('support_submit', { path: pathname ?? '/' });
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company: hp }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      track('support_success', { path: pathname ?? '/' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p
        ref={successRef}
        tabIndex={-1}
        className={cn('text-lg text-[color:var(--ld-ink)]', className)}
      >
        {t('successMessage')}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={cn('flex w-full max-w-md flex-col gap-3', className)}>
      <div>
        <label htmlFor="support-name" className="sr-only">
          {t('nameLabel')}
        </label>
        <input
          id="support-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('namePlaceholder')}
          className="h-12 w-full rounded-full border border-[var(--ld-line-strong)] bg-[var(--ld-surface)] px-5 text-[color:var(--ld-ink)] placeholder:text-[color:var(--ld-text-3)] focus:border-[var(--ld-accent)] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="support-email" className="sr-only">
          {t('emailLabel')}
        </label>
        <input
          id="support-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          aria-describedby={status === 'error' ? 'support-error' : undefined}
          className="h-12 w-full rounded-full border border-[var(--ld-line-strong)] bg-[var(--ld-surface)] px-5 text-[color:var(--ld-ink)] placeholder:text-[color:var(--ld-text-3)] focus:border-[var(--ld-accent)] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="support-message" className="sr-only">
          {t('messageLabel')}
        </label>
        <textarea
          id="support-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('messagePlaceholder')}
          aria-describedby={status === 'error' ? 'support-error' : undefined}
          className="w-full rounded-2xl border border-[var(--ld-line-strong)] bg-[var(--ld-surface)] px-5 py-3 text-[color:var(--ld-ink)] placeholder:text-[color:var(--ld-text-3)] focus:border-[var(--ld-accent)] focus:outline-none"
        />
      </div>
      {/* Honeypot: off-screen, NOT display:none — some bots skip those. */}
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        name="company"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="h-12 rounded-full bg-[var(--ld-accent)] px-6 font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-[var(--ld-accent-hover)] disabled:opacity-60"
      >
        {status === 'submitting' ? t('sendingButton') : t('sendButton')}
      </button>
      {status === 'error' && (
        <p id="support-error" role="alert" className="text-sm text-[color:var(--ld-danger)]">
          {t('errorMessage')}
        </p>
      )}
    </form>
  );
};
