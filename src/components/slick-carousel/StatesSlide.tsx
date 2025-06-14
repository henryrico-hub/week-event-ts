import Slider from "react-slick";
import { statesOfMexico } from "../../data";
import { Col, ConfigProvider, Row } from "antd";
import { Icon } from "@iconify-icon/react";
import StateEventsDrawer from "../StateEventsDrawer";
import { useState } from "react";
import { SkeletonStates } from "../skeleton/SkeletonCustom";

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

function ReelsEvent() {
  const [open, setOpen] = useState<boolean>(false);
  const [stateSelected, setStatteSelected] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Esto crea un contexto para importar imágenes .jpg desde la carpeta de estados
  // Import all jpg images from the states folder using Vite's import.meta.glob
  const images = import.meta.glob("/src/assets/images/states/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

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
    rows: 2,
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
          rows: 3,
        },
      },
    ],
  };
  // 🔥 Utilidad para obtener la imagen usando import.meta.glob
  const getImage = (filename: string) => {
    const path = `/src/assets/images/states/${filename}`;
    if (images[path]) {
      return images[path];
    } else {
      console.warn("Imagen no encontrada:", filename, "- usando fallback.");
      return images["/src/assets/images/states/logo2.jpeg"];
    }
  };

  return (
    <>
      <Row>
        <Col span={24} className="bg-dark lg:px-20 md:px-10 sm:px-5 py-6">
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
              <SkeletonStates
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
              </SkeletonStates>
            </ConfigProvider>
          ) : (
            <div
              id="slider"
              className="states col-lg-12 py-10 justify-content-center"
            >
              <div
                className="calendar-section-title gap-3 pr-4 position-static bg-dark shadow-none px-5 lg:mb-1 md:mb-10 sm:mb-15"
                style={{ justifyContent: "left" }}
              >
                {/* <Icon icon={faLocationDot} size="xl" /> */}
                <a className="c-badge pl-6 p-3">
                  <Icon icon={"fa6-solid:location-dot"} width={22} />
                </a>
                <p className="font-bold text-xs sm:text-base uppercase ">
                  Descubre eventos cercas de ti
                </p>
              </div>

              <Slider {...settings} className="lg:p-5 md:p-0">
                {statesOfMexico.map((state, key) => (
                  <div key={key}>
                    <div
                      className="slide-item"
                      style={{
                        position: "relative",
                      }}
                      onClick={() => {
                        setOpen((prev) => !prev);
                        setStatteSelected(state.slug);
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
                            "linear-gradient(to top, rgb(30, 32, 36, 0.8), transparent)",
                          top: 0,
                          left: 0,
                          transition: "opacity 0.8s ease-in-out",
                        }}
                      ></div>
                      <img
                        className="slide-image"
                        src={getImage(state.src)}
                        alt={state.name}
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
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontFamily: "var(--font-family-sans-serif)",
                        }}
                      >
                        {state.name}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </Col>
      </Row>

      <StateEventsDrawer
        open={open}
        setOpen={setOpen}
        stateSelected={stateSelected}
      />
    </>
  );
}

export default ReelsEvent;
