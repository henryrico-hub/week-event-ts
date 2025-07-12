import { Link, useParams } from "react-router-dom";
import { formatearFecha } from "../utils/helpers";
import Newsletter from "./Newsletter";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "./BlockRendererClient";
import { useState, useEffect } from "react";
import { getSingleArticle, putClapsArticle } from "../models/event.server";
import { ArticleType } from "../types";
import { category } from "../data";
import img_lg from "../assets/images/news-700x435-2.jpg";
import TrandingEvents from "./TrandingEventsCopy";
import { Icon } from "@iconify-icon/react";
import { Flex, Skeleton, Typography } from "antd";
import imgLogo from "/src/assets/images/logo1.jpeg";

const social = [
  {
    id: 1,
    icon: "fa-brands:facebook",
    link: "www.dsd.com",
  },
  {
    id: 2,
    icon: "fa-brands:instagram",
    link: "www.dsd.com",
  },
  {
    id: 3,
    icon: "fa-brands:twitter",
    link: "www.dsd.com",
  },
  {
    id: 4,
    icon: "fa-brands:linkedin",
    link: "www.dsd.com",
  },
];

type StatusButton = JSX.Element;
type paramsEventProps = {
  url: string;
};
// const SizeContent = {
//   Ipx: "3rem",
//   Ipy: "2rem",
//   Im: "1rem",
//   Imy: "3rem",
//   Imx: "3rem",
//   Ppb: "3rem",
//   Ppl: "3rem",
//   zero: "0px",
//   height: "200px",
//   width: "100%",
//   Ppt: "",
//   Ppr: "",
// };

export default function SinglePost() {
  const params = useParams<paramsEventProps>();
  const { url } = params;

  const [loading, setLoading] = useState(false);
  const [dataEvent, setdataEvent] = useState<ArticleType[]>([]); // Initialize state with an empty array
  const [artBody, setartBody] = useState<BlocksContent>();

  const [statusClaps, setStatusClaps] = useState("init");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (!url) {
          throw new Error("URL no proporcionado");
        } else {
          const events = await getSingleArticle(url);
          setdataEvent(events.data);
          setartBody(events.data[0]?.art_body);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, [url]);

  const handleSubmit = () => {
    setStatusClaps("loader");

    setTimeout(async () => {
      try {
        const newDataClap = dataEvent[0].claps + 1;
        const response = await putClapsArticle(
          dataEvent[0].documentId,
          newDataClap
        );
        if (response.status === 200) {
          setStatusClaps("success-bounce");
          setTimeout(() => {
            setStatusClaps("success");
          }, 2000);
        }
      } catch (error: any) {
        console.error("Error posting data:", error.message);
        setStatusClaps("error-beat");
        setTimeout(() => {
          setStatusClaps("error");
        }, 2000);
      }
    }, 3000);
  };

  const statusButtons: Record<string, StatusButton> = {
    init: (
      <button className="ml-2" onClick={handleSubmit}>
        {/* <FontAwesomeIcon icon={faHandsClapping} bounce size="lg" /> */}
        <Icon icon={"fa6-solid:hands-clapping"} />
      </button>
    ),
    loader: (
      <button className="ml-2" onClick={handleSubmit} disabled>
        <Icon
          icon={"fa-solid:spinner"}
          // spin
          // size="lg"
          style={{ color: "#f97316" }}
        />
        {/* <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="lg"
          style={{ color: "#f97316" }}
        /> */}
      </button>
    ),
    "success-bounce": (
      <button className="ml-2" onClick={handleSubmit} disabled>
        <Icon icon={"fa6-solid:hands-clapping"} style={{ color: "#f97316" }} />
        {/* <FontAwesomeIcon
          icon={faHandsClapping}
          bounce
          size="lg"
          style={{ color: "#f97316" }}
        /> */}
      </button>
    ),
    success: (
      <button className="ml-2" onClick={handleSubmit} disabled>
        <Icon icon={"fa6-solid:hands-clapping"} style={{ color: "#f97316" }} />
        {/* <FontAwesomeIcon
          icon={faHandsClapping}
          size="lg"
          style={{ color: "#f97316" }}
        /> */}
      </button>
    ),
    "error-beat": (
      <button className="ml-2" onClick={handleSubmit} disabled>
        {/* <FontAwesomeIcon icon={faXmark} beatFade size="xl" /> */}
        <Icon icon={"fa6-regular:circle-xmark"} />
      </button>
    ),
    error: (
      <button className="ml-2" onClick={handleSubmit} disabled>
        {/* <FontAwesomeIcon icon={faXmark} size="xl" /> */}
        <Icon icon={"fa6-regular:circle-xmark"} />
      </button>
    ),
  };

  return (
    <>
      <TrandingEvents />

      <div className="container-fluid mt-4 mb-5">
        <div className="container-md">
          <div className="row">
            <div className="col-lg-8">
              {loading ? (
                <>
                  <Flex gap={"middle"}>
                    <Skeleton.Avatar size={"large"} />
                    <Skeleton.Button block={true} size="large" style={{}} />
                  </Flex>
                  <Skeleton.Image
                    style={{
                      width: "350px",
                      height: "200px",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  />
                  <Skeleton
                    loading={loading}
                    active
                    paragraph={{
                      rows: 5,
                      width: [150, 300, "auto", "auto", "auto"],
                    }}
                    style={{
                      paddingBottom: "2rem",
                    }}
                  ></Skeleton>
                </>
              ) : (
                dataEvent.map((eve, key) => (
                  <div key={key} className="position-relative mb-3">
                    <div className="sticky-top box-shadow-edit d-flex justify-content-between bg-white border border-top-0 px-4 py-2">
                      <div className="d-flex align-items-center">
                        <img
                          className="rounded-circle mr-2"
                          src={`${import.meta.env.VITE_API_URL_SHORT}${
                            eve.author_sc.avatar.url
                          }`}
                          width="45"
                          height="45"
                          alt=""
                        />
                        {/* <img className="rounded-circle mr-2" src={`${import.meta.env.VITE_API_URL_SHORT}${eve.img_desc1.url}`} width="25" height="25" alt=""/> */}
                        <small>{eve.author_sc.name}</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <Icon icon={"fa-regular:eye"} className="mr-1" />
                        <Typography.Text type="secondary" className="mr-2">
                          12345
                        </Typography.Text>

                        {/* <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small> */}
                        {statusButtons[statusClaps]}
                      </div>
                    </div>

                    <img
                      className=""
                      src={`${import.meta.env.VITE_API_URL_SHORT}${
                        eve.img_main.url
                      }`}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "250px",
                      }}
                    />
                    <div className="bg-white border border-top-0 p-4">
                      <div className="mb-2">
                        <a
                          className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                          aria-disabled={true}
                        >
                          {eve.event_category.name}
                        </a>
                        <a className="text-body" aria-disabled={true}>
                          <small>{formatearFecha(eve.date)}</small>
                        </a>
                      </div>
                      <Link
                        className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
                        to={"#"}
                      >
                        {eve.name}
                      </Link>
                      {artBody && (
                        <>
                          <main className=" prose lg:prose-base">
                            <BlockRendererClient content={artBody} />
                          </main>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="col-lg-4">
              {/* <!-- Social Follow Start --> */}
              <div className="mb-3">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">
                    Follow Us
                  </h4>
                </div>
                <div className="relative bg-white border border-t-0 overflow-hidden">
                  {/* Background blur layer */}
                  <div
                    className="absolute inset-0 bg-center bg-cover blur-sm z-0"
                    style={{
                      backgroundImage: `url(${imgLogo})`,
                    }}
                  ></div>

                  {/* Content layer */}
                  <div className="relative z-10 grid grid-cols-2">
                    {social.map((social) => (
                      <a
                        key={social.id}
                        href={social.link}
                        className="group flex justify-center items-center no-underline py-3 bg-slate-300/35 border border-black hover:bg-blue-600/75 transition-colors duration-300"
                      >
                        <span className="flex justify-center items-center font-medium w-full h-full transition-transform duration-900 group-hover:scale-125 text-[#000] group-hover:text-[#FFCC00]">
                          <Icon icon={social.icon} height={30} />
                        </span>
                      </a>
                    ))}
                  </div>

                  {/* <a
                    href=""
                    className="block text-white text-decoration-none py-3"
                    style={{ backgroundColor: "#fde98a" }}
                  >
                    <span
                      className="flex items-center font-weight-medium px-3"
                      style={{
                        height: "100%",
                        width: "w-fit",
                        background: "rgba(0, 0, 0, .2)",
                      }}
                    >
                      {" "}
                      <Icon
                        icon={"fa-brands:facebook"}
                        inline={true}
                        width={26}
                      />
                      @Facebook
                    </span>
                  </a> */}

                  {/*<a
                    href=""
                    className="d-block w-100 text-white text-decoration-none"
                    style={{ background: "#055570" }}
                  >
                    <i
                      className="fab fa-vimeo-v text-center py-4 mr-3"
                      style={{ width: "65px", background: "rgba(0, 0, 0, .2)" }}
                    ></i>
                    <span className="font-weight-medium">12,345 Followers</span>
                  </a> */}
                </div>
              </div>
              {/* <!-- Social Follow End --> */}

              {/* <!-- Ads Start --> */}
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
              {/* <!-- Ads End --> */}

              {/* <!-- Popular News Start --> */}
              <div className="mb-3">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">
                    Tranding
                  </h4>
                </div>
                <div className="bg-white border border-top-0 p-3"></div>
              </div>
              {/* <!-- Popular News End --> */}

              {/* <!-- Newsletter Start --> */}
              <Newsletter />
              {/* <!-- Newsletter End --> */}

              {/* <!-- Tags Start --> */}
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
              {/* <!-- Tags End --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
