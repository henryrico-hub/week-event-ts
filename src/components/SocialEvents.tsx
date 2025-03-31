import { Link } from "react-router-dom";
import { category } from "../data";
import { formatearFecha } from "../utils/helpers";
import Newsletter from "./Newsletter";
import { EventType } from "../types";
import img_lg from "../assets/images/news-800x500-3.jpg";
import { Divider, Flex, Skeleton, Typography } from "antd";
import { SkeletonGridSocial } from "./skeleton/SkeletonCustom";
import logosm from "../assets/images/logo1.jpeg";

type SocialEventsProps = {
  latestEvent: EventType[];
  loading: boolean;
  setLoading: (value: boolean) => void;
};
const SizeContent = {
  Ipx: "1rem",
  Ipy: "1rem",
  Im: "1rem",
  Imy: "1rem",
  Imx: "1rem",
  Ppb: "2rem",
  Ppl: "1rem",
  zero: "0px",
  height: "100px",
  width: "120px",
};

export default function SocialEvents({
  latestEvent,
  loading,
  setLoading,
}: SocialEventsProps) {
  return (
    <>
      <div className="col-lg-4">
        {/* <!-- Social Follow Start --> */}
        {/* <div className="mb-3">
          <div className="section-title mb-0">
            <h4 className="m-0 text-uppercase font-weight-bold">Follow Us</h4>
          </div>
          <div className="bg-white border border-top-0 p-3">
            <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#39569E'}}>
                <i className="fab fa-facebook-f text-center py-4 mr-3" style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                <span className="font-weight-medium">12,345 Fans</span>
            </a>
            <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#52AAF4'}}>
                <i className="fab fa-twitter text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                <span className="font-weight-medium">12,345 Followers</span>
            </a>
            <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#0185AE'}}>
                <i className="fab fa-linkedin-in text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                <span className="font-weight-medium">12,345 Connects</span>
            </a>
            <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#C8359D'}}>
                <i className="fab fa-instagram text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                <span className="font-weight-medium">12,345 Followers</span>
            </a>
            <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#DC472E'}}>
                <i className="fab fa-youtube text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                <span className="font-weight-medium">12,345 Subscribers</span>
            </a>
            <a href="" className="d-block w-100 text-white text-decoration-none" style={{background: '#055570'}}>
                <i className="fab fa-vimeo-v text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                <span className="font-weight-medium">12,345 Followers</span>
            </a>
          </div>
        </div> */}
        {/* <!-- Social Follow End --> */}

        {/* <!-- Ads Start --> */}
        {loading ? (
          <>
            <Flex vertical align="center" justify="center">
              <Skeleton.Button
                active
                size="large"
                block={true}
                style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
              />
              <Skeleton.Image
                active
                style={{
                  padding: "1rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "300px",
                  height: "220px",
                }}
              />
            </Flex>
          </>
        ) : (
          <div className="mb-3">
            <div className="section-title mb-0">
              <h4 className="m-0 text-uppercase font-weight-bold">
                Advertisement
              </h4>
            </div>
            <div className="bg-white text-center border border-top-0 p-3">
              <a href="">
                <img className="img-fluid" src={img_lg} alt="" />
              </a>
            </div>
          </div>
        )}
        {/* <!-- Ads End --> */}

        {/* <!-- Popular News Start --> */}
        {loading ? (
          <>
            <Skeleton.Button size="large" block={true} />

            <SkeletonGridSocial
              loading={loading}
              sizeContent={SizeContent}
              title={""}
              avatar={""}
              paragraph={{
                rows: 2,
                width: [100, 150],
              }}
            >
              <></>
            </SkeletonGridSocial>
          </>
        ) : (
          <div className="mb-3">
            <div className="section-title mb-0">
              <h4 className="m-0 text-uppercase font-weight-bold">Tranding</h4>
            </div>
            <div className="bg-white border border-top-0 p-3">
              {latestEvent.slice(4).map((eve, key) => (
                <Link
                  key={key}
                  to={`/evento/${eve.url}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <div
                    className="d-flex align-items-center bg-white"
                    style={{ height: "110px" }}
                  >
                    {eve.img_main ? (
                      <img
                        className="img-calendar-m"
                        style={{ width: "120px", height: "80%" }}
                        src={`${import.meta.env.VITE_API_URL_SHORT}${
                          eve.img_main.url
                        }`}
                        alt={`event ${eve.name}`}
                      />
                    ) : (
                      <>
                        {/*     <img className="img-fluid" src="" alt=""/> */}
                        <img
                          className="img-calendar-m"
                          style={{ width: "120px", height: "80%" }}
                          src={logosm}
                        />
                      </>
                    )}
                    <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center">
                      <div className="mb-2">
                        <a
                          className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                          aria-disabled={true}
                        >
                          {eve.category.name}
                        </a>
                        <a className="text-body" aria-disabled={true}>
                          <small>{formatearFecha(eve.date_event)}</small>
                        </a>
                      </div>

                      <a className="h6 m-0 text-uppercase font-weight-bold descript-resume">
                        {eve.name}
                      </a>
                      {/* <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">{encodeImg(`${import.meta.env.VITE_API_URL_SHORT}${eve.img_main.url}`,110,110)}</a> */}
                    </div>
                  </div>
                  <Divider style={{ margin: "10px 0", borderWidth: "1px" }} />
                </Link>
              ))}

              {/* <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                <img className="img-fluid" src={img_sm} alt=""/>
                <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                  <div className="mb-2">
                    <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                    <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                  </div>
                  <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                </div>
              </div> */}
            </div>
          </div>
        )}
        {/* <!-- Popular News End --> */}

        {/* <!-- Newsletter Start --> */}
        {loading ? (
          <>
            <Flex vertical align="center" justify="center">
              <Skeleton.Button
                active
                size="large"
                block={true}
                style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
              />
              <Skeleton
                loading={loading}
                active
                title={false}
                paragraph={{
                  rows: 3,
                  width: ["auto", "auto", "auto"],
                }}
                style={{ padding: "1rem", marginBottom: "2rem" }}
              ></Skeleton>
            </Flex>
          </>
        ) : (
          <Newsletter />
        )}
        {/* <!-- Newsletter End --> */}

        {/* <!-- Tags Start --> */}
        {loading ? (
          <>
            <Flex vertical align="center" justify="center">
              <Skeleton.Button
                active
                size="large"
                block={true}
                style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
              />
              <Skeleton
                loading={loading}
                active
                title={false}
                paragraph={{
                  rows: 3,
                  width: ["auto", "auto", "auto"],
                }}
                style={{ padding: "1rem", marginBottom: "2rem" }}
              ></Skeleton>
            </Flex>
          </>
        ) : (
          <div className="mb-3">
            <div className="section-title mb-0">
              <h4 className="m-0 text-uppercase font-weight-bold">
                CATEGORIAS
              </h4>
            </div>
            <div className="bg-white border border-top-0 p-3">
              <div className="d-flex flex-wrap m-n1">
                {category.map((cat, key) => (
                  <Link
                    key={key}
                    to={`/categoria/${cat.slug}`}
                    className="btn btn-sm btn-outline-secondary m-1"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* <!-- Tags End --> */}
      </div>
    </>
  );
}
