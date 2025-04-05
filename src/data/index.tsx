import {
  faPersonRunning,
  faPersonBiking,
  faPersonSwimming,
  faPersonThroughWindow,
} from "@fortawesome/free-solid-svg-icons";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";

export const category = [
  { slug: "correr", name: "Carrera" },
  { slug: "trail-run", name: "Trail Run" },
  { slug: "ciclismo-de-ruta", name: "Ciclismo de Ruta" },
  { slug: "ciclismo-de-montana", name: "Ciclismo de Montaña (MTB)" },
  { slug: "triatlon", name: "Triatlón" },
  { slug: "duatlon", name: "Duatlón" },
];

export const categories = [
  {
    name: "Carrera",
    description:
      "Mayormente plana (poco desnivel), calles, avenidas, caminos asfaltados",
    href: "/categoria/",
    url: "correr",
    icon: faPersonRunning,
    svg: "",
  },
  {
    name: "Trail Run",
    description: "Carrera con desnivel en senderos, cerros, montaña.",
    href: "/categoria/",
    url: "trail-run",
    icon: faPersonRunning,
    svg: "trail",
  },
  {
    name: "Ciclismo de Ruta",
    description: "Se caracteriza por sus largas distancias y alta velocidad",
    href: "/categoria/",
    url: "ciclismo-de-ruta",
    icon: faPersonBiking,
    svg: "",
  },
  /* { name: 'Ciclismo de Montaña (MTB)', description: 'Competición en circuitos naturales, bosques, caminos angostos con cuestas empinadas', href: '/categoria/', url:'ciclismo-de-montana', icon: faPersonRunning, svg: 'mtb' }, */
  {
    name: "Ciclismo de Montaña (MTB)",
    description:
      "Competición en circuitos naturales, bosques, caminos con cuestas ",
    href: "/categoria/",
    url: "ciclismo-de-montana",
    icon: faPersonRunning,
    svg: "mtb",
  },
  {
    name: "Triatlón",
    description:
      "Implica 3 disciplinas deportivas, natación, ciclismo y carrera a pie",
    href: "/categoria/",
    url: "triatlon",
    icon: faPersonSwimming,
    settings: "horizontal",
    svg: "",
  },
  /* { name: 'Duatlón', description: 'Deporte individual o por equipos que reúne dos disciplinas: atletismo y ciclismo', href: '/categoria/', url:'duatlon', icon: faPersonThroughWindow, svg: '' }, */
  {
    name: "Duatlón",
    description:
      "Deporte individual o por equipos, que implica ciclismo y carrera a pie",
    href: "/categoria/",
    url: "duatlon",
    icon: faPersonThroughWindow,
    svg: "",
  },
];

export const callsToAction = [
  { name: "Busqueda por fecha", href: "/calendario", icon: CalendarDaysIcon },
  /* { name: 'Contact sales', href: '#', icon: PhoneIcon }, */
];

export const reelsEvents = [
  {
    id: 1,
    url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2435437066822053%2F&show_text=false&width=267&t=0",
  },
  {
    id: 2,
    url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2435437066822053%2F&show_text=false&width=267&t=0",
  },
  {
    id: 3,
    url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2435437066822053%2F&show_text=false&width=267&t=0",
  },
  {
    id: 4,
    url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2435437066822053%2F&show_text=false&width=267&t=0",
  },
  {
    id: 5,
    url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2435437066822053%2F&show_text=false&width=267&t=0",
  },
];
export const statesOfMexico = [
  {
    id: 1,
    slug: "aguascalientes",
    name: "Aguascalientes",
    src: "/src/assets/images/states/AGS.jpg",
    alt: "Image of Aguascalientes https://unsplash.com/es/fotos/coche-rojo-aparcado-junto-a-un-edificio-de-hormigon-marron-durante-el-dia-WQYn7p_mjFc?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 2,
    slug: "baja-california",
    name: "Baja California",
    src: "/src/assets/images/states/BC.jpg",
    alt: "Image of Baja California https://unsplash.com/es/fotos/cactus-verde-en-suelo-marron-cerca-de-la-montana-marron-bajo-nubes-blancas-durante-el-dia-Q7oVkLY6y1g?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 3,
    slug: "baja-california-sur",
    name: "Baja California Sur",
    src: "/src/assets/images/states/BCS.jpg",
    alt: "Image of Baja California Sur https://unsplash.com/es/fotos/formacion-rocosa-en-el-oceano-fotografia-2LhCDvS_7xs?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 4,
    slug: "campeche",
    name: "Campeche",
    src: "/src/assets/images/states/CAM.jpg",
    alt: "Image of Campeche https://unsplash.com/es/fotos/muelle-de-madera-marron-en-el-mar-azul-bajo-el-cielo-azul-durante-el-dia-NdD1Ebi0cZE?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 5,
    slug: "chiapas",
    name: "Chiapas",
    src: "/src/assets/images/states/CHI.jpg",
    alt: "Image of Chiapas https://unsplash.com/es/fotos/montana-verde-y-marron-al-lado-del-cuerpo-de-agua-bajo-el-cielo-azul-durante-el-dia-iBzAIkuOFiY?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 6,
    slug: "chihuahua",
    name: "Chihuahua",
    src: "/src/assets/images/states/CHIH.jpg",
    alt: "Image of Chihuahua https://unsplash.com/es/fotos/arboles-verdes-en-las-montanas-rocosas-3ozV1RfrPEQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 7,
    slug: "coahuila",
    name: "Coahuila",
    src: "/src/assets/images/states/COA.jpg",
    alt: "Image of Coahuila https://unsplash.com/es/fotos/un-arbol-en-un-valle-uh1NQJalqNU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 8,
    slug: "colima",
    name: "Colima",
    src: "/src/assets/images/states/COL.jpg",
    alt: "Image of Colima https://unsplash.com/es/fotos/edificios-de-la-ciudad-cerca-de-cuerpos-de-agua-durante-el-dia-CP-eg3N16jQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 9,
    slug: "durango",
    name: "Durango",
    src: "/src/assets/images/states/DGO.jpg",
    alt: "Image of Durango https://unsplash.com/es/fotos/arboles-verdes-cerca-del-rio-bajo-el-cielo-azul-durante-el-dia-Dwvv1PfTZ0E?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 10,
    slug: "guanajuato",
    name: "Guanajuato",
    src: "/src/assets/images/states/GTO.jpg",
    alt: "Image of Guanajuato https://unsplash.com/es/fotos/personas-caminando-por-la-calle-cerca-de-un-edificio-de-hormigon-marron-durante-el-dia-ukIew--AEOc?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 11,
    slug: "guerrero",
    name: "Guerrero",
    src: "/src/assets/images/states/GUE.jpg",
    alt: "Image of Guerrero https://unsplash.com/es/fotos/calle-vacia-entre-casas-de-hormigon-bajo-el-cielo-azul-durante-el-dia-2pNzr2ehYRo?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 12,
    slug: "hidalgo",
    name: "Hidalgo",
    src: "/src/assets/images/states/HDO.jpg",
    alt: "Image of Hidalgo https://unsplash.com/es/fotos/el-sol-brilla-intensamente-en-las-montanas-rocosas-ytm2iZ8EeJs?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 13,
    slug: "jalisco",
    name: "Jalisco",
    src: "/src/assets/images/states/JAL.jpg",
    alt: "Image of Jalisco https://unsplash.com/es/fotos/estatua-del-caballero-gris-cerca-del-edificio--wMuKOvzbHs?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 14,
    slug: "mexico-city",
    name: "Ciudad de México",
    src: "/src/assets/images/states/CDMX.jpg",
    alt: "Image of Ciudad de México https://unsplash.com/es/fotos/una-torre-alta-con-una-estatua-en-la-parte-superior-Ss5iGvCKX8g?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 15,
    slug: "mexico-state",
    name: "Estado de México",
    src: "/src/assets/images/states/EDOMEX.jpg",
    alt: "Image of Estado de México",
  },
  {
    id: 16,
    slug: "michoacan",
    name: "Michoacán",
    src: "/src/assets/images/states/MICH.jpg",
    alt: "Image of Michoacán https://unsplash.com/es/fotos/un-grupo-de-personas-caminando-por-una-calle-junto-a-edificios-altos-9vrj88o5IQ4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 17,
    slug: "morelos",
    name: "Morelos",
    src: "/src/assets/images/states/MOR.jpg",
    alt: "Image of Morelos https://unsplash.com/es/fotos/planta-de-cactus-verde-durante-el-dia-Xobsjrz0J78?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 18,
    slug: "nayarit",
    name: "Nayarit",
    src: "/src/assets/images/states/NAY.jpeg",
    alt: "Image of Nayarit",
  },
  {
    id: 19,
    slug: "nuevo-leon",
    name: "Nuevo León",
    src: "/src/assets/images/states/NL.jpeg",
    alt: "Image of Nuevo León",
  },
  {
    id: 20,
    slug: "oaxaca",
    name: "Oaxaca",
    src: "/src/assets/images/states/OAX.jpg",
    alt: "Image of Oaxaca https://unsplash.com/es/fotos/lote-de-textiles-multicolores-0ohjyDUIUq0?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 21,
    slug: "puebla",
    name: "Puebla",
    src: "/src/assets/images/states/PUE.jpg",
    alt: "Image of Puebla https://unsplash.com/es/fotos/fotografia-aerea-de-la-catedral-de-orange-8gJqRaAaKx4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 22,
    slug: "queretaro",
    name: "Querétaro",
    src: "/src/assets/images/states/QTO.jpg",
    alt: "Image of Querétaro https://unsplash.com/es/fotos/una-calle-bordeada-de-bancos-y-edificios-bajo-un-cielo-azul-wB84N1jrfiM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 23,
    slug: "quintana-roo",
    name: "Quintana Roo",
    src: "/src/assets/images/states/QRO.jpg",
    alt: "Image of Quintana Roo https://unsplash.com/es/fotos/vista-aerea-de-la-playa-con-palmeras-2aLB0aQI5v4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 24,
    slug: "san-luis-potosi",
    name: "San Luis Potosí",
    src: "/src/assets/images/states/SLP.jpeg",
    alt: "Image of San Luis Potosí",
  },
  {
    id: 25,
    slug: "sinaloa",
    name: "Sinaloa",
    src: "/src/assets/images/states/SNL.jpg",
    alt: "Image of Sinaloa https://unsplash.com/es/fotos/gente-en-la-playa-durante-la-hora-dorada-R5fSpn3whHQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 26,
    slug: "sonora",
    name: "Sonora",
    src: "/src/assets/images/states/SON.jpeg",
    alt: "Image of Sonora",
  },
  {
    id: 27,
    slug: "tabasco",
    name: "Tabasco",
    src: "/src/assets/images/states/TAB.jpeg",
    alt: "Image of Tabasco",
  },
  {
    id: 28,
    slug: "tamaulipas",
    name: "Tamaulipas",
    src: "/src/assets/images/states/TAM.jpg",
    alt: "Image of Tamaulipas",
  },
  {
    id: 29,
    slug: "tlaxcala",
    name: "Tlaxcala",
    src: "/src/assets/images/states/TLAX.jpg",
    alt: "Image of Tlaxcala",
  },
  {
    id: 30,
    slug: "veracruz",
    name: "Veracruz",
    src: "/src/assets/images/states/VER.jpg",
    alt: "Image of Veracruz https://unsplash.com/es/fotos/barco-marron-en-el-cuerpo-de-agua-durante-la-puesta-del-sol-QUxqwXSt34A?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 31,
    slug: "yucatan",
    name: "Yucatán",
    src: "/src/assets/images/states/YUC.jpg",
    alt: "Image of Yucatán https://unsplash.com/es/fotos/piramide-de-hormigon-gris-bajo-el-cielo-azul-durante-el-dia-huMh6cfhl_o?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    id: 32,
    slug: "zacatecas",
    name: "Zacatecas",
    src: "/src/assets/images/states/ZAC.png",
    alt: "Image of Zacatecas",
  },
];
