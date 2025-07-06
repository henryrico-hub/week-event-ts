import {
  QRCode,
  // Button,
  Space,
} from "antd";
// import { DownloadOutlined } from "@ant-design/icons";

type Props = {
  value: string;
  icon?: string;
  size?: number;
  color?: string;
  bgColor?: string;
};

const QRCodeSvgDownload = ({
  value,
  icon,
  size = 200,
  color = "#000000",
  bgColor = "#ffffff",
}: Props) => {
  // const downloadSvgQRCode = () => {
  //   const svg = document.getElementById("qrcode-svg")?.querySelector("svg");
  //   if (svg) {
  //     const svgData = new XMLSerializer().serializeToString(svg);
  //     const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  //     const url = URL.createObjectURL(blob);

  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "QRCode.svg";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   }
  // };

  return (
    <Space
      direction="horizontal"
      align="center"
      id="qrcode-svg"
      className="justify-center items-center flex mx-auto"
      style={{ height: "100%", minHeight: 50 }}
    >
      <QRCode
        type="svg"
        value={value}
        size={size}
        icon={icon}
        color={color}
        bgColor={bgColor}
      />
      {/* <Button icon={<DownloadOutlined />} onClick={downloadSvgQRCode}>
      Descargar SVG
      </Button> */}
    </Space>
  );
};

export default QRCodeSvgDownload;
