import { ConfigProvider } from "antd";
import { EventType } from "src/types";
import { formatearPrice } from "src/utils/helpers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type FixedButtonProps = {
  data?: EventType;
  url: string;
};

function FixedButton({ data, url }: FixedButtonProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/form/${url}`);
  };

  useEffect(() => {
    const stickyEl = document.querySelector(".sticky-bottom");
    const scrollThreshold = 300; // píxeles de scroll para mostrar

    const handleScroll = () => {
      if (window.scrollY >= scrollThreshold) {
        stickyEl?.classList.add("show");
      } else {
        stickyEl?.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Montserrat", sans-serif',
        },
        components: {
          Button: {
            // success background color;
            // defaultBg: "#28a745",
            defaultColor: "#FFF",
            defaultBg: "#673AB7",
            defaultHoverBg: "#FFCC00",
            defaultHoverColor: "#000",

            //  bg-[#673AB7]/70 text-gray-100 hover:bg-[#FFCC00]/90
          },
        },
      }}
    >
      {/* Sticky Buttom */}
      <div className="sticky-bottom bg-[#fff] ring ring-gray-300">
        <div className="flex w-full h-16 p-2 border-rounded-lg">
          {/* <Button
            block
            size="large"
            className="w-full h-full text-xl "
            
            icon={<Icon icon={"fa6-solid:user-pen"} aria-hidden="true" />}
          >
            Registrate Ahora
          </Button> */}
          <button
            onClick={handleNavigate}
            type="button"
            className="w-full rounded-lg px-3 py-2 text-sm hover:text-base font-bold sm:w-auto bg-[#673AB7] text-gray-100 hover:bg-[#FFCC00]/90 hover:text-black transition-all duration-300"
          >
            Registrate Ahora
          </button>
          {data && data.price && (
            <div className="flex flex-col px-6">
              <span className="font-medium">Ahora: </span>
              <span className="font-semibold text-black/70">{`$${formatearPrice(
                data.price
              )}`}</span>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default FixedButton;
