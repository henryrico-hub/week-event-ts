import { Button, ConfigProvider } from "antd";
import { EventType } from "src/types";
import { formatearPrice } from "src/utils/helpers";
import { useEffect } from "react";

type FixedButtonProps = {
  data?: EventType;
};

function FixedButton({ data }: FixedButtonProps) {
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
            // defaultColor: "#FFFFFF",
            defaultBg: "#FFCC00",
          },
        },
      }}
    >
      {/* Sticky Buttom */}
      <div className="sticky-bottom">
        <div className="flex w-full h-16 p-2 border-rounded-lg">
          <Button
            block
            size="large"
            className="w-full h-full text-xl font-semibold uppercase"
            // icon={<Icon icon={"fa6-solid:user-pen"} aria-hidden="true" />}
          >
            Inscribirse
          </Button>
          {data && data.price && (
            <div className="flex flex-col px-6">
              <span className="font-medium">Ahora: </span>
              <span className="font-bold">{`${formatearPrice(
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
