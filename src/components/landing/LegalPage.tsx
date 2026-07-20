import { Container } from './Container';
import { Footer } from './Footer';
import { StickyNav } from './StickyNav';

/** Shared shell for plain-text legal pages (privacy, terms) — no zoom scaling, just readable prose. */
export const LegalPage: React.FC<{
  title: string;
  updated: string;
  children: React.ReactNode;
}> = ({ title, updated, children }) => (
  <div className="ld-theme min-h-screen">
    <StickyNav />
    <main className="ld">
      <Container className="py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="ld-serif text-4xl leading-tight font-medium">{title}</h1>
          <p className="mt-2 text-sm text-[color:var(--ld-text-3)]">Last updated {updated}</p>
          <div className="mt-10 flex flex-col gap-6 text-[15px] leading-relaxed text-[color:var(--ld-text-2)] [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[color:var(--ld-ink)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[color:var(--ld-ink)]">
            {children}
          </div>
        </div>
      </Container>
    </main>
    <Footer />
  </div>
);
