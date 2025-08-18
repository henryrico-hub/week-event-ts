import { EventType } from "src/types";
import { Icon } from "@iconify-icon/react";
import { formatearFecha, formatearPrice } from "src/utils/helpers";

type CardProps = {
  data: EventType;
};

function testView2({ data }: CardProps) {
  return (
    <>
      {data && (
        <div
          // className="bg-[#1E2024]"
          className="bg-#1E2024/10 bg-gradient-to-b from-[#1E2024] to-[#edeff4]"
        >
          <div className="container pt-10 ">
            <div className="max-sm:mr-0 mt-4 ">
              <div className="relative grid gap-10 rounded-t-2xl bg-[#1E2024] p-6 pb-10 lg:grid-cols-2 lg:px-7 lg:py-8 lg:pb-10">
                <div className="flex flex-1 flex-col">
                  <div className="relative mb-2 overflow-hidden rounded-lg xl:-mx-4 xl:-mt-4 lg:hidden">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                      <img
                        alt=""
                        src={`${import.meta.env.VITE_API_URL_SHORT}${
                          data.img_main.url
                        }`}
                        className="h-48 w-full rounded-lg bg-gray-950/5 object-cover sm:col-span-2 sm:h-40"
                      />
                      <img
                        alt=""
                        src={`${import.meta.env.VITE_API_URL_SHORT}${
                          data.img_desc1.url
                        }`}
                        className="col-span-2 h-48 w-full rounded-lg bg-gray-950/5 object-cover sm:h-40 md:col-span-1 hidden sm:block"
                      />
                      <img
                        alt=""
                        src={`${import.meta.env.VITE_API_URL_SHORT}${
                          data.img_desc2.url
                        }`}
                        className="h-48 w-full rounded-lg bg-gray-950/5 object-cover sm:h-40 hidden md:block"
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-b from-transparent via-transparent to-gray-950 p-6 sm:hidden">
                      <span className="text-sm font-semibold text-white/80">
                        {data.category.name}
                      </span>
                      <span className="text-xl font-semibold text-white">
                        {data.name}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium text-gray-400 hidden sm:block dark:text-gray-400">
                    {data.category.name}
                  </span>
                  <div className="grid grid-cols-1 sm:gap-4 gap-2 sm:grid-cols-[1fr_auto] xl:grid-cols-1">
                    <div>
                      <span className="mt-2 text-3xl font-semibold text-white hidden sm:block ">
                        {data.name}
                      </span>
                      <span className="mt-2 flex items-start sm:items-center flex-col sm:flex-row gap-2 text-[#F0F0F0]/90">
                        <span className="flex gap-2">
                          <Icon
                            icon="mdi:calendar-month"
                            inline={true}
                            width={20}
                            style={{ fontWeight: 700 }}
                          />
                          <span className="text-sm font-medium">
                            {formatearFecha(data.date_event)}
                          </span>
                          <span className="block sm:hidden text-sm text-[#F0F0F0]/50">
                            {`($${formatearPrice(data.price)})`}
                          </span>
                        </span>
                        <span className="hidden sm:block text-sm text-[#F0F0F0]/50">
                          {`($${formatearPrice(data.price)})`}
                        </span>
                        <span className="hidden sm:block text-4xl">·</span>
                        <span className="text-sm font-medium">
                          {`${data.city_state}, ${data.state.name}`}
                        </span>
                      </span>
                    </div>
                    <div className="lg:hidden">
                      <button className="w-full rounded-lg px-3 py-2 text-sm hover:text-base font-bold sm:w-auto bg-[#673AB7]/70 text-gray-100 hover:bg-[#FFCC00]/90 hover:text-black transition-all duration-300">
                        Registrate Ahora
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="mt-4 line-clamp-2 text-sm text-gray-600 xl:max-w-md dark:text-gray-400">
                      {data.description1}...{/* */}
                      <span className="inline-block sm:hidden font-bold text-pink-600 before:text-white dark:text-pink-500">
                        Leer más
                      </span>
                    </p>
                    <span className="hidden mt-3 sm:inline-block shrink-0 text-sm font-semibold text-pink-600 dark:text-pink-500">
                      Leer más
                    </span>
                  </div>
                  <div className="mt-6 hidden lg:block">
                    <button
                      type="button"
                      className="w-auto rounded-lg px-3 py-2 text-sm hover:text-base font-bold bg-[#673AB7]/70 text-gray-100 hover:bg-[#FFCC00]/90 hover:text-black transition-all duration-300"
                    >
                      Registrate Ahora
                    </button>
                  </div>
                </div>
                <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-2">
                  <img
                    alt=""
                    src={`${import.meta.env.VITE_API_URL_SHORT}${
                      data.img_main.url
                    }`}
                    className="col-span-4 h-[150px] w-full rounded-lg bg-gray-950/5 object-cover xl:col-span-2 xl:row-span-2 xl:aspect-square xl:h-[308px]"
                  />
                  <img
                    alt=""
                    src={`${import.meta.env.VITE_API_URL_SHORT}${
                      data.img_desc1.url
                    }`}
                    className="col-span-2 h-[150px] w-full rounded-lg bg-gray-950/5 xl:col-span-1 xl:aspect-square"
                  />
                  <img
                    alt=""
                    src={`${import.meta.env.VITE_API_URL_SHORT}${
                      data.img_desc2.url
                    }`}
                    className="col-span-2 h-[150px] w-full rounded-lg bg-gray-950/5 xl:col-span-1 xl:aspect-square"
                  />
                  <div className="hidden xl:contents">
                    <img
                      alt=""
                      src={`${import.meta.env.VITE_API_URL_SHORT}${
                        data.img_desc2.url
                      }`}
                      className="aspect-square w-full h-[150px] rounded-lg bg-gray-950/5"
                    />
                    <img
                      alt=""
                      src={`${import.meta.env.VITE_API_URL_SHORT}${
                        data.img_desc1.url
                      }`}
                      className="aspect-square w-full h-[150px] rounded-lg bg-gray-950/5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default testView2;
