import { useEffect, useState } from "react";
/* import img from '../assets/images/news-700x435-1.jpg' */
import OwlCarousel from "react-owl-carousel";
import { getEventsLastOne } from "../models/event.server";
import { EventType } from "../types";
import { formatearFecha } from "../utils/helpers";
import { Link } from "react-router-dom";
import { SkeletonLarge } from "./skeleton/SkeletonCustom";
import logosm from "../assets/images/logo1.jpeg";

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
  const options = {
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
    dots: false,
    loop: true,
    autoplay: true,
    margin: 20,
  };
  const [eventArray, setEventArray] = useState<EventType[]>([]); // Initialize state with an empty array
  const [loading, setLoading] = useState(false);

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
            </div>
            <OwlCarousel
              className="news-carousel position-relative"
              {...options}
            >
              {/* <div className="owl-carousel news-carousel carousel-item-4 position-relative"> */}
              {eventArray.slice(0, 9).map((even, key) => (
                <Link key={key} to={`/evento/${even.url}`} className=" ">
                  <div
                    className="position-relative overflow-hidden"
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
                        className="img-fluid h-100"
                        src={`${import.meta.env.VITE_API_URL_SHORT}${
                          even.img_main.url
                        }`}
                        alt={`image title - ${even.name}`}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        className="img-fluid h-100"
                        src={logosm}
                        alt={`image title - ${even.name}`}
                        style={{ objectFit: "cover" }}
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
                      <Link
                        className="h6 m-0 text-white text-uppercase font-weight-semi-bold text-decoration-none"
                        to={`/evento/${even.url}`}
                      >
                        {even.name}
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </OwlCarousel>
          </SkeletonLarge>
        </div>
      </div>
    </>
  );
}
