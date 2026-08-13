import type { PrivacyContent } from '../types';

// TODO(brand): basic placeholder — have legal counsel review before launch.
export const privacy: PrivacyContent = {
  title: 'Politique de confidentialité',
  updated: '21 juillet 2026',
  intro:
    'SOMA (« nous ») n\'est actuellement pas encore lancé et collecte des inscriptions à la liste d\'attente. Cette politique explique ce que nous collectons et pourquoi.',
  whatWeCollect: {
    h2: 'Ce que nous collectons',
    paragraph: {
      before: 'Quand tu rejoins la liste d\'attente, nous collectons l\'adresse e-mail que tu fournis. Nous utilisons ',
      after:
        ' (ConvertKit) comme fournisseur de service e-mail — Kit stocke et traite ton e-mail en notre nom, conformément à sa propre politique de confidentialité. Nous collectons également des données analytiques standard (pages consultées, campagne d\'origine) via PostHog et Google Analytics lorsque ceux-ci sont activés.',
    },
  },
  howWeUseIt: {
    h2: 'Comment nous l\'utilisons',
    body: 'Ton e-mail est utilisé pour t\'envoyer le Guide de Réinitialisation auquel tu t\'inscris et des mises à jour occasionnelles sur le lancement. Les données analytiques sont utilisées de manière agrégée pour comprendre quelles pages et campagnes fonctionnent — elles ne sont pas utilisées pour t\'identifier personnellement.',
  },
  cookies: {
    h2: 'Cookies',
    body: 'Les cookies analytiques ne sont déposés qu\'une fois que tu as donné ton consentement. Nous n\'utilisons pas de cookies publicitaires ou de suivi.',
  },
  yourRights: {
    h2: 'Tes droits',
    body: 'Tu peux nous demander de supprimer ton e-mail de notre liste à tout moment en nous écrivant — voir Contact ci-dessous — ou en utilisant le lien de désinscription présent dans chaque e-mail que nous envoyons.',
  },
  changes: {
    h2: 'Modifications',
    body: 'Nous pouvons mettre à jour cette politique à mesure que le produit évolue. Nous mettrons à jour la date ci-dessus lorsque nous le ferons.',
  },
  contact: {
    h2: 'Contact',
    paragraph: { before: 'Des questions sur cette politique : ' },
  },
};
