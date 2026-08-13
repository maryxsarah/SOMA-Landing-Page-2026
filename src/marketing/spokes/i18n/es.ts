import type { SpokeLocaleOverrides } from './types';

const overrides: SpokeLocaleOverrides = {
  'oura-advisor-alternative': {
    subject: 'Oura Advisor',
    navLabel: 'Alternativa a Oura Advisor',
    description:
      'SOMA es una alternativa a Oura Advisor que interpreta tus datos de Oura junto con Whoop, básculas inteligentes y CGMs: un agente de salud con IA para todos tus dispositivos, no solo para un anillo.',
    hero: {
      eyebrow: 'Alternativa a Oura Advisor',
      h1: 'Una alternativa a Oura Advisor que ve más allá del anillo',
      lead: 'Oura Advisor es el coach de IA integrado en la app de Oura, y funciona a partir de una sola fuente: tu anillo. SOMA es un agente de salud con IA independiente de marca que interpreta tus datos de Oura junto con todo lo demás — Whoop, báscula inteligente, CGM, comidas registradas — y responde con un solo plan para hoy.',
    },
    comparison: {
      competitor: 'Oura Advisor',
      rows: [
        { dim: 'Datos sobre los que razona', them: 'Datos del anillo Oura', us: 'Todas las fuentes que conectes — anillo, banda, báscula, CGM, hábitos' },
        { dim: 'Dónde vive', them: 'Dentro de la app de Oura', us: 'Una sola pantalla de inicio — chat o voz' },
        { dim: 'Quién inicia la conversación', them: 'Tú abres la app y preguntas', us: 'SOMA se pone en contacto primero cuando algo cambia' },
        { dim: 'Si cambias de hardware', them: 'El consejo se queda con Oura', us: 'Independiente de marca — tu historial se mueve contigo' },
        { dim: 'Precio', them: 'Incluido con la membresía de Oura', us: 'Desde $99/mes en el lanzamiento' },
      ],
    },
    sections: [
      {
        title: 'Cuándo Oura Advisor es suficiente',
        body: [
          'Si el anillo es tu único rastreador, Oura Advisor es una opción razonable por defecto: es gratis con la membresía, vive donde ya están tus datos, y responde preguntas sobre sueño, preparación y actividad a partir de esa única fuente.',
        ],
      },
      {
        title: 'Cuándo necesitas una capa por encima del anillo',
        body: [
          'La mayoría de las personas para las que SOMA está diseñado tienen entre 2 y 4 dispositivos. El anillo conoce la recuperación, la báscula conoce la composición corporal, el CGM conoce la glucosa, el calendario conoce la carga — y ningún coach de una sola marca es capaz, estructuralmente, de leer el dispositivo de un competidor. SOMA se sitúa por encima del hardware: razona sobre todas esas señales a la vez y responde con una sola voz, de modo que una puntuación de preparación baja se interpreta junto a tu día del ciclo, las comidas de ayer y las reuniones de esta mañana — no de forma aislada.',
        ],
        pills: ['oura ring', 'whoop', 'apple health', 'báscula inteligente', 'CGM', '+ tus hábitos'],
      },
    ],
    faq: {
      devices: {
        q: '¿SOMA reemplaza mi anillo Oura?',
        a: 'No. SOMA no es hardware: interpreta los datos que tu anillo Oura ya genera y los combina con tus otras fuentes. Tú conservas el anillo; SOMA reemplaza el trabajo de traducción entre apps.',
      },
      integrations: {
        q: '¿Cómo obtiene SOMA mis datos de Oura?',
        a: 'A través de APIs oficiales, con Apple Health como concentrador cuando está disponible, además de una opción manual o por CSV como respaldo — de modo que ningún cambio en una sola integración pueda cortar tu historial.',
      },
    },
  },

  'whoop-coach-alternative': {
    subject: 'Whoop Coach',
    navLabel: 'Alternativa a Whoop Coach',
    description:
      'SOMA es una alternativa a Whoop Coach que interpreta tus datos de Whoop junto con tu anillo, báscula y CGM: un agente de salud con IA independiente de marca, no un coach de una sola banda.',
    hero: {
      eyebrow: 'Alternativa a Whoop Coach',
      h1: 'Una alternativa a Whoop Coach que interpreta más allá de la banda',
      lead: 'Whoop Coach es el asistente de IA dentro de la app de Whoop, construido a partir de una sola fuente: tu banda. SOMA es un agente de salud con IA independiente de marca que razona sobre tus datos de Whoop además de tu anillo, báscula inteligente, CGM y hábitos registrados — y responde con un solo plan para hoy, no con otro panel más.',
    },
    comparison: {
      competitor: 'Whoop Coach',
      rows: [
        { dim: 'Datos sobre los que razona', them: 'Datos de la banda Whoop', us: 'Todas las fuentes que conectes — banda, anillo, báscula, CGM, hábitos' },
        { dim: 'Dónde vive', them: 'Dentro de la app de Whoop', us: 'Una sola pantalla de inicio — chat o voz' },
        { dim: 'Quién inicia la conversación', them: 'Tú abres la app y preguntas', us: 'SOMA se pone en contacto primero cuando algo cambia' },
        { dim: 'Si cambias de hardware', them: 'El consejo se queda con Whoop', us: 'Independiente de marca — tu historial se mueve contigo' },
        { dim: 'Precio', them: 'Incluido con la membresía de Whoop', us: 'Desde $99/mes en el lanzamiento' },
      ],
    },
    sections: [
      {
        title: 'Cuándo Whoop Coach es suficiente',
        body: [
          'Si el esfuerzo y la recuperación de la banda son las únicas señales sobre las que actúas, Whoop Coach es una opción sensata por defecto: viene incluido con la membresía y habla con fluidez sobre los datos que el propio Whoop recopila.',
        ],
      },
      {
        title: 'Cuándo una sola banda deja de ser el panorama completo',
        body: [
          'La recuperación no la produce solo la banda: la arquitectura del sueño, la fase del ciclo, la respuesta de glucosa a las comidas de ayer y las tendencias de composición corporal también influyen en ella. Los fabricantes de dispositivos están atrapados en una guerra de hardware y ninguno va a construir coaching sobre el dispositivo de un competidor — estructuralmente, no pueden. SOMA es la capa por encima de esa guerra: interpreta cada fuente que conectas y se vuelve más valioso con cada una que agregas.',
        ],
        pills: ['whoop', 'oura ring', 'apple health', 'báscula inteligente', 'CGM', '+ tus hábitos'],
      },
    ],
    faq: {
      devices: {
        q: '¿SOMA reemplaza mi membresía de Whoop?',
        a: 'No. SOMA interpreta los datos que genera tu banda Whoop y los analiza junto con tus otras fuentes. La banda y su membresía se mantienen; SOMA reemplaza el cruce de información que haces entre apps.',
      },
    },
  },

  'cross-device-reasoning': {
    subject: 'Razonamiento entre dispositivos',
    navLabel: 'Razonamiento entre dispositivos',
    description:
      'SOMA interpreta tu anillo, banda, báscula inteligente y CGM en conjunto — día del ciclo, sueño, preparación, comidas — y responde con un solo plan en lugar de cuatro paneles.',
    hero: {
      eyebrow: 'Razonamiento entre dispositivos',
      h1: 'Una sola IA que interpreta todos tus wearables — en conjunto',
      lead: 'Cada dispositivo de salud genera su propia puntuación, en su propia app, sin ver las demás. Los agentes de SOMA razonan de forma conjunta sobre todas ellas — día del ciclo, fases del sueño, preparación, historial de lesiones, comidas recientes, composición corporal — y responden con una sola voz: un plan para hoy, no cuatro paneles.',
    },
    sections: [
      {
        title: 'Por qué una sola señal nunca es la respuesta',
        body: [
          'Casi nada de lo que hace tu cuerpo se puede explicar con un solo número aislado. Una puntuación de preparación baja junto a un calendario completamente lleno significa algo distinto que la misma puntuación en un día de descanso; una puntuación de sueño alta puede ocultar una noche de sueño superficial que el entrenamiento hará sentir. SOMA interpreta cada señal en el contexto de todas las demás — que es justo lo que ninguna app de un solo dispositivo está diseñada para hacer.',
        ],
      },
      {
        title: 'Qué interpreta',
        body: [
          'Conectado una sola vez mediante APIs oficiales — con Apple Health como concentrador y una opción manual o por CSV como respaldo — SOMA interpreta lo que tengas ahora y lo que sea que uses después.',
        ],
        pills: ['oura ring', 'whoop', 'apple health', 'báscula inteligente', 'CGM', 'carga del calendario', 'comidas registradas'],
      },
    ],
    faq: {
      devices: {
        q: '¿Qué dispositivos puede interpretar SOMA en conjunto?',
        a: 'Anillos, bandas, básculas inteligentes y CGMs — a través de APIs oficiales, Apple Health como concentrador, y una opción manual o por CSV como respaldo para todo lo que no tenga integración.',
      },
    },
  },

  'proactive-ai-coach': {
    subject: 'Agente de salud con IA proactivo',
    navLabel: 'Contacto proactivo',
    description:
      'SOMA es un agente de salud con IA que se pone en contacto primero: cuando tus datos cambian lo suficiente como para importar, te escribe con un ajuste concreto para hoy.',
    hero: {
      eyebrow: 'Contacto proactivo',
      h1: 'Un agente de salud que se pone en contacto primero',
      lead: 'Los paneles esperan a que los abras. SOMA vigila tus datos conectados y, cuando algo cambia lo suficiente como para importar — la preparación cae mientras tu calendario se llena, la deuda de sueño se acumula frente a un bloque de entrenamiento — te escribe primero con un ajuste concreto, en lugar de esperar a que se lo preguntes.',
    },
    sections: [
      {
        title: 'Señal, no ruido',
        body: [
          'Proactivo no significa hablador. SOMA se pronuncia cuando el panorama entre dispositivos realmente cambia, y guarda silencio cuando no lo hace — el criterio es «¿un buen coach te interrumpiría por esto?». Siempre puedes responder: escríbelo o dilo en voz alta, como lo harías con un coach que ya conoce tus datos.',
        ],
      },
    ],
    faq: {
      proactive: {
        q: '¿Con qué frecuencia me escribe SOMA?',
        a: 'Solo cuando el panorama combinado cambia lo suficiente como para importar — un cambio significativo en la preparación, la deuda de sueño o la carga. Es el criterio de interrupción de un coach, no el de una notificación para generar interacción.',
      },
    },
  },

  'combine-wearable-data': {
    subject: 'combinar los datos de todos tus wearables',
    navLabel: 'Combinar datos de wearables',
    description:
      'Una forma práctica de interpretar tu anillo, banda, báscula y CGM como una sola imagen: elige un concentrador, conecta lo que tienes y compara a diario la señal de tu cuerpo con la señal de tu vida.',
    hero: {
      eyebrow: 'Cómo hacerlo',
      h1: 'Cómo combinar los datos de todos tus wearables',
      lead: 'No necesitas hardware nuevo para ver una sola imagen: necesitas un concentrador, dos preguntas honestas y un hábito que toma dos minutos cada mañana. Aquí está la versión manual, y en qué punto SOMA la automatiza.',
    },
    howToSteps: [
      {
        name: 'Enruta todo a través de un solo concentrador',
        text: 'En el iPhone, activa el acceso de escritura de Apple Health para cada app de dispositivo que tengas (Oura, Whoop, báscula, CGM). Esto te da una sola línea de tiempo en lugar de cuatro apps.',
      },
      {
        name: 'Llena los vacíos manualmente',
        text: 'Todo lo que no tenga integración — comidas, horarios de cafeína, cómo se sintió una sesión — se registra como nota o CSV. El contexto incompleto es lo que hace que las puntuaciones aisladas sean engañosas.',
      },
      {
        name: 'Hazte dos preguntas cada mañana',
        text: '¿Qué dice la señal de mi cuerpo (preparación, HRV, sueño)? ¿Qué dice la señal de mi vida (calendario, carga, comida hasta ahora)? Si no coinciden, ese desacuerdo es la información.',
      },
      {
        name: 'Deja que un agente haga el cruce de información',
        text: 'Hacer esto a mano funciona — y es genuinamente difícil de mantener. SOMA interpreta automáticamente cada fuente conectada y responde con un plan para hoy, de modo que el hábito de dos minutos se convierte en cero.',
      },
    ],
    sections: [
      {
        title: 'Por qué la versión manual falla',
        body: [
          'Cruzar información entre apps cada mañana significa retener números en la cabeza y recordar qué importó en qué día. Sobrevive tanto tiempo como cualquier hábito basado en fuerza de voluntad. La solución no es más disciplina: es trasladar el trabajo de traducción a un software que interpreta todas las fuentes a la vez.',
        ],
      },
    ],
    faq: {
      integrations: {
        q: '¿Necesito Apple Health para que esto funcione?',
        a: 'Es el concentrador más fácil en iPhone, pero no es obligatorio — SOMA también se conecta directamente a las APIs de los dispositivos y acepta entrada manual o por CSV para todo lo que no tenga integración.',
      },
    },
  },

  'multi-device-owners': {
    subject: 'personas con 2 a 4 dispositivos de salud',
    navLabel: 'Para quienes tienen varios dispositivos',
    description:
      '¿Tienes un anillo, una banda, una báscula, tal vez un CGM, y aun así adivinas cada mañana? SOMA convierte de 2 a 4 puntuaciones desconectadas en un solo plan para hoy, hecho justo para ti.',
    hero: {
      eyebrow: 'Para quién es',
      h1: 'Para quienes tienen de 2 a 4 dispositivos de salud y aun así adivinan',
      lead: 'Las personas altamente funcionales ya tienen los sensores — un anillo, una banda, una báscula, a veces un CGM — y aun así no saben qué hacer cada mañana, porque cada dispositivo genera su propia puntuación y ninguno se comunica con los demás. SOMA está hecho exactamente para esta persona.',
    },
    sections: [
      {
        title: 'El costo de la fragmentación que ya estás pagando',
        body: [
          'Quienes tienen varios dispositivos suelen pagar entre $30 y $90 al mes en apps de dispositivos, más entre $200 y $600 al mes si coaches humanos hacen la interpretación. Ese dinero compra cuatro opiniones que nunca se encuentran. El precio de SOMA está pensado frente a ese conjunto de gastos: reemplaza la capa de traducción, no tus dispositivos.',
        ],
      },
      {
        title: 'Qué cambia con una sola voz',
        body: [
          'Las mañanas dejan de empezar saltando entre apps. Le cuentas a SOMA sobre una comida o un entrenamiento — por texto o por voz — y responde a partir de todo lo que puede ver: día del ciclo, sueño, preparación, historial de lesiones, composición corporal. Cuando algo cambia lo suficiente como para importar, se pone en contacto primero.',
        ],
        pills: ['una sola pantalla de inicio', 'chat + voz', 'contacto proactivo', 'independiente de marca'],
      },
    ],
    faq: {
      devices: {
        q: 'Solo tengo un dispositivo, ¿SOMA es para mí?',
        a: 'SOMA funciona con una sola fuente, pero su valor aumenta con cada una que agregas — el razonamiento conjunto entre dispositivos es justamente el punto. Si tienes un solo dispositivo, empieza con la Guía de Reinicio gratuita.',
      },
    },
  },
};

export default overrides;
