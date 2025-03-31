import { useState, useEffect } from "react";
import { formatearFecha } from "../utils/helpers";
import OwlCarousel from "react-owl-carousel";
import { EventType } from "../types";
import { getEventsDesc } from "../models/event.server";
import { Link } from "react-router-dom";
import { SkeletonBreaking } from "./skeleton/SkeletonCustom";

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

  const options = {
    items: 1,
    nav: true,
    dots: false,
    loop: true,
    autoplay: true,
  };

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
        <div className="breaking-events">
          <div className="container-fluid bg-dark py-3 mb-3">
            <div className="container-md">
              <div className="row align-items-center bg-dark">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <div
                      className="bg-primary text-dark text-center font-weight-medium py-2"
                      style={{ width: "170px" }}
                    >
                      Breaking News
                    </div>
                    <OwlCarousel
                      className="tranding-carousel position-relative d-inline-flex align-items-center ml-3"
                      style={{
                        width: "calc(100% - 170px)",
                        paddingRight: "90px",
                      }}
                      {...options}
                    >
                      {/* <div className="owl-carousel tranding-carousel position-relative d-inline-flex align-items-center ml-3" style={{width: 'calc(100% - 170px)', paddingLeft: '90px'}}> */}

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

                      {/* </div> */}
                    </OwlCarousel>
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
