import React, { useEffect, useState } from "react";
import { Avatar, Drawer, Tooltip } from "antd";
import { getEventsState } from "../models/event.server";
import { EventType } from "../types";
import CardEvent from "./CardEvent";
import { iconMap } from "src/data/index";

// import { MtbV3_icon, Trail_icon2 } from "./Icons/Icons";
// import { Icon } from "@iconify-icon/react";

// const iconMap = [
//   {
//     category: "Triatlón",
//     slug: "triatlon",
//     backgroundColor: "#87CEEB",
//     Icon: (
//       <Icon
//         icon={"healthicons:swim"}
//         // flip="horizontal"
//         // size="xl"
//         className="text-gray-600"
//       />
//     ),
//     className: "h-8 w-8 text-gray-600",
//   },
//   {
//     category: "Correr",
//     slug: "correr",
//     backgroundColor: "#87D068",
//     Icon: (
//       <Icon
//         icon={"healthicons:running-outline-24px"}
//         // size="xl"
//         className=" text-gray-600"
//       />
//     ),
//   },
//   {
//     category: "Ciclismo de Montaña",
//     slug: "ciclismo-de-montana",
//     backgroundColor: "#98FB98",
//     Icon: <MtbV3_icon className="fill-current w-20 h-20 text-gray-600" />,
//   },
//   {
//     category: "Trail Run",
//     slug: "trail-run",
//     backgroundColor: "#F08080",
//     Icon: <Trail_icon2 className="fill-current w-20 h-20 text-gray-600" />,
//   },

//   {
//     category: "Ciclismo de Ruta",
//     slug: "ciclismo-de-ruta",
//     backgroundColor: "#FAFAD2",
//     Icon: <Icon icon={"mdi:bike-fast"} className="text-gray-600" />,
//   },
//   {
//     category: "Duatlón",
//     slug: "duatlon",
//     backgroundColor: "#AFEEEE",
//     Icon: (
//       <Icon
//         icon={"healthicons:globe-outline-24px"}
//         // size="xl"
//         className="text-gray-600"
//       />
//     ),
//   },
// ];

type StateEventsDrawerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stateSelected: string;
};

const StateEventsDrawer = ({
  open,
  setOpen,
  stateSelected,
}: StateEventsDrawerProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<EventType[]>([]);
  const [datafiltered, setDataFiltered] = useState<EventType[]>([]);
  const [categorySelected, setCategorySelected] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    if (open) {
      const fetchData = async () => {
        try {
          const events = await getEventsState(stateSelected);
          setData(events.data);
          setDataFiltered(events.data);
          // console.log(events.data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
      fetchData();

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open, stateSelected]);

  const handleCategoryClick = (category: string) => {
    setLoading(true);
    //create a copy to apply this filters more of one time

    setDataFiltered(data.filter((event) => event.category.slug === category));
    setCategorySelected(
      iconMap.find((item) => item.slug === category) ? category : ""
    );
    // setData((prev) => prev.filter((event) => event.category.slug === category));
    // console.log(categorySelected);

    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  const showAll = () => {
    setLoading(true);
    setDataFiltered(data);
    setCategorySelected("");
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  return (
    <>
      <Drawer
        closable
        destroyOnClose
        title={
          <h2 className="text-center capitalize">
            {stateSelected +
              " " +
              (categorySelected ? " - " + categorySelected : "")}
          </h2>
        }
        placement="left"
        open={open}
        loading={loading}
        onClose={() => {
          setOpen(false);
          setCategorySelected("");
        }}
        style={{
          backgroundColor: "#EDEFF4",
          zIndex: 100,
        }}
        styles={{
          body: { padding: loading ? "24px" : 0 },
        }}
      >
        <div className="flex flex-col justify-content-center">
          <div
            className="category-list sticky-top -top-1 pt-2"
            style={{ backgroundColor: "#EDEFF4" }}
          >
            {datafiltered.length ? (
              <>
                <h2 className="text-center">Selecciona categoría</h2>
                <ul className="border-b-2 border-gray-300 py-2 ">
                  {iconMap.map((icon, key) => (
                    <li key={key} className="inline-block px-1 py-1">
                      <Tooltip title={icon.category} placement="top">
                        <Avatar
                          size={42}
                          style={{
                            backgroundColor: icon.backgroundColor,
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            transition: "transform 0.3s, box-shadow 0.3s",
                          }}
                          className="hover:shadow-lg hover:scale-125 "
                          onClick={() => handleCategoryClick(icon.slug)}
                        >
                          {icon.Icon}
                        </Avatar>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <></>
            )}
            {categorySelected && (
              <h2
                onClick={() => showAll()}
                className="text-center cursor-pointer bg-slate-300 p-2 rounded-b-full hover:bg-slate-400 hover:text-white transition-all duration-300"
              >
                Mostrar todos
              </h2>
            )}
          </div>
          {datafiltered.length ? (
            <>
              <div className="p-6">
                {datafiltered.map((eve, key) => (
                  <CardEvent eve={eve} colSpan={12} key={key} />
                ))}
              </div>
            </>
          ) : (
            //no hay eventos en este estado, si conoces alguno avisanos
            <>
              <div className="flex justify-content-center p-6">
                <h2 className="text-center">
                  No se encontraron eventos registrados en este estado. ¿Conoces
                  alguno? ¡Contáctanos y compártelo con nosotros!
                </h2>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default StateEventsDrawer;
