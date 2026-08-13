import type { PrivacyContent } from '../types';

// TODO(brand): basic placeholder — have legal counsel review before launch.
export const privacy: PrivacyContent = {
  title: 'Datenschutzerklärung',
  updated: '21. Juli 2026',
  intro:
    'SOMA („wir“, „uns“) befindet sich derzeit vor dem Launch und sammelt Anmeldungen für die Warteliste. Diese Erklärung beschreibt, was wir erfassen und warum.',
  whatWeCollect: {
    h2: 'Was wir erfassen',
    paragraph: {
      before: 'Wenn du der Warteliste beitrittst, erfassen wir die von dir angegebene E-Mail-Adresse. Wir nutzen ',
      after:
        ' (ConvertKit) als unseren E-Mail-Dienstleister — Kit speichert und verarbeitet deine E-Mail-Adresse in unserem Auftrag gemäß seiner eigenen Datenschutzerklärung. Außerdem erfassen wir Standard-Analysedaten (aufgerufene Seiten, verweisende Kampagne) über PostHog und Google Analytics, sofern diese aktiviert sind.',
    },
  },
  howWeUseIt: {
    h2: 'Wie wir es verwenden',
    body: 'Deine E-Mail-Adresse wird verwendet, um dir den Reset-Guide, für den du dich angemeldet hast, sowie gelegentliche Updates zum Launch zu senden. Analysedaten werden aggregiert genutzt, um zu verstehen, welche Seiten und Kampagnen funktionieren — sie werden nicht verwendet, um dich persönlich zu identifizieren.',
  },
  cookies: {
    h2: 'Cookies',
    body: 'Analyse-Cookies werden erst gesetzt, nachdem du deine Zustimmung gegeben hast. Wir verwenden keine Werbe- oder Tracking-Cookies.',
  },
  yourRights: {
    h2: 'Deine Rechte',
    body: 'Du kannst uns jederzeit bitten, deine E-Mail-Adresse aus unserer Liste zu entfernen, indem du uns eine E-Mail schreibst — siehe Kontakt unten — oder indem du den Abmeldelink in einer unserer E-Mails nutzt.',
  },
  changes: {
    h2: 'Änderungen',
    body: 'Wir können diese Erklärung im Laufe der Weiterentwicklung des Produkts aktualisieren. Das Datum oben wird dann entsprechend angepasst.',
  },
  contact: {
    h2: 'Kontakt',
    paragraph: { before: 'Fragen zu dieser Erklärung: ' },
  },
};
