import {
  // BrowserRouter,
  // Routes,
  // Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./components/Home";
import "./assets/css/style.css";
import CategoryPage from "./components/CategoryPage";
import SingleEvent from "./components/SingleEventCopy";
import CommunityPage from "./components/CommunityPage";
import SinglePost from "./components/SinglePost";
import ErrorBoundary from "./components/ErrorPage";
import Payment from "./components/payment";
import CalendarVision from "./components/Calendar/CalendarVision";
import StatesSlide from "./components/slick-carousel/StatesSlide";
import PreRegistro from "./components/Forms/PreRegistro";
import SignUp from "./components/Login/SignUp";
import SignIn from "./components/Login/SignIn";
import Profile from "src/components/Admin/Perfil";
import AdminLayout from "./components/Layout/AdminLayout";
import EventsCards from "./components/Admin/EventsCards";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import PublicRoute from "./components/Login/PublicRoute";
import ParticipantsPage from "./components/Admin/ParticipantsPage";

const categories = [
  { name: "Carrera", url: "correr" },
  { name: "Trail Run", url: "trail-run" },
  { name: "Ciclismo de Ruta", url: "ciclismo-de-ruta" },
  { name: "Ciclismo de Montaña (MTB)", url: "ciclismo-de-montana" },
  { name: "Triatlón", url: "triatlon" },
  { name: "Duatlón", url: "duatlon" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "evento/:url", element: <SingleEvent /> },
      { path: "calendario/", element: <CalendarVision /> },
      { path: "comunidad/", element: <CommunityPage /> },
      { path: "maps/", element: <StatesSlide /> },
      { path: "form/:id/:idPart?", element: <PreRegistro /> },
      { path: "comunidad/post/:url", element: <SinglePost /> },
      { path: "payment/", element: <Payment /> },
      {
        path: "categoria/:category_url",
        element: <CategoryPage categories={categories} />,
      },
      { path: "*", element: <ErrorBoundary /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <EventsCards />
          </ProtectedRoute>
        ),
      },
      {
        path: "signin",
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        path: "myEvents",
        element: (
          <ProtectedRoute>
            <EventsCards />
          </ProtectedRoute>
        ),
      },
      {
        path: "myEvents/:url",
        element: (
          <ProtectedRoute>
            <ParticipantsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      {/* <Wrapper> */}
      <RouterProvider router={router} />
      {/* </Wrapper> */}
    </>
  );
}

export default App;
