import img1 from "src/assets/images/logo1.jpeg";

function testView() {
  return (
    <>
      <div className="max-sm:mr-0" style={{ marginRight: "16px" }}>
        <div className="relative grid gap-10 rounded-t-2xl bg-white p-6 pb-10 ring ring-gray-950/5 lg:grid-cols-2 lg:px-20 lg:py-8 lg:pb-10 dark:bg-gray-950 dark:ring-white/10">
          <div className="flex flex-1 flex-col">
            <div className="relative mb-4 overflow-hidden rounded-lg xl:-mx-4 xl:-mt-4 lg:hidden">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                <img
                  alt=""
                  src={img1}
                  className="h-48 w-full rounded-lg bg-gray-950/5 object-cover sm:col-span-2 sm:h-40"
                />
                <img
                  alt=""
                  src={img1}
                  className="col-span-2 h-48 w-full rounded-lg bg-gray-950/5 object-cover sm:h-40 md:col-span-1 sm:hidden"
                />
                <img
                  alt=""
                  src={img1}
                  className="h-48 w-full rounded-lg bg-gray-950/5 object-cover sm:h-40 md:hidden"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-b from-transparent via-transparent to-gray-950 p-6 sm:hidden">
                <span className="text-sm font-semibold text-white/80">
                  Entire house
                </span>
                <span className="text-xl font-semibold text-white">
                  Beach House on Lake Huron
                </span>
              </div>
            </div>
            <span className="font-medium text-gray-500 sm:hidden dark:text-gray-500">
              Entire house
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] xl:grid-cols-1">
              <div>
                <span className="mt-2 text-3xl font-semibold text-gray-950 sm:hidden dark:text-white">
                  Beach House on Lake Huron
                </span>
                <span className="mt-2 flex gap-2">
                  <span className="flex items-center gap-1 text-pink-600 dark:text-pink-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-sm font-medium">2.66</span>
                  </span>
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                  <span className="text-pink-300 dark:text-gray-600">·</span>
                  <span className="text-sm font-medium text-pink-600 dark:text-pink-500">
                    Bayfield, ON
                  </span>
                </span>
              </div>
              <div className="lg:hidden">
                <button
                  type="button"
                  className="w-full rounded-lg bg-pink-500 px-3 py-2 text-sm font-bold text-white sm:w-auto"
                >
                  Check availability
                </button>
              </div>
            </div>
            <div>
              <p className="mt-4 line-clamp-2 text-sm text-gray-600 xl:max-w-md dark:text-gray-400">
                This sunny and spacious room is for those traveling light and
                looking for a comfy and cozy place to lay their head for a
                night...{/* */}
                <span className="hidden font-bold text-pink-600 before:text-white sm:inline-block dark:text-pink-500">
                  Show more
                </span>
              </p>
              <span className="mt-3 inline-block shrink-0 text-sm font-semibold text-pink-600 dark:text-pink-500">
                Show more
              </span>
            </div>
            <div className="mt-6 lg:hidden">
              <button
                type="button"
                className="w-auto rounded-lg bg-pink-500 px-3 py-2 text-sm font-bold text-white"
              >
                Check availability
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-2 lg:hidden">
            <img
              alt=""
              src={img1}
              className="col-span-4 h-[150px] w-full rounded-lg bg-gray-950/5 object-cover xl:col-span-2 xl:row-span-2 xl:aspect-square xl:h-[308px]"
            />
            <img
              alt=""
              src={img1}
              className="col-span-2 h-[150px] w-full rounded-lg bg-gray-950/5 xl:col-span-1 xl:aspect-square"
            />
            <img
              alt=""
              src={img1}
              className="col-span-2 h-[150px] w-full rounded-lg bg-gray-950/5 xl:col-span-1 xl:aspect-square"
            />
            <div className="contents xl:hidden">
              <img
                alt=""
                src={img1}
                className="aspect-square w-[150px] h-[150px] rounded-lg bg-gray-950/5"
              />
              <img
                alt=""
                src={img1}
                className="aspect-square w-[150px] h-[150px] rounded-lg bg-gray-950/5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default testView;
