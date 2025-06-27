// components/utils/ExportModalTrigger.tsx
import { useState } from "react";
import { Modal } from "antd";
import DownloadParticipants from "./DownloadParticipants";
import { Icon } from "@iconify-icon/react";

type Props = {
  url: string;
};

export default function ExportModalTrigger({ url }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="flex gap-1.5 items-center custom-dropdown-item"
        onClick={(e) => {
          e.stopPropagation(); // evita que cierre el dropdown prematuramente
          setOpen(true);
        }}
      >
        <Icon icon="fluent:document-arrow-down-24-regular" width={22} />
        <span>Exportar Inscritos</span>
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title="Exportar Participantes"
        destroyOnClose
      >
        <DownloadParticipants url={url} />
      </Modal>
    </>
  );
}
