import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import OwlCarousel from "react-owl-carousel";
import { formatearFecha } from "../utils/helpers";
import Slider from "react-slick";
import { getEventsCurrents } from "../models/event.server";
import { EventType } from "../types";
import { SkeletonCustom, SkeletonGrid } from "./skeleton/SkeletonCustom";
import logosm from "../assets/images/logo1.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ConfigProvider } from "antd";

const SizeContent_lg = {
  Ipx: "3rem",
  Ipy: "2rem",
  Im: "3rem",
  Imy: "3rem",
  Imx: "3rem",
  Ppb: "3rem",
  Ppl: "3rem",
  zero: "0px",
  height: "200px",
  width: "100%",
  Ppt: "",
  Ppr: "",
};
const SizeContent_md = {
  Ipx: "1rem",
  Ipy: "1rem",
  Im: "2rem",
  Imy: "3rem",
  Imx: "2rem",
  Ppb: "1rem",
  Ppl: "2rem",
  zero: "0px",
  height: "100px",
  width: "100%",
};

export default function OwlMain() {
  const settings = {
    autoplay: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    dots: true,

    // appendDots: (dots: any) => <ul style={{ margin: "0px" }}> {dots} </ul>,
    customPaging: () => (
      <button className="owl-dot">
        <span></span>
      </button>
    ),
  };

  /*
    main-carousel
      <ul>-slick-dots
        <li>-
          <button-owl-dot>
            <span>
  */

  /*
    main-carousel
      owl-dots
        owl-dots
          <button>-owl-dot
            <span>
  */
  const [currentEvent, setcurrentEvent] = useState<EventType[]>([]); // Initialize state with an empty array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
      // console.log(formattedDate);

      try {
        const events = await getEventsCurrents(formattedDate);
        setcurrentEvent(events.data);
        // console.log(events.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, [getEventsCurrents, setcurrentEvent]);

  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row">
          <div className="col-lg-7 px-0">
            <ConfigProvider
              theme={{
                components: {
                  Skeleton: {
                    /* here is your component tokens */
                    gradientFromColor: "rgba(255,255,255,0.06)",
                    gradientToColor: "rgba(255,255,255,0.15)",
                  },
                },
              }}
            >
              <SkeletonCustom
                loading={loading}
                sizeContent={SizeContent_lg}
                title={""}
                avatar={""}
                paragraph={{
                  rows: 5,
                  width: [200, 300, "auto", "auto", "auto"],
                }}
              >
                {currentEvent && (
                  <Slider
                    className="main-carousel2 position-relative "
                    {...settings}
                  >
                    {/* <div className="owl-carousel main-carousel position-relative"> */}
                    {currentEvent.slice(0, 5).map((eve, key) => (
                      <div key={key}>
                        <div
                          className="position-relative overflow-hidden"
                          style={{ height: "493px" }}
                        >
                          {eve.img_main ? (
                            <img
                              className="img-fluid w-100 h-100"
                              src={`${import.meta.env.VITE_API_URL_SHORT}${
                                eve.img_main.url
                              }`}
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <img
                              className="img-fluid w-100 h-100"
                              src={logosm}
                              style={{ objectFit: "cover" }}
                            />
                          )}
                          <div className="overlay">
                            <div className="mb-2">
                              <a
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                aria-disabled={true}
                              >
                                {eve.category.name}
                              </a>
                              <a className="text-white" aria-disabled={true}>
                                {formatearFecha(eve.date_event)}
                              </a>
                            </div>
                            <Link
                              className="h2 m-0 text-white text-uppercase font-weight-bold"
                              to={`/evento/${eve.url}`}
                            >
                              {eve.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                )}
              </SkeletonCustom>
            </ConfigProvider>
          </div>

          <div className="col-lg-5 px-0">
            <div className="row mx-0">
              {loading ? (
                <ConfigProvider
                  theme={{
                    components: {
                      Skeleton: {
                        /* here is your component tokens */
                        gradientFromColor: "rgba(255,255,255,0.06)",
                        gradientToColor: "rgba(255,255,255,0.15)",
                      },
                    },
                  }}
                >
                  <SkeletonGrid
                    sizeContent={SizeContent_md}
                    loading={loading}
                    title={""}
                    avatar={""}
                    paragraph={{
                      rows: 2,
                      width: [100, "auto"],
                    }}
                  >
                    <></>
                  </SkeletonGrid>
                </ConfigProvider>
              ) : (
                currentEvent.slice(5, 9).map((eve, key) => (
                  <div key={key} className="col-md-6 px-0">
                    <div
                      className="position-relative overflow-hidden"
                      style={{ height: "250px" }}
                    >
                      {eve.img_main ? (
                        <img
                          className="img-fluid w-100 h-100"
                          src={`${import.meta.env.VITE_API_URL_SHORT}${
                            eve.img_main.url
                          }`}
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          className="img-fluid w-100 h-100"
                          src={logosm}
                          style={{ objectFit: "cover" }}
                        />
                      )}
                      <div className="overlay">
                        <div className="mb-2">
                          <a
                            className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                            aria-disabled={true}
                          >
                            {eve.category.name}
                          </a>
                          <a className="text-white" aria-disabled={true}>
                            <small>{formatearFecha(eve.date_event)}</small>
                          </a>
                        </div>
                        <Link
                          className="h6 m-0 text-white text-uppercase font-weight-semi-bold descript-resume"
                          to={`/evento/${eve.url}`}
                        >
                          {eve.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
