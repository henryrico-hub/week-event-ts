import { useState } from "react";
import axios from "axios";
import "../assets/css/loader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";

type StatusButton = JSX.Element;

export default function Newsletter() {
  const [formData, setFormData] = useState({});

  const [statusEmail, setStatusEmail] = useState("init");

  const statusButtons: Record<string, StatusButton> = {
    init: (
      <button className="btn btn-primary font-weight-bold px-3">Sign Up</button>
    ),
    loader: (
      <button className="btn btn-primary font-weight-bold px-3" disabled>
        <FontAwesomeIcon icon={faSpinner} spin size="xl" />
      </button>
    ),
    "success-beat": (
      <button className="btn btn-primary font-weight-bold px-3" disabled>
        <FontAwesomeIcon icon={faCheck} beatFade size="xl" />
      </button>
    ),
    success: (
      <button className="btn btn-primary font-weight-bold px-3" disabled>
        <FontAwesomeIcon icon={faCheck} size="xl" />
      </button>
    ),
    "error-beat": (
      <button className="btn btn-primary font-weight-bold px-3" disabled>
        <FontAwesomeIcon icon={faXmark} beatFade size="xl" />
      </button>
    ),
    error: (
      <button className="btn btn-primary font-weight-bold px-3" disabled>
        <FontAwesomeIcon icon={faXmark} size="xl" />
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
    setStatusEmail("loader");

    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/newsletters`,
          { data: formData }
        );
        console.log(response);

        setStatusEmail("success-beat");
        setTimeout(() => {
          setStatusEmail("success");
        }, 2000);
      } catch (error: any) {
        console.error("Error posting data:", error.message);
        setStatusEmail("error-beat");
        setTimeout(() => {
          setStatusEmail("error");
        }, 2000);
      }
    }, 3000);
  };

  return (
    <div className="mb-3">
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">Newsletter</h4>
      </div>
      <div className="bg-white text-center border border-top-0 p-3">
        <p>
          Aliqu justo et labore at eirmod justo sea erat diam dolor diam vero
          kasd
        </p>

        <form id="subscribe" onSubmit={handleSubmit}>
          <div className="input-group mb-2" style={{ width: "100%" }}>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              required
              className="form-control form-control-lg"
              placeholder="Your Email"
            />
            <div className="input-group-append">
              {statusButtons[statusEmail]}
              {/* <button className="btn btn-primary font-weight-bold px-3">Sign Up</button> */}
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
