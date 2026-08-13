import type { TermsContent } from '../types';

// TODO(brand): basic placeholder — have legal counsel review before launch.
export const terms: TermsContent = {
  title: 'Conditions d\'utilisation',
  updated: '21 juillet 2026',
  intro:
    'En utilisant ce site web ou en rejoignant la liste d\'attente SOMA, tu acceptes ces conditions. SOMA n\'est actuellement pas encore lancé — le produit décrit sur ce site n\'est pas encore disponible publiquement.',
  waitlist: {
    h2: 'La liste d\'attente',
    body: 'Rejoindre la liste d\'attente est gratuit et ne crée aucune obligation d\'achat. Nous t\'enverrons par e-mail le Guide de Réinitialisation et des mises à jour occasionnelles ; tu peux te désinscrire à tout moment.',
  },
  notMedicalDevice: {
    h2: 'Ce n\'est pas un dispositif médical',
    body: 'SOMA est un outil de bien-être général. Il ne diagnostique pas, ne traite pas, et ne remplace pas l\'avis d\'un professionnel de santé qualifié. Consulte ton médecin pour toute question médicale.',
  },
  intellectualProperty: {
    h2: 'Propriété intellectuelle',
    body: 'Tout le contenu de ce site — textes, graphismes et éléments de marque — appartient à SOMA sauf mention contraire, et ne peut être réutilisé sans autorisation.',
  },
  noWarranty: {
    h2: 'Aucune garantie',
    body: 'Ce site et toute information qu\'il contient sont fournis « tels quels », sans garantie d\'aucune sorte, dans toute la mesure permise par la loi.',
  },
  changes: {
    h2: 'Modifications',
    body: 'Nous pouvons mettre à jour ces conditions à mesure que le produit évolue. Nous mettrons à jour la date ci-dessus lorsque nous le ferons.',
  },
  contact: {
    h2: 'Contact',
    paragraph: { before: 'Des questions sur ces conditions : ' },
  },
};
