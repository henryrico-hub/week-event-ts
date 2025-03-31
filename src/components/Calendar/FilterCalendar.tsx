import { useState, useEffect } from "react";
import { getCalendar } from "../../models/event.server";
import { EventType } from "../../types";
import { Link } from "react-router-dom";
import { Image, theme } from "antd";
import OwlBreakingNews from "../OwlBreakingNews";
import imgbanner from "../../assets/images/news-800x500-3.jpg";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  dayjsES,
  formatearFecha,
  formatearHora,
  formatearPrice,
} from "../../utils/helpers";
import {
  faClock,
  faDollarSign,
  faMapMarked,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterCalendar() {
  const { token } = theme.useToken();

  const [dataEvent, setdataEvent] = useState<EventType[]>([]); // Initialize state with an empty array

  const [eventPerDate, setEventPerDate] = useState<EventType[]>([]);

  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const events = await getCalendar();
        setdataEvent(events.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(true);
    };

    fetchData();
  }, [setdataEvent]);

  //console.log(selectedValue.toDate().toDateString())

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  /* setEventPerDate(dataEvent.filter( eve => ( eve.date_event === selectedValue.toDate()))) */

  useEffect(() => {
    const match: EventType[] = [];
    dataEvent.map((eve) => {
      const fecha = new Date(eve.date_event);
      if (fecha.toDateString() === selectedValue.toDate().toDateString()) {
        match.push(eve);
      }
    });
    setEventPerDate(match);
  }, [selectedValue, dataEvent]);

  return (
    <>
      <div id="flagScroll-desk"></div>
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
      <div id="flagScroll-m"></div>

      <div className="container-fluid">
        <div className="container-md">
          <div className="row">
            <div className="col-lg-4">
              <div className="left-section-body">
                <div style={wrapperStyle} className="">
                  <Calendar fullscreen={false} onSelect={onSelect} />
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div
                className="right-section-title gap-2"
                style={{ justifyContent: "left" }}
              >
                <a
                  className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mx-3"
                  href="#"
                >
                  {"Eventos en la fecha"}
                </a>
                <h4 className="m-0 text-uppercase font-weight-bold">
                  {dayjsES(selectedValue)}
                </h4>
              </div>

              {eventPerDate?.length !== 0 ? (
                eventPerDate.map((eve, key) => (
                  <div
                    key={key}
                    className="right-section-body"
                    style={{ justifyContent: "left" }}
                  >
                    <div className="content-event-calendar d-flex gap-2 align-content-center bg-white">
                      {eve.img_main ? (
                        <Image
                          className="img-calendar-m"
                          style={{
                            width: "445px",
                            height: "100%",
                            borderRadius: "10px",
                          }}
                          src={`${import.meta.env.VITE_API_URL_SHORT}${
                            eve.img_main.url
                          }`}
                          alt={`event ${eve.name}`}
                        />
                      ) : (
                        <Image
                          className="img-calendar-m"
                          style={{
                            width: "445px",
                            height: "100%",
                            borderRadius: "10px",
                          }}
                          src={``}
                          alt={`event ${eve.name}`}
                        />
                      )}

                      {/* <img className="img-calendar" src={`${import.meta.env.VITE_API_URL_SHORT}${eve.img_main.url}`} alt={`event ${eve.name}`}/>     */}
                      <div className="body-event-calendar">
                        <div className="mb-2">
                          <a
                            className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                            aria-disabled={true}
                          >
                            {eve.category.name}
                          </a>
                          <a className="text-body" aria-disabled={true}>
                            <small>{formatearFecha(eve.date_event)}</small>
                          </a>
                        </div>
                        <Link
                          className="h6 m-0 text-secondary text-uppercase font-weight-bold"
                          to={`/evento/${eve.url}`}
                        >
                          {eve.name}
                        </Link>
                        {/* <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">{encodeImg(`${import.meta.env.VITE_API_URL_SHORT}${eve.img_main.url}`,110,110)}</a> */}
                      </div>
                      <div className="body-event-calendar">
                        <div className="card-meta card-meta--views">
                          <FontAwesomeIcon className="m-2" icon={faMapMarked} />
                          {eve.city_state}
                        </div>
                        <div className="card-meta card-meta--views">
                          <FontAwesomeIcon className="m-2" icon={faClock} />
                          Salida:
                          <p className="font-bold mx-2">
                            {formatearHora(eve.date_event)}
                          </p>
                        </div>
                        <div className="card-meta card-meta--views">
                          <FontAwesomeIcon
                            className="m-2"
                            icon={faDollarSign}
                          />
                          Precio:
                          <p className="font-bold mx-2">
                            ${formatearPrice(eve.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="right-section-body h-40 text-center">
                    <div className="p-8">
                      No hay eventos <br />
                      Selecciona otra fecha{" "}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
