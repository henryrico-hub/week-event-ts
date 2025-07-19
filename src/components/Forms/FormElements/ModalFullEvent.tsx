import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

type ModalProps = {
  openM: boolean;
};

const FullModal = ({ openM }: ModalProps) => {
  const navigate = useNavigate();

  const handleOk = () => {
    navigate(`/`);
  };

  const handleCancel = () => {
    navigate(`/`);
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Limite de inscripciones alcanzado"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openM}
        onCancel={handleCancel}
        onOk={handleOk}
        destroyOnClose={true}
        footer={
          [
            // <Button key="back" type="primary" onClick={handleCancel}>
            //   Aceptar
            // </Button>,
          ]
        }
      >
        <div className="flex flex-col p-4 border-4 border-solid bg-blue-100 gap-2">
          <Icon icon={"pepicons-pop:ticket-off"} className="py-2" width={72} />
          <span className="text-left font-medium">
            ¡Gracias por tu interés!
          </span>
          <span className="text-left font-medium">
            Actualmente, el evento ha alcanzado su cupo máximo de participantes.
          </span>
        </div>
      </Modal>
    </>
  );
};

export default FullModal;
