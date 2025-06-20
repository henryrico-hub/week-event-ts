// import { CloseCircleTwoTone } from "@ant-design/icons";
import { useState } from "react";
import {
  // Form,
  // Button,
  Typography,
  Row,
  Col,
  Collapse,
  Tooltip,
  Alert,
  Image,
  Divider,
  // notification,
} from "antd";
// import { getParticipant } from "../../models/event.server";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "src/components/BlockRendererClient";
import type { CollapseProps } from "antd";
import { EventType } from "src/types";
import { Icon } from "@iconify-icon/react";
// import ImageUpload from "src/components/Forms/Upload/ImageUpload";
import { formatearFechalg } from "src/utils/helpers";
import ImageUploadBack from "./Upload/ImageUploadBack";

// interface SubmitButtonProps {
//   form: FormInstance;
// }
// type NotificationPlacement = NotificationArgsProps["placement"];

type Step2Props = {
  id: string;
  data: EventType;
  urlEvent: string;
  dataP: any;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
`;

export default function Step2({
  id,
  data,
  dataP,
  urlEvent,
  setUpdateData,
}: Step2Props) {
  const [tranferPaymentData] = useState<BlocksContent>(data?.transfer_payment);
  const [digitalPaymentData] = useState<BlocksContent>(data?.digital_payment);
  // const [loading, setLoading] = useState(false);
  // const [partId, setPartId] = useState<string>();

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchParticipant = async () => {
  //     try {
  //       if (!id) {
  //         return;
  //       }
  //       const response = await getParticipant(id);
  //       setPartId(response.data[0].documentId);

  //     } catch (error) {
  //       console.error("Error fetching events:", error);

  //     } finally {
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     }
  //   };
  //   fetchParticipant();
  // }, [id]);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Transferencia interbancaria",
      children: (
        <>
          {tranferPaymentData && (
            <main className="prose lg:prose-base">
              <BlockRendererClient content={tranferPaymentData} />
            </main>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Tienda de Auto Servicio / Oxxo / 7 Eleven",
      children: (
        <>
          {digitalPaymentData && (
            <main className="prose lg:prose-base">
              <BlockRendererClient content={digitalPaymentData} />
            </main>
          )}
        </>
      ),
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];

  return (
    <>
      {/* {contextHolder} */}

      <div className="md:py-5 lg:py-10 lg:px-10 flex justify-center">
        <>
          {/* Formulario */}
          <div
            className="md:p-10 md:py-6 px-4 py-6 rounded-lg shadow-large "
            style={{ backgroundColor: "white", width: "100%" }}
          >
            <Col id="check">
              {dataP && dataP.payment && (
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <Alert
                    message={
                      <Tooltip title="Para conocer el estado de tu registro, ve a la sección 'Check Inscripción'.">
                        Ya has cargado un comprobante y está en revisión (Tiempo
                        aprox. 24hrs). Puedes cargar otro para reemplazarlo si
                        es necesario.
                      </Tooltip>
                    }
                    type="info"
                    showIcon
                  />

                  <Image
                    src={`${import.meta.env.VITE_API_URL_SHORT}${
                      dataP.payment[0].url
                    }`}
                    style={{
                      maxWidth: "250px",
                      border: " npx dashed #28a745",
                      boxShadow: "5px 5px 10px rgba(0,0,0,0.4)",
                    }}
                    placeholder={
                      <Image
                        preview={false}
                        src={`${import.meta.env.VITE_API_URL_SHORT}${
                          dataP.payment[0].url
                        }`}
                      />
                    }
                  />
                  <Typography.Text>
                    Fecha de carga: {formatearFechalg(dataP.createdAt)}
                  </Typography.Text>

                  <Divider />
                </Col>
              )}
              <Typography.Title level={3} style={{ textAlign: "center" }}>
                <Tooltip title="$Name porporciona información de para realizar el pago para tu inscripción. No se realizan pagos en línea a través de ella. Podrá subir su comprobante de pago en una imagen o captura de pantalla del depósito en esta seccion.">
                  Informacion de pago
                  <Icon
                    icon={"material-symbols:shield-question"}
                    className="px-2"
                    inline={true}
                  />
                </Tooltip>
              </Typography.Title>
              <Typography.Title
                level={3}
                className="border-1 bg-orange-100 border-orange-200 rounded-lg m-0"
                style={{ textAlign: "center" }}
              >
                {data.name}
              </Typography.Title>
            </Col>
            <Row>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                // lg={{ span: 24 }}
              >
                <Collapse
                  items={items}
                  accordion
                  defaultActiveKey={["1"]}
                  style={{
                    width: "100%",
                  }}
                />
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                // lg={{ span: 24 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  textAlign: "center",
                  alignContent: "center",
                  padding: "2rem",
                  border: "3px dashed black",
                  // minWidth: "350px",
                }}
              >
                <Typography.Title level={4}>ID de Registro</Typography.Title>
                {/* <Typography.Title
                  level={1}
                  style={{ textDecoration: "underline" }}
                >
                  {id}
                </Typography.Title> */}
                <Typography.Title
                  level={2}
                  className="flex justify-center underline mt-3"
                >
                  {id}
                  <Typography.Paragraph
                    className="p-1"
                    copyable={{ text: id }}
                  ></Typography.Paragraph>
                </Typography.Title>
                <Typography>{data.url}</Typography>

                <ImageUploadBack
                  partId={id}
                  data={data}
                  urlEvent={urlEvent}
                  setUpdateData={setUpdateData}
                />
              </Col>
            </Row>
          </div>
        </>
      </div>
    </>
  );
}
