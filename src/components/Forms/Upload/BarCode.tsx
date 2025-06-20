import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
}

const Barcode = ({ value, width = 1, height = 30 }: BarcodeProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: "CODE128",
        lineColor: "#000",
        width,
        height,
        displayValue: false,
        margin: 0,
      });
    }
  }, [value, width, height]);

  return (
    <div className="flex flex-col items-center text-black font-bold underline px-1">
      {/* <div
        className="mt-2 text-black"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(90deg)",
        }}
      >
      </div>
      */}
      <svg ref={svgRef} />
      {value}
    </div>
  );
};

export default Barcode;
