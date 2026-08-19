import { Playfair_Display, Instrument_Sans } from 'next/font/google';

/**
 * Kinetic v7 typefaces — distinct from the site's Manrope/Newsreader pair
 * (layout.tsx), scoped to their own CSS vars so this homepage redesign
 * doesn't change fonts anywhere else (spokes, legal pages).
 */
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-kinetic-display',
  display: 'swap',
});
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-kinetic-body',
  display: 'swap',
});

export const kineticFontVariables = `${playfairDisplay.variable} ${instrumentSans.variable}`;
