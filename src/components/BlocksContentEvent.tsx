import { useEffect, useRef, useState } from "react";
import BlockRendererClient from "./BlockRendererClient";
import { Icon } from "@iconify-icon/react";

type Props = {
  distance?: any;
  registration?: any;
  kit?: any;
  services?: any;
  // toScroll: (arg0: string) => void;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

function BlocksContentEvent({
  distance,
  registration,
  kit,
  services,
  selected,
  setSelected,
}: // toScroll,
Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  // const [selected, setSelected] = useState<string>("distance");

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si el sentinel ya no se ve -> sticky activo
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-5px 0px 0px 0px", // actúa como un offset
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  const changeContent = (section: string) => {
    setSelected(section);
    const flagScroll_m = document.querySelector("#flagScroll-m");
    flagScroll_m?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* <div className="right-section-title rounded-none md:rounded-md md:p-2">
        <div className="title-navs w-full">
          <div
            className="nav nav-pills"
            id="nav-tab"
            role="tablist"
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              justifyContent: "space-around",
            }}
          >
            {distance && (
              <button
                onClick={toScroll}
                className="nav-link active "
                id="nav-distance-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-distance"
                type="button"
                role="tab"
                aria-controls="nav-distance"
                aria-selected="true"
              >
                <Icon
                  icon="mdi:map-marker-distance"
                  className="pr-2"
                  inline={true}
                  width={20}
                />
                {event_descript[0].name}
              </button>
            )}
            {registration && (
              <button
                onClick={toScroll}
                className="nav-link "
                id="nav-registration-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-registration"
                type="button"
                role="tab"
                aria-controls="nav-registration"
                aria-selected="false"
              >
                <Icon
                  icon="mdi:account-edit"
                  className="pr-2"
                  inline={true}
                  width={20}
                />
                {event_descript[1].name}
              </button>
            )}
            {kit && (
              <button
                onClick={toScroll}
                className="nav-link "
                id="nav-kit-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-kit"
                type="button"
                role="tab"
                aria-controls="nav-kit"
                aria-selected="false"
              >
                <Icon
                  icon="mdi:marketplace-outline"
                  className="pr-2"
                  inline={true}
                  width={20}
                />
                {event_descript[2].name}
              </button>
            )}
            {services && (
              <button
                onClick={toScroll}
                className="nav-link "
                id="nav-services-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-services"
                type="button"
                role="tab"
                aria-controls="nav-services"
                aria-selected="false"
              >
                <Icon
                  icon="mdi:animation"
                  className="pr-2"
                  inline={true}
                  width={20}
                />
                {event_descript[3].name}
              </button>
            )}
          </div>
        </div>
      </div> */}

      {/* <div
        className={`lg:sticky lg:top-0 lg:z-10 hidden sm:block max-w-[85rem] px-6 py-5 my-20 sm:px-6 lg:px-8 lg:py-12 mx-auto lg:bg-slate-100 transition-all duration-300`}
      >
        <div
          className={`grid sm:grid-cols-4 lg:grid-cols-4 items-center gap-2 md:gap-9 
        ${isSticky ? "flex flex-col" : "flex flex-row"}`}
        >
          <span className="group flex flex-col gap-y-2 size-full hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg p-4">
            <h3
              className={`block font-bold ${
                isSticky ? "text-blue-800" : "text-gray-700"
              } text-center`}
            >
              Distancias
            </h3>
          </span>
          <span className="group flex flex-col gap-y-2 size-full hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg p-4">
            <h3 className="block font-bold text-gray-800 text-center">
              Detalles de Inscripción
            </h3>
          </span>
          <span className="group flex flex-col gap-y-2 size-full hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg p-4">
            <h3 className="block font-bold text-gray-800 text-center">
              Entrega de Kits
            </h3>
          </span>
          <span className="group flex flex-col gap-y-2 size-full hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg p-4">
            <h3 className="block font-bold text-gray-800 text-center">
              Servicios Adicionales
            </h3>
          </span>
        </div>
      </div> */}

      {/* ${isSticky ? "flex flex-col" : "flex flex-row"}`} */}

      <div ref={sentinelRef} className="h-[2px] hidden md:block"></div>
      <div
        className={`sticky top-0 z-10 max-w-[85rem] px-6 ${
          isSticky ? "py-1 m-2 bg-white" : "py-1 my-2"
        }  sm:px-6 lg:px-8 lg:py-12 mx-auto hidden md:block`}
      >
        <div
          id="nav-tab"
          role="tablist"
          className="grid sm:grid-cols-4 lg:grid-cols-4 items-center gap-9 md:gap-9 "
        >
          <span
            onClick={() => changeContent("distance")}
            id="nav-distance-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-distance"
            role="tab"
            aria-controls="nav-distance"
            aria-selected="true"
            className={`${
              isSticky
                ? " size-full items-center justify-center p-2 "
                : "flex-col size-full p-4"
            } group flex gap-2 hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg transition-all duration-300`}
          >
            <Icon
              icon="mdi:map-marker-distance"
              width={isSticky ? 32 : 52}
              height={isSticky ? 32 : 52}
              inline={true}
              className={`text-[#f97316] group-hover:text-blue-500/70 ${
                selected === "distance" ? "text-blue-500" : ""
              }`}
            />

            <h3
              className={`block font-bold text-gray-800 text-center ${
                isSticky ? "text-base" : "text-baase"
              }`}
            >
              Distancias
            </h3>
          </span>
          <span
            onClick={() => changeContent("registration")}
            id="nav-registration-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-registration"
            role="tab"
            aria-controls="nav-registration"
            aria-selected="false"
            className={`${
              isSticky
                ? " size-full items-center justify-center p-2 "
                : "flex-col size-full p-4"
            } group flex gap-2 hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg transition-all duration-300`}
          >
            <Icon
              icon="mdi:account-edit"
              width={isSticky ? 32 : 52}
              height={isSticky ? 32 : 52}
              inline={true}
              className={`text-[#f97316] group-hover:text-blue-500/70 ${
                selected === "registration" ? "text-blue-500" : ""
              }`}
            />

            <h3
              className={`block font-bold text-gray-800 text-center ${
                isSticky ? "text-base" : "text-baase"
              }`}
            >
              Detalles de Inscripción
            </h3>
          </span>
          <span
            onClick={() => changeContent("kit")}
            id="nav-kit-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-kit"
            role="tab"
            aria-controls="nav-kit"
            aria-selected="false"
            className={`${
              isSticky
                ? " size-full items-center justify-center p-2 "
                : "flex-col size-full p-4"
            } group flex gap-2 hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg transition-all duration-300`}
          >
            <Icon
              icon="mdi:marketplace-outline"
              width={isSticky ? 32 : 52}
              height={isSticky ? 32 : 52}
              inline={true}
              className={`text-[#f97316] group-hover:text-blue-500/70 ${
                selected === "kit" ? "text-blue-500" : ""
              }`}
            />

            <h3
              className={`block font-bold text-gray-800 text-center ${
                isSticky ? "text-base" : "text-base"
              }`}
            >
              Entrega de Kits
            </h3>
          </span>
          <span
            onClick={() => setSelected("services")}
            id="nav-services-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-services"
            role="tab"
            aria-controls="nav-services"
            aria-selected="false"
            className={`${
              isSticky
                ? " size-full items-center justify-center p-2 "
                : "flex-col size-full p-4"
            } group flex gap-2 hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg transition-all duration-300`}
          >
            <Icon
              icon="mdi:animation"
              width={isSticky ? 32 : 52}
              height={isSticky ? 32 : 52}
              inline={true}
              className={`text-[#f97316] group-hover:text-blue-500/70 ${
                selected === "services" ? "text-blue-500" : ""
              }`}
            />

            <h3
              className={`block font-bold text-gray-800 text-center ${
                isSticky ? "text-base" : "text-base"
              }`}
            >
              Servicios Adicionales
            </h3>
          </span>
          {/* <span className="group flex flex-col gap-y-2 size-full hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg p-4">
            <Icon
              icon="mdi:account-edit"
              width={52}
              height={52}
              className="text-[#f97316] group-hover:text-blue-500/70"
            />
            <div>
              <h3 className="block font-bold text-gray-800 text-center">
                Detalles de Inscripción
              </h3>
            </div>
          </span>
          <span className="group flex flex-col gap-y-2 size-full hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg p-4">
            <Icon
              icon="mdi:marketplace-outline"
              width={52}
              height={52}
              className="text-[#f97316] group-hover:text-blue-500/70"
            />
            <div>
              <h3 className="block font-bold text-gray-800 text-center">
                Entrega de Kits
              </h3>
            </div>
          </span>
          <span className="group flex flex-col gap-y-2 size-full hover:bg-gray-100 focus:outline-none hover:cursor-pointer focus:bg-gray-100 rounded-lg p-4">
            <Icon
              icon="mdi:animation"
              width={52}
              height={52}
              className="text-[#f97316] group-hover:text-blue-500/70"
            />
            <div>
              <h3 className="block font-bold text-gray-800 text-center">
                Servicios Adicionales
              </h3>
            </div>
          </span> */}
        </div>
      </div>

      <div className="container hidden md:block">
        <div className="right-section-body p-3">
          <div className="row">
            <div className="lg:p-4 w-full">
              {(() => {
                switch (selected) {
                  case "distance":
                    return (
                      <>
                        {distance && (
                          <main className="prose lg:prose-base max-w-fit my-2">
                            <BlockRendererClient content={distance} />
                          </main>
                        )}
                      </>
                    );
                  case "registration":
                    return (
                      <>
                        {registration && (
                          <main className="prose lg:prose-base max-w-fit my-2">
                            <BlockRendererClient content={registration} />
                          </main>
                        )}
                      </>
                    );
                  case "kit":
                    return (
                      <>
                        {kit && (
                          <main className="prose lg:prose-base max-w-fit my-2">
                            <BlockRendererClient content={kit} />
                          </main>
                        )}
                      </>
                    );
                  case "services":
                    return (
                      <>
                        {services && (
                          <main className="prose lg:prose-base max-w-fit my-2">
                            <BlockRendererClient content={services} />
                          </main>
                        )}
                      </>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlocksContentEvent;
