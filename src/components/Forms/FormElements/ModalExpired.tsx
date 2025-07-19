import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

type ModalProps = {
  openM: boolean;
};

const ExpiredModal = ({ openM }: ModalProps) => {
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
        title="Plazo de inscripción terminado"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openM}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={
          [
            // <Button key="back" type="primary" onClick={handleCancel}>
            //   Aceptar
            // </Button>,
          ]
        }
        destroyOnClose={true}
      >
        <div className="flex flex-col p-4 border-4 border-solid bg-blue-100 gap-2">
          <Icon
            icon={"pajamas:expire"}
            className="p-2"
            width={64}
            height={64}
          />
          <span className="text-center text-sm">
            Este evento ha cerrrado su periodo de inscripción, te agradecemos tu
            interés en participar.
          </span>
        </div>
      </Modal>
    </>
  );
};

export default ExpiredModal;
