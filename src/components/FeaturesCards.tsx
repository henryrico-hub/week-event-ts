import { Icon } from "@iconify-icon/react";

function FeaturesCards() {
  return (
    <div className="icon-section max-w-[85rem] px-6 py-5 my-20 sm:px-6 lg:px-8 lg:py-12 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-9">
        <a
          className="group flex gap-y-6 size-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg p-4"
          href="#"
        >
          <Icon icon="mdi:mountain" className="text-4xl text-blue-600 mr-4" />
          <div>
            <div>
              <h3 className="block font-bold text-gray-800">
                Carreras de Montaña
              </h3>
              <p className="text-gray-600">
                Explora rutas desafiantes y disfruta de la naturaleza en
                carreras de montaña para todos los niveles.
              </p>
            </div>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800">
              Saber más
              <Icon
                icon={"mdi:chevron-right"}
                className="shrink-0  transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
                width={22}
              />
            </p>
          </div>
        </a>
        <a
          className="group flex gap-y-6 size-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg p-4"
          href="#"
        >
          <Icon icon="mdi:run-fast" className="text-4xl text-green-600 mr-4" />
          <div>
            <div>
              <h3 className="block font-bold text-gray-800">
                Eventos de Maratón
              </h3>
              <p className="text-gray-600">
                Participa en maratones y desafíate junto a corredores de todas
                partes.
              </p>
            </div>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800">
              Saber más
              <Icon
                icon={"mdi:chevron-right"}
                className="shrink-0  transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
                width={22}
              />
            </p>
          </div>
        </a>
        <a
          className="group flex gap-y-6 size-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg p-4"
          href="#"
        >
          <Icon icon="mdi:swim" className="text-4xl text-purple-600 mr-4" />
          <div>
            <div>
              <h3 className="block font-bold text-gray-800">
                Retos de Triatlón
              </h3>
              <p className="text-gray-600">
                Pon a prueba tu resistencia en eventos de triatlón que combinan
                natación, ciclismo y carrera.
              </p>
            </div>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800">
              Saber más
              <Icon
                icon={"mdi:chevron-right"}
                className="shrink-0  transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
                width={22}
              />
            </p>
          </div>
        </a>
        <a
          className="group flex gap-y-6 size-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg p-4"
          href="#"
        >
          <Icon icon="mdi:bike" className="text-4xl text-yellow-600 mr-4" />
          <div>
            <div>
              <h3 className="block font-bold text-gray-800">
                Rutas MTB y Ruta
              </h3>
              <p className="text-gray-600">
                Descubre eventos de ciclismo de montaña (MTB) y de ruta para
                todos los niveles y disfruta de la aventura sobre dos ruedas.
              </p>
            </div>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800"></p>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800">
              Saber más
              <Icon
                icon={"mdi:chevron-right"}
                className="shrink-0  transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
                width={22}
                inline={true}
              />
              {/* <svg
                className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg> */}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default FeaturesCards;
