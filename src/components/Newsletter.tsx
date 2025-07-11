import { useState } from "react";
import axios from "axios";
import "src/assets/css/loader.css";
import { Icon } from "@iconify-icon/react";
import { notification } from "antd";

type StatusButton = JSX.Element;

export default function Newsletter() {
  const [api, contextHolder] = notification.useNotification();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusEmail, setStatusEmail] = useState("init");

  const statusButtons: Record<string, StatusButton> = {
    init: (
      <button className="btn btn-primary font-weight-bold px-3">Unirse</button>
    ),
    loader: (
      <button className="btn btn-primary font-weight-bold px-3" disabled>
        {/* <Icon icon={"fa6-solid:spinner"} inline={true} width={24} /> */}
        <Icon icon="svg-spinners:ring-resize" width="24" height="24" />
      </button>
    ),
    "success-beat": (
      <button className="btn btn-primary font-weight-bold px-3" disabled>
        {/* <FontAwesomeIcon icon={faCheck} beatFade size="xl" /> */}
        <Icon icon={"fa-regular:check-circle"} inline={true} width={24} />
      </button>
    ),
    success: (
      <button
        className="btn btn-primary flex items-center font-weight-bold px-3 "
        disabled
      >
        {/* <FontAwesomeIcon icon={faCheck} size="xl" /> */}
        <Icon icon={"fa-regular:check-circle"} inline={true} width={24} />
      </button>
    ),
    "error-beat": (
      <button className="btn btn-primary font-weight-bold px-3" disabled>
        {/* <FontAwesomeIcon icon={faXmark} beatFade size="xl" /> */}
        <Icon icon={"fa6-regular:circle-xmark"} inline={true} width={24} />
      </button>
    ),
    error: (
      <button className="btn btn-primary font-weight-bold px-3" disabled>
        {/* <FontAwesomeIcon icon={faXmark} size="xl" /> */}
        <Icon icon={"fa6-regular:circle-xmark"} inline={true} width={24} />
      </button>
    ),
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatusEmail("loader");

    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/newsletters`,
          { data: formData }
        );
        if (response.status === 201) {
          setStatusEmail("success");
          openNotification();
        }

        // setStatusEmail("success-beat");
        // setTimeout(() => {
        // }, 2000);
      } catch (error: any) {
        console.error("Error posting data:", error.message);
        setStatusEmail("error-beat");
        setTimeout(() => {
          setStatusEmail("error");
        }, 2000);
      }
    }, 3000);
  };

  const openNotification = () => {
    api["success"]({
      message: "¡Gracias por suscribirte!",
      description:
        "¡Listo! A partir de ahora recibirás nuestras novedades por correo.",
      showProgress: true,
    });
  };

  return (
    <div className="mb-3">
      {contextHolder}
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">
          Unete a nosotros
        </h4>
      </div>
      <div className="bg-white text-center border border-top-0 p-3">
        <p className="pb-2">¡Suscríbete y no te pierdas nada!</p>

        <form id="subscribe" onSubmit={handleSubmit}>
          <div className="input-group mb-2" style={{ width: "100%" }}>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              required
              className="form-control form-control-lg"
              placeholder="Ingresa tu email"
              disabled={loading}
            />
            <div className="input-group-append">
              {statusButtons[statusEmail]}
            </div>
          </div>
          <small>
            {statusEmail === "success"
              ? "Gracias por unirte"
              : statusEmail === "error"
              ? "Intentelo de nuevo mas tarde"
              : ""}
          </small>
        </form>
      </div>
    </div>
  );
}
