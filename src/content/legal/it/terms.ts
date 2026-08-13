import type { TermsContent } from '../types';

// TODO(brand): basic placeholder — have legal counsel review before launch.
export const terms: TermsContent = {
  title: 'Termini di servizio',
  updated: '21 luglio 2026',
  intro:
    'Utilizzando questo sito web o iscrivendoti alla lista d’attesa di SOMA, accetti questi termini. SOMA è attualmente in fase di pre-lancio — il prodotto descritto su questo sito non è ancora disponibile al pubblico.',
  waitlist: {
    h2: 'La lista d’attesa',
    body: 'Iscriversi alla lista d’attesa è gratuito e non comporta alcun obbligo di acquisto. Ti invieremo via email la Guida al Reset e occasionali aggiornamenti; puoi annullare l’iscrizione in qualsiasi momento.',
  },
  notMedicalDevice: {
    h2: 'Non è un dispositivo medico',
    body: 'SOMA è uno strumento di benessere generale. Non diagnostica, non cura e non sostituisce il parere di un medico qualificato. Per domande mediche, parla con il tuo medico.',
  },
  intellectualProperty: {
    h2: 'Proprietà intellettuale',
    body: 'Tutti i contenuti presenti su questo sito — testi, elementi grafici e branding — appartengono a SOMA salvo diversa indicazione, e non possono essere riutilizzati senza autorizzazione.',
  },
  noWarranty: {
    h2: 'Nessuna garanzia',
    body: 'Questo sito e qualsiasi informazione in esso contenuta sono forniti “così come sono”, senza garanzie di alcun tipo, nella misura massima consentita dalla legge.',
  },
  changes: {
    h2: 'Modifiche',
    body: 'Potremmo aggiornare questi termini man mano che il prodotto si evolve. Aggiorneremo la data sopra quando lo faremo.',
  },
  contact: {
    h2: 'Contatti',
    paragraph: { before: 'Domande su questi termini: ' },
  },
};
