import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarked,
  faDollarSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getSingleEvent } from "../models/event.server";
import { EventType } from "../types";
import { useParams } from "react-router-dom";
import {
  formatearFechalg,
  formatearHora,
  formatearPrice,
} from "../utils/helpers";

// import OwlCarousel from "react-owl-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "./BlockRendererClient";
import "../assets/css/left_card.css";
import { Col, Image, Row } from "antd";

import OwlBreakingNews from "./OwlBreakingNewsCopy";
import logo1 from "../assets/images/logo1.jpeg";
import GradientButton from "./Button/GradientButton";

import ReelsEvent from "./slick-carousel/ReelsEvent";

const event_descript = [
  { name: "Distancias", target: "distance_category" },
  { name: "Inscripciones", target: "register" },
  { name: "Entrega Kit", target: "kit_service" },
  { name: "Servicios", target: "services" },
];

type paramsEventProps = {
  url: string;
};

export default function SingleEvent() {
  const params = useParams<paramsEventProps>();
  const { url } = params;

  const [dataEvent, setdataEvent] = useState<EventType[]>([]); // Initialize state with an empty array

  const [distance, setDistance] = useState<BlocksContent>();
  const [registration, setRegistration] = useState<BlocksContent>();
  const [kit, setKit] = useState<BlocksContent>();
  const [services, setServices] = useState<BlocksContent>();

  const [listo, setListo] = useState(Boolean);

  useEffect(() => {
    const fetchData = async () => {
      setListo(true);
      try {
        if (!url) {
          throw new Error("category_url is required");
        }
        const events = await getSingleEvent(url);
        setdataEvent(events.data);
        setDistance(events.data[0]?.distance_category);
        setRegistration(events.data[0]?.registration_prices);
        setKit(events.data[0]?.kit_delivery);
        setServices(events.data[0]?.services);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setListo(false);
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
      {!listo ? (
        dataEvent.map((eve, key) =>
          eve.img_desc2 ? (
            <div
              key={key}
              className="page-heading-sigle-event"
              aria-label="background single event"
              style={{
                backgroundImage: `linear-gradient(rgba(107, 200, 40, 0.56), rgba(21, 164, 174, 0.62)), url(${
                  import.meta.env.VITE_API_URL_SHORT
                }${eve.img_desc2?.url})`,
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h2
                      className="wow animate__animated animate__fadeInDown"
                      data-wow-delay="0.1s"
                    >
                      {eve.name}
                    </h2>
                    <span
                      className="wow animate__animated animate__fadeInDown"
                      data-wow-delay="0.3s"
                    >
                      Check out our venues, pick your choice and fill the
                      reservation application.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={key}
              className="page-heading-sigle-event"
              aria-label="background single event"
              style={{
                backgroundImage: `linear-gradient(rgba(107, 200, 40, 0.56), rgba(21, 164, 174, 0.62)), url(${
                  import.meta.env.VITE_API_URL_SHORT
                }${eve.img_main?.url})`,
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h2
                      className="wow animate__animated animate__fadeInDown"
                      data-wow-delay="0.1s"
                    >
                      {eve.name}
                    </h2>
                    <span
                      className="wow animate__animated animate__fadeInDown"
                      data-wow-delay="0.3s"
                    >
                      Check out our venues, pick your choice and fill the
                      reservation application.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <></>
      )}
      <OwlBreakingNews />
      {/* 
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2435437066822053%2F&show_text=true&width=267&t=0"
        width="267"
        height="591"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen={true}
      ></iframe> */}

      {dataEvent ? (
        <>
          <div className="container-fluid mt-2">
            <div className="container-md">
              <div className="row">
                <div className="col-lg-4 col-md-12">
                  <div className="card-list" id="card-flag-m">
                    <article className="card flex lg:flex-col">
                      <figure className="card-image">
                        {/* <img src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNDcwMTUwOQ&ixlib=rb-1.2.1&q=85" alt="An orange painted blue, cut in half laying on a blue background" /> */}
                        {dataEvent[0]?.img_main ? (
                          <Image
                            src={`${import.meta.env.VITE_API_URL_SHORT}${
                              dataEvent[0]?.img_main.url
                            }`}
                          />
                        ) : (
                          <img src={logo1} />
                        )}
                        {/* <img src={`${import.meta.env.VITE_API_URL_SHORT}${dataEvent[0]?.img_main.url}`} alt="" /> */}
                      </figure>

                      <div className="card-header text-center">
                        <a href="#">{dataEvent[0]?.name}</a>
                        {/* <button className="icon-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" display="block" id="Heart">
                        <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                      </svg>

                      </button> */}
                      </div>
                      <a
                        className="badge badge-primary text-uppercase font-weight-semi-bold p-2"
                        href="#"
                      >
                        {dataEvent[0]?.category.name}
                      </a>
                      <div className="card-footer">
                        <Row>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 12 }}
                            md={{ span: 12 }}
                            lg={{ span: 24 }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon
                              className="m-2"
                              icon={faMapMarked}
                            />
                            {`${dataEvent[0]?.city_state} ${dataEvent[0]?.state.name}`}
                          </Col>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 12 }}
                            md={{ span: 12 }}
                            lg={{ span: 24 }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon
                              className="m-2"
                              icon={faCalendarAlt}
                            />
                            {formatearFechalg(dataEvent[0]?.date_event)}
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 12 }}
                            md={{ span: 12 }}
                            lg={{ span: 24 }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon className="m-2" icon={faClock} />
                            SALIDA:
                            <p className="font-bold mx-2">
                              {formatearHora(dataEvent[0]?.date_event)}
                            </p>
                          </Col>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 12 }}
                            md={{ span: 12 }}
                            lg={{ span: 24 }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon
                              className="m-2"
                              icon={faDollarSign}
                            />
                            PRECIO:
                            <p className="font-bold mx-2">
                              ${formatearPrice(dataEvent[0]?.price)}
                            </p>
                          </Col>
                        </Row>
                      </div>
                      <GradientButton />
                    </article>
                  </div>
                </div>
                {/* <div id='flagScroll-m'></div> */}
                <div className="col-lg-8" id="flagScroll-m">
                  <div className="right-section-title">
                    <div className="title-navs rounded-md bg-white w-full">
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
                        {distance ? (
                          <button
                            onClick={toScroll}
                            className="nav-link active"
                            id="nav-distance-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-distance"
                            type="button"
                            role="tab"
                            aria-controls="nav-distance"
                            aria-selected="true"
                          >
                            {event_descript[0].name}
                          </button>
                        ) : (
                          <></>
                        )}
                        {registration ? (
                          <button
                            onClick={toScroll}
                            className="nav-link"
                            id="nav-registration-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-registration"
                            type="button"
                            role="tab"
                            aria-controls="nav-registration"
                            aria-selected="false"
                          >
                            {event_descript[1].name}
                          </button>
                        ) : (
                          <></>
                        )}
                        {kit ? (
                          <button
                            onClick={toScroll}
                            className="nav-link"
                            id="nav-kit-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-kit"
                            type="button"
                            role="tab"
                            aria-controls="nav-kit"
                            aria-selected="false"
                          >
                            {event_descript[2].name}
                          </button>
                        ) : (
                          <></>
                        )}
                        {services ? (
                          <button
                            onClick={toScroll}
                            className="nav-link"
                            id="nav-services-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-services"
                            type="button"
                            role="tab"
                            aria-controls="nav-services"
                            aria-selected="false"
                          >
                            {event_descript[3].name}
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <iframe
                  src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1662845275114241%2F&show_text=false&width=267&t=0"
                  width="267"
                  height="476"
                  style={{ border: "none", overflow: "hidden" }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen={true}
                  scrolling="no"
                  frameBorder="0"
                  allowTransparency={true}
                ></iframe> */}

                  <div className="right-section-body">
                    <div className="row">
                      <div className="content-tabs">
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-distance"
                            role="tabpanel"
                            aria-labelledby="nav-distance-tab"
                            tabIndex={0}
                          >
                            {distance && (
                              <>
                                <main className="prose lg:prose-base">
                                  <BlockRendererClient content={distance} />
                                </main>
                              </>
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
                              <>
                                <main className="prose lg:prose-base">
                                  <BlockRendererClient content={registration} />
                                </main>
                              </>
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
                              <>
                                <main className="prose lg:prose-base">
                                  <BlockRendererClient content={kit} />
                                </main>
                              </>
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
                              <>
                                <main className="prose lg:prose-base">
                                  <BlockRendererClient content={services} />
                                </main>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ReelsEvent />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
