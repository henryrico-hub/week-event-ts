import { ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import { Steps, Watermark, theme } from "antd";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useParams } from "react-router-dom";
import { EventType, Participant } from "src/types";
import { getParticipant, getSingleEventForm } from "src/models/event.server";
import { Icon } from "@iconify-icon/react";

// type paramsEventProps = {
//   id: string;
//   statusP?: number;
//   idPart?: string;
// };

export default function PreRegistro() {
  // const location = useLocation();
  // const step = location.state?.step;
  // const media = location.state?.media;

  const { id, idPart } = useParams();
  const { token } = theme.useToken();

  const [current, setCurrent] = useState(0);
  // const [current, setCurrent] = useState(step ? step : 0);
  const [items, setItems] = useState<
    { id: number; title: string; description: string }[]
  >([]);
  const [, setLoading] = useState<boolean>(false);
  const [dataEvent, setDataEvent] = useState<EventType>();
  const [dataParticipant, setDataParticipant] = useState<Participant>();
  const [registerId, setRegisterId] = useState<string>(idPart ? idPart : "");
  const [updateData, setUpdateData] = useState<boolean>(false);
  const [urlEvent] = useState<string>(id ? id : "");

  useEffect(() => {
    const fetchDataE = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error("idEvent is required");
        }
        const events = await getSingleEventForm(id);
        setDataEvent(events.data[0]);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchDataE();
    const savedStep = localStorage.getItem("formStep");
    if (savedStep) {
      if (savedStep === "pending") {
        setCurrent(1);
      } else {
        setCurrent(2);
      }
      // setCurrent(Number(savedStep));
    } else {
      setCurrent(0); // o lo que consideres el paso por defecto
    }
    setTimeout(() => {
      localStorage.removeItem("formStep"); // Limpia después de usar
    }, 2000);
  }, [id]);

  useEffect(() => {
    const fetchDataParticipant = async () => {
      if (!registerId || registerId === "") {
        return;
      }
      setLoading(true);

      try {
        if (!id) {
          throw new Error("category_id is required");
        }
        const participant = await getParticipant(registerId);
        const formattedData: Participant = {
          ...participant.data[0],
          paternalSurname: participant.data[0].paternal_surname,
          maternalSurname: participant.data[0].maternal_surname,
          participantNumber: participant.data[0].participant_number,
        };
        // console.log("formattedData", formattedData);

        setDataParticipant(formattedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchDataParticipant();
  }, [updateData, id, registerId]);

  const next = () => {
    setCurrent(current + 1);
  };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  const steps = [
    {
      id: 0,
      title: "Pre-registro",
      description: "Completa el formulario para iniciar el proceso.",
      subTitle: "subtitle",
      content: dataEvent && (
        <Step1
          next={next}
          setRegisterId={setRegisterId}
          data={dataEvent}
          setDataParticipant={setDataParticipant}
        />
      ),
    },
    {
      id: 1,
      title: "Confirmación",
      subTitle: "subtitle",
      description: "Realiza el pago y manda tu comprobante.",
      content: dataEvent && dataParticipant && (
        <Step2
          id={registerId}
          urlEvent={urlEvent}
          data={dataEvent}
          dataP={dataParticipant}
          setUpdateData={setUpdateData}
          // media={media}
        />
      ),
    },
    {
      id: 2,
      title: "Finalizado",
      subTitle: "subtitle",
      description: "¡Has completado el registro!",
      content: dataEvent && dataParticipant && (
        <Step3
          id={registerId}
          data={dataEvent}
          dataParticipant={dataParticipant}
          setUpdateData={setUpdateData}
        />
      ),
    },
    {
      id: 3,
      title: "Sigue nuestras redes sociales",
      subTitle: "",
      description: "",
      content: "Last-content",
      icon: <Icon icon={"nimbus:gift-box"} inline={true} />,
      // icon: <Icon icon={"icomoon-free:gift"} />,
    },
  ];

  useEffect(() => {
    const itemsV = steps.map((item) => ({
      id: item.id,
      title: item.id === 3 ? (current === 3 ? item.title : "") : item.title,
      description: current === item.id ? item.description : "",
      // subTitle: item.subTitle,
      icon: item.icon,
    }));
    setItems(itemsV);
  }, [current]);

  const contentStyle: React.CSSProperties = {
    lineHeight: "",
    // textAlign: "center",
    color: token.colorBgBlur,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 0,
    padding: 16,
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Steps: {
              iconFontSize: 16, // icon
              iconSize: 38, //container

              customIconSize: 12,
              customIconFontSize: 38,
              dotCurrentSize: 24,
              // colorIcon: "#FFFF",
              // stepsIconColorProgress: "#1890ff", // active step
              // stepsIconColorFinish: "#52c41a", // finished step
            },
          },
        }}
      >
        <div className="container-fluid mb-5">
          <div className="container-md">
            <Steps
              current={current}
              items={items}
              className="py-5 px-4"
              // style={{
              //   paddingTop: "3rem",
              //   paddingBottom: "3rem",
              //   paddingLeft: "1rem",
              //   paddingRight: "1rem",
              // }}
            />

            {/* <div style={{ marginTop: 24 }}>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  // onClick={() => message.success("Processing complete!")}
                >
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
            </div> */}

            <Watermark content="Racing">
              <div style={contentStyle}>{steps[current].content}</div>
            </Watermark>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
}
