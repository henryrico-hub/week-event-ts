import { Link } from "react-router-dom";
import { category } from "../data";
import { Icon } from "@iconify-icon/react";

function Footer() {
  return (
    <>
      {/* <!-- Footer Start --> */}
      <div className="footer-content container-fluid bg-dark pt-5 px-sm-3 px-md-5">
        <div className="row py-4">
          <div className="col-lg-4 col-md-6 mb-5">
            <h5 className="mb-4 text-white text-uppercase font-weight-bold">
              Get In Touch
            </h5>
            <p className="font-weight-medium">
              <Icon
                icon={"fa-solid:map-marker-alt"}
                inline={true}
                className="mr-2"
              />
              123 Street, New York, USA
            </p>
            <p className="font-weight-medium">
              <Icon
                icon={"fa-solid:phone-alt"}
                inline={true}
                className="mr-2"
              />
              +012 345 67890
            </p>
            <p className="font-weight-medium">
              <Icon icon={"fa-solid:envelope"} inline={true} className="mr-2" />
              info@example.com
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-5">
            <h5 className="mb-4 text-white text-uppercase font-weight-bold">
              Follow Us
            </h5>
            <div className="d-flex justify-content-start">
              <a
                className="btn btn-lg btn-secondary btn-lg-square mr-2"
                href="#"
              >
                <Icon icon={"fa-brands:twitter"} inline={true} height={24} />
              </a>
              <a
                className="btn btn-lg btn-secondary btn-lg-square mr-2"
                href="#"
              >
                <Icon icon={"fa-brands:facebook"} inline={true} height={24} />
              </a>
              <a
                className="btn btn-lg btn-secondary btn-lg-square mr-2"
                href="#"
              >
                <Icon icon={"fa-brands:instagram"} inline={true} height={24} />
              </a>
              <a className="btn btn-lg btn-secondary btn-lg-square" href="#">
                <Icon icon={"fa-brands:youtube"} inline={true} height={24} />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-5">
            <h5 className="mb-4 text-white text-uppercase font-weight-bold">
              Categories
            </h5>
            <div className="m-n1">
              {category.map((cat, key) => (
                <Link
                  key={key}
                  to={`/categoria/${cat.slug}`}
                  className="btn btn-sm btn-secondary m-1"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footer-credits container-fluid py-4 px-sm-3 px-md-5" style={{background: '#111111'}}>
      <p className="m-0 text-center">&copy; <a href="#">Your Site Name</a>. All Rights Reserved. 
		    Design by <a href="https://htmlcodex.com">HTML Codex</a><br/>
        Distributed by <a href="https://themewagon.com">ThemeWagon</a>
      </p>
    </div> */}
      {/* <!-- Footer End --> */}
    </>
  );
}

export default Footer;
