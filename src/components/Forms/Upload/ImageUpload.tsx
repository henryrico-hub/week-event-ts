import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { AxiosResponse } from "axios";
import {
  Image,
  Upload,
  Typography,
  Divider,
  message,
  Button,
  Space,
  Tooltip,
} from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ModalConfirm from "./ModalConfirm";
import axios from "axios";
import { Icon } from "@iconify-icon/react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  partId: string | undefined;
  next: () => void;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
};
const uploadComp = ({ partId, next, setUpdateData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [res, setRes] = useState<AxiosResponse<any, any> | undefined>(
    undefined
  );

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.map((file) => ({
        ...file,
        status: "done",
      }))
    );
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";

    if (!isJpgOrPng) {
      message.error("Solo se permiten imágenes PNG, JPG o JPEG");
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("La imagen debe ser menor a 2MB");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!partId) {
      message.error("No se ha encontrado el ID del particicpante");
      return;
    }
    if (fileList.length === 0) {
      message.warning("Debes subir una imagen antes de continuar");
      return;
    }

    setLoading(true);
    const file = fileList[0].originFileObj as File;
    const formData = new FormData();
    formData.append("files", file);

    try {
      // const response = await updateParticipant(formData);

      // Paso 1: Subir archivo
      const uploadRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData
      );
      setRes(uploadRes);

      if (!uploadRes.data || !uploadRes.data[0]?.id) {
        throw new Error("No se recibió una respuesta válida del servidor");
      }

      const uploadedFileId = uploadRes.data[0]?.id;

      // Paso 2: Asociar archivo al participante
      await axios.put(
        `${import.meta.env.VITE_API_URL}/participants/${partId}`,
        {
          data: {
            payment: [uploadedFileId], // array porque el campo es multiple
          },
        }
      );

      // Paso 3: Obtener el participante actualizado
      const response2 = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/participants/${partId}?populate=payment`
      );

      // message.success("Archivo subido correctamente");
      // console.log("Respuesta del servidor:", response2);
      // Solo llamar next() si la respuesta fue exitosa y el participante fue actualizado
      if (response2.status === 200) {
        message.success("Archivo subido correctamente");
        console.log("Respuesta del servidor:", response2);
        setUpdateData((prev) => !prev);

        setOpenAlert(true);

        const el = document.getElementById("check");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        // if (typeof next === "function") {
        //   next();
        // }
        // Solo llama next si es una función válida
        // if (typeof next === "function") {
        //   next();
        // }
      } else {
        message.error("No se pudo actualizar el participante correctamente");
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      message.error("Error al subir el archivo");
    } finally {
      setOpen(false);
      setFileList([]);
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Seleccionar archivo </div>
    </button>
  );

  const contentText = () => {
    return (
      <Space direction="vertical" size={"small"}>
        <Typography.Text>
          Recibimos tu comprobante y será revisado por el organizador del evento
          (Tiempo aprox. 24hrs). Guarda tu ID de registro para conocer el estado
          de tu inscripción.
        </Typography.Text>
        <Typography.Title
          level={2}
          className="flex justify-center text-center p-1"
          style={{
            border: "1px dashed black",
          }}
        >
          {partId?.slice(0, 6)}{" "}
          <Typography.Paragraph
            className="p-1"
            copyable={{ text: partId?.slice(0, 6) }}
          ></Typography.Paragraph>
        </Typography.Title>
      </Space>
    );
  };

  const bodySuccess = () => {
    return (
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Atención
        <Tooltip title="¿Para conocer el estado de tu registro ve a la sección 'Check Inscripción'.">
          <Icon
            icon={"material-symbols:shield-question"}
            className="px-2"
            inline={true}
          />
        </Tooltip>
      </Typography.Title>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <Divider style={{ borderColor: "#7cb305" }}>
          Sube tu comprobante de pago
        </Divider>
        <Upload
          // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          // customRequest={handleSubmit}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <>
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
            Subir imagen
          </>
        )}
        <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
          Solo imágenes PNG, JPG o JPEG. Tamaño máximo: 2MB.
        </Typography.Text>
        <Button
          type="primary"
          loading={loading}
          // onClick={handleSubmit}
          onClick={() => {
            setOpen(true);
          }}
          disabled={fileList.length === 0}
        >
          Subir Comprobante
        </Button>

        <ModalConfirm
          handleSubmit={handleSubmit}
          open={open}
          setOpen={setOpen}
          confirmLoading={loading}
          setConfirmLoading={setLoading}
          type="confirm"
          content="¿Estas seguro de que deseas continuar?"
          title="Confirmar carga de comprobante"
        />
        <ModalConfirm
          title="Atención!"
          handleSubmit={() => setOpenAlert(false)}
          content={contentText()}
          open={openAlert}
          setOpen={setOpenAlert}
          confirmLoading={loading}
          setConfirmLoading={setLoading}
          type="success"
        />
      </div>
      ;
    </>
  );
};

export default uploadComp;
