import { useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // o define la constante directamente

type UploadReceiptOptions = {
  token: string;
  file: File;
  eventId: string | number;
  participantId: number;
  fileName?: string; // opcional: puedes personalizar el nombre del archivo
  fieldName?: string; // nombre del campo media (por defecto "payment")
};

export const useUploadReceipt = () => {
  const uploadReceipt = useCallback(
    async ({
      token,
      file,
      eventId,
      participantId,
      fileName = `recibo_${participantId}.jpg`,
      fieldName = "payment",
    }: UploadReceiptOptions) => {
      try {
        const folderName = `evento-${eventId}`;

        // 1. Buscar carpeta
        const folderRes = await axios.get(`${API_URL}/upload/folders`, {
          params: {
            filters: { name: folderName },
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let folderId = folderRes.data?.data?.[0]?.id;

        // 2. Crear si no existe
        if (!folderId) {
          const createFolderRes = await axios.post(
            `${API_URL}/upload/folders`,
            {
              name: folderName,
              path: folderName,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          folderId = createFolderRes.data?.id;
        }

        // 3. Renombrar archivo
        const renamedFile = new File([file], fileName, {
          type: file.type,
        });

        // 4. Subir archivo
        const formData = new FormData();
        formData.append("files", renamedFile);
        formData.append("folder", folderId);

        const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const uploadedFileId = uploadRes.data?.[0]?.id;

        // 5. Asociar archivo al participante
        await axios.put(
          `${API_URL}/participants/${participantId}`,
          {
            data: {
              [fieldName]: [uploadedFileId], // por defecto: payment
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return {
          success: true,
          fileId: uploadedFileId,
        };
      } catch (error) {
        console.error("Error al subir recibo:", error);
        return {
          success: false,
          error,
        };
      }
    },
    []
  );

  return { uploadReceipt };
};
