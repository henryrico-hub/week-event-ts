import { Tag } from "antd";
import { useMemo } from "react";

// Mapa global para mantener colores asignados
const tagColorMap: Map<string, string> = new Map();

// Función para generar colores pastel únicos
const generateColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`; // pastel suave
};

const SizeTag = ({ value }: { value: string }) => {
  const color = useMemo(() => {
    if (!tagColorMap.has(value)) {
      tagColorMap.set(value, generateColor());
    }
    return tagColorMap.get(value)!;
  }, [value]);

  return (
    <div className="flex justify-center">
      <Tag color={color} style={{ color: "#000" }}>
        {value}
      </Tag>
    </div>
  );
};

export default SizeTag;
