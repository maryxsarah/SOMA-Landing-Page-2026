import { resolveFaq, spokePath } from './registry';
import type { SpokeDef } from './types';

/**
 * Markdown twin of a spoke page — the agent surface. Served with
 * Content-Type: text/markdown at `<route>.md` (via the edge proxy rewrite)
 * and /spoke-md/<bucket>/<slug>.
 */
export function spokeToMarkdown(spoke: SpokeDef, origin: string): string {
  const url = `${origin}${spokePath(spoke)}`;
  const lines: string[] = [];

  lines.push(`# ${spoke.hero.h1}`, '', spoke.hero.lead, '');

  if (spoke.howToSteps?.length) {
    lines.push('## Steps', '');
    spoke.howToSteps.forEach((s, i) => lines.push(`${i + 1}. **${s.name}** — ${s.text}`));
    lines.push('');
  }

  if (spoke.comparison) {
    lines.push(
      '## At a glance',
      '',
      `| | ${spoke.comparison.competitor} | SOMA |`,
      '| --- | --- | --- |',
    );
    for (const row of spoke.comparison.rows) {
      lines.push(`| ${row.dim} | ${row.them} | ${row.us} |`);
    }
    lines.push('');
  }

  for (const section of spoke.sections) {
    lines.push(`## ${section.title}`, '');
    for (const p of section.body) lines.push(p, '');
    if (section.pills?.length) {
      lines.push(section.pills.map((p) => `- ${p}`).join('\n'), '');
    }
  }

  if (spoke.faq.length) {
    lines.push('## FAQ', '');
    for (const item of spoke.faq) {
      const { q, a } = resolveFaq(item);
      lines.push(`### ${q}`, '', a, '');
    }
  }

  lines.push('---', '', `Canonical: ${url}`);
  return lines.join('\n');
}
