import Slider from "react-slick";
import { EventType } from "../../types";
import HoverVideoPlayer from "./HoverVideoPlay";

type dataEventProps = {
  dataEvent: EventType;
};

function ReelsEvent({ dataEvent }: dataEventProps) {
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
    // adaptiveHeight: true,

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
    dataEvent.reels && (
      <div className="container-fluid bg-dark px-10 py-6">
        <div
          id="slider"
          className="reels col-lg-12 py-10 justify-content-center bg-dark"
        >
          <div className="container">
            <div
              className="calendar-section-title gap-3 pr-4 position-static bg-dark shadow-none mb-10"
              style={{ justifyContent: "left" }}
            >
              <a className="c-badge pl-6 p-3">REELS</a>
              <p className="font-bold text-xs sm:text-base uppercase ">
                Descubre más sobre este evento desde adentro
              </p>
            </div>

            <Slider {...settings}>
              {dataEvent.reels.map((reel, key) => (
                <HoverVideoPlayer
                  key={key}
                  url={`${import.meta.env.VITE_API_URL_SHORT}${reel.url}`}
                  name={reel.name}
                />

                //  <div
                //   style={{
                //     position: "relative",
                //     height: "20px",
                //     width: "100%",
                //     backgroundColor: "#FFCC00",
                //     color: "black",
                //     textAlign: "center",

                //     paddingBottom: 0.5,
                //     paddingTop: 0.7,
                //     fontSize: "0.875rem",
                //     fontWeight: 500,
                //     borderTopLeftRadius: "10px",
                //     borderTopRightRadius: "10px",
                //   }}
                // ></div>

                //  <ReactPlayer
                //   key={key}
                //   ref={playerRef}
                //   url={`${import.meta.env.VITE_API_URL_SHORT}${reel.url}`}
                //   width="100%"
                //   height="100%"
                //   playing={playing}
                //   playIcon={<PlayCircleFilled />}
                //   muted
                //   loop
                //   controls
                //   style={{
                //     borderRadius: "10px",
                //   }}
                // />
              ))}
            </Slider>
            {/* //   <iframe
            //   key={key}
            //   src={reel.url}
            //   width="100%"
            //   height="476"
            //   style={{
            //     border: "none",
            //     overflow: "hidden",
            //     borderRadius: "10px",
            //   }}
            //   scrolling="no"
            //    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            //   allowFullScreen={true}
            //   loading="lazy"
            // ></iframe> */}
          </div>
        </div>
      </div>
    )
  );
}

export default ReelsEvent;
