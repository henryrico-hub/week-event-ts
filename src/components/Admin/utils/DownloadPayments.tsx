import { useState } from "react";
import { Button, message, Popconfirm, Tooltip } from "antd";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Icon } from "@iconify-icon/react";

const DownloadZipClient = ({ docCode }: { docCode: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const shortUrl = import.meta.env.VITE_API_URL_SHORT;

      // 1. Buscar archivos desde Strapi (filtrados por nombre con el docCode)
      const res = await fetch(
        `${baseUrl}/upload/files?filters[name][$contains]=${docCode}`
      );
      const files = await res.json();

      if (!files.length) {
        message.warning("No se encontraron archivos para este código");
        setLoading(false);
        return;
      }

      const zip = new JSZip();

      // 2. Descargar cada archivo y agregar al zip
      for (const file of files) {
        const fileUrl = `${shortUrl}${file.url}`;
        const response = await fetch(fileUrl);

        if (!response.ok) {
          console.warn(`❌ No se pudo descargar: ${file.name}`);
          continue;
        }

        const blob = await response.blob();
        zip.file(file.name || "archivo", blob);
      }

      // 3. Generar zip y forzar descarga
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `archivos_${docCode}.zip`);
    } catch (err) {
      console.error("Error al generar zip:", err);
      message.error("Ocurrió un error al descargar el ZIP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popconfirm
      title="Deseas descargar los comprobantes de pago?"
      onConfirm={handleDownload}
      okText="Aceptar"
      cancelText="Cancelar"
    >
      <div className="flex gap-1.5 items-center">
        <Icon icon={"streamline:download-box-1"} width={18} inline={true} />
        <span className="custom-dropdown-item">
          Descargar comprobantes (.zip)
        </span>
      </div>
      {/* <Button type="link" loading={loading} onClick={handleDownload}></Button> */}
    </Popconfirm>
  );
};

export default DownloadZipClient;
