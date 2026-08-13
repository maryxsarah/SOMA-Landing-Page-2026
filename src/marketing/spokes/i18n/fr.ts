import type { SpokeLocaleOverrides } from "./types";

const overrides: SpokeLocaleOverrides = {
  "oura-advisor-alternative": {
    subject: "Oura Advisor",
    navLabel: "Alternative à Oura Advisor",
    description:
      "SOMA est une alternative à Oura Advisor qui lit tes données Oura aux côtés de Whoop, des balances connectées et des CGM — un seul agent de santé IA pour tous tes appareils, pas seulement une bague.",
    hero: {
      eyebrow: "Alternative à Oura Advisor",
      h1: "Une alternative à Oura Advisor qui voit plus loin que la bague",
      lead: "Oura Advisor est le coach IA intégré à l'application Oura, et il fonctionne à partir d'une seule source : ta bague. SOMA est un agent de santé IA indépendant des fabricants qui lit tes données Oura en parallèle de tout le reste — Whoop, balance connectée, CGM, repas enregistrés — et répond avec un seul plan pour aujourd'hui.",
    },
    comparison: {
      competitor: "Oura Advisor",
      rows: [
        {
          dim: "Données analysées",
          them: "Données de la bague Oura",
          us: "Toutes les sources que tu connectes — bague, bracelet, balance, CGM, habitudes",
        },
        {
          dim: "Où ça se trouve",
          them: "Dans l'application Oura",
          us: "Un seul écran d'accueil — par chat ou à la voix",
        },
        {
          dim: "Qui lance la conversation",
          them: "Toi, en ouvrant l'application pour demander",
          us: "SOMA te contacte en premier quand quelque chose change",
        },
        {
          dim: "Si tu changes de matériel",
          them: "Les conseils restent chez Oura",
          us: "Indépendant des fabricants — ton historique te suit",
        },
        {
          dim: "Prix",
          them: "Inclus avec l'abonnement Oura",
          us: "À partir de 99 $/mois au lancement",
        },
      ],
    },
    sections: [
      {
        title: "Quand Oura Advisor suffit",
        body: [
          "Si la bague est ton seul tracker, Oura Advisor est un choix raisonnable par défaut : il est inclus avec l'abonnement, se trouve là où tes données sont déjà, et répond aux questions sur le sommeil, la préparation et l'activité à partir de ce seul flux.",
        ],
      },
      {
        title: "Quand tu as besoin d'une couche au-dessus de la bague",
        body: [
          "La plupart des personnes pour qui SOMA est conçu possèdent 2 à 4 appareils. La bague connaît la récupération, la balance connaît la composition corporelle, le CGM connaît la glycémie, l'agenda connaît la charge — et aucun coach lié à un seul fabricant n'est structurellement capable de lire l'appareil d'un concurrent. SOMA se place au-dessus du matériel : il analyse tous ces signaux à la fois et répond d'une seule voix, si bien qu'un score de préparation bas est interprété aux côtés de ton jour de cycle, des repas d'hier et des réunions de ce matin — pas isolément.",
        ],
        pills: ["bague oura", "whoop", "apple health", "balance connectée", "CGM", "+ tes habitudes"],
      },
    ],
    faq: {
      devices: {
        q: "SOMA remplace-t-il ma bague Oura ?",
        a: "Non. SOMA n'est pas du matériel — il lit les données que ta bague Oura produit déjà et les combine avec tes autres sources. Tu gardes la bague ; SOMA remplace le travail de traduction entre les applications.",
      },
      integrations: {
        q: "Comment SOMA récupère-t-il mes données Oura ?",
        a: "Via des API officielles, avec Apple Health comme plateforme centrale lorsque disponible, plus une option de secours manuelle/CSV — pour qu'aucun changement d'intégration ne puisse couper ton historique.",
      },
    },
  },

  "whoop-coach-alternative": {
    subject: "Whoop Coach",
    navLabel: "Alternative à Whoop Coach",
    description:
      "SOMA est une alternative à Whoop Coach qui lit tes données Whoop aux côtés de ta bague, ta balance et ton CGM — un agent de santé IA indépendant des fabricants, pas un coach lié à un seul bracelet.",
    hero: {
      eyebrow: "Alternative à Whoop Coach",
      h1: "Une alternative à Whoop Coach qui lit plus que le bracelet",
      lead: "Whoop Coach est l'assistant IA intégré à l'application Whoop, construit sur un seul flux : ton bracelet. SOMA est un agent de santé IA indépendant des fabricants qui analyse tes données Whoop en plus de ta bague, ta balance connectée, ton CGM et tes habitudes enregistrées — et répond avec un seul plan pour aujourd'hui, pas un tableau de bord de plus.",
    },
    comparison: {
      competitor: "Whoop Coach",
      rows: [
        {
          dim: "Données analysées",
          them: "Données du bracelet Whoop",
          us: "Toutes les sources que tu connectes — bracelet, bague, balance, CGM, habitudes",
        },
        {
          dim: "Où ça se trouve",
          them: "Dans l'application Whoop",
          us: "Un seul écran d'accueil — par chat ou à la voix",
        },
        {
          dim: "Qui lance la conversation",
          them: "Toi, en ouvrant l'application pour demander",
          us: "SOMA te contacte en premier quand quelque chose change",
        },
        {
          dim: "Si tu changes de matériel",
          them: "Les conseils restent chez Whoop",
          us: "Indépendant des fabricants — ton historique te suit",
        },
        {
          dim: "Prix",
          them: "Inclus avec l'abonnement Whoop",
          us: "À partir de 99 $/mois au lancement",
        },
      ],
    },
    sections: [
      {
        title: "Quand Whoop Coach suffit",
        body: [
          "Si l'effort et la récupération du bracelet sont les seuls signaux sur lesquels tu agis, Whoop Coach est un choix judicieux par défaut — il est inclus dans l'abonnement et s'exprime couramment sur les données que Whoop collecte lui-même.",
        ],
      },
      {
        title: "Quand un seul bracelet ne suffit plus à tout voir",
        body: [
          "La récupération n'est pas produite par le bracelet seul : l'architecture du sommeil, la phase du cycle, la réponse glycémique aux repas d'hier et les tendances de composition corporelle la font toutes évoluer. Les fabricants d'appareils sont enfermés dans une guerre du matériel et aucun ne construira de coaching sur l'appareil d'un concurrent — structurellement, c'est impossible. SOMA est la couche au-dessus de cette guerre : il lit chaque source que tu connectes et gagne en puissance à chaque appareil que tu ajoutes.",
        ],
        pills: ["whoop", "bague oura", "apple health", "balance connectée", "CGM", "+ tes habitudes"],
      },
    ],
    faq: {
      devices: {
        q: "SOMA remplace-t-il mon abonnement Whoop ?",
        a: "Non. SOMA lit les données que ton bracelet Whoop produit et les interprète aux côtés de tes autres sources. Le bracelet et son abonnement restent ; SOMA remplace le travail de recoupement que tu fais entre les applications.",
      },
    },
  },

  "cross-device-reasoning": {
    subject: "Analyse multi-appareils",
    navLabel: "Analyse multi-appareils",
    description:
      "SOMA lit ta bague, ton bracelet, ta balance connectée et ton CGM ensemble — jour du cycle, sommeil, préparation, repas — et répond avec un seul plan au lieu de quatre tableaux de bord.",
    hero: {
      eyebrow: "Analyse multi-appareils",
      h1: "Une seule IA qui lit tous tes objets connectés — ensemble",
      lead: "Chaque appareil de santé produit son propre score, dans sa propre application, aveugle aux autres. Les agents de SOMA analysent conjointement l'ensemble de ces données — jour du cycle, phases de sommeil, préparation, historique des blessures, repas récents, composition corporelle — et répondent d'une seule voix : un seul plan pour aujourd'hui, pas quatre tableaux de bord.",
    },
    sections: [
      {
        title: "Pourquoi un seul signal n'est jamais la réponse",
        body: [
          "Presque rien de ce que fait ton corps ne peut s'expliquer par un seul chiffre isolé. Un score de préparation bas à côté d'un agenda complètement rempli signifie quelque chose de différent du même score un jour de repos ; un score de sommeil élevé peut cacher une nuit de sommeil léger que l'entraînement ressentira. SOMA interprète chaque signal dans le contexte de tous les autres — ce qu'aucune application liée à un seul appareil n'est conçue pour faire.",
        ],
      },
      {
        title: "Ce qu'il lit",
        body: [
          "Connecté une seule fois via des API officielles — avec Apple Health comme plateforme centrale et une option de secours manuelle/CSV — SOMA lit ce que tu possèdes maintenant et tout ce vers quoi tu changeras ensuite.",
        ],
        pills: ["bague oura", "whoop", "apple health", "balance connectée", "CGM", "charge de l'agenda", "repas enregistrés"],
      },
    ],
    faq: {
      devices: {
        q: "Quels appareils SOMA peut-il lire ensemble ?",
        a: "Bagues, bracelets, balances connectées et CGM — via des API officielles, Apple Health comme plateforme centrale, et une option de secours manuelle/CSV pour tout ce qui n'a pas d'intégration.",
      },
    },
  },

  "proactive-ai-coach": {
    subject: "Agent de santé IA proactif",
    navLabel: "Contact proactif",
    description:
      "SOMA est un agent de santé IA qui te contacte en premier : quand tes données changent suffisamment pour compter, il t'envoie un message avec un ajustement concret pour aujourd'hui.",
    hero: {
      eyebrow: "Contact proactif",
      h1: "Un agent de santé qui te contacte en premier",
      lead: "Les tableaux de bord attendent d'être ouverts. SOMA surveille tes données connectées et, quand quelque chose change suffisamment pour compter — la préparation qui chute pendant que ton agenda se remplit, une dette de sommeil qui s'accumule face à un bloc d'entraînement — il te contacte en premier avec un ajustement concret, au lieu d'attendre qu'on le lui demande.",
    },
    sections: [
      {
        title: "Du signal, pas du bruit",
        body: [
          "Proactif ne veut pas dire bavard. SOMA prend la parole quand la vue d'ensemble multi-appareils change réellement, et reste silencieux quand ce n'est pas le cas — le critère est « un bon coach t'interromprait-il pour ça ? ». Tu peux toujours répondre : écris-le ou dis-le, comme tu le ferais avec un coach qui connaît déjà tes données.",
        ],
      },
    ],
    faq: {
      proactive: {
        q: "À quelle fréquence SOMA m'envoie-t-il un message ?",
        a: "Seulement quand la vue d'ensemble change suffisamment pour compter — un changement significatif de préparation, de dette de sommeil ou de charge. C'est le seuil d'interruption d'un coach, pas celui d'une notification d'engagement.",
      },
    },
  },

  "combine-wearable-data": {
    subject: "combiner les données de tous tes objets connectés",
    navLabel: "Combiner les données de tes objets connectés",
    description:
      "Une façon pratique de lire ta bague, ton bracelet, ta balance et ton CGM comme une seule vue d'ensemble : choisis une plateforme centrale, connecte ce que tu possèdes, et compare quotidiennement le signal de ton corps à celui de ta vie.",
    hero: {
      eyebrow: "Guide pratique",
      h1: "Comment combiner les données de tous tes objets connectés",
      lead: "Tu n'as pas besoin de nouveau matériel pour avoir une vue d'ensemble — tu as besoin d'une plateforme centrale, de deux questions honnêtes, et d'une habitude qui prend deux minutes chaque matin. Voici la version manuelle, et là où SOMA l'automatise.",
    },
    howToSteps: [
      {
        name: "Fais passer tout par une seule plateforme centrale",
        text: "Sur iPhone, active l'accès en écriture à Apple Health pour chaque application d'appareil que tu possèdes (Oura, Whoop, balance, CGM). Cela te donne une seule chronologie au lieu de quatre applications.",
      },
      {
        name: "Comble les lacunes manuellement",
        text: "Tout ce qui n'a pas d'intégration — repas, horaires de caféine, ressenti d'une séance — s'ajoute sous forme de note ou de CSV. C'est le contexte incomplet qui rend les scores isolés trompeurs.",
      },
      {
        name: "Pose-toi deux questions chaque matin",
        text: "Que dit le signal de mon corps (préparation, HRV, sommeil) ? Que dit le signal de ma vie (agenda, charge, alimentation jusqu'ici) ? S'ils sont en désaccord, ce désaccord est l'information.",
      },
      {
        name: "Laisse un agent faire le recoupement",
        text: "Faire ça à la main fonctionne — et c'est vraiment difficile à maintenir dans la durée. SOMA lit automatiquement chaque source connectée et répond avec un seul plan pour aujourd'hui, si bien que l'habitude de deux minutes devient nulle.",
      },
    ],
    sections: [
      {
        title: "Pourquoi la version manuelle finit par craquer",
        body: [
          "Recouper les applications chaque matin signifie garder des chiffres en tête et se souvenir de ce qui comptait tel ou tel jour. Ça tient à peu près aussi longtemps que n'importe quelle habitude basée sur la volonté. La solution n'est pas plus de discipline — c'est de déplacer le travail de traduction vers un logiciel qui lit toutes les sources à la fois.",
        ],
      },
    ],
    faq: {
      integrations: {
        q: "Ai-je besoin d'Apple Health pour que ça fonctionne ?",
        a: "C'est la plateforme centrale la plus simple sur iPhone, mais ce n'est pas obligatoire — SOMA se connecte aussi directement aux API des appareils et accepte les entrées manuelles/CSV pour tout ce qui n'a pas d'intégration.",
      },
    },
  },

  "multi-device-owners": {
    subject: "les personnes possédant 2 à 4 appareils de santé",
    navLabel: "Pour les possesseurs de plusieurs appareils",
    description:
      "Tu possèdes une bague, un bracelet, une balance, peut-être un CGM — et tu devines encore chaque matin ? SOMA transforme 2 à 4 scores déconnectés en un seul plan pour aujourd'hui, conçu exactement pour toi.",
    hero: {
      eyebrow: "Pour qui",
      h1: "Pour ceux qui possèdent 2 à 4 appareils de santé et devinent encore",
      lead: "Les personnes très performantes possèdent déjà les capteurs — une bague, un bracelet, une balance, parfois un CGM — et ne savent toujours pas quoi faire chaque matin, parce que chaque appareil produit son propre score et qu'aucun ne communique avec les autres. SOMA est conçu exactement pour cette personne.",
    },
    sections: [
      {
        title: "La taxe de fragmentation que tu paies déjà",
        body: [
          "Les possesseurs de plusieurs appareils paient généralement 30 à 90 $/mois répartis entre les applications, plus 200 à 600 $/mois si des coachs humains font l'interprétation. Cet argent achète quatre avis qui ne se rencontrent jamais. SOMA est positionné par rapport à cette pile de coûts — il remplace la couche de traduction, pas tes appareils.",
        ],
      },
      {
        title: "Ce qui change avec une seule voix",
        body: [
          "Les matins ne commencent plus en sautant d'une application à l'autre. Tu racontes à SOMA un repas ou un entraînement — à l'écrit ou à l'oral — et il répond à partir de tout ce qu'il peut voir : jour du cycle, sommeil, préparation, historique des blessures, composition corporelle. Quand quelque chose change suffisamment pour compter, il te contacte en premier.",
        ],
        pills: ["un seul écran d'accueil", "chat + voix", "contact proactif", "indépendant des fabricants"],
      },
    ],
    faq: {
      devices: {
        q: "Je n'ai qu'un seul appareil — SOMA est-il fait pour moi ?",
        a: "SOMA fonctionne avec une seule source, mais sa valeur augmente à chaque appareil que tu ajoutes — l'analyse conjointe entre appareils est tout l'intérêt. Avec un seul appareil, commence par le Guide de Réinitialisation gratuit.",
      },
    },
  },
};

export default overrides;
