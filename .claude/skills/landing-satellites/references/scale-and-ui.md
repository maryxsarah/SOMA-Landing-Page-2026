# Scale model + landing design system

## The `.ld` viewport zoom model (recommended: continuous formula)

The design is authored at ONE canonical width (e.g. a 1440 or 1920 Figma frame).
Instead of re-laying-out per breakpoint, the whole landing scales with CSS `zoom`
(not `transform: scale` — zoom reflows layout, keeps scroll/hit-targets correct).

`src/components/landing/landing.css`:

```css
/* Landing scope: tokens + scale. Apply class="ld" on the landing <main>. */
.ld {
  /* Design tokens — pull the real values from the Figma variables, never
     hardcode approximations in components. */
  --ld-accent: #eeff04;
  --ld-ink: #111315;
  --ld-bg-dark: #101012;
  --ld-text-inverse: #dbdbdb;

  font-family: 'Inter', sans-serif;
  background: var(--ld-bg-dark);
  color: #fff;
}

.ld-serif {
  font-family: var(--font-display), Georgia, serif;
  font-weight: 400;
}

/* Proportional scaling. Below 1440×900 the page zooms DOWN so the hero always
   fits the first screen; 1440→1920 content is fixed; above 1920 the WHOLE page
   (type, spacing, art, footer) zooms UP with viewport width — the design-frame
   composition at a larger physical size. The svh term keeps the first screen
   intact on short/ultrawide monitors (frame-height budget: nav + gap + hero). */
@media (min-width: 1280px) {
  .ld { zoom: min(calc(100vw / 1440px), calc(100svh / 900px), 1); }
}
@media (min-width: 1920px) {
  .ld { zoom: min(calc(100vw / 1920px), calc(100svh / 976px)); }
}
```

Tune the two height divisors (900/976) to the design frame: `nav-height + gap +
hero-height` of the canonical frame. Below 1280 (tablet/mobile) do NOT zoom —
use a real responsive layout (stack columns, grid 4→2→1).

### Alternative: stepped zoom ladder (when the hub must stay pixel-frozen 1440–1920)

```css
.landing-fluid { /* base zoom 1 */ }
@media (min-width: 1920px) { .landing-fluid { zoom: 1.2;  } .landing-fluid-skip { zoom: calc(1/1.2); } }
@media (min-width: 2560px) { .landing-fluid { zoom: 1.65; } .landing-fluid-skip { zoom: calc(1/1.65); } }
@media (min-width: 3840px) { .landing-fluid { zoom: 2;    } .landing-fluid-skip { zoom: 0.5; } }
```

Two traps in the ladder variant:
- **`.landing-fluid-skip`** — any descendant sized in `vh`/`svh` (e.g. an
  `h-[100svh]` hero) must get the inverse-zoom class or it balloons. Change the
  outer zoom → change the inverse in the same edit.
- **vw-anchored decorations** (background beams/blobs): parent `zoom` multiplies
  vw values, so per-breakpoint pre-divide them (20vw at zoom 1.2 → 16.67vw) to
  keep the same rendered viewport fraction.

Mirror the ladder in `next.config.ts`:
`images: { deviceSizes: [640, 768, 1024, 1280, 1440, 1920, 2560, 3840] }`.

## Container (section shell)

```tsx
/** 80px side padding at xl, fluid content; past 1920 the `.ld` zoom scales it. */
export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('mx-auto w-full max-w-[1920px] px-4 md:px-16 xl:px-20', className)}>{children}</div>
);
```

## Sticky nav (dark translucent — deliberately NO backdrop-blur)

```tsx
<nav className="sticky top-0 z-50 flex h-16 items-center justify-between bg-[rgba(12,16,17,0.4)] p-4">
```

No `backdrop-blur`: on zoomed pages the composite layer can exceed the GPU
texture cap (15k+ px tall pages) and the nav goes blank. Translucent flat color
only. Nav links are hub-section anchors (`/#features`, `/#pricing`, `/#faq`) —
they must work from spoke pages too, so build hrefs as `onLanding ? '#x' : '/#x'`
via `usePathname()`. CTA is the shared button component with `size="sm"`.

## Footer (full-bleed, registry-driven sitemap)

The footer is NOT inside Container — full-width with its own small padding:

```tsx
<footer className="bg-[#191a1c]">
  <div className="flex flex-col gap-16 px-4 py-6 md:px-6">
```

Sitemap columns are GENERATED from the spoke registry (one column per bucket)
plus static Product / Legal columns:

```tsx
function spokeColumn(title: string, bucket: SpokeBucket) {
  return {
    title,
    links: spokesInBucket(bucket).map((s) => ({ label: s.navLabel ?? cap(s.subject), href: spokePath(s) })),
  };
}
// columns: Product, spokeColumn('Features','features'), spokeColumn('How to','how-to'),
//          spokeColumn('Use cases','for'), spokeColumn('Alternatives','alternatives'), Legal
```

Legal column links to the parent domain's privacy/terms; include a "Cookie
settings" `<button>` dispatching the consent-banner open event (not a link).

## CTA button (single funnel chokepoint)

EVERY marketing CTA goes through one component so one `track()` call covers the
whole funnel:

```tsx
export const AcidButton: React.FC<AcidButtonProps> = ({ href, variant = 'lime', size = 'lg', arrow, shimmer, className, children }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() =>
        track('landing_cta_click', {
          label: typeof children === 'string' ? children : href,
          href,
          path: pathname ?? '/',
          variant,
        })
      }
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-transform hover:scale-[1.02] active:scale-[0.99]',
        size === 'lg' ? 'h-16 px-8 text-[18px]' : 'h-8 px-5 text-[14px]',
        variant === 'lime' && 'relative z-20 bg-[var(--ld-accent)] text-[color:var(--ld-ink)] shadow-[0_0_40px_rgba(238,255,4,0.45)]',
        variant === 'outline' && 'border border-[var(--ld-ink)] text-[color:var(--ld-ink)]',
        variant === 'outline-light' && 'border border-white/40 text-white',
        shimmer && 'ld-shimmer',
        className,
      )}
    >
      {children}
      {arrow && <span aria-hidden>↗</span>}
    </Link>
  );
};
```

## Landing composer + hub route

`LandingPage.tsx` — loads the display font, wraps in `.ld`, stacks small section
components (each ≤250 lines, one file per section in `sections/`):

```tsx
const display = Playfair_Display({ subsets: ['latin'], weight: '400', variable: '--font-display' });

export const LandingPage = () => (
  <main className={`ld ${display.variable} min-h-screen`}>
    <AuthRedirect />
    <StickyNav />
    <Hero /> <SocialProof /> <FeaturesBento /> <HowItWorks />
    {/* …section per topic… */}
    <PricingSection /> <Faq /> <ReadyBand />
    <Footer />
  </main>
);
```

`src/app/page.tsx` (Server Component — SSR-crawlable):

```tsx
export const metadata = pageMetadata({ archetype: 'hub', description: '…', path: '/' });

export default function Home() {
  const ld = [organization(), webSite(), softwareApplication(), hubWebPage()];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      <LandingPage />
    </>
  );
}
```

**Auth redirect is a client enhancement, never a server redirect** (a server
`redirect('/dashboard')` makes the landing invisible to crawlers):

```tsx
'use client';
export const AuthRedirect = () => {
  const router = useRouter();
  useEffect(() => {
    const preview = window.location.search.includes('landing-preview');
    if (!preview && localStorage.getItem('access_token')) router.replace('/dashboard');
  }, [router]);
  return null;
};
```

## Misc polish that ships with the system

- `.ld-shimmer` keyframe sweep on the primary CTA; marquee strip via
  `@keyframes ld-marquee`; wrap both in `@media (prefers-reduced-motion: reduce)`
  → `animation: none`.
- Eyebrow component renders `( label )` in `text-white/50` — cheap visual system.
- Colors/gradients: lift EXACT values from Figma variables
  (`get_variable_defs` if Figma MCP is available), never eyeball fallbacks.
