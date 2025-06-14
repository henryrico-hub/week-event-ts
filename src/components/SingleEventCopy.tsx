import { Icon } from "@iconify-icon/react";
import { useState, useEffect } from "react";
import { getSingleEvent } from "../models/event.server";
import { EventType } from "../types";
import { useParams } from "react-router-dom";
import {
  formatearDayStyle,
  formatearHora,
  formatearPrice,
  formatearDayNameStyle,
  formatearMonthNameStyle,
  formatearYearNameStyle,
} from "../utils/helpers";

// import OwlCarousel from "react-owl-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "./BlockRendererClient";
import "../assets/css/left_cardCopy.css";
import { Button, Flex, Image } from "antd";

import OwlBreakingNews from "./OwlBreakingNewsCopy";
import logo1 from "../assets/images/logo1.jpeg";
import GradientButton from "./Button/GradientButton";

import ReelsEvent from "./slick-carousel/ReelsEvent";
import {
  SkeletonCard,
  SkeletonRigthSection,
  SkeletonTitleSection,
} from "./skeleton/SkeletonCustom";
import CardServices from "./CardServices";

const SizeContentRigth = {
  width: "90%",
};

const SizeContentTitle = {
  Ppl: "20rem",
  Ppt: "8rem",
  Ppb: "2rem",
  Ppr: "1rem",
  zero: "0px",
  width: "100%",
};

const SizeContentCard = {
  Ipx: "1rem",
  Ipy: "1rem",
  Im: "1rem",
  Imy: "1rem",
  Imx: "0rem",
  Ppb: "2rem",
  Ppl: "1rem",
  zero: "0px",
  height: "200px",
  width: "300px",
  c: 1,
  cc: 2,
};

const event_descript = [
  { name: "Información de Distancias", target: "distance_category" },
  { name: "Detalles de Inscripción", target: "register" },
  { name: "Entrega de Kits", target: "kit_service" },
  { name: "Servicios Disponibles", target: "services" },
];

type paramsEventProps = {
  url: string;
};

export default function SingleEvent() {
  const { url } = useParams<paramsEventProps>();

  const [dataEvent, setdataEvent] = useState<EventType>(); // Initialize state with an empty array

  const [distance, setDistance] = useState<BlocksContent>();
  const [registration, setRegistration] = useState<BlocksContent>();
  const [kit, setKit] = useState<BlocksContent>();
  const [services, setServices] = useState<BlocksContent>();

  const [loading, setLoading] = useState(Boolean);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!url) {
          throw new Error("category_url is required");
        }
        const events = await getSingleEvent(url);
        setdataEvent(events.data[0]);
        setDistance(events.data[0]?.distance_category);
        setRegistration(events.data[0]?.registration_prices);
        setKit(events.data[0]?.kit_delivery);
        setServices(events.data[0]?.services);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [url]);

  const flagScroll_m = document.querySelector("#flagScroll-m");

  const toScroll = () => {
    flagScroll_m?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Title */}
      <SkeletonTitleSection
        loading={loading}
        sizeContent={SizeContentTitle}
        title={""}
        avatar={""}
        paragraph={{
          rows: 4,
          width: ["auto", "auto", "auto", "auto", "auto"],
        }}
      >
        {dataEvent && (
          <div
            className="page-heading-sigle-event"
            aria-label="background single event"
            style={{
              backgroundImage: dataEvent.img_desc2?.url
                ? `linear-gradient(rgba(107, 200, 40, 0.56), rgba(21, 164, 174, 0.62)), url(${
                    import.meta.env.VITE_API_URL_SHORT
                  }${dataEvent.img_desc2?.url})`
                : `linear-gradient(rgba(107, 200, 40, 0.56), rgba(21, 164, 174, 0.62)), url(${
                    import.meta.env.VITE_API_URL_SHORT
                  }${dataEvent.img_main?.url})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h2
                    className="wow animate__animated animate__fadeInDown"
                    data-wow-delay="0.1s"
                  >
                    {dataEvent.name}
                  </h2>
                  <span
                    className="wow animate__animated animate__fadeInDown"
                    data-wow-delay="0.3s"
                  >
                    {dataEvent.description1
                      ? dataEvent.description1
                      : "Check out our venues, pick your choice and fill the reservation application."}
                    {/* Check out our venues, pick your choice and fill the
                      reservation application. */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SkeletonTitleSection>

      {/* Breaking Events */}
      <OwlBreakingNews />

      <CardServices />

      {/* Card Section */}
      {dataEvent && (
        <div
          style={{
            background: "linear-gradient(to bottom, #1E2024 10%, #FFCC00 100%)",
          }}
        >
          <div className="container py-10">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                {loading ? (
                  <SkeletonCard
                    loading={loading}
                    sizeContent={SizeContentCard}
                    title={""}
                    avatar={""}
                    paragraph={{
                      rows: 5,
                      width: [100, 150, "auto", "auto", "auto"],
                    }}
                  >
                    <></>
                  </SkeletonCard>
                ) : (
                  <div className="card-list" id="card-flag-m">
                    <article className="card flex lg:flex-col border-8 border-[#3A3D42]">
                      <figure className="card-image">
                        {dataEvent.img_main ? (
                          <Image
                            src={`${import.meta.env.VITE_API_URL_SHORT}${
                              dataEvent.img_main.url
                            }`}
                            // width={"100%"}
                          />
                        ) : (
                          <img src={logo1} />
                        )}
                      </figure>
                      {/* Nombre de categoria */}
                      <a
                        className="badge badge-primary text-uppercase font-semibold p-2 mb-2"
                        href="#"
                      >
                        {dataEvent.category?.name}
                      </a>
                      {/* Nombre del evento */}
                      <div className="card-header">
                        <a href="#">{dataEvent.name}</a>
                      </div>
                      {/* Button actions */}
                      <Flex
                        style={{ paddingTop: 5, gap: 10, alignItems: "center" }}
                      >
                        <GradientButton
                          url={url}
                          text={"Inscripción"}
                          icon={
                            <Icon
                              icon={"fa6-solid:user-pen"}
                              aria-hidden="true"
                            />
                          }
                        />

                        <Button
                          type="primary"
                          shape="circle"
                          size="large"
                          onClick={() => {
                            const sliderElement =
                              document.getElementById("slider");
                            sliderElement?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                        >
                          <Icon
                            icon={"material-symbols:play-circle"}
                            width={26}
                          />
                        </Button>
                      </Flex>
                      {/* Footer section */}
                      <div className="card-footer">
                        {/* Time / Price */}
                        <div className="flex flex-col hover:text-[#FFCC00] transition-all">
                          <div className="p-2 text-xl font-semibold">
                            <p className="font-bold mx-2 text-2xl">
                              {`Salida: ${formatearHora(dataEvent.date_event)}`}
                            </p>
                          </div>
                          <div className="p-2 text-xl font-semibold">
                            <p className="font-bold mx-2 text-2xl">
                              {`Costo: ${formatearPrice(dataEvent.price)}`}
                            </p>
                          </div>
                        </div>
                        {/* Date */}
                        <div className="flex flex-col items-center gap-1 p-2 bg-[#1E2024] border-8 border-[#3A3D42] rounded-xl">
                          <div className=" text-2xl">
                            {formatearDayNameStyle(
                              dataEvent.date_event
                            ).toLocaleUpperCase()}
                          </div>
                          <div className="flex flex-row gap-2 text-6xl">
                            {formatearDayStyle(dataEvent.date_event)}
                            <div className="flex text-4xl items-center">
                              {formatearMonthNameStyle(dataEvent.date_event)}
                            </div>
                          </div>
                          <div className="flex flex-row gap-2 text-7xl">
                            {formatearYearNameStyle(dataEvent.date_event)}
                          </div>
                          {/* Place */}
                          <p className="text-2xl text-center font-bold">
                            {`${dataEvent.city_state}, ${dataEvent.state?.name}`}
                          </p>
                          {/* Map */}
                          <div className="w-full border-8 border-[#3A3D42]">
                            <iframe
                              width="100%"
                              height="auto"
                              src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
                                `${dataEvent.city_state}, ${dataEvent.state?.name}`
                              )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                )}
              </div>

              <div className="col-lg-8" id="flagScroll-m">
                {loading ? (
                  <SkeletonRigthSection
                    loading={loading}
                    sizeContent={SizeContentRigth}
                    title={""}
                    avatar={""}
                    paragraph={{
                      rows: 3,
                      width: ["auto", "auto", "auto"],
                    }}
                  >
                    <></>
                  </SkeletonRigthSection>
                ) : (
                  <>
                    <div className="right-section-title">
                      <div className="title-navs rounded-md w-full">
                        <div
                          className="nav nav-pills"
                          id="nav-tab"
                          role="tablist"
                          style={{
                            overflowX: "auto",
                            whiteSpace: "nowrap",
                            justifyContent: "space-between",
                          }}
                        >
                          {distance && (
                            <button
                              onClick={toScroll}
                              className="nav-link active text-lg"
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
                              className="nav-link text-lg"
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
                              className="nav-link text-lg"
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
                              className="nav-link text-lg"
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
                    </div>

                    <div className="right-section-body p-3">
                      <div className="row">
                        <div className="content-tabs lg:p-4 w-full">
                          <div className="tab-content" id="nav-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="nav-distance"
                              role="tabpanel"
                              aria-labelledby="nav-distance-tab"
                              tabIndex={0}
                            >
                              {distance && (
                                <main className="prose lg:prose-base max-w-fit">
                                  <BlockRendererClient content={distance} />
                                </main>
                              )}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="nav-registration"
                              role="tabpanel"
                              aria-labelledby="nav-registration-tab"
                              tabIndex={0}
                            >
                              {registration && (
                                <main className="prose lg:prose-base">
                                  <BlockRendererClient content={registration} />
                                </main>
                              )}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="nav-kit"
                              role="tabpanel"
                              aria-labelledby="nav-kit-tab"
                              tabIndex={0}
                            >
                              {kit && (
                                <main className="prose lg:prose-base">
                                  <BlockRendererClient content={kit} />
                                </main>
                              )}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="nav-services"
                              role="tabpanel"
                              aria-labelledby="nav-services-tab"
                              tabIndex={0}
                            >
                              {services && (
                                <main className="prose lg:prose-base">
                                  <BlockRendererClient content={services} />
                                </main>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reels section */}
      {dataEvent && <ReelsEvent dataEvent={dataEvent} />}
    </>
  );
}
