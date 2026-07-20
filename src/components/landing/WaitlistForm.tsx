'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { track } from '@/lib/analytics';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Kit (ConvertKit) form 9698415, account soma4health (uid c77655bc36). CORS-open. */
const KIT_FORM_ACTION = 'https://app.kit.com/forms/9698415/subscriptions';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Email-capture form (waitlist / lead-magnet opt-in), submitting straight to
 * Kit — no in-app storage. Anti-bot without CAPTCHA: honeypot field + time
 * gate, both checked client-side before ever contacting Kit.
 */
export const WaitlistForm: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
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
    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      return;
    }
    // Honeypot filled or submitted too fast: pretend success, never contact Kit.
    if (hp || Date.now() - mountedAt.current < 2000) {
      setStatus('success');
      return;
    }
    setStatus('submitting');
    track('waitlist_submit', { path: pathname ?? '/' });
    try {
      const body = new FormData();
      body.append('email_address', email);
      const res = await fetch(KIT_FORM_ACTION, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });
      const data = await res.json();
      if (!res.ok || data.status !== 'success') throw new Error('request failed');
      setStatus('success');
      track('waitlist_success', { path: pathname ?? '/' });
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
        You’re on the list — the Reset Guide is on its way to your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={cn('flex w-full max-w-md flex-col gap-3', className)}>
      <div className="flex gap-2">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-describedby={status === 'error' ? 'waitlist-error' : undefined}
          className="h-12 flex-1 rounded-full border border-[var(--ld-line-strong)] bg-[var(--ld-surface)] px-5 text-[color:var(--ld-ink)] placeholder:text-[color:var(--ld-text-3)] focus:border-[var(--ld-accent)] focus:outline-none"
        />
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
          {status === 'submitting' ? 'Joining…' : 'Join'}
        </button>
      </div>
      {status === 'error' && (
        <p id="waitlist-error" role="alert" className="text-sm text-[color:var(--ld-danger)]">
          Something went wrong — check the email and try again.
        </p>
      )}
      <p className="text-xs text-[color:var(--ld-text-3)]">
        You’ll get the free Reset Guide right away, then launch updates — nothing else.{' '}
        {/* TODO(brand): link the real privacy policy */}
      </p>
    </form>
  );
};
