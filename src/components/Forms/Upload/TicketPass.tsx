// BoardingPass.tsx
import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { EventType, Participant } from "src/types";
import { formatearMesDiaHora, formatearPrice } from "src/utils/helpers";
// import Barcode from "./BarCode";
import { Button } from "antd";
import { Icon } from "@iconify-icon/react";
import QRCodeSvgDownload from "./QrCode";

interface BoardingPassProps {
  data: EventType;
  id: string;
  dataParticipant: Participant;
}

export const TicketPass = ({ data, dataParticipant }: BoardingPassProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setLoading(true);
    try {
      if (ref.current === null) return;

      const dataUrl = await toPng(ref.current);
      const link = document.createElement("a");
      link.download = `${
        data.name.slice(0, 6).toLocaleUpperCase() +
        "-" +
        dataParticipant?.paternalSurname?.toLocaleUpperCase()
      }.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error al generar la imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BOTÓN DE DESCARGA */}
      <div className="text-center mb-4">
        <Button
          loading={loading}
          onClick={handleDownload}
          size="large"
          type="primary"
          icon={<Icon icon={"material-symbols:download"} inline={true} />}
          style={{
            backgroundColor: "#FFCC00",
            borderColor: "#FFCC00",
            color: "#222",
          }}
          className="hover:!bg-yellow-300 hover:!border-yellow-400 hover:!text-black"
        >
          Descargar
        </Button>
      </div>
      <div
        ref={ref}
        className="flex flex-col lg:flex-row lg:w-full w-72 border-2 border-gray-300 rounded-xl shadow-2xl overflow-hidden"
        style={{
          backgroundImage: data.img_desc1?.url
            ? data.main_color
              ? `linear-gradient(${data.main_color}8f, #15a4ae8e), url(${
                  import.meta.env.VITE_API_URL_SHORT
                }${data.img_main?.url})`
              : `linear-gradient(#6bc8288f, #15a4ae9e), url(${
                  import.meta.env.VITE_API_URL_SHORT
                }${data.img_main?.url})`
            : data.main_color
            ? `linear-gradient(${data.main_color}3e, ${
                data.main_color
              }9f), url(${import.meta.env.VITE_API_URL_SHORT}${
                data.img_desc1?.url
              })`
            : `linear-gradient(#6bc8288f, #15a4ae9e), url(${
                import.meta.env.VITE_API_URL_SHORT
              }${data.img_desc1?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Elemento 1 */}
        <div className="flex-1 bg-gray-200 relative lg:w-full md:w-72 text-left p-3 gap-1 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-200">
          <p className="text-black text-uppercase text-xs font-bold py-2">
            {data?.category.name}
          </p>
          <p className="name-resume text-black text-uppercase text-4xl font-bold mr-6 py-1">
            {data?.name}
          </p>
          <p className="text-black text-uppercase text-lg text-center font-bold border-2 rounded-lg border-gray-950 mt-2">
            {formatearMesDiaHora(data?.date_event)}
          </p>
          <div className="grid grid-cols-2 gap-2 py-2">
            <p className="text-black text-uppercase text-center content-center text-sm font-bold border-2 rounded-lg border-gray-950 p-1 ">
              ${formatearPrice(data?.price)}
            </p>
            <p
              className="text-black text-uppercase text-center content-center font-bold border-2 rounded-lg border-gray-950 p-1 "
              style={{ fontSize: "10px" }}
            >
              {data?.state.name + " " + data?.city_state}
            </p>
          </div>
        </div>

        {/* Elemento 2 */}
        <div className="w-full lg:w-2/3 space-y-2 p-10 flex-1">
          <QRCodeSvgDownload
            value="https://spiritc.netlify.app/"
            // icon={imgLogo}
            size={100}
            color={"#FFFFFF"}
            bgColor={`${data?.main_color}6e`}
          />
        </div>

        {/* Elemento 3 */}
        <div className="w-full lg:w-1/3 h-auto border-t-4 lg:border-t-0 lg:border-l-4 border-dashed border-gray-100 space-y-2 p-4">
          <div className="flex flex-col justify-evenly items-center bg-white p-2 h-full rounded-lg gap-1 lg:gap-0">
            <p className="name-resume p-2 text-black lg:text-justify text-uppercase text-md font-bold lg:underline">
              {dataParticipant.name + " " + dataParticipant.paternalSurname}
            </p>
            <div className="flex flex-col justify-around items-center w-full gap-2 ">
              <p className="name-resume flex flex-col text-center text-black text-lg font-bold rounded-lg bg-gray-200 w-full">
                <span className="underline">Categoria</span>
                {dataParticipant.categoryP}
              </p>
            </div>
            <div className="flex flex-row justify-around items-center w-full gap-2 ">
              <p className="name-resume flex flex-row justify-evenly text-black text-uppercase text-lg font-bold rounded-lg bg-gray-200 w-full p-2">
                <span
                  className="underline font-extrabold"
                  style={{ color: `${data?.main_color}` }}
                >
                  #
                </span>
                {dataParticipant.participantNumber
                  ? dataParticipant.participantNumber
                      .toString()
                      .padStart(4, "0")
                  : ""}
              </p>
              <p className="name-resume flex flex-row justify-evenly text-black text-uppercase text-lg font-bold rounded-lg bg-gray-200 w-full p-2">
                <Icon
                  icon={"flowbite:t-shirt-solid"}
                  width={28}
                  inline={true}
                  style={{ color: `${data?.main_color}` }}
                />
                {dataParticipant?.size}
              </p>
            </div>

            {/* <Barcode value={dataParticipant?.documentId?.slice(0, 8)} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
