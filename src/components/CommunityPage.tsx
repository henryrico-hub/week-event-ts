import { Icon } from "@iconify-icon/react";
import ads_img from "../assets/images/ads-728x90.png";
import { ArticleType } from "../types";
import { useState, useEffect } from "react";
import { getAllArticle } from "../models/event.server";
import { formatearFecha } from "../utils/helpers";
import { Link } from "react-router-dom";

import imgbanner from "../assets/images/news-800x500-3.jpg";
import Selector from "./Selector";
import OwlBreakingNews from "./OwlBreakingNewsCopy";
import { SkeletonGrid2 } from "./skeleton/SkeletonCustom";
import { Typography } from "antd";

const { Text } = Typography;

const SizeContent = {
  Ipx: "1rem",
  Ipy: "1rem",
  Im: "1rem",
  Imy: "1rem",
  Imx: "0rem",
  Ppb: "1rem",
  Ppl: "0rem",
  zero: "0px",
  height: "180px",
  width: "350px",
  cc: 2,
  c: 1,
};

export default function CommunityPage() {
  const [allArticle, setAllArticle] = useState<ArticleType[]>([]); // Initialize state with an empty array
  const [, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /* const [article, setArticle] = useState<BlocksContent>() */

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const events = await getAllArticle();
        setAllArticle(events.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [setAllArticle]);

  /* function encodeImg ( img_url : string, width : number, height: number ) {
      const img_resized = encodeURIComponent(img_url)
      const imgCDN = "https://imagecdn.app/v1/images/"
      const cadenaWH = `?width=${width}&height=${height}`
      return imgCDN+img_resized+cadenaWH;
    } */
  /* console.log(allArticle); */

  return (
    <>
      {/* <!-- News With Sidebar Start --> */}
      <div
        className="page-heading-sigle-event"
        aria-label="background single event"
        style={{
          backgroundImage: `linear-gradient(rgba(107, 200, 40, 0.56), rgba(21, 164, 174, 0.62)), url(${imgbanner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2
                className="wow animate__animated animate__fadeInDown"
                data-wow-delay="0.1s"
              >
                Are you looking for a new challenge?
              </h2>
              <span
                className="wow animate__animated animate__fadeInDown"
                data-wow-delay="0.3s"
              >
                Check out our venues, pick your choice and fill the reservation
                application.
              </span>
            </div>
          </div>
        </div>
      </div>

      <OwlBreakingNews />

      <div className="container-fluid mt-5 mb-5">
        <div className="container-md">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {loading ? (
                  <SkeletonGrid2
                    loading={loading}
                    sizeContent={SizeContent}
                    title={""}
                    avatar={""}
                    paragraph={{
                      rows: 2,
                      width: ["auto", "auto"],
                    }}
                  >
                    <></>
                  </SkeletonGrid2>
                ) : (
                  <>
                    <div className="col-12">
                      <div className="section-title-col">
                        <Selector
                          dataE={allArticle}
                          setMobileMenuOpen={setMobileMenuOpen}
                          style={{ width: "50%" }}
                          type_props="Post"
                        />
                        <h4 className="m-0 text-uppercase font-weight-bold">
                          Latest Post
                        </h4>
                      </div>
                    </div>

                    {allArticle && allArticle.length > 0 ? (
                      allArticle.map((eve, key) => (
                        <div key={key} className="col-lg-6">
                          <div className="position-relative mb-3">
                            <img
                              className=""
                              src={`${import.meta.env.VITE_API_URL_SHORT}${
                                eve.img_main.url
                              }`}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "180px",
                              }}
                            />
                            <div className="bg-white border border-top-0 px-4 pt-3">
                              <div className="grid grid-flow-col justify-between mb-2">
                                <a className="text-body" aria-disabled={true}>
                                  <small>{formatearFecha(eve.date)}</small>
                                </a>
                                <a
                                  className="badge badge-primary text-uppercase font-weight-semi-bold py-2 px-6"
                                  aria-disabled={true}
                                >
                                  {eve.event_category.name}
                                </a>
                              </div>
                              <Link
                                className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                                to={`/comunidad/post/${eve.url}`}
                              >
                                {eve.name}
                              </Link>
                              {/* <p className="descript-resume m-0">{eve.description1}</p> */}
                            </div>
                            <div className="d-flex justify-content-between bg-white border border-top-0 px-4 py-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="rounded-circle mr-2"
                                  src={`${import.meta.env.VITE_API_URL_SHORT}${
                                    eve.author_sc.avatar.url
                                  }`}
                                  width="35"
                                  height="35"
                                  alt=""
                                />
                                {/* <img className="rounded-circle mr-2" src={`${import.meta.env.VITE_API_URL_SHORT}${eve.img_desc1.url}`} width="25" height="25" alt=""/> */}
                                <small>{eve.author_sc.name}</small>
                              </div>
                              <div className="d-flex align-items-center">
                                <small className="ml-3">
                                  <div className="d-flex align-items-center ml-3">
                                    <Icon
                                      icon={"fa-regular:eye"}
                                      className="mr-1"
                                    />
                                    <Text type="secondary">12345</Text>
                                  </div>
                                </small>
                                {/* <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small> */}
                                <button disabled>
                                  <strong className="ml-3">
                                    <Icon
                                      icon={"fa6-solid:hands-clapping"}
                                      className="mr-2"
                                    />
                                    {eve.claps}
                                  </strong>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center py-20">
                        <p className="text-muted mb-2">
                          No hay publicaciones recientes aún.
                        </p>
                        <Icon
                          icon="mdi:emoticon-sad-outline"
                          width="40"
                          height="40"
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="col-lg-12 mb-3">
                  <a href="">
                    <img className="img-fluid w-100" src={ads_img} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
