import OwlMain from "./OwlMain";
import OwlBreakingNews from "./OwlBreakingNews";
/* import ads_img from '../assets/images/ads-728x90.png' */
import OwlFeaturedNews from "./OwlFeaturedNews";
import ContentSideBar from "./ContentSideBar";

export default function Home() {
  return (
    <div className="mb-5">
      {/* <!-- Topbar Start --> */}
      {/* <div className="container-fluid d-none d-lg-block">
        <div className="row align-items-center bg-dark px-lg-5">
            <div className="col-lg-9">
                <nav className="navbar navbar-expand-sm bg-dark p-0">
                    <ul className="navbar-nav ml-n2">
                        <li className="nav-item border-right border-secondary">
                            <a className="nav-link text-body small" href="#">Monday, January 1, 2045</a>
                        </li>
                        <li className="nav-item border-right border-secondary">
                            <a className="nav-link text-body small" href="#">Advertise</a>
                        </li>
                        <li className="nav-item border-right border-secondary">
                            <a className="nav-link text-body small" href="#">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-body small" href="#">Login</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="col-lg-3 text-right d-none d-md-block">
                <nav className="navbar navbar-expand-sm bg-dark p-0">
                    <ul className="navbar-nav ml-auto mr-n2">
                        <li className="nav-item">
                            <a className="nav-link text-body" href="#"><small className="fab fa-twitter"></small></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-body" href="#"><small className="fab fa-facebook-f"></small></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-body" href="#"><small className="fab fa-linkedin-in"></small></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-body" href="#"><small className="fab fa-instagram"></small></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-body" href="#"><small className="fab fa-google-plus-g"></small></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-body" href="#"><small className="fab fa-youtube"></small></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div className="row align-items-center bg-white py-3 px-lg-5">
            <div className="col-lg-4">
                <a href="" className="navbar-brand p-0 d-none d-lg-block">
                    <h1 className="m-0 display-4 text-uppercase text-primary">Biz<span className="text-secondary font-weight-normal">News</span></h1>
                </a>
            </div>
            <div className="col-lg-8 text-center text-lg-right">
                <a href="https://htmlcodex.com"><img className="img-fluid" src={ads_img} alt=""/></a>
            </div>
        </div>
    </div> */}
      {/* <!-- Topbar End --> */}

      {/* <!-- Navbar Start --> */}
      {/* <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2 py-lg-0 px-lg-5">
            <a href="" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 display-4 text-uppercase text-primary">Biz<span className="text-white font-weight-normal">News</span></h1>
            </a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between px-0 px-lg-3" id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                    <a href="" className="nav-item nav-link active">Home</a>
                    <a href="category.html" className="nav-item nav-link">Category</a>
                    <a href="single.html" className="nav-item nav-link">Single News</a>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Dropdown</a>
                        <div className="dropdown-menu rounded-0 m-0">
                            <a href="#" className="dropdown-item">Menu item 1</a>
                            <a href="#" className="dropdown-item">Menu item 2</a>
                            <a href="#" className="dropdown-item">Menu item 3</a>
                        </div>
                    </div>
                    <a href="contact.html" className="nav-item nav-link">Contact</a>
                </div>
                <div className="input-group ml-auto d-none d-lg-flex" style={{ width: '100%', maxWidth: '300px'}} >
                    <input type="text" className="form-control border-0" placeholder="Keyword"/>
                    <div className="input-group-append">
                        <button className="input-group-text bg-primary text-dark border-0 px-3"><i className="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
        </nav>
    </div> */}
      {/* <!-- Navbar End --> */}

      {/* <!-- Main News Slider Start --> */}

      <OwlMain />

      {/* <!-- Main News Slider End --> */}

      {/* <!-- Breaking News Start --> */}

      <OwlBreakingNews />

      {/* <!-- Breaking News End --> */}

      {/* <!-- Featured News Slider Start --> */}

      <OwlFeaturedNews />

      {/* <!-- Featured News Slider End --> */}

      <ContentSideBar />

      {/* <ClientsSection /> */}
    </div>
  );
}
