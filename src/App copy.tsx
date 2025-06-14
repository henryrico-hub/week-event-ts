import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./components/Home";
import "./assets/css/style.css";
import CategoryPage from "./components/CategoryPage";
import SingleEvent from "./components/SingleEvent";
// import { scrollToTop } from "./utils/scrollToTop";
// import FilterCalendar from "./components/Calendar/FilterCalendar";
import CommunityPage from "./components/CommunityPage";
import SinglePost from "./components/SinglePost";
import ErrorBoundary from "./components/ErrorPage";
import Payment from "./components/payment";
import CalendarVision from "./components/Calendar/CalendarVision";
import StatesSlide from "./components/slick-carousel/StatesSlide";
import PreRegistro from "./components/Forms/PreRegistro";

function App() {
  const categories = [
    { name: "Carrera", url: "correr" },
    { name: "Trail Run", url: "trail-run" },
    { name: "Ciclismo de Ruta", url: "ciclismo-de-ruta" },
    { name: "Ciclismo de Montaña (MTB)", url: "ciclismo-de-montana" },
    { name: "Triatlón", url: "triatlon" },
    { name: "Duatlón", url: "duatlon" },
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/evento/:url" element={<SingleEvent />}></Route>
            <Route path="/calendario/" element={<CalendarVision />}></Route>

            <Route path="/comunidad/" element={<CommunityPage />}></Route>
            <Route path="/maps/" element={<StatesSlide />}></Route>
            <Route path="/form/:id" element={<PreRegistro />}></Route>
            <Route path="/comunidad/post/:url" element={<SinglePost />}></Route>
            <Route path="/payment/" element={<Payment />}></Route>

            <Route
              path="/categoria/:category_url"
              element={<CategoryPage categories={categories} />}
            ></Route>
            <Route path="*" element={<ErrorBoundary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
