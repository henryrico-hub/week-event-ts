import {
  faPersonRunning,
  faPersonBiking,
  faPersonSwimming,
  faPersonThroughWindow,
} from "@fortawesome/free-solid-svg-icons";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import AGS from "/src/assets/images/states/AGS.jpg";
import BC from "/src/assets/images/states/BC.jpg";
import BCS from "/src/assets/images/states/BCS.jpg";
import CAM from "/src/assets/images/states/CAM.jpg";
import CHI from "/src/assets/images/states/CHI.jpg";
import CHIH from "/src/assets/images/states/CHIH.jpg";
import COA from "/src/assets/images/states/COA.jpg";
import COL from "/src/assets/images/states/COL.jpg";
import DGO from "/src/assets/images/states/DGO.jpg";
import GTO from "/src/assets/images/states/GTO.jpg";
import GUE from "/src/assets/images/states/GUE.jpg";
import HDO from "/src/assets/images/states/HDO.jpg";
import JAL from "/src/assets/images/states/JAL.jpg";
import CDMX from "/src/assets/images/states/CDMX.jpg";
import EDOMEX from "/src/assets/images/states/EDOMEX.jpg";
import MICH from "/src/assets/images/states/MICH.jpg";
import MOR from "/src/assets/images/states/MOR.jpg";
import NAY from "/src/assets/images/states/NAY.jpeg";
import NL from "/src/assets/images/states/NL.jpeg";
import OAX from "/src/assets/images/states/OAX.jpg";
import PUE from "/src/assets/images/states/PUE.jpg";
import QTO from "/src/assets/images/states/QTO.jpg";
import QRO from "/src/assets/images/states/QRO.jpg";
import SLP from "/src/assets/images/states/SLP.jpeg";
import SNL from "/src/assets/images/states/SNL.jpg";
import SON from "/src/assets/images/states/SON.jpeg";
import TAB from "/src/assets/images/states/TAB.jpeg";
import TAM from "/src/assets/images/states/TAM.jpg";
import TLAX from "/src/assets/images/states/TLAX.jpg";
import VER from "/src/assets/images/states/VER.jpg";
import YUC from "/src/assets/images/states/YUC.jpg";
import ZAC from "/src/assets/images/states/ZAC.png";

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
    src: AGS,
    alt: "Image of Aguascalientes",
  },
  {
    id: 2,
    slug: "baja-california",
    name: "Baja California",
    src: BC,
    alt: "Image of Baja California",
  },
  {
    id: 3,
    slug: "baja-california-sur",
    name: "Baja California Sur",
    src: BCS,
    alt: "Image of Baja California Sur",
  },
  {
    id: 4,
    slug: "campeche",
    name: "Campeche",
    src: CAM,
    alt: "Image of Campeche",
  },
  {
    id: 5,
    slug: "chiapas",
    name: "Chiapas",
    src: CHI,
    alt: "Image of Chiapas",
  },
  {
    id: 6,
    slug: "chihuahua",
    name: "Chihuahua",
    src: CHIH,
    alt: "Image of Chihuahua",
  },
  {
    id: 7,
    slug: "coahuila",
    name: "Coahuila",
    src: COA,
    alt: "Image of Coahuila",
  },
  { id: 8, slug: "colima", name: "Colima", src: COL, alt: "Image of Colima" },
  {
    id: 9,
    slug: "durango",
    name: "Durango",
    src: DGO,
    alt: "Image of Durango",
  },
  {
    id: 10,
    slug: "guanajuato",
    name: "Guanajuato",
    src: GTO,
    alt: "Image of Guanajuato",
  },
  {
    id: 11,
    slug: "guerrero",
    name: "Guerrero",
    src: GUE,
    alt: "Image of Guerrero",
  },
  {
    id: 12,
    slug: "hidalgo",
    name: "Hidalgo",
    src: HDO,
    alt: "Image of Hidalgo",
  },
  {
    id: 13,
    slug: "jalisco",
    name: "Jalisco",
    src: JAL,
    alt: "Image of Jalisco",
  },
  {
    id: 14,
    slug: "mexico-city",
    name: "Ciudad de México",
    src: CDMX,
    alt: "Image of Ciudad de México",
  },
  {
    id: 15,
    slug: "mexico-state",
    name: "Estado de México",
    src: EDOMEX,
    alt: "Image of Estado de México",
  },
  {
    id: 16,
    slug: "michoacan",
    name: "Michoacán",
    src: MICH,
    alt: "Image of Michoacán",
  },
  {
    id: 17,
    slug: "morelos",
    name: "Morelos",
    src: MOR,
    alt: "Image of Morelos",
  },
  {
    id: 18,
    slug: "nayarit",
    name: "Nayarit",
    src: NAY,
    alt: "Image of Nayarit",
  },
  {
    id: 19,
    slug: "nuevo-leon",
    name: "Nuevo León",
    src: NL,
    alt: "Image of Nuevo León",
  },
  { id: 20, slug: "oaxaca", name: "Oaxaca", src: OAX, alt: "Image of Oaxaca" },
  { id: 21, slug: "puebla", name: "Puebla", src: PUE, alt: "Image of Puebla" },
  {
    id: 22,
    slug: "queretaro",
    name: "Querétaro",
    src: QTO,
    alt: "Image of Querétaro",
  },
  {
    id: 23,
    slug: "quintana-roo",
    name: "Quintana Roo",
    src: QRO,
    alt: "Image of Quintana Roo",
  },
  {
    id: 24,
    slug: "san-luis-potosi",
    name: "San Luis Potosí",
    src: SLP,
    alt: "Image of San Luis Potosí",
  },
  {
    id: 25,
    slug: "sinaloa",
    name: "Sinaloa",
    src: SNL,
    alt: "Image of Sinaloa",
  },
  { id: 26, slug: "sonora", name: "Sonora", src: SON, alt: "Image of Sonora" },
  {
    id: 27,
    slug: "tabasco",
    name: "Tabasco",
    src: TAB,
    alt: "Image of Tabasco",
  },
  {
    id: 28,
    slug: "tamaulipas",
    name: "Tamaulipas",
    src: TAM,
    alt: "Image of Tamaulipas",
  },
  {
    id: 29,
    slug: "tlaxcala",
    name: "Tlaxcala",
    src: TLAX,
    alt: "Image of Tlaxcala",
  },
  {
    id: 30,
    slug: "veracruz",
    name: "Veracruz",
    src: VER,
    alt: "Image of Veracruz",
  },
  {
    id: 31,
    slug: "yucatan",
    name: "Yucatán",
    src: YUC,
    alt: "Image of Yucatán",
  },
  {
    id: 32,
    slug: "zacatecas",
    name: "Zacatecas",
    src: ZAC,
    alt: "Image of Zacatecas",
  },
];
