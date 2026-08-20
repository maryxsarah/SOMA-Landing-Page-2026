import type { SpokeLocaleOverrides } from './types';

const overrides: SpokeLocaleOverrides = {
  'oura-advisor-alternative': {
    subject: 'Oura Advisor',
    navLabel: 'Alternativa a Oura Advisor',
    description:
      'SOMA è un’alternativa a Oura Advisor che legge i tuoi dati Oura insieme a Whoop, bilance smart e CGM — un unico agente di salute AI su tutti i dispositivi, non solo un anello.',
    hero: {
      eyebrow: 'Alternativa a Oura Advisor',
      h1: 'Un’alternativa a Oura Advisor che vede oltre l’anello',
      lead: 'Oura Advisor è il coach AI integrato nell’app Oura, e funziona da un’unica fonte: il tuo anello. SOMA è un agente di salute AI indipendente dai produttori che legge i tuoi dati Oura insieme a tutto il resto — Whoop, bilancia smart, CGM, pasti registrati — e risponde con un unico piano per oggi.',
    },
    comparison: {
      competitor: 'Oura Advisor',
      rows: [
        { dim: 'Dati su cui ragiona', them: 'Dati dell’anello Oura', us: 'Ogni fonte che connetti — anello, band, bilancia, CGM, abitudini' },
        { dim: 'Dove vive', them: 'Dentro l’app Oura', us: 'Un’unica schermata home — chat o voce' },
        { dim: 'Chi inizia la conversazione', them: 'Apri l’app e chiedi tu', us: 'SOMA ti contatta per primo quando qualcosa cambia' },
        { dim: 'Se cambi hardware', them: 'Il consiglio resta con Oura', us: 'Indipendente dai produttori — la tua storia si sposta con te' },
        { dim: 'Prezzo', them: 'Incluso con l’abbonamento Oura', us: 'A partire da 19,99$/mese al lancio' },
      ],
    },
    sections: [
      {
        title: 'Quando Oura Advisor basta',
        body: [
          'Se l’anello è il tuo unico tracker, Oura Advisor è una scelta predefinita ragionevole: è gratuito con l’abbonamento, vive dove i tuoi dati già si trovano, e risponde a domande su sonno, prontezza e attività da quell’unico flusso.',
        ],
      },
      {
        title: 'Quando serve un livello sopra l’anello',
        body: [
          'La maggior parte delle persone per cui SOMA è pensato possiede 2-4 dispositivi. L’anello conosce il recupero, la bilancia conosce la composizione corporea, il CGM conosce il glucosio, il calendario conosce il carico — e nessun coach di un singolo produttore è strutturalmente in grado di leggere il dispositivo di un concorrente. SOMA si colloca sopra l’hardware: ragiona su tutti questi segnali contemporaneamente e risponde con un’unica voce, così un punteggio di prontezza basso viene interpretato insieme al giorno del tuo ciclo, ai pasti di ieri e alle riunioni di questa mattina — non in isolamento.',
        ],
        pills: ['anello oura', 'whoop', 'apple health', 'bilancia smart', 'CGM', '+ le tue abitudini'],
      },
    ],
    faq: {
      devices: {
        q: 'SOMA sostituisce il mio anello Oura?',
        a: 'No. SOMA non è hardware — legge i dati che il tuo anello Oura già produce e li combina con le tue altre fonti. Tu tieni l’anello; SOMA sostituisce il lavoro di traduzione tra le app.',
      },
      integrations: {
        q: 'Come ottiene SOMA i miei dati Oura?',
        a: 'Tramite API ufficiali, con Apple Health come hub dove disponibile, più un fallback manuale/CSV — così nessun singolo cambiamento di integrazione può interrompere la tua storia.',
      },
    },
  },

  'whoop-coach-alternative': {
    subject: 'Whoop Coach',
    navLabel: 'Alternativa a Whoop Coach',
    description:
      'SOMA è un’alternativa a Whoop Coach che legge i tuoi dati Whoop insieme al tuo anello, alla bilancia e al CGM — un agente di salute AI indipendente dai produttori, non un coach legato a un solo band.',
    hero: {
      eyebrow: 'Alternativa a Whoop Coach',
      h1: 'Un’alternativa a Whoop Coach che legge oltre il band',
      lead: 'Whoop Coach è l’assistente AI dentro l’app Whoop, costruito su un’unica fonte: il tuo band. SOMA è un agente di salute AI indipendente dai produttori che ragiona sui tuoi dati Whoop insieme al tuo anello, alla bilancia smart, al CGM e alle abitudini registrate — e risponde con un unico piano per oggi, non un’altra dashboard.',
    },
    comparison: {
      competitor: 'Whoop Coach',
      rows: [
        { dim: 'Dati su cui ragiona', them: 'Dati del band Whoop', us: 'Ogni fonte che connetti — band, anello, bilancia, CGM, abitudini' },
        { dim: 'Dove vive', them: 'Dentro l’app Whoop', us: 'Un’unica schermata home — chat o voce' },
        { dim: 'Chi inizia la conversazione', them: 'Apri l’app e chiedi tu', us: 'SOMA ti contatta per primo quando qualcosa cambia' },
        { dim: 'Se cambi hardware', them: 'Il consiglio resta con Whoop', us: 'Indipendente dai produttori — la tua storia si sposta con te' },
        { dim: 'Prezzo', them: 'Incluso con l’abbonamento Whoop', us: 'A partire da 19,99$/mese al lancio' },
      ],
    },
    sections: [
      {
        title: 'Quando Whoop Coach basta',
        body: [
          'Se lo strain e il recupero rilevati dal band sono gli unici segnali su cui agisci, Whoop Coach è una scelta predefinita sensata — è incluso nell’abbonamento e parla in modo fluente dei dati che Whoop stesso raccoglie.',
        ],
      },
      {
        title: 'Quando un solo band smette di essere tutto il quadro',
        body: [
          'Il recupero non è determinato dal band da solo: l’architettura del sonno, la fase del ciclo, la risposta glicemica ai pasti di ieri e le tendenze della composizione corporea lo influenzano tutti. I produttori di dispositivi sono bloccati in una guerra dell’hardware e nessuno costruirà coaching sul dispositivo di un concorrente — strutturalmente, non possono. SOMA è il livello sopra quella guerra: legge ogni fonte che connetti e cresce di valore con ognuna che aggiungi.',
        ],
        pills: ['whoop', 'anello oura', 'apple health', 'bilancia smart', 'CGM', '+ le tue abitudini'],
      },
    ],
    faq: {
      devices: {
        q: 'SOMA sostituisce il mio abbonamento Whoop?',
        a: 'No. SOMA legge i dati che il tuo band Whoop produce e li interpreta insieme alle tue altre fonti. Il band e il suo abbonamento restano; SOMA sostituisce il confronto incrociato che fai tra le app.',
      },
    },
  },

  'cross-device-reasoning': {
    subject: 'Ragionamento multi-dispositivo',
    navLabel: 'Ragionamento multi-dispositivo',
    description:
      'SOMA legge insieme il tuo anello, band, bilancia smart e CGM — giorno del ciclo, sonno, prontezza, pasti — e risponde con un unico piano invece di quattro dashboard.',
    hero: {
      eyebrow: 'Ragionamento multi-dispositivo',
      h1: 'Un’unica AI che legge insieme ogni dispositivo indossabile che possiedi',
      lead: 'Ogni dispositivo per la salute produce il proprio punteggio, nella propria app, cieco rispetto agli altri. Gli agenti di SOMA ragionano congiuntamente su tutti loro — giorno del ciclo, fasi del sonno, prontezza, storico infortuni, pasti recenti, composizione corporea — e rispondono con un’unica voce: un unico piano per oggi, non quattro dashboard.',
    },
    sections: [
      {
        title: 'Perché un solo segnale non è mai la risposta',
        body: [
          'Quasi nulla di ciò che fa il tuo corpo può essere spiegato da un solo numero isolato. Un punteggio di prontezza basso accanto a un calendario completamente pieno significa qualcosa di diverso dallo stesso punteggio in un giorno di riposo; un punteggio del sonno alto può nascondere una notte di sonno superficiale che l’allenamento farà sentire. SOMA interpreta ogni segnale nel contesto di tutti gli altri — che è la parte che nessuna app legata a un solo dispositivo è costruita per fare.',
        ],
      },
      {
        title: 'Cosa legge',
        body: [
          'Connesso una sola volta tramite API ufficiali — con Apple Health come hub e un fallback manuale/CSV — SOMA legge quello che possiedi ora e qualsiasi cosa a cui passerai in futuro.',
        ],
        pills: ['anello oura', 'whoop', 'apple health', 'bilancia smart', 'CGM', 'carico del calendario', 'pasti registrati'],
      },
    ],
    faq: {
      devices: {
        q: 'Quali dispositivi può leggere insieme SOMA?',
        a: 'Anelli, band, bilance smart e CGM — tramite API ufficiali, Apple Health come hub, e un fallback manuale/CSV per tutto ciò che non ha un’integrazione.',
      },
    },
  },

  'proactive-ai-coach': {
    subject: 'Agente di salute AI proattivo',
    navLabel: 'Contatto proattivo',
    description:
      'SOMA è un agente di salute AI che ti contatta per primo: quando i tuoi dati cambiano abbastanza da avere importanza, ti scrive con un aggiustamento concreto per oggi.',
    hero: {
      eyebrow: 'Contatto proattivo',
      h1: 'Un agente di salute che ti contatta per primo',
      lead: 'Le dashboard aspettano di essere aperte. SOMA osserva i tuoi dati connessi e, quando qualcosa cambia abbastanza da avere importanza — la prontezza che scende mentre il tuo calendario si riempie, un debito di sonno che si accumula contro un blocco di allenamento — ti scrive per primo con un aggiustamento concreto, invece di aspettare di essere interpellato.',
    },
    sections: [
      {
        title: 'Segnale, non rumore',
        body: [
          'Proattivo non significa chiacchierone. SOMA si fa sentire quando il quadro multi-dispositivo cambia davvero, e rimane in silenzio quando non lo fa — il criterio è “un buon coach ti interromperebbe per questo?”. Puoi sempre rispondere: scrivilo o dillo a voce, come faresti con un coach che conosce già i tuoi dati.',
        ],
      },
    ],
    faq: {
      proactive: {
        q: 'Con quale frequenza mi scrive SOMA?',
        a: 'Solo quando il quadro combinato cambia abbastanza da avere importanza — un cambiamento significativo nella prontezza, nel debito di sonno o nel carico. È il criterio di interruzione di un coach, non quello delle notifiche per l’engagement.',
      },
    },
  },

  'combine-wearable-data': {
    subject: 'combinare i dati di tutti i tuoi dispositivi indossabili',
    navLabel: 'Combina i dati dei dispositivi indossabili',
    description:
      'Un modo pratico per leggere il tuo anello, band, bilancia e CGM come un unico quadro: scegli un hub, connetti quello che possiedi, e confronta ogni giorno il segnale del corpo con il segnale della vita.',
    hero: {
      eyebrow: 'Come fare',
      h1: 'Come combinare i dati di tutti i tuoi dispositivi indossabili',
      lead: 'Non hai bisogno di nuovo hardware per vedere un unico quadro — hai bisogno di un hub, due domande oneste e un’abitudine che richiede due minuti ogni mattina. Ecco la versione manuale, e dove SOMA la automatizza.',
    },
    howToSteps: [
      {
        name: 'Fai passare tutto attraverso un unico hub',
        text: 'Su iPhone, attiva l’accesso in scrittura ad Apple Health per ogni app di dispositivo che possiedi (Oura, Whoop, bilancia, CGM). Questo ti dà un’unica cronologia invece di quattro app.',
      },
      {
        name: 'Colma le lacune manualmente',
        text: 'Tutto ciò che non ha un’integrazione — pasti, tempistiche della caffeina, come ti sei sentito in una sessione — va inserito come nota o CSV. Il contesto incompleto è ciò che rende fuorvianti i punteggi isolati.',
      },
      {
        name: 'Fatti due domande ogni mattina',
        text: 'Cosa dice il segnale del mio corpo (prontezza, HRV, sonno)? Cosa dice il segnale della mia vita (calendario, carico, cibo finora)? Se non sono d’accordo, quel disaccordo è l’informazione.',
      },
      {
        name: 'Lascia che un agente faccia il confronto incrociato',
        text: 'Farlo a mano funziona — ed è genuinamente difficile da sostenere. SOMA legge automaticamente ogni fonte connessa e risponde con un unico piano per oggi, così l’abitudine di due minuti diventa zero.',
      },
    ],
    sections: [
      {
        title: 'Perché la versione manuale si rompe',
        body: [
          'Confrontare le app ogni mattina significa tenere i numeri a mente e ricordare cosa contava in quale giorno. Sopravvive più o meno quanto qualsiasi abitudine basata sulla forza di volontà. La soluzione non è più disciplina — è spostare il lavoro di traduzione su un software che legge tutte le fonti contemporaneamente.',
        ],
      },
    ],
    faq: {
      integrations: {
        q: 'Ho bisogno di Apple Health perché funzioni?',
        a: 'È l’hub più semplice su iPhone, ma non è obbligatorio — SOMA si connette anche direttamente alle API dei dispositivi e accetta input manuale/CSV per tutto ciò che non ha un’integrazione.',
      },
    },
  },

  'multi-device-owners': {
    subject: 'persone con 2-4 dispositivi per la salute',
    navLabel: 'Per chi ha più dispositivi',
    description:
      'Possiedi un anello, un band, una bilancia, forse un CGM — e continui a tirare a indovinare ogni mattina? SOMA trasforma 2-4 punteggi scollegati in un unico piano per oggi, costruito esattamente per te.',
    hero: {
      eyebrow: 'Per chi è pensato',
      h1: 'Per chi possiede 2-4 dispositivi per la salute e continua a tirare a indovinare',
      lead: 'Le persone altamente performanti possiedono già i sensori — un anello, un band, una bilancia, a volte un CGM — e ancora non sanno cosa fare ogni mattina, perché ogni dispositivo produce il proprio punteggio e nessuno di loro parla con gli altri. SOMA è costruito esattamente per questa persona.',
    },
    sections: [
      {
        title: 'La tassa da frammentazione che già paghi',
        body: [
          'Chi possiede più dispositivi in genere paga 30-90$/mese tra le app dei dispositivi, più 200-600$/mese se dei coach umani fanno l’interpretazione. Il denaro compra quattro opinioni che non si incontrano mai. SOMA ha un prezzo calcolato rispetto a quello stack — sostituisce il livello di traduzione, non i tuoi dispositivi.',
        ],
      },
      {
        title: 'Cosa cambia con un’unica voce',
        body: [
          'Le mattine smettono di iniziare saltando da un’app all’altra. Racconti a SOMA di un pasto o di un allenamento — scritto o parlato — e lui risponde da tutto ciò che riesce a vedere: giorno del ciclo, sonno, prontezza, storico infortuni, composizione corporea. Quando qualcosa cambia abbastanza da avere importanza, ti contatta per primo.',
        ],
        pills: ['un’unica schermata home', 'chat + voce', 'contatto proattivo', 'indipendente dai produttori'],
      },
    ],
    faq: {
      devices: {
        q: 'Ho solo un dispositivo — SOMA fa per me?',
        a: 'SOMA funziona con un’unica fonte, ma il suo valore cresce con ognuna che aggiungi — il ragionamento congiunto tra i dispositivi è il punto centrale. Con un solo dispositivo, inizia con la Guida al Reset gratuita.',
      },
    },
  },
};

export default overrides;
