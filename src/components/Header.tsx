"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonRunning,
  faPersonBiking,
  faPersonSwimming,
  faPersonThroughWindow,
} from "@fortawesome/free-solid-svg-icons";
import { FlipProp } from "@fortawesome/fontawesome-svg-core";
import { Trail_icon, MtbV3_icon } from "./Icons/Icons";
import { Link, NavLink } from "react-router-dom";
import { getAllEvents } from "../models/event.server";
import { EventType } from "../types";
import Selector from "./Selector";

const categories = [
  {
    name: "Carrera",
    description:
      "Mayormente plana (poco desnivel), calles, avenidas, caminos asfaltados",
    href: "/categoria/",
    url: "correr",
    icon: faPersonRunning,
    svg: "",
  },
  {
    name: "Trail Run",
    description: "Carrera con desnivel en senderos, cerros, montaña.",
    href: "/categoria/",
    url: "trail-run",
    icon: faPersonRunning,
    svg: "trail",
  },
  {
    name: "Ciclismo de Ruta",
    description: "Se caracteriza por sus largas distancias y alta velocidad",
    href: "/categoria/",
    url: "ciclismo-de-ruta",
    icon: faPersonBiking,
    svg: "",
  },
  /* { name: 'Ciclismo de Montaña (MTB)', description: 'Competición en circuitos naturales, bosques, caminos angostos con cuestas empinadas', href: '/categoria/', url:'ciclismo-de-montana', icon: faPersonRunning, svg: 'mtb' }, */
  {
    name: "Ciclismo de Montaña (MTB)",
    description:
      "Competición en circuitos naturales, bosques, caminos con cuestas ",
    href: "/categoria/",
    url: "ciclismo-de-montana",
    icon: faPersonRunning,
    svg: "mtb",
  },
  {
    name: "Triatlón",
    description:
      "Implica 3 disciplinas deportivas, natación, ciclismo y carrera a pie",
    href: "/categoria/",
    url: "triatlon",
    icon: faPersonSwimming,
    settings: "horizontal",
    svg: "",
  },
  /* { name: 'Duatlón', description: 'Deporte individual o por equipos que reúne dos disciplinas: atletismo y ciclismo', href: '/categoria/', url:'duatlon', icon: faPersonThroughWindow, svg: '' }, */
  {
    name: "Duatlón",
    description:
      "Deporte individual o por equipos, que implica ciclismo y carrera a pie",
    href: "/categoria/",
    url: "duatlon",
    icon: faPersonThroughWindow,
    svg: "",
  },
];
/* 
const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automationsd', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
] */
const callsToAction = [
  { name: "Busqueda por fecha", href: "/calendario", icon: CalendarDaysIcon },
  /* { name: 'Contact sales', href: '#', icon: PhoneIcon }, */
];

/* type optionType = {
  value: string;
  label: string;
} */

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dataE, setDataE] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getAllEvents();
        setDataE(events.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
      }
    };

    fetchData();
  }, [setDataE]);

  /* console.log(dataE); */

  return (
    <>
      <div className="container-fluid d-none d-lg-block">
        <div className="row align-items-center bg-dark px-lg-5">
          <div className="col-lg-9">
            {/* <nav className="navbar navbar-expand-sm bg-dark p-0">
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
                </nav> */}
          </div>
          <div className="col-lg-3 text-right d-none d-md-block">
            <nav className="navbar navbar-expand-sm bg-dark p-0">
              <ul className="navbar-nav ml-auto mr-n2">
                <li className="nav-item">
                  <a className="nav-link text-body" href="#">
                    <small className="fab fa-twitter"></small>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-body" href="#">
                    <small className="fab fa-facebook-f"></small>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-body" href="#">
                    <small className="fab fa-linkedin-in"></small>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-body" href="#">
                    <small className="fab fa-instagram"></small>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-body" href="#">
                    <small className="fab fa-google-plus-g"></small>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-body" href="#">
                    <small className="fab fa-youtube"></small>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <header className="bg-dark">
        <nav
          aria-label="Global"
          id="category"
          className="mx-auto flex max-w-8xl items-center justify-between px-6 py-3 lg:px-12"
        >
          <div className="flex lg:flex-1">
            {/* <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={sm} className="h-8 w-auto" />
            </a> */}
            <a href="" className="-m-1.5 p-1.5 brand-link">
              <span className="sr-only">Your Company</span>
              <h1 className="m-0 display-4 text-uppercase text-primary">
                Challenge
                <span className="text-white font-weight-normal">You</span>
              </h1>
              {/* <img alt="" src={sm} className="h-8 w-auto" /> */}
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6 text-gray-300" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12 ml-10">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-slate-100">
                Categoria
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-300"
                />
              </PopoverButton>

              {/* Panel */}
              <PopoverPanel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-3">
                  {categories.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-100"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        {/* <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-orange-500" /> */}
                        {item.svg === "" ? (
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="h-6 w-6 text-gray-600 group-hover:text-orange-500"
                            flip={item.settings as FlipProp}
                          />
                        ) : item.svg === "trail" ? (
                          <Trail_icon className="fill-current h-7 w-7 text-gray-600 group-hover:text-orange-500" />
                        ) : item.svg === "mtb" ? (
                          <MtbV3_icon className="fill-current h-8 w-8 text-gray-600 group-hover:text-orange-500" />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="flex-auto">
                        <PopoverButton
                          as={NavLink}
                          to="/calendario"
                        ></PopoverButton>
                        <NavLink
                          to={item.href + item.url}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </NavLink>
                        <p className=" text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50"> */}
                <div className="grid divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-gray-400"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <NavLink
              to={"/"}
              className="text-sm font-semibold leading-6 text-slate-100"
            >
              Home
            </NavLink>

            <NavLink
              to={`/calendario`}
              className="text-sm font-semibold leading-6 text-slate-100"
            >
              Calendario
            </NavLink>
            <NavLink
              to={"/maps"}
              className="text-sm font-semibold leading-6 text-slate-100"
            >
              Maps
            </NavLink>
            {/* <NavLink
              to={"/comunidad"}
              className="text-sm font-semibold leading-6 text-slate-100"
            >
              Community
            </NavLink> */}
            {/* <NavLink to={"/payment"} className="text-sm font-semibold leading-6 text-slate-100">
              Payment
            </NavLink> */}
          </PopoverGroup>
          <div className="w-48 hidden lg:flex lg:flex-1 lg:justify-end">
            <Selector
              dataE={dataE}
              setMobileMenuOpen={setMobileMenuOpen}
              style={"w-10/12"}
              type_props="Evento"
            />
            {/* <a href="#" className="text-sm font-semibold leading-6 text-slate-100">
              Log in <span aria-hidden="true">&rarr;</span>
            </a> */}
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="dialog-nav lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-dark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              {/* <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a> */}
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="navbar-brand d-block d-lg-none"
              >
                <h1 className="m-0 display-4 text-uppercase text-primary">
                  Challenge
                  <span className="text-white font-weight-normal">You</span>
                </h1>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-gray-300"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-4 pl-3 pr-3.5 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-700">
                      <Selector
                        dataE={dataE}
                        setMobileMenuOpen={setMobileMenuOpen}
                        style={"w-full"}
                        type_props="Evento"
                      />
                    </DisclosureButton>
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-700">
                      Categorias
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2 transition-all duration-300 ease-in-out transform">
                      {[...categories].map((item, key) => (
                        <DisclosureButton
                          as={NavLink}
                          key={key}
                          to={item.href + item.url}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg py-2 pl-8 pr-3 text-sm font-semibold leading-7 text-slate-100 hover:bg-gray-700"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <NavLink
                    to={"/"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/calendario"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-700"
                  >
                    Calendario
                  </NavLink>
                  <NavLink
                    to={"/comunidad"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Comunidad
                  </NavLink>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-700"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}
