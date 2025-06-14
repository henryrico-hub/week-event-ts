"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  // Popover,
  // PopoverButton,
  PopoverGroup,
  // PopoverPanel,
} from "@headlessui/react";
import { Icon } from "@iconify-icon/react";
import { Link, NavLink } from "react-router-dom";
import AppHeader from "./AdminHeader";
import { useAuthContext } from "src/context/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useAuthContext();
  // const [dataE, setDataE] = useState<EventType[]>([]);

  return (
    <>
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
            <a href="/admin" className="-m-1.5 p-1.5 brand-link">
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
              {/* <Bars3Icon aria-hidden="true" className="h-6 w-6 text-gray-300" /> */}
              <Icon
                aria-hidden="true"
                icon={"heroicons:bars-3-16-solid"}
                className="text-gray-300 hover:"
                height={"28"}
                width={"28"}
              />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12 ml-10 items-center ">
            {user ? (
              <NavLink
                to={"/admin/myEvents"}
                className="text-sm font-semibold leading-6 text-slate-100"
              >
                Mis Eventos
              </NavLink>
            ) : null}

            <AppHeader user={user} setUser={setUser} />
          </PopoverGroup>
        </nav>

        {/* Mobile */}
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
                {/* <XMarkIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-gray-300"
                /> */}
                <Icon
                  icon="heroicons:x-mark"
                  aria-hidden="true"
                  className="text-gray-300 hover:text-gray-400"
                  width="32"
                  height="32"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-700">
                      Categorias
                      <Icon
                        icon={"heroicons:chevron-down"}
                        aria-hidden="true"
                        className="flex-none group-data-[open]:rotate-180"
                        width="20"
                        height="20"
                      />
                    </DisclosureButton>
                    {/* <DisclosurePanel className="mt-2 space-y-2 transition-all duration-300 ease-in-out transform">
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
                    </DisclosurePanel> */}
                  </Disclosure>
                  <NavLink
                    to={"/"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/comunidad"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
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
