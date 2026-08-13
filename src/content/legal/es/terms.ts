import type { TermsContent } from '../types';

// TODO(brand): basic placeholder — have legal counsel review before launch.
export const terms: TermsContent = {
  title: 'Términos de Servicio',
  updated: '21 de julio de 2026',
  intro:
    'Al usar este sitio web o unirte a la lista de espera de SOMA, aceptas estos términos. SOMA actualmente está en fase previa al lanzamiento — el producto descrito en este sitio aún no está disponible públicamente.',
  waitlist: {
    h2: 'La lista de espera',
    body: 'Unirte a la lista de espera es gratis y no genera ninguna obligación de compra. Te enviaremos por correo la Guía de Reinicio y actualizaciones ocasionales; puedes darte de baja en cualquier momento.',
  },
  notMedicalDevice: {
    h2: 'No es un dispositivo médico',
    body: 'SOMA es una herramienta general de bienestar. No diagnostica, no trata ni sustituye el consejo de un profesional clínico cualificado. Habla con tu médico para preguntas médicas.',
  },
  intellectualProperty: {
    h2: 'Propiedad intelectual',
    body: 'Todo el contenido de este sitio — textos, gráficos y elementos de marca — pertenece a SOMA salvo que se indique lo contrario, y no puede reutilizarse sin permiso.',
  },
  noWarranty: {
    h2: 'Sin garantía',
    body: 'Este sitio y cualquier información en él se proporcionan «tal cual», sin garantía de ningún tipo, en la máxima medida permitida por la ley.',
  },
  changes: {
    h2: 'Cambios',
    body: 'Podemos actualizar estos términos a medida que el producto evoluciona. Actualizaremos la fecha indicada arriba cuando lo hagamos.',
  },
  contact: {
    h2: 'Contacto',
    paragraph: { before: 'Preguntas sobre estos términos: ' },
  },
};
