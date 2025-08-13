"use client";

// type Props = {
//   setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
//   collapsed: boolean;
// };

export default function Header() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-dark">
        <nav
          aria-label="Global"
          id="category"
          className="mx-auto flex max-w-8xl items-center justify-between px-6 py-3 lg:px-6"
        >
          <div className="flex lg:flex-1">
            {/* <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={sm} className="h-8 w-auto" />
            </a> */}
            <a href="/services" className="-m-1.5 p-1.5 brand-link">
              <span className="sr-only">Your Company</span>
              <h1 className="m-0 text-xl text-uppercase text-primary">
                Challenge
                <span className="text-white font-weight-normal">You</span>
                <span className="text-white text-sm font-weight-normal ml-1">
                  Services
                </span>
              </h1>
              {/* <img alt="" src={sm} className="h-8 w-auto" /> */}
            </a>
          </div>

          {/* <PopoverGroup className="hidden lg:flex lg:gap-x-12 ml-10 items-center ">
            <NavLink
              to={"/admin/myEvents"}
              className="text-sm font-semibold leading-6 text-slate-100"
            >
              Mis Eventos
            </NavLink>
          </PopoverGroup> */}
        </nav>
      </header>
    </>
  );
}
