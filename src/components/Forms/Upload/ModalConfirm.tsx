import { Button, Modal } from "antd";
import { ReactNode } from "react";

type Props = {
  confirmLoading: boolean;
  setConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: () => void;
  title?: string;
  content?: ReactNode | string;
  type: "confirm" | "success";
};

const ModalConfirm = ({
  confirmLoading,
  open,
  setOpen,
  handleSubmit,
  title,
  content,
  type,
}: Props) => {
  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setOpen(false);
  };

  const getFooterButtons = () => {
    if (type === "confirm") {
      return [
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleSubmit}
        >
          Aceptar
        </Button>,
      ];
    }
    if (type === "success") {
      return [
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Continuar
        </Button>,
      ];
    }
    return [];
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      <Modal
        title={title}
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        // onCancel={handleCancel}
        footer={getFooterButtons}
      >
        {/* <p>{"¿Estas seguro de que deseas continuar?"}</p> */}
        {content}
      </Modal>
    </>
  );
};

export default ModalConfirm;
