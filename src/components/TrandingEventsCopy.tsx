import { useEffect, useRef, useState } from "react";
// import OwlCarousel from "react-owl-carousel";
import Slider from "react-slick";
import { getEventsDesc } from "../models/event.server";
import { EventType } from "../types";
import { Link } from "react-router-dom";
import { formatearFecha } from "../utils/helpers";
import { Skeleton } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify-icon/react";

export default function TrandingEvents() {
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef<Slider | null>(null);
  const [eventDescArray, setEventDescArray] = useState<EventType[]>([]); // Initialize state with an empty array

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const events = await getEventsDesc();
        setEventDescArray(events.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [setEventDescArray]);

  const settings = {
    autoplay: false,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
  };
  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <>
      {/* <!-- Breaking News Start --> */}
      <div className="notshow-mob container-fluid mt-2 mb-3 pt-3">
        <div className="container-md">
          {loading ? (
            <Skeleton.Button
              size={"large"}
              block={true}
              style={{ marginBottom: ".5rem" }}
            />
          ) : (
            <div className="row align-items-center">
              <div className="col-12">
                <div className="tranding-carousel box-shadow-edit flex align-items-center bg-white pr-2 py-2 ">
                  <div className="bg-primary text-dark text-center font-weight-medium py-2 px-2 flex-shrink-0">
                    Breaking News
                  </div>
                  <Slider
                    className="slider-container position-relative d-inline-flex align-items-center w-3/4 ml-3 pr-20"
                    ref={(slider) => {
                      if (slider) sliderRef.current = slider;
                    }}
                    {...settings}
                  >
                    {eventDescArray?.map((event, key) => (
                      <div key={key} className="text-truncate">
                        <Link
                          className="text-black text-uppercase font-weight-semi-bold"
                          to={`/evento/${event.url}`}
                        >{`( ${formatearFecha(event.date_event)})  ${
                          event.name
                        } : ${event.description1}`}</Link>
                      </div>
                    ))}
                  </Slider>
                  <div className="owl-nav">
                    <button className="owl-prev" onClick={previous}>
                      <Icon icon={"fa-solid:chevron-left"} />
                    </button>
                    <button className="owl-next" onClick={next}>
                      <Icon icon={"fa-solid:chevron-right"} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <!-- Breaking News End --> */}
    </>
  );
}
