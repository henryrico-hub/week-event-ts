import { Popconfirm, Select, Checkbox, Button, message } from "antd";
import { Icon } from "@iconify-icon/react";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import { getParticipantListByEvent } from "src/models/event.server";
import { Participant } from "src/types";

type Props = {
  url: string;
};

export default function DownloadData({ url }: Props) {
  const [format, setFormat] = useState<"xlsx" | "csv">("xlsx");
  const [filterCompleted, setFilterCompleted] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const downloadData = async () => {
    setLoading(true);
    try {
      const response = await getParticipantListByEvent(url);
      let participants: Participant[] = response?.data?.[0]?.participants || [];

      // 1. Filtro por estado
      if (filterCompleted) {
        participants = participants.filter((p) => p.statusP === "Complete");
      }

      // 2. Filtro por categoría (si aplica)
      if (selectedCategory) {
        participants = participants.filter(
          (p) => p.categoryP === selectedCategory
        );
      }

      if (!participants.length) {
        message.warning("No hay participantes que cumplan los filtros.");
        return;
      }

      const formattedData = participants.map((item: Participant) => ({
        numero_participante: item.participantNumber,
        nombre: item.name,
        apellido_paterno: item.paternalSurname,
        apellido_materno: item.maternalSurname,
        fecha_nacimiento: item.birthday,
        categoria: item.categoryP,
        sexo: item.gender,
        paquete: item.package,
        comprobante_pago: item.payment?.length
          ? `${import.meta.env.VITE_API_URL_SHORT}${item.payment[0].url}`
          : "Sin archivo",
        talla: item.size,
        estado: item.statusP === "Complete" ? "Completo" : "Pendiente",
        fecha_inscripcion: item.createdAt,
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Participantes");

      const now = new Date();
      const formattedDate = now
        .toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, "-");
      const filename = `participantes_${url}_${formattedDate}.${format}`;

      if (format === "xlsx") {
        XLSX.writeFile(workbook, filename);
      } else {
        XLSX.writeFile(workbook, filename, { bookType: "csv" });
      }
      message.success("Archivo exportado correctamente");
    } catch (error) {
      console.error("Error descargando participantes:", error);
      message.error("Hubo un error al exportar.");
    } finally {
      setLoading(false);
    }
  };

  // Extraer categorías disponibles (opcional si ya las tienes)
  useEffect(() => {
    const fetchData = async () => {
      const response = await getParticipantListByEvent(url);
      const list = response?.data?.[0]?.participants || [];
      const unique = Array.from(
        new Set(list.map((p: Participant) => p.categoryP))
      ).filter(Boolean) as string[];
      setCategories(unique);
    };
    fetchData();
  }, [url]);

  return (
    <div className="space-y-2">
      {/* Filtros */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Checkbox
          checked={filterCompleted}
          onChange={(e) => setFilterCompleted(e.target.checked)}
        >
          Solo completados
        </Checkbox>

        <Select
          allowClear
          placeholder="Filtrar por categoría"
          style={{ width: 200 }}
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
          options={categories.map((cat) => ({ label: cat, value: cat }))}
        />

        <Select
          value={format}
          onChange={(val) => setFormat(val)}
          style={{ width: 150 }}
          options={[
            { label: "Excel (.xlsx)", value: "xlsx" },
            { label: "CSV (.csv)", value: "csv" },
          ]}
        />
      </div>

      {/* Botón de descarga */}
      <Popconfirm
        title="¿Deseas exportar los datos?"
        onConfirm={downloadData}
        okText="Aceptar"
        cancelText="Cancelar"
        disabled={loading}
      >
        <Button
          type="primary"
          icon={<Icon icon="fluent:document-arrow-down-24-regular" />}
          loading={loading}
        >
          Exportar inscritos ({format.toUpperCase()})
        </Button>
      </Popconfirm>
    </div>
  );
}
