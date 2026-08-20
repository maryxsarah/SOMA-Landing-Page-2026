'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { track } from '@/lib/analytics';
import { readLastAttribution, readOriginalAttribution } from '@/lib/attribution';

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
  const t = useTranslations('waitlistForm');
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

    // Attribution rides along to BOTH destinations. captureAttribution()
    // has been storing UTMs since launch, but nothing read them back: Kit
    // received the bare email, so no waitlist row could be traced to the
    // creator or campaign that produced it — which is the whole basis of
    // the performance-only creator deals. First-touch credits discovery,
    // last-touch credits the click that converted; send both and decide the
    // payout rule in Kit, not here.
    const first = readOriginalAttribution();
    const last = readLastAttribution();
    const attribution = {
      utm_source: last?.utm_source ?? '',
      utm_medium: last?.utm_medium ?? '',
      utm_campaign: last?.utm_campaign ?? '',
      utm_content: last?.utm_content ?? '',
      first_touch_source: first?.utm_source ?? '',
      first_touch_campaign: first?.utm_campaign ?? '',
      landing_path: first?.landing_path ?? '',
      signup_path: pathname ?? '/',
    };

    track('waitlist_submit', { path: pathname ?? '/', ...attribution });
    try {
      const body = new FormData();
      body.append('email_address', email);
      // Kit stores custom fields as `fields[name]`; each name below must
      // exist as a custom field on the soma4health account or Kit silently
      // drops it (the subscription itself still succeeds).
      for (const [key, value] of Object.entries(attribution)) {
        if (value) body.append(`fields[${key}]`, value);
      }
      const res = await fetch(KIT_FORM_ACTION, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });
      const data = await res.json();
      if (!res.ok || data.status !== 'success') throw new Error('request failed');
      setStatus('success');
      track('waitlist_success', { path: pathname ?? '/', ...attribution });
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
      <div className="flex gap-2">
        <label htmlFor="waitlist-email" className="sr-only">
          {t('emailLabel')}
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
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
          {status === 'submitting' ? t('joiningButton') : t('joinButton')}
        </button>
      </div>
      {status === 'error' && (
        <p id="waitlist-error" role="alert" className="text-sm text-[color:var(--ld-danger)]">
          {t('errorMessage')}
        </p>
      )}
      {/* This line is the only answer to "are you going to spam me?", so it
          sits right under the primary conversion and has to be readable.
          --ld-text-3 (#a7b0b6) at 12px measured 2.20:1 on the white card —
          AA wants 4.5:1. --ld-text-2 (#565f66) is 6.42:1. */}
      <p className="text-[13px] text-[color:var(--ld-text-2)]">
        {t('disclaimer')}{' '}
        {/* TODO(brand): link the real privacy policy */}
      </p>
    </form>
  );
};
