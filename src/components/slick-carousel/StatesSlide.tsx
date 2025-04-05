import Slider from "react-slick";
import { statesOfMexico } from "../../data";
import { Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ReelsEvent() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
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

  return (
    <Row>
      <Col span={24} className="bg-dark lg:px-20 md:px-10 sm:px-5 py-6">
        <div
          id="slider"
          className="slide-container col-lg-12 py-10 justify-content-center bg-dark"
        >
          <div
            className="calendar-section-title gap-3 pr-4 position-static bg-dark shadow-none px-5 lg:mb-1 md:mb-10 sm:mb-15"
            style={{ justifyContent: "left" }}
          >
            <a className="c-badge pl-6 p-3">
              <FontAwesomeIcon icon={faLocationDot} size="xl" />
            </a>
            <a className="m-0 text-uppercase font-weight-bold">
              Descubre eventos emocionantes cerca de ti
            </a>
          </div>

          <Slider {...settings} className="lg:p-5 md:p-0">
            {statesOfMexico.map((state, key) => (
              <div key={key}>
                <Link
                  to={"/maps"}
                  className="slide-item"
                  style={{
                    position: "relative",
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
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  ></div>
                  <img
                    className="slide-image"
                    src={state.src}
                    alt={state.name}
                    style={{
                      objectFit: "cover",
                      display: "block",
                      width: "100%",
                      height: "166px",
                      // maxHeight: "150px",
                      borderRadius: "8px",
                      transition: "transform 0.3s ease-in-out",
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
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </Col>
    </Row>
  );
}

export default ReelsEvent;
