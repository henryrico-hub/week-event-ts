import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Category, EventType } from "../types";
import { getEventsParams } from "../models/event.server";
import adds_img from "../assets/images/ads-728x90.png";

import CardEvent from "./CardEvent";
type paramsCateProps = {
  category_url: string;
};
type categoriesProps = {
  categories: Category[];
};

export default function CategoryPage({ categories }: categoriesProps) {
  const params = useParams<paramsCateProps>();
  const { category_url } = params;
  const currentCat = categories.find((cat) => cat.url === category_url);

  const [data, setData] = useState<EventType[]>([]); // Initialize state with an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!category_url) {
          throw new Error("category_url is required");
        }
        const url = `/events?filters[category][slug][$eq]=${category_url}&[populate][category][fields][0]=name&[populate][img_main][fields][0]=url&populate[author_sc][populate][0]=avatar&populate[state][fields]*`;
        const events = await getEventsParams(url);
        setData(events.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    setCurrentPage(1);
    fetchData();
  }, [category_url]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = data.slice(indexOfFirstPost, indexOfLastPost);

  const flag_category = document.querySelector("#category");

  const handlePagination = (pageNumber: number) => {
    flag_category?.scrollIntoView({ behavior: "smooth" });
    setCurrentPage(pageNumber);
  };
  const handleNextPAge = () => {
    flag_category?.scrollIntoView({ behavior: "smooth" });
    setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    flag_category?.scrollIntoView({ behavior: "smooth" });
    setCurrentPage(currentPage - 1);
  };

  const paginationNumber = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    paginationNumber.push(i);
  }

  return (
    <>
      {/*  News With Sidebar Start */}
      <div className="container-fluid mt-5 pt-3 mb-5">
        <div className="container-md">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h4 className="m-0 text-uppercase font-weight-bold">{`Category: ${currentCat?.name}`}</h4>
                    <ul className="pagination justify-content-center">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled cursor-not-allowed" : ""
                        }`}
                      >
                        <button onClick={handlePrevPage} className="page-link">
                          Previous
                        </button>
                      </li>
                      <li className="p-2">{`${currentPage}`}</li>
                      <li
                        className={`page-item ${
                          currentPage === paginationNumber.length ||
                          paginationNumber.length === 0
                            ? "disabled cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <button onClick={handleNextPAge} className="page-link">
                          Next
                        </button>
                      </li>
                    </ul>
                    {/* <a className="text-secondary font-weight-medium text-decoration-none" href="">View All</a> */}
                  </div>
                </div>
                {currentItems.map((eve) => (
                  <CardEvent eve={eve} colSpan={4} />
                  // <div key={key} className="col-lg-4">
                  //   <div className="position-relative mb-3">
                  //     { eve.img_main ?
                  //       <img className="img-fluid w-100" src={`${import.meta.env.VITE_API_URL_SHORT}${eve.img_main.url}`} style={{objectFit: 'cover', height:' 250px'}}/>
                  //       :
                  //       <img className="img-fluid w-100" src={logosm} style={{objectFit: 'cover'}}/>
                  //     }
                  //     <div className="bg-white border border-top-0 p-4">
                  //       <div className="mb-2">
                  //         <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                  //             href="">{eve.category.name}</a>
                  //         <a className="text-body" href=""><small>{formatearFecha(eve.date_event)}</small></a>
                  //       </div>
                  //       <Link className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" to={`/evento/${eve.url}`}>{eve.name}</Link>
                  //       <p className="descript-resume m-0">{eve.description1}</p>
                  //     </div>
                  //     <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                  //       <div className="d-flex align-items-center">
                  //         <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>

                  //         <small>{eve.author_desc}</small>
                  //       </div>
                  //       <div className="d-flex align-items-center">
                  //         <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                  //         <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
                ))}

                <div className="col-lg-12 mb-3">
                  <a href="">
                    <img className="img-fluid w-100" src={adds_img} alt="" />
                  </a>
                </div>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled cursor-not-allowed" : ""
                    }`}
                  >
                    <button onClick={handlePrevPage} className="page-link">
                      Previous
                    </button>
                  </li>
                  {currentPage === 1 && 2
                    ? paginationNumber.slice(0, currentPage + 3).map((data) => (
                        <li
                          key={data}
                          onClick={() => handlePagination(data)}
                          className={`page-item ${
                            currentPage === data ? "active" : ""
                          }`}
                        >
                          <a className="page-link cursor-pointer">{data}</a>
                        </li>
                      ))
                    : paginationNumber
                        .slice(currentPage - 2, currentPage + 2)
                        .map((data) => (
                          <li
                            key={data}
                            onClick={() => handlePagination(data)}
                            className={`page-item ${
                              currentPage === data ? "active" : ""
                            }`}
                          >
                            <a className="page-link cursor-pointer">{data}</a>
                          </li>
                        ))}
                  <li
                    className={`page-item ${
                      currentPage === paginationNumber.length ||
                      paginationNumber.length === 0
                        ? "disabled cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <button onClick={handleNextPAge} className="page-link">
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* News With Sidebar End */}
    </>
  );
}
