import { Modal } from "antd";
import { useState } from "react";
import VerificationInput from "react-verification-input";
import { getParticipant } from "src/models/event.server";
import { Icon } from "@iconify-icon/react";

type Props = {
  callback?: (code: string) => void;
  reset?: boolean;
  isLoading?: boolean;
  setMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EnterCode({ setMobileMenuOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalText, setModalText] = useState(
    "Ingresa tu ID de registro para continuar"
  );

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleCode = (code: string) => {
    setLoading(true);
    const fetchParticipant = async () => {
      try {
        if (!code) {
          return;
          // setErrorUrl(true);
        }
        const response = await getParticipant(code);
        if (response.meta.pagination.total === 0) {
          setTimeout(() => {
            setLoading(false);
            setError(true);
            setModalText("ID de registro no encontrado");
          }, 2000);
          return;
        } else {
          const statusP = response.data[0].statusP;
          const url = response.data[0].event.url;
          const idPart = response.data[0].documentId.slice(0, 6);

          // const media = response.data[0];

          if (statusP === "Pending") {
            setTimeout(() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              // navigate(`/form/${url}/${idPart}`, {
              //   state: { step: 1, media: media },
              // });
              setMobileMenuOpen && setMobileMenuOpen(false);
              localStorage.setItem("formStep", "pending"); // o "2"
              window.location.href = `/form/${url}/${idPart}`;
              // setOpen(false);
              // setLoading(false);
            }, 4000);
          }
          if (statusP === "Complete") {
            setTimeout(() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              setMobileMenuOpen && setMobileMenuOpen(false);
              localStorage.setItem("formStep", "complete"); // o "2"
              window.location.href = `/form/${url}/${idPart}`;
              // navigate(`/form/${url}/${idPart}`, {
              //   state: { step: 2 },
              // });
              // setOpen(false);
              // setLoading(false);
            }, 4000);
          }
        }

        //1 b5krr6
        //2 l3e0o4
      } catch (error) {
        setLoading(false);
        console.error("Error fetching events:", error);
      } finally {
      }
    };
    fetchParticipant();
  };
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      <a
        className="flex text-sm font-semibold leading-6 text-slate-100 hover:cursor-pointer"
        onClick={showModal}
      >
        Check Registro
        <Icon
          icon={"mdi:ticket-account"}
          className="ml-2"
          width={28}
          inline={true}
        />
      </a>

      <Modal
        title={loading ? "Buscando participante" : "Ingresa ID de registro"}
        open={open}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        loading={loading}
        destroyOnClose
      >
        <p
          className="text-center p-4"
          style={{
            color: error ? "red" : "black",
          }}
        >
          {modalText}
        </p>
        <div className="flex gap-2 relative justify-center">
          <VerificationInput
            onComplete={(code: string) => {
              handleCode(code);
            }}
            length={6}
            placeholder="_"
            classNames={{
              character:
                "border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              characterSelected: "bg-orange-300 border-blue-500",
              characterInactive: "bg-gray-100 border-gray-100",
              characterFilled: "bg-blue-200 border-blue-500",
            }}
          />
        </div>
      </Modal>
    </>
  );
}
