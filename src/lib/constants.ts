export const SITE_NAME = "Mambosamagakkou";
// TODO: cambiar a "https://mambosamagakkou.com.ar" cuando el dominio propio esté conectado.
export const SITE_URL = "https://mambosamagakkou.vercel.app";
export const SITE_DESCRIPTION =
  "Academia de idiomas orientales en Buenos Aires. Cursos de Japonés, Coreano y Chino Mandarín para adultos y niños, en modalidad presencial y virtual, todos los niveles.";

export const ADDRESS = "Espacio Delfos, Azcuénaga 714, C1029 CABA";
export const EMAIL = "info@mambosamagakkou.com";
export const PHONE_DISPLAY = "+549 11 6656-3747";
export const WHATSAPP_NUMBER = "5491166563747";

export const HOURS = [
  { days: "Lunes a Viernes", time: "9 a 21 hs" },
  { days: "Sábados", time: "10 a 19 hs" },
];

export const INSTAGRAM_URL = "https://www.instagram.com/mambosama_gakkou/";
export const FACEBOOK_URL = "https://www.facebook.com/idiomasmambosama/";

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/cursos", label: "Cursos" },
  { href: "/fotos-y-videos", label: "Fotos" },
  { href: "/contacto", label: "Contacto" },
];

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola! Me gustaría recibir información sobre los cursos de Mambosamagakkou.";
