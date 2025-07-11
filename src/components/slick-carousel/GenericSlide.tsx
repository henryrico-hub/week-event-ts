import Slider from "react-slick";
import { Col, ConfigProvider, Row } from "antd";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import { SkeletonGeneric } from "../skeleton/SkeletonCustom";
import { getEventsParams } from "src/models/event.server";
import { EventType } from "src/types";

const SizeContent_md = {
  Ipx: "6rem",
  Ipy: "5rem",
  Im: "0rem",
  Imy: "2rem",
  Imx: "2rem",

  zero: "0px",
  height: "100px",
  width: "100%",
};

type Props = {
  slug: string;
  icon: string;
  title: string;
};

function GenericSlide({ slug, icon, title }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<EventType[]>([]);
  // Esto crea un contexto para importar imágenes .jpg desde la carpeta de estados
  // Import all jpg images from the states folder using Vite's import.meta.glob

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const url = `/event-categories?filters[slug][$eq]=${slug}&populate[event_category_fks][populate]=img_main`;
        const response = await getEventsParams(url);
        setData(response.data[0].event_category_fks);
        // console.log(response.data[0].event_category_fks);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, [slug]);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    swipeToSlide: true,
    appendDots: (dots: any) => (
      <div
        style={{
          display: "block",
          // backgroundColor: "#ddd",
          // borderRadius: "10px",
          // padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          rows: 2,
        },
      },
    ],
  };

  return (
    <>
      <Row>
        <Col span={24} className="bg-dark lg:px-15 md:px-10 sm:px-5 py-1">
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
              <SkeletonGeneric
                sizeContent={SizeContent_md}
                loading={loading}
                title={""}
                avatar={""}
                paragraph={{
                  rows: 1,
                  width: [100, "auto"],
                }}
              >
                <></>
              </SkeletonGeneric>
            </ConfigProvider>
          ) : (
            <div
              id="slider"
              className="states col-lg-12 py-4 justify-content-center"
            >
              <div
                className="calendar-section-title gap-3 pr-4 position-static bg-dark shadow-none px-5 lg:mb-1 md:mb-10 sm:mb-15"
                style={{ justifyContent: "left" }}
              >
                {/* <Icon icon={faLocationDot} size="xl" /> */}
                <a className="c-badge p-2">
                  <Icon icon={icon} width={24} />
                </a>
                <p className="font-bold text-xs sm:text-base uppercase ">
                  {title}
                </p>
              </div>

              <Slider {...settings} className="lg:p-2 md:p-0">
                {data.map((event, key) => (
                  <div key={key}>
                    <div
                      className="slide-item"
                      style={{
                        position: "relative",
                      }}
                      onClick={() => {
                        // setOpen((prev) => !prev);
                        // setStatteSelected(event.slug);
                      }}
                    >
                      <div
                        className="gradient-overlay"
                        style={{
                          margin: "15px",
                          height: "100%",
                          width: "100%",
                          position: "absolute",
                          backgroundImage:
                            "linear-gradient(to top, rgb(30, 32, 36, 0.6))",
                          top: 0,
                          left: 0,
                          transition: "opacity 0.8s ease-in-out",
                        }}
                      ></div>
                      <img
                        className="slide-image"
                        src={`${import.meta.env.VITE_API_URL_SHORT}${
                          event.img_main.url
                        }`}
                        alt={`imagen portada del evento ${event.name} `}
                        style={{
                          objectFit: "cover",
                          display: "block",
                          width: "100%",
                          height: "166px",
                          // maxHeight: "150px",
                          borderRadius: "8px",
                          transition: "transform 0.3s ease-in-out",
                          cursor: "pointer",
                        }}
                      />
                      <p
                        className="name-resume-slide-cate text-white shadow-2xl"
                        style={{
                          fontSize: "24px",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                        title={event.name}
                      >
                        {event.name}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </Col>
        <Col className="p-1 bg-[#FFCC00] w-full"></Col>
      </Row>

      {/* <StateEventsDrawer
        open={open}
        setOpen={setOpen}
        stateSelected={stateSelected}
      /> */}
    </>
  );
}

export default GenericSlide;
