/* import { type BlocksContent } from '@strapi/blocks-react-renderer'
import BlockRendererClient from './BlockRendererClient' */
/* import ads_img from '../assets/images/ads-728x90.png'
import perfil_img from '../assets/images/user.jpg' */
import { EventType } from "../types";
import { useState, useEffect } from "react";
import { getlatestEvent } from "../models/event.server";
import { SkeletonGrid2 } from "./skeleton/SkeletonCustom";
import SocialEvents from "./SocialEvents";
import CardEvent from "./CardEvent";

const SizeContent = {
  Ipx: "1rem",
  Ipy: "1rem",
  Im: "1rem",
  Imy: "1rem",
  Imx: "0rem",
  Ppb: "2rem",
  Ppl: "1rem",
  zero: "0px",
  height: "200px",
  width: "300px",
  c: 1,
  cc: 2,
};

// const { Meta } = Card;
// const { Text, Title } = Typography;

export default function ContentSideBar() {
  const [loading, setLoading] = useState(false);
  const [latestEvent, setlatestEvent] = useState<EventType[]>([]);
  /* const [article, setArticle] = useState<BlocksContent>() */

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const events = await getlatestEvent();
        setlatestEvent(events.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [setlatestEvent]);

  // function encodeImg(img_url: string, width: number, height: number) {
  //   const img_resized = encodeURIComponent(img_url);
  //   const imgCDN = "https://imagecdn.app/v1/images/";
  //   const cadenaWH = `?width=${width}&height=${height}`;
  //   return imgCDN + img_resized + cadenaWH;
  // }
  /* console.log(latestEvent[1]); */

  return (
    <>
      {/* <!-- News With Sidebar Start --> */}
      <div className="container-fluid mb-5">
        <div className="container-md">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {loading ? (
                  <SkeletonGrid2
                    loading={loading}
                    sizeContent={SizeContent}
                    title={""}
                    avatar={""}
                    paragraph={{
                      rows: 5,
                      width: [100, 150, "auto", "auto", "auto"],
                    }}
                  >
                    <></>
                  </SkeletonGrid2>
                ) : (
                  <>
                    <div className="col-12">
                      <div className="section-title">
                        <h4 className="m-0 text-uppercase font-weight-bold">
                          Latest News
                        </h4>
                        <a
                          className="text-secondary font-weight-medium text-decoration-none"
                          href=""
                        >
                          View All
                        </a>
                      </div>
                    </div>

                    {latestEvent.slice(0, 6).map((eve, key) => (
                      <CardEvent eve={eve} colSpan={6} key={key} />
                      // <div key={key} className="col-lg-6 py-2">
                      //   <Link
                      //     to={`/evento/${eve.url}`}
                      //     style={{ textDecoration: "none" }}
                      //   >
                      //     <Card
                      //       hoverable
                      //       type="inner"
                      //       style={{ width: "100%" }}
                      //       cover={
                      //         <img
                      //           alt="event image"
                      //           src={`${import.meta.env.VITE_API_URL_SHORT}${
                      //             eve.img_main.url
                      //           }`}
                      //           style={{
                      //             width: "100%",
                      //             objectFit: "cover",
                      //             height: "250px",
                      //           }}
                      //         />
                      //       }
                      //     >
                      //       <Meta
                      //         title={
                      //           <>
                      //             <div className="bg-white">
                      //               <div className="mb-2">
                      //                 <a
                      //                   className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                      //                   aria-disabled={true}
                      //                 >
                      //                   {eve.category.name}
                      //                 </a>
                      //                 <a
                      //                   className="text-body"
                      //                   aria-disabled={true}
                      //                 >
                      //                   <small>
                      //                     {formatearFecha(eve.date_event)}
                      //                   </small>
                      //                 </a>
                      //               </div>
                      //               <Title
                      //                 level={3}
                      //                 style={{
                      //                   textTransform: "uppercase",
                      //                   whiteSpace: "normal",
                      //                   wordWrap: "break-word",
                      //                 }}
                      //               >
                      //                 {eve.name}
                      //               </Title>
                      //             </div>
                      //           </>
                      //         }
                      //         description={
                      //           <>
                      //             <Text
                      //               type="secondary"
                      //               className="descript-resume"
                      //             >
                      //               {eve.description1}
                      //             </Text>

                      //             <div className="d-flex justify-content-between border-top pt-2 mt-4">
                      //               <div className="d-flex align-items-center">
                      //                 <img
                      //                   className="rounded-circle mr-2"
                      //                   src={`${
                      //                     import.meta.env.VITE_API_URL_SHORT
                      //                   }${eve.author_sc.avatar.url}`}
                      //                   width="35"
                      //                   height="35"
                      //                   alt=""
                      //                 />

                      //                 <Text
                      //                   type="secondary"
                      //                   style={{ textDecoration: "none" }}
                      //                 >
                      //                   {eve.author_sc.name}
                      //                 </Text>
                      //               </div>
                      //               <div className="d-flex align-items-center">
                      //                 <Text type="secondary" className="ml-3">
                      //                   <i className="far fa-eye mr-2"></i>12345
                      //                 </Text>
                      //                 <Text type="secondary" className="ml-3">
                      //                   <i className="far fa-comment mr-2"></i>
                      //                   123
                      //                 </Text>
                      //               </div>
                      //             </div>
                      //           </>
                      //         }
                      //       />
                      //     </Card>
                      //   </Link>
                      // </div>
                    ))}

                    {/* {latestEvent.map((eve, key) => (
                      <div key={key} className="col-lg-6">
                        <div className="position-relative mb-3">
                          {eve.img_main ? (
                            <img
                              className="img-fluid w-100"
                              src={`${import.meta.env.VITE_API_URL_SHORT}${
                                eve.img_main.url
                              }`}
                              style={{ objectFit: "cover", height: "250px" }}
                            />
                          ) : (
                            <img
                              className="w-auto"
                              src={logosm}
                              style={{ objectFit: "cover" }}
                            />
                          )}
                          <div className="bg-white border border-top-0 p-4">
                            <div className="mb-2">
                              <a
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                aria-disabled={true}
                              >
                                {eve.category.name}
                              </a>
                              <a className="text-body" aria-disabled={true}>
                                <small>{formatearFecha(eve.date_event)}</small>
                              </a>
                            </div>
                            <Link
                              className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                              to={`/evento/${eve.url}`}
                            >
                              {eve.name}
                            </Link>
                            <p className="descript-resume m-0">
                              {eve.description1}
                            </p>
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

                              <small>{eve.author_sc.name}</small>
                            </div>
                            <div className="d-flex align-items-center">
                              <small className="ml-3">
                                <i className="far fa-eye mr-2"></i>12345
                              </small>
                              <small className="ml-3">
                                <i className="far fa-comment mr-2"></i>123
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))} */}
                  </>
                )}

                {/* Agrgar carousel ? */}
                {/* {latestEvent.slice(4, 9).map((eve, key) => (
                  <div key={key} className="col-lg-12">
                    <div className="row news-lg mx-0 mb-3">
                      <div className="col-md-6 h-100 px-0">
                        {eve.img_main ? (
                          <img
                            className="img-fluid h-100 w-100"
                            src={`${import.meta.env.VITE_API_URL_SHORT}${
                              eve.img_main.url
                            }`}
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <img
                            className="img-fluid h-100"
                            src={logosm}
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </div>
                      <div className="col-md-6 d-flex flex-column border bg-white h-100 px-0">
                        <div className="mt-auto p-4">
                          <div className="mb-2">
                            <a
                              className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                              aria-disabled={true}
                            >
                              {eve.category.name}
                            </a>
                            <a className="text-body" aria-disabled={true}>
                              <small>{formatearFecha(eve.date_event)}</small>
                            </a>
                          </div>
                          <Link
                            className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                            to={`/evento/${eve.url}`}
                          >
                            {eve.name}
                          </Link>
                          <p className="descript-resume m-0">
                            {eve.description1}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between bg-white border-top mt-auto px-4 py-2">
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
                            <small>{eve.author_sc.name}</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <small className="ml-3">
                              <i className="far fa-eye mr-2"></i>12345
                            </small>
                            <small className="ml-3">
                              <i className="far fa-comment mr-2"></i>123
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}

                {/* <div className="col-lg-6">
                <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                  <img className="img-fluid" src={img_sm} alt=""/>
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                      <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                    </div>
                      <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                  <img className="img-fluid" src={img_sm} alt=""/>
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                      <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                    </div>
                    <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                  <img className="img-fluid" src={img_sm} alt=""/>
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                      <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                    </div>
                    <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                  <img className="img-fluid" src={img_sm} alt=""/>
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                      <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                    </div>
                    <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                  </div>
                </div>
              </div> */}
              </div>
            </div>

            <SocialEvents
              latestEvent={latestEvent}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>

      {/* <!-- News With Sidebar End --> */}
    </>
  );
}
