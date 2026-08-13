import type { PrivacyContent } from '../types';

// TODO(brand): basic placeholder — have legal counsel review before launch.
export const privacy: PrivacyContent = {
  title: 'Política de Privacidad',
  updated: '21 de julio de 2026',
  intro:
    'SOMA (“nosotros”) aún no se ha lanzado y actualmente recopila inscripciones para la lista de espera. Esta política explica qué recopilamos y por qué.',
  whatWeCollect: {
    h2: 'Qué recopilamos',
    paragraph: {
      before: 'Cuando te unes a la lista de espera, recopilamos la dirección de correo electrónico que nos proporcionas. Usamos ',
      after:
        ' (ConvertKit) como nuestro proveedor de servicio de correo electrónico — Kit almacena y procesa tu correo electrónico en nuestro nombre bajo su propia política de privacidad. También recopilamos datos analíticos estándar (páginas vistas, campaña de referencia) mediante PostHog y Google Analytics cuando están habilitados.',
    },
  },
  howWeUseIt: {
    h2: 'Cómo lo usamos',
    body: 'Tu correo electrónico se utiliza para enviarte la Guía de Reinicio a la que te suscribes y actualizaciones ocasionales sobre el lanzamiento. Los datos analíticos se utilizan de forma agregada para entender qué páginas y campañas funcionan — no se utilizan para identificarte personalmente.',
  },
  cookies: {
    h2: 'Cookies',
    body: 'Las cookies analíticas solo se instalan una vez que has dado tu consentimiento. No utilizamos cookies publicitarias ni de rastreo.',
  },
  yourRights: {
    h2: 'Tus derechos',
    body: 'Puedes pedirnos que eliminemos tu correo electrónico de nuestra lista en cualquier momento escribiéndonos — consulta Contacto más abajo — o usando el enlace para darte de baja en cualquier correo que te enviemos.',
  },
  changes: {
    h2: 'Cambios',
    body: 'Podemos actualizar esta política a medida que el producto evoluciona. Actualizaremos la fecha indicada arriba cuando lo hagamos.',
  },
  contact: {
    h2: 'Contacto',
    paragraph: { before: 'Preguntas sobre esta política: ' },
  },
};
