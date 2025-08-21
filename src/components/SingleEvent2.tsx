import { Icon } from "@iconify-icon/react";
import { useState, useEffect } from "react";
import { getSingleEvent } from "../models/event.server";
import { EventType } from "../types";
import { useParams } from "react-router-dom";
// import OwlCarousel from "react-owl-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "./BlockRendererClient";
import "../assets/css/left_cardCopy.css";
import OwlBreakingNews from "./OwlBreakingNewsCopy";
import ReelsEvent from "./slick-carousel/ReelsEvent";
import {
  SkeletonRigthSection,
  SkeletonTitleSection,
} from "./skeleton/SkeletonCustom";
import CardServices from "./CardServices";
import StravaEmbed from "./StravaEmbed";
import FixedButton from "./Button/FixedButton";
// import TestVIew from "./testVIew";
import TestVIew2 from "./TestVIew2";
import BlocksContentEvent from "./BlocksContentEvent";

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

const event_descript = [
  { name: "Distancias", target: "distance_category" },
  { name: "Detalles de Inscripción", target: "register" },
  { name: "Entrega de Kits", target: "kit_service" },
  { name: "Servicios Adicionales", target: "services" },
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
  const [selected, setSelected] = useState<string>("distance");

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

  // const flagScroll_m = document.querySelector("#flagScroll-m");
  // const toScroll = () => {
  //   flagScroll_m?.scrollIntoView({ behavior: "smooth" });
  // };
  const changeContent = (section: string) => {
    setSelected(section);
    const flagScroll_m = document.querySelector("#flagScroll-m");
    flagScroll_m?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Sticky Buttom */}
      <FixedButton data={dataEvent} />

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
                  <h2>{dataEvent.name}</h2>
                  <span className="">{dataEvent.description1}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SkeletonTitleSection>

      {/* Breaking Events */}
      <OwlBreakingNews />

      <CardServices dataEvent={dataEvent} />

      {dataEvent && <TestVIew2 data={dataEvent} />}

      {/* Card Section */}
      {dataEvent && (
        <div
          style={
            {
              // background: "linear-gradient(to bottom, #1E2024 10%, #EDEFF4 100%)",
            }
          }
          // className="bg-[#1E2024]"
          className="bg-transparent py-10"
          // className="bg-#1E2024/10 bg-gradient-to-b from-[#1E2024] to-[#FFCC00]"
        >
          <div className="col-lg-12 p-0" id="flagScroll-m">
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
                <BlocksContentEvent
                  distance={distance}
                  registration={registration}
                  kit={kit}
                  services={services}
                  // toScroll={(section: string) => toScroll(section)}
                  selected={selected}
                  setSelected={setSelected}
                />
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

                <div className="right-section-title rounded-none md:rounded-md p-2 block md:hidden">
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
                          onClick={() => changeContent("distance")}
                          className="nav-link active"
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
                          {selected === "distance"
                            ? event_descript[0].name
                            : ""}
                        </button>
                      )}
                      {registration && (
                        <button
                          onClick={() => changeContent("registration")}
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
                          {selected === "registration"
                            ? event_descript[2].name
                            : ""}
                        </button>
                      )}
                      {kit && (
                        <button
                          onClick={() => changeContent("kit")}
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
                          {selected === "kit" ? event_descript[2].name : ""}
                        </button>
                      )}
                      {services && (
                        <button
                          onClick={() => changeContent("services")}
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
                          {selected === "services"
                            ? event_descript[3].name
                            : ""}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="right-section-body p-3 block md:hidden">
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
                            <main className="prose lg:prose-base max-w-fit my-2">
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
      )}

      {/* Strava Embed */}
      {dataEvent?.stravaRoute && <StravaEmbed data={dataEvent} />}

      {/* Reels section */}
      {dataEvent && <ReelsEvent dataEvent={dataEvent} />}
    </>
  );
}
