import type { SpokeLocaleOverrides } from './types';

const overrides: SpokeLocaleOverrides = {
  'oura-advisor-alternative': {
    subject: 'Oura Advisor',
    navLabel: 'Oura Advisor-Alternative',
    description:
      'SOMA ist eine Oura Advisor-Alternative, die deine Oura-Daten zusammen mit Whoop, Smartwaagen und CGMs liest — ein KI-Gesundheitsagent für jedes Gerät, nicht nur einen Ring.',
    hero: {
      eyebrow: 'Oura Advisor-Alternative',
      h1: 'Eine Oura Advisor-Alternative, die mehr sieht als nur den Ring',
      lead: 'Oura Advisor ist der KI-Coach in der Oura-App und arbeitet mit einer einzigen Quelle: deinem Ring. SOMA ist ein herstellerunabhängiger KI-Gesundheitsagent, der deine Oura-Daten zusammen mit allem anderen liest — Whoop, Smartwaage, CGM, protokollierte Mahlzeiten — und mit einem Plan für heute antwortet.',
    },
    comparison: {
      competitor: 'Oura Advisor',
      rows: [
        { dim: 'Daten, auf denen es basiert', them: 'Daten des Oura-Rings', us: 'Jede Quelle, die du verbindest — Ring, Band, Waage, CGM, Gewohnheiten' },
        { dim: 'Wo es lebt', them: 'In der Oura-App', us: 'Ein Startbildschirm — Chat oder Sprache' },
        { dim: 'Wer das Gespräch beginnt', them: 'Du öffnest die App und fragst', us: 'SOMA meldet sich zuerst, wenn sich etwas ändert' },
        { dim: 'Wenn du die Hardware wechselst', them: 'Die Empfehlungen bleiben bei Oura', us: 'Herstellerunabhängig — deine Historie geht mit dir mit' },
        { dim: 'Preis', them: 'In der Oura-Mitgliedschaft enthalten', us: 'Ab $19,99/Monat zum Launch' },
      ],
    },
    sections: [
      {
        title: 'Wenn Oura Advisor ausreicht',
        body: [
          'Wenn der Ring dein einziger Tracker ist, ist Oura Advisor eine vernünftige Standardwahl: Er ist in der Mitgliedschaft kostenlos enthalten, lebt dort, wo deine Daten ohnehin schon sind, und beantwortet Fragen zu Schlaf, Bereitschaft und Aktivität aus diesem einen Datenstrom.',
        ],
      },
      {
        title: 'Wenn du eine Ebene über dem Ring brauchst',
        body: [
          'Die meisten Menschen, für die SOMA gebaut ist, besitzen 2–4 Geräte. Der Ring kennt die Erholung, die Waage kennt die Körperzusammensetzung, das CGM kennt den Blutzucker, der Kalender kennt die Belastung — und kein Coach eines einzelnen Herstellers kann strukturell das Gerät eines Konkurrenten lesen. SOMA steht über der Hardware: Es denkt über all diese Signale gleichzeitig nach und antwortet mit einer Stimme, sodass ein niedriger Bereitschaftswert im Zusammenhang mit deinem Zyklustag, den gestrigen Mahlzeiten und den heutigen Meetings interpretiert wird — nicht isoliert.',
        ],
        pills: ['oura-ring', 'whoop', 'apple health', 'smartwaage', 'CGM', '+ deine gewohnheiten'],
      },
    ],
    faq: {
      devices: {
        q: 'Ersetzt SOMA meinen Oura-Ring?',
        a: 'Nein. SOMA ist keine Hardware — es liest die Daten, die dein Oura-Ring bereits erzeugt, und kombiniert sie mit deinen anderen Quellen. Du behältst den Ring; SOMA übernimmt die Übersetzungsarbeit zwischen den Apps.',
      },
      integrations: {
        q: 'Wie bekommt SOMA meine Oura-Daten?',
        a: 'Über offizielle APIs, mit Apple Health als Drehscheibe, wo verfügbar, plus manueller Eingabe/CSV als Fallback — sodass keine einzelne Änderung an einer Integration deine Historie kappen kann.',
      },
    },
  },

  'whoop-coach-alternative': {
    subject: 'Whoop Coach',
    navLabel: 'Whoop Coach-Alternative',
    description:
      'SOMA ist eine Whoop Coach-Alternative, die deine Whoop-Daten zusammen mit deinem Ring, deiner Waage und deinem CGM liest — ein herstellerunabhängiger KI-Gesundheitsagent, kein Coach für nur ein Band.',
    hero: {
      eyebrow: 'Whoop Coach-Alternative',
      h1: 'Eine Whoop Coach-Alternative, die mehr liest als nur das Band',
      lead: 'Whoop Coach ist der KI-Assistent in der Whoop-App, aufgebaut auf einer einzigen Datenquelle: deinem Band. SOMA ist ein herstellerunabhängiger KI-Gesundheitsagent, der über deine Whoop-Daten sowie deinen Ring, deine Smartwaage, dein CGM und protokollierte Gewohnheiten hinweg denkt — und mit einem Plan für heute antwortet, nicht mit einem weiteren Dashboard.',
    },
    comparison: {
      competitor: 'Whoop Coach',
      rows: [
        { dim: 'Daten, auf denen es basiert', them: 'Daten des Whoop-Bands', us: 'Jede Quelle, die du verbindest — Band, Ring, Waage, CGM, Gewohnheiten' },
        { dim: 'Wo es lebt', them: 'In der Whoop-App', us: 'Ein Startbildschirm — Chat oder Sprache' },
        { dim: 'Wer das Gespräch beginnt', them: 'Du öffnest die App und fragst', us: 'SOMA meldet sich zuerst, wenn sich etwas ändert' },
        { dim: 'Wenn du die Hardware wechselst', them: 'Die Empfehlungen bleiben bei Whoop', us: 'Herstellerunabhängig — deine Historie geht mit dir mit' },
        { dim: 'Preis', them: 'In der Whoop-Mitgliedschaft enthalten', us: 'Ab $19,99/Monat zum Launch' },
      ],
    },
    sections: [
      {
        title: 'Wenn Whoop Coach ausreicht',
        body: [
          'Wenn Strain und Recovery vom Band die einzigen Signale sind, nach denen du handelst, ist Whoop Coach eine sinnvolle Standardwahl — er ist in der Mitgliedschaft enthalten und spricht fließend über die Daten, die Whoop selbst sammelt.',
        ],
      },
      {
        title: 'Wenn ein Band nicht mehr das ganze Bild zeigt',
        body: [
          'Recovery entsteht nicht allein durch das Band: Schlafarchitektur, Zyklusphase, die Blutzuckerreaktion auf die gestrigen Mahlzeiten und Trends bei der Körperzusammensetzung beeinflussen sie alle mit. Gerätehersteller stecken in einem Hardware-Wettstreit fest, und keiner wird Coaching auf dem Gerät eines Konkurrenten aufbauen — strukturell geht das nicht. SOMA ist die Ebene über diesem Wettstreit: Es liest jede Quelle, die du verbindest, und wird mit jeder weiteren noch wertvoller.',
        ],
        pills: ['whoop', 'oura-ring', 'apple health', 'smartwaage', 'CGM', '+ deine gewohnheiten'],
      },
    ],
    faq: {
      devices: {
        q: 'Ersetzt SOMA meine Whoop-Mitgliedschaft?',
        a: 'Nein. SOMA liest die Daten, die dein Whoop-Band erzeugt, und ordnet sie im Zusammenhang mit deinen anderen Quellen ein. Das Band und die Mitgliedschaft bleiben bestehen; SOMA übernimmt den Abgleich, den du sonst zwischen Apps machst.',
      },
    },
  },

  'cross-device-reasoning': {
    subject: 'Geräteübergreifendes Denken',
    navLabel: 'Geräteübergreifendes Denken',
    description:
      'SOMA liest deinen Ring, dein Band, deine Smartwaage und dein CGM gemeinsam — Zyklustag, Schlaf, Bereitschaft, Mahlzeiten — und antwortet mit einem Plan statt vier Dashboards.',
    hero: {
      eyebrow: 'Geräteübergreifendes Denken',
      h1: 'Eine KI, die jedes deiner Wearables liest — gemeinsam',
      lead: 'Jedes Gesundheitsgerät erzeugt seinen eigenen Wert, in seiner eigenen App, blind für die anderen. Die Agenten von SOMA denken gemeinsam über all diese Werte nach — Zyklustag, Schlafphasen, Bereitschaft, Verletzungshistorie, letzte Mahlzeiten, Körperzusammensetzung — und antworten mit einer Stimme: ein Plan für heute, nicht vier Dashboards.',
    },
    sections: [
      {
        title: 'Warum ein einzelnes Signal nie die Antwort ist',
        body: [
          'Fast nichts, was dein Körper tut, lässt sich durch eine einzelne, isolierte Zahl erklären. Ein niedriger Bereitschaftswert neben einem vollgepackten Kalender bedeutet etwas anderes als derselbe Wert an einem Ruhetag; ein hoher Schlafwert kann eine Nacht mit oberflächlichem Schlaf verbergen, die man im Workout dann spürt. SOMA interpretiert jedes Signal im Kontext aller anderen — genau das, wofür keine App für ein einzelnes Gerät gebaut ist.',
        ],
      },
      {
        title: 'Was SOMA liest',
        body: [
          'Einmal verbunden über offizielle APIs — mit Apple Health als Drehscheibe und manueller Eingabe/CSV als Fallback — liest SOMA alles, was du jetzt besitzt, und alles, worauf du als Nächstes wechselst.',
        ],
        pills: ['oura-ring', 'whoop', 'apple health', 'smartwaage', 'CGM', 'kalenderbelastung', 'protokollierte mahlzeiten'],
      },
    ],
    faq: {
      devices: {
        q: 'Welche Geräte kann SOMA gemeinsam lesen?',
        a: 'Ringe, Bänder, Smartwaagen und CGMs — über offizielle APIs, Apple Health als Drehscheibe und manueller Eingabe/CSV als Fallback für alles ohne Integration.',
      },
    },
  },

  'proactive-ai-coach': {
    subject: 'Proaktiver KI-Gesundheitsagent',
    navLabel: 'Proaktive Kontaktaufnahme',
    description:
      'SOMA ist ein KI-Gesundheitsagent, der sich zuerst meldet: Wenn sich deine Daten so verändern, dass es wichtig wird, schreibt er dir mit einer konkreten Anpassung für heute.',
    hero: {
      eyebrow: 'Proaktive Kontaktaufnahme',
      h1: 'Ein Gesundheitsagent, der sich zuerst meldet',
      lead: 'Dashboards warten darauf, geöffnet zu werden. SOMA behält deine verbundenen Daten im Blick, und wenn sich etwas so verändert, dass es wichtig wird — die Bereitschaft sinkt, während sich dein Kalender füllt, der Schlafmangel gegen einen Trainingsblock anwächst —, schreibt es dir zuerst mit einer konkreten Anpassung, statt darauf zu warten, gefragt zu werden.',
    },
    sections: [
      {
        title: 'Signal statt Rauschen',
        body: [
          'Proaktiv bedeutet nicht geschwätzig. SOMA meldet sich, wenn sich das geräteübergreifende Bild tatsächlich ändert, und bleibt still, wenn nicht — der Maßstab lautet: „Würde ein guter Coach dich dafür unterbrechen?“. Du kannst jederzeit antworten: tippe es oder sag es, wie bei einem Coach, der deine Daten schon kennt.',
        ],
      },
    ],
    faq: {
      proactive: {
        q: 'Wie oft schreibt mir SOMA?',
        a: 'Nur wenn sich das Gesamtbild so verändert, dass es wichtig wird — eine spürbare Veränderung bei Bereitschaft, Schlafmangel oder Belastung. Das ist der Maßstab eines Coaches fürs Unterbrechen, nicht der Maßstab einer Engagement-Benachrichtigung.',
      },
    },
  },

  'combine-wearable-data': {
    subject: 'Daten aus all deinen Wearables kombinieren',
    navLabel: 'Wearable-Daten kombinieren',
    description:
      'Ein praktischer Weg, Ring, Band, Waage und CGM als ein Gesamtbild zu lesen: Wähle eine Drehscheibe, verbinde, was du besitzt, und gleiche täglich Körpersignal mit Lebenssignal ab.',
    hero: {
      eyebrow: 'Anleitung',
      h1: 'So kombinierst du Daten aus all deinen Wearables',
      lead: 'Du brauchst keine neue Hardware, um ein Gesamtbild zu bekommen — du brauchst eine Drehscheibe, zwei ehrliche Fragen und eine Gewohnheit, die jeden Morgen zwei Minuten dauert. Hier ist die manuelle Version — und wo SOMA sie automatisiert.',
    },
    howToSteps: [
      {
        name: 'Führe alles über eine Drehscheibe zusammen',
        text: 'Aktiviere auf dem iPhone den Schreibzugriff auf Apple Health für jede Geräte-App, die du besitzt (Oura, Whoop, Waage, CGM). So bekommst du eine Zeitleiste statt vier Apps.',
      },
      {
        name: 'Fülle die Lücken manuell',
        text: 'Alles ohne Integration — Mahlzeiten, der Zeitpunkt von Koffein, wie sich eine Einheit angefühlt hat — trägst du als Notiz oder CSV ein. Unvollständiger Kontext ist es, der einzelne Werte irreführend macht.',
      },
      {
        name: 'Stelle dir jeden Morgen zwei Fragen',
        text: 'Was sagt das Signal meines Körpers (Bereitschaft, HRV, Schlaf)? Was sagt das Signal meines Lebens (Kalender, Belastung, bisheriges Essen)? Wenn sie sich widersprechen, ist genau dieser Widerspruch die Information.',
      },
      {
        name: 'Lass einen Agenten den Abgleich übernehmen',
        text: 'Von Hand funktioniert das — und ist wirklich schwer durchzuhalten. SOMA liest jede verbundene Quelle automatisch und antwortet mit einem Plan für heute, sodass aus der Zwei-Minuten-Gewohnheit null Minuten werden.',
      },
    ],
    sections: [
      {
        title: 'Warum die manuelle Version scheitert',
        body: [
          'Jeden Morgen Apps abzugleichen bedeutet, Zahlen im Kopf zu behalten und sich zu merken, was an welchem Tag wichtig war. Das hält ungefähr so lange wie jede auf Willenskraft basierende Gewohnheit. Die Lösung ist nicht mehr Disziplin — sondern die Übersetzungsarbeit an eine Software abzugeben, die alle Quellen auf einmal liest.',
        ],
      },
    ],
    faq: {
      integrations: {
        q: 'Brauche ich Apple Health, damit das funktioniert?',
        a: 'Es ist die einfachste Drehscheibe auf dem iPhone, aber nicht erforderlich — SOMA verbindet sich auch direkt über Geräte-APIs und akzeptiert manuelle Eingabe/CSV für alles ohne Integration.',
      },
    },
  },

  'multi-device-owners': {
    subject: 'Menschen mit 2–4 Gesundheitsgeräten',
    navLabel: 'Für Menschen mit mehreren Geräten',
    description:
      'Du besitzt einen Ring, ein Band, eine Waage, vielleicht ein CGM — und rätst trotzdem jeden Morgen? SOMA macht aus 2–4 unverbundenen Werten einen Plan für heute, gebaut genau für dich.',
    hero: {
      eyebrow: 'Für wen',
      h1: 'Für alle, die 2–4 Gesundheitsgeräte besitzen und trotzdem raten',
      lead: 'Hochfunktionale Menschen besitzen die Sensoren längst — einen Ring, ein Band, eine Waage, manchmal ein CGM — und wissen trotzdem jeden Morgen nicht, was sie tun sollen, weil jedes Gerät seinen eigenen Wert erzeugt und keines mit dem anderen spricht. SOMA ist genau für diese Person gebaut.',
    },
    sections: [
      {
        title: 'Die Fragmentierungssteuer, die du schon zahlst',
        body: [
          'Wer mehrere Geräte besitzt, zahlt in der Regel $30–90/Monat für Geräte-Apps, plus $200–600/Monat, wenn menschliche Coaches die Interpretation übernehmen. Das Geld kauft vier Meinungen, die nie zusammenfinden. SOMA ist gegen genau diesen Stapel bepreist — es ersetzt die Übersetzungsebene, nicht deine Geräte.',
        ],
      },
      {
        title: 'Was sich mit einer Stimme ändert',
        body: [
          'Morgens hört das App-Hopping auf. Du erzählst SOMA von einer Mahlzeit oder einem Workout — getippt oder gesprochen —, und es antwortet aus allem, was es sehen kann: Zyklustag, Schlaf, Bereitschaft, Verletzungshistorie, Körperzusammensetzung. Wenn sich etwas so verändert, dass es wichtig wird, meldet es sich zuerst.',
        ],
        pills: ['ein startbildschirm', 'chat + sprache', 'proaktive kontaktaufnahme', 'herstellerunabhängig'],
      },
    ],
    faq: {
      devices: {
        q: 'Ich habe nur ein Gerät — ist SOMA trotzdem etwas für mich?',
        a: 'SOMA funktioniert auch mit nur einer Quelle, aber der Nutzen wächst mit jeder weiteren, die du hinzufügst — das gemeinsame Denken über Geräte hinweg ist der Kern der Sache. Mit nur einem Gerät startest du am besten mit dem kostenlosen Reset-Guide.',
      },
    },
  },
};

export default overrides;
