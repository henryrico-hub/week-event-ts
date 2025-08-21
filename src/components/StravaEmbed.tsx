import { Alert, ConfigProvider, Dropdown } from "antd";
import { useState, useEffect, useRef } from "react";
import { DownloadOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { EventType } from "src/types";

// Tipado opcional
declare global {
  interface Window {
    StravaEmbeds?: {
      process: () => void;
    };
  }
}

type Props = {
  data: EventType | undefined;
};

export default function StravaEmbedOnDemand({ data }: Props) {
  const [visible, setVisible] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      const script = document.createElement("script");
      script.src = "https://strava-embeds.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.StravaEmbeds?.process) {
          window.StravaEmbeds.process();
        }
      };
      document.body.appendChild(script);

      // Limpieza opcional si desactivas luego
      return () => {
        script.remove();
      };
    }
  }, [visible]);

  const items: MenuProps["items"] = [
    {
      label: (
        <a
          href={`https://www.strava.com/routes/${data?.stravaRoute?.data_embed_id}/export_gpx`}
        >
          Descargar GPX
        </a>
      ),
      key: "1",
      icon: <DownloadOutlined />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    // message.info('Click on menu item.');
    console.log("click", e);
  };
  const handleButtonClick = () => {
    setVisible(!visible);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    // <div
    //   style={{
    //     background: "linear-gradient(to bottom, #FFCC00 10%, #1E2024 100%)",
    //   }}
    // >
    <div className="container-md py-4">
      <div className="flex flex-col sm:flex-row md:justify-between justify-center items-center gap-2 p-3 mb-4">
        <h1 className="text-2xl uppercase">Ruta del evento</h1>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ff6600",
              colorPrimaryHover: "#cc5200",
            },
          }}
        >
          <Dropdown.Button
            type="primary"
            className="w-auto md:w-fit"
            menu={menuProps}
            placement="bottom"
            size="large"
            icon={<DownOutlined />}
            onClick={handleButtonClick}
          >
            <span className="px-20">
              {visible ? "Ocultar Ruta" : "Ver Ruta"}
            </span>
          </Dropdown.Button>
        </ConfigProvider>
      </div>
      {data?.stravaRoute && visible && (
        <>
          <Alert
            message="Este archivo GPX no puede descargarse correctamente desde móviles. Te recomendamos volver a intentarlo en una computadora para realizar la descarga."
            type="info"
            showIcon
            className="mb-4"
            closable
          />
          <div className="bg-white rounded-lg shadow-md lg:p-10 p-0">
            {/* <span>
              {`https://www.strava.com/routes/${data?.stravaRoute?.data_embed_id}/export_gpx`}
            </span> */}
            <div
              ref={embedRef}
              className="strava-embed-placeholder"
              data-embed-type="route"
              data-embed-id={data?.stravaRoute.data_embed_id}
              data-map-hash={data?.stravaRoute.data_map_hash}
              data-style="standard"
              data-full-width="true"
              data-units="metric"
              data-from-embed="false"
            />
          </div>
        </>
      )}
    </div>
  );
}
