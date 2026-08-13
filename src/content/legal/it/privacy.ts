import type { PrivacyContent } from '../types';

// TODO(brand): basic placeholder — have legal counsel review before launch.
export const privacy: PrivacyContent = {
  title: 'Informativa sulla privacy',
  updated: '21 luglio 2026',
  intro:
    'SOMA (“noi”) è attualmente in fase di pre-lancio e raccoglie iscrizioni alla lista d’attesa. Questa informativa spiega cosa raccogliamo e perché.',
  whatWeCollect: {
    h2: 'Cosa raccogliamo',
    paragraph: {
      before: 'Quando ti iscrivi alla lista d’attesa, raccogliamo l’indirizzo email che fornisci. Utilizziamo ',
      after:
        ' (ConvertKit) come nostro fornitore di servizi email — Kit conserva ed elabora la tua email per nostro conto secondo la propria informativa sulla privacy. Raccogliamo inoltre dati analitici standard (pagine visualizzate, campagna di riferimento) tramite PostHog e Google Analytics quando questi sono attivi.',
    },
  },
  howWeUseIt: {
    h2: 'Come li utilizziamo',
    body: 'La tua email viene utilizzata per inviarti la Guida al Reset a cui ti sei iscritto e occasionali aggiornamenti sul lancio. I dati analitici vengono utilizzati in forma aggregata per capire quali pagine e campagne funzionano — non vengono utilizzati per identificarti personalmente.',
  },
  cookies: {
    h2: 'Cookie',
    body: 'I cookie analitici vengono impostati solo dopo aver dato il consenso. Non utilizziamo cookie pubblicitari o di tracciamento.',
  },
  yourRights: {
    h2: 'I tuoi diritti',
    body: 'Puoi chiederci di rimuovere la tua email dalla nostra lista in qualsiasi momento scrivendoci — vedi Contatti qui sotto — oppure utilizzando il link di cancellazione presente in ogni email che inviamo.',
  },
  changes: {
    h2: 'Modifiche',
    body: 'Potremmo aggiornare questa informativa man mano che il prodotto si evolve. Aggiorneremo la data sopra quando lo faremo.',
  },
  contact: {
    h2: 'Contatti',
    paragraph: { before: 'Domande su questa informativa: ' },
  },
};
