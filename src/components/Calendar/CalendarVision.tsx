import { useState, useEffect } from "react";
import { getCalendar } from "../../models/event.server";
import { EventType } from "../../types";
import { Icon } from "@iconify-icon/react";
import OwlBreakingNews from "../OwlBreakingNewsCopy";
import imgbanner from "../../assets/images/news-800x500-3.jpg";
import { Badge, Calendar, Avatar, Tooltip, Flex, Typography, Spin } from "antd";

import { Trail_icon, MtbV3_icon } from "../Icons/Icons";

import type { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import dayjs from "dayjs";
import { dayjsES } from "../../utils/helpers";
import CardEvent from "../CardEvent";

export default function CalendarVision() {
  const [dataEvent, setdataEvent] = useState<EventType[]>([]); // Initialize state with an empty array
  const [eventPerDate, setEventPerDate] = useState<EventType[]>([]);

  const [, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const events = await getCalendar();
        setdataEvent(events.data);
        // console.log(dataEvent);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  useEffect(() => {
    setLoading(true);

    const match: EventType[] = [];
    dataEvent.map((eve) => {
      const fecha = new Date(eve.date_event);
      if (fecha.toDateString() === selectedValue.toDate().toDateString()) {
        match.push(eve);
      }
    });
    setTimeout(() => {
      setEventPerDate(match);
      setLoading(false);
    }, 1400);
  }, [selectedValue, dataEvent]);

  const getListData = (value: Dayjs) => {
    const listData: {
      type: string;
      content: string;
      categoryName: string;
      categorySlug: string;
      state: string;
    }[] = []; // Specify the type of listData
    dataEvent.forEach((event) => {
      const eventDate = dayjs(event.date_event);
      if (eventDate.isSame(value, "day")) {
        listData.push({
          type: "success",
          content: event.name,
          categorySlug: event.category.slug,
          categoryName: event.category.name,
          state: event.state.name,
        });
      }
    });
    return listData;
  };

  const getMonthData = (value: Dayjs) => {
    const eventsInMonth = dataEvent.filter((event) =>
      dayjs(event.date_event).isSame(value, "month")
    );
    return eventsInMonth.length;
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <Avatar.Group>
          <Avatar
            style={{ backgroundColor: "#87CEEB" }}
            icon={
              <Icon
                icon={"healthicons:swim"}
                width={24}
                className="text-gray-600 "
              />
              // <FontAwesomeIcon
              //   icon={faPersonSwimming}
              //   flip="horizontal"
              //   className="h-5 w-5 text-gray-600 "
              // />
            }
          />
          <Avatar
            style={{ backgroundColor: "#87D068" }}
            icon={
              <Icon
                icon={"healthicons:running-outline-24px"}
                width={24}
                className="text-gray-600 "
              />
              // <FontAwesomeIcon
              //   icon={faPersonRunning}
              //   className="h-5 w-5 text-gray-600 "
              // />
            }
          />
          <Avatar
            style={{ backgroundColor: "#98FB98" }}
            icon={
              <MtbV3_icon className="fill-current h-8 w-8 text-gray-600 " />
            }
          />
          <Avatar
            // style={{ backgroundColor: "#F08080" }}
            style={{ backgroundColor: "#AFEEEE" }}
            icon={
              <Trail_icon className="fill-current h-7 w-7 text-gray-600 " />
            }
          />
        </Avatar.Group>
        <section>{num}</section>
      </div>
    ) : null;
  };

  const getIcon = (slug: string) => {
    switch (slug) {
      case "triatlon":
        return (
          <Avatar
            style={{ backgroundColor: "#87CEEB" }}
            icon={
              <Icon
                icon={"healthicons:swim"}
                width={24}
                className="text-gray-600 "
              />
              // <FontAwesomeIcon
              //   icon={faPersonSwimming}
              //   flip="horizontal"
              //   className="h-5 w-5 text-gray-600 "
              // />
            }
          />
        );
      case "correr":
        return (
          <Avatar
            style={{ backgroundColor: "#87D068" }}
            icon={
              <Icon
                icon={"healthicons:running-outline-24px"}
                width={24}
                className="text-gray-600 "
              />
            }
          />
          // <Avatar
          //   style={{ backgroundColor: "#87D068" }}
          //   icon={
          //     <FontAwesomeIcon
          //       icon={faPersonRunning}
          //       className="h-5 w-5 text-gray-600 "
          //     />
          //   }
          // />
        );
      case "ciclismo-de-montana":
        return (
          <Avatar
            style={{ backgroundColor: "#98FB98" }}
            icon={
              <MtbV3_icon className="fill-current h-8 w-8 text-gray-600 " />
            }
          />
        );
      case "trail-run":
        return (
          <Avatar
            style={{ backgroundColor: "#F08080" }}
            icon={
              <Trail_icon className="fill-current h-7 w-7 text-gray-600 " />
            }
          />
        );
      case "ciclismo-de-ruta":
        return (
          <Avatar
            style={{ backgroundColor: "#FAFAD2" }}
            icon={
              <Icon
                icon={"mdi:bike-fast"}
                width={24}
                className="text-gray-600"
              />
              // <FontAwesomeIcon
              //   icon={faBiking}
              //   className="h-5 w-5 text-gray-600 "
              // />
            }
          />
        );
      case "duatlon":
        return (
          <Avatar
            style={{ backgroundColor: "#AFEEEE" }}
            icon={
              <Icon
                icon={"healthicons:globe-outline-24px"}
                width={24}
                className="text-gray-600"
              />
              // <FontAwesomeIcon
              //   icon={faPersonThroughWindow}
              //   className="h-6 w-6 text-gray-600 "
              // />
            }
          />
        );
      default:
        return null;
    }
  };

  const scroll = () => {
    const element = document.getElementById("events-to-show");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content} onClick={scroll}>
            <Tooltip
              placement="right"
              color={"white"}
              title={
                <Flex
                  vertical
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "10px",
                    // borderBottom: "5px solid #FFCC00",
                    // marginBottom: "1rem",
                  }}
                >
                  {getIcon(item.categorySlug)}
                  <Typography>{item.content}</Typography>
                  <Typography.Text strong>
                    {item.categoryName} - {item.state}
                  </Typography.Text>
                </Flex>
              }
            >
              {/* AGREGAR LOS DEMAS ICONS FALTANTES */}

              <Badge
                color={
                  item.categorySlug === "triatlon"
                    ? "#87CEEB"
                    : item.categorySlug === "correr"
                    ? "#87D068"
                    : item.categorySlug === "ciclismo-de-montana"
                    ? "#98FB98"
                    : item.categorySlug === "trail-run"
                    ? "#FF6F61"
                    : "#d9d9d9"
                }
                status={item.type as BadgeProps["status"]}
                text={item.content}
              />
            </Tooltip>
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <div
        className="page-heading-sigle-event"
        aria-label="background single event"
        style={{
          backgroundImage: `linear-gradient(rgba(107, 200, 40, 0.56), rgba(21, 164, 174, 0.62)), url(${imgbanner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2
                className="wow animate__animated animate__fadeInDown"
                data-wow-delay="0.1s"
              >
                Are you looking for a new challenge?
              </h2>
              <span
                className="wow animate__animated animate__fadeInDown"
                data-wow-delay="0.3s"
              >
                Check out our venues, pick your choice and fill the reservation
                application.
              </span>
            </div>
          </div>
        </div>
      </div>

      <OwlBreakingNews />

      <div className="container-fluid mb-5">
        <div className="container-md">
          <div className="row">
            <div className="col-lg-12">
              <div className="left-section-body">
                <Calendar
                  fullscreen={true}
                  onSelect={onSelect}
                  cellRender={cellRender}
                />
              </div>
            </div>

            <div className="col-lg-12" id="events-to-show">
              <div
                className="calendar-section-title gap-3 pr-4"
                style={{ justifyContent: "left" }}
              >
                <a className="c-badge pl-6 p-3">Eventos en</a>
                <h4 className="m-0 text-uppercase font-weight-bold">
                  {dayjsES(selectedValue)}
                </h4>
              </div>

              <Spin spinning={loading} tip={"Cargando eventos"} delay={300}>
                {eventPerDate.length ? (
                  <div className="row">
                    {eventPerDate.map((eve) => (
                      <CardEvent eve={eve} colSpan={4} />
                    ))}
                  </div>
                ) : (
                  <div className="right-section-body justify-content-center">
                    <div className=" flex flex-row p-8">
                      <Typography.Title level={4} type="secondary">
                        No hay eventos <br />
                        Selecciona otra fecha
                      </Typography.Title>
                    </div>
                  </div>
                )}
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
