import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import { useEffect } from "react";
import { EventType } from "src/types";

const elements = [
  {
    title: "Servicio medico",
    slug: "servicio-medico",
    icon: "mdi:medical-bag",
    complementText: "Atención médica durante todo el evento.",
  },
  {
    title: "Seguridad",
    slug: "seguridad",
    icon: "mdi:shield-check",
    complementText: "Seguridad en puntos clave del recorrido.",
  },
  {
    title: "Hidratación",
    slug: "hidratacion",
    icon: "mdi:water",
    complementText: "Abastos de agua y bebidas isotónicas",
  },
  {
    title: "Medalla de Finisher",
    slug: "medalla-de-finisher",
    icon: "mdi:medal",
    complementText: "Medalla entregada al cruzar la meta.",
  },
  {
    title: "Premiación general y categorias",
    slug: "premiacion-general-y-categorias",
    icon: "mdi:trophy",
    complementText: "Premios para ganadores.",
  },
  {
    title: "Carrera Certificada / Chip",
    slug: "carrera-certificada-chip",
    icon: "mdi:run",
    complementText: "Cronometraje electrónico y certificación oficial.",
  },
  {
    title: "Kit de corredor",
    slug: "kit-de-corredor",
    icon: "mdi:package-variant",
    complementText: "Incluye número y otros artículos.",
  },
  {
    title: "Fotografo oficial en ruta",
    slug: "fotografo-oficial-en-ruta",
    icon: "mdi:camera",
    complementText: "Fotógrafos capturando momentos del evento.",
  },
  {
    title: "Guardarropa",
    slug: "guardarropa",
    icon: "mdi:wardrobe",
    complementText: "Espacio seguro para tus pertenencias.",
  },
  {
    title: "Baños",
    slug: "banos",
    icon: "mdi:toilet",
    complementText: "Baños disponibles en la zona de salida y meta.",
  },
  {
    title: "Animación y música",
    slug: "animacion-y-musica",
    icon: "mdi:music",
    complementText: "Animadores y música durante el evento.",
  },
  {
    title: "Zona de recuperación",
    slug: "zona-de-recuperacion",
    icon: "mdi:heart-pulse",
    complementText: "Área para recuperación post-carrera.",
  },
  {
    title: "Estacionamiento",
    slug: "estacionamiento",
    icon: "mdi:car",
    complementText: "Estacionamiento disponible para participantes.",
  },
];
type Props = {
  dataEvent: EventType | undefined;
};

function CardServices({ dataEvent }: Props) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [elementsfromEvent, setElementsFromEvent] = useState<typeof elements>(
    []
  );

  useEffect(() => {
    // console.log(dataEvent?.services_scs);

    if (dataEvent && dataEvent.services_scs) {
      const services = dataEvent.services_scs
        .map((service) =>
          elements.find((element) => element.slug === service.slug)
        )
        .filter((el): el is (typeof elements)[number] => !!el);
      setElementsFromEvent(services);
    }
  }, [dataEvent]);

  return (
    <div className="bg-[#1E2024]">
      <div id="services-list" className="container">
        <div className="ag-courses_box">
          {(showAll ? elementsfromEvent : elementsfromEvent.slice(0, 6)).map(
            (serv, key) => (
              <div key={key} className="ag-courses_item">
                <a className="ag-courses-item_link">
                  <div className="ag-courses-item_bg style"></div>

                  <div className="ag-courses-item_date-box">
                    <span className="flex ag-courses-item_date">
                      <Icon icon={serv.icon} width={48} height={48} />
                      <span
                        className="ag-courses-item_text pl-2"
                        style={{ color: "#121212" }}
                      >
                        {serv.complementText}
                      </span>
                    </span>
                  </div>
                  <div className="ag-courses-item_title">{serv.title}</div>
                </a>
              </div>
            )
          )}
        </div>
        {elementsfromEvent.length <= 6 ? (
          <></>
        ) : (
          <div className="flex flex-col items-center pb-4">
            <button
              className="flex w-fit bg-[#121212] hover:text-black text-slate-50 font-semibold hover:bg-[#f97316] px-6 py-3 rounded-full shadow-lg shadow-blue-500/40 hover:shadow-orange-500/40 transition-all duration-300"
              onClick={() => {
                setShowAll((prev) => {
                  const next = !prev;
                  if (prev) {
                    const el = document.getElementById("services-list");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                  return next;
                });
              }}
            >
              {showAll ? "Mostar menos" : "Mostrar todos"}
              <Icon
                className=""
                icon={showAll ? "mdi:chevron-up" : "mdi:chevron-down"}
                width={24}
                height={24}
                inline={true}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardServices;
