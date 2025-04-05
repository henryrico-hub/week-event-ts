import { useState, useEffect, useRef } from "react";
import { formatearFecha } from "../utils/helpers";
// import OwlCarousel from "react-owl-carousel";
import { EventType } from "../types";
import { getEventsDesc } from "../models/event.server";
import { Link } from "react-router-dom";
import { SkeletonBreaking } from "./skeleton/SkeletonCustom";
import Slider from "react-slick";

const SizeContent_breaking = {
  Ppt: ".5rem",
  Ppb: "1rem",
  Ppl: "0",
  Ppr: "1rem",
  height: "100%",
  width: "100%",
};

export default function OwlBreakingNews() {
  const [loading, setLoading] = useState(false);
  const [eventDescArray, setEventDescArray] = useState<EventType[]>([]); // Initialize state with an empty array
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    autoplay: false,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
  };

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

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <>
      <SkeletonBreaking
        loading={loading}
        sizeContent={SizeContent_breaking}
        title={""}
        avatar={""}
        paragraph={{
          rows: 2,
          width: ["auto", "auto"],
        }}
      >
        <div className="breaking-events d-none d-lg-block">
          <div className="container-fluid bg-dark py-3 mb-3">
            <div className="container-md">
              <div className="col-12">
                <div className="tranding-carousel flex align-items-center">
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
                          className="text-white text-uppercase font-weight-semi-bold"
                          to={`/evento/${event.url}`}
                        >{`( ${formatearFecha(event.date_event)})  ${
                          event.name
                        } : ${event.description1}`}</Link>
                      </div>
                    ))}
                  </Slider>
                  <div className="owl-nav">
                    <button className="owl-prev" onClick={previous}>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="owl-next" onClick={next}>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SkeletonBreaking>
    </>
  );
}
