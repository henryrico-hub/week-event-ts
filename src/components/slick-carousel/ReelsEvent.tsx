import Slider from "react-slick";
import { reelsEvents } from "../../data";

function ReelsEvent() {
  const settings = {
    nav: true,
    arrows: true,
    infinite: false,
    // speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // swipeToSlide: true,
    // initialSlide: 0,
    dots: true,
    adaptiveHeight: true,

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
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container-fluid bg-dark px-12 py-6 mt-5">
      <div
        id="slider"
        className="slide-container col-lg-12 py-10 justify-content-center bg-dark"
      >
        <div
          className="calendar-section-title gap-3 pr-4 position-static bg-dark shadow-none mb-10"
          style={{ justifyContent: "left" }}
        >
          <a className="c-badge pl-6 p-3">REELS</a>
          <a className="m-0 text-uppercase font-weight-bold">
            Descubre más sobre este evento desde adentro
          </a>
        </div>

        <Slider {...settings}>
          {reelsEvents.map((reel, key) => (
            <div className="px-4 py-3">
              <iframe
                key={key}
                src={reel.url}
                width="100%"
                height="476"
                style={{
                  border: "none",
                  overflow: "hidden",
                  borderRadius: "10px",
                }}
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ReelsEvent;
