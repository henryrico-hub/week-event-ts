import { useEffect, useRef, useState } from "react";
/* import img from '../assets/images/news-700x435-1.jpg' */
// import OwlCarousel from "react-owl-carousel";
import { Icon } from "@iconify-icon/react";
import { getEventsLastOne } from "../models/event.server";
import { EventType } from "../types";
import { formatearFecha } from "../utils/helpers";
import { Link } from "react-router-dom";
import { SkeletonLarge } from "./skeleton/SkeletonCustom";
import logosm from "../assets/images/logo1.jpeg";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "antd";

const SizeContent_lg = {
  Ipx: "1rem",
  Ipy: "1rem",
  Im: "1rem",
  Imy: "1rem",
  Imx: "1rem",
  Ppb: "3rem",
  Ppl: "3rem",
  zero: "0px",
  height: "150px",
  width: "300px",
};

export default function OwlFeaturedNews() {
  const sliderRef = useRef<Slider | null>(null);

  // const options = {
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 3,
  //     },
  //     1000: {
  //       items: 4,
  //     },
  //   },
  //   nav: true,
  //   dots: false,
  //   loop: true,
  //   autoplay: true,
  //   margin: 20,
  // };

  const [eventArray, setEventArray] = useState<EventType[]>([]); // Initialize state with an empty array
  const [loading, setLoading] = useState(false);

  const settings = {
    autoplay: true,
    infinite: true,
    arrows: false,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const events = await getEventsLastOne();
        setEventArray(events.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, [setEventArray]);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <>
      <div className="container-fluid pt-4 mb-3">
        <div className="container-md">
          <SkeletonLarge
            loading={loading}
            sizeContent={SizeContent_lg}
            title={""}
            avatar={""}
            paragraph={{
              rows: 3,
              width: [100, 150, "auto", "auto"],
            }}
          >
            <div className="section-title">
              <h4 className="m-0 text-lg text-uppercase font-weight-bold">
                Aparta estas fechas
              </h4>
              <div className="owl-nav">
                <button className="owl-prev" onClick={previous}>
                  {/* <i className="fas fa-chevron-left"></i> */}
                  <Icon icon={"fa-solid:chevron-left"} />
                </button>
                <button className="owl-next" onClick={next}>
                  <Icon icon={"fa-solid:chevron-right"} />
                </button>
              </div>
            </div>
            <Slider
              ref={(slider) => {
                if (slider) sliderRef.current = slider;
              }}
              className="slider-container"
              {...settings}
            >
              {/* <div className="owl-carousel news-carousel carousel-item-4 position-relative"> */}
              {eventArray.slice(0, 9).map((even, key) => (
                <Link key={key} to={`/evento/${even.url}`}>
                  <div
                    className="position-relative overflow-hidden mx-2"
                    style={{ height: "300px", transition: "transform 0.3s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    {even.img_main ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL_SHORT}${
                          even.img_main.url
                        }`}
                        alt={`image title - ${even.name}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={logosm}
                        alt={`image title - ${even.name}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <div className="overlay">
                      <div className="mb-2">
                        <a
                          className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                          aria-disabled={true}
                        >
                          {even.category.name}
                        </a>
                        <a
                          className="text-white text-decoration-none"
                          aria-disabled={true}
                        >
                          <small>{formatearFecha(even.date_event)}</small>
                        </a>
                      </div>
                      <Typography.Text
                        className="h6 m-0 text-white text-uppercase font-weight-semi-bold text-decoration-none"
                        // to={`/evento/${even.url}`}
                      >
                        {even.name}
                      </Typography.Text>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </SkeletonLarge>
        </div>
      </div>
    </>
  );
}
