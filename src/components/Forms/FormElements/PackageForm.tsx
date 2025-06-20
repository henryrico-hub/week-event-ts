import {
  Form,
  Divider,
  Collapse,
  Radio,
  Image,
  Select,
  Typography,
} from "antd";
import { FieldType } from "../Step1";
import { PackageType, SizeJerseyType } from "src/types";
import { useState } from "react";
import packageEmpty from "src/assets/images/packageEmpty.webp";
import { formatearPrice } from "src/utils/helpers";

type Props = {
  data?: PackageType[];
};

export default function PackageForm({ data }: Props) {
  const [packageMedia, setPackageMedia] = useState<string[]>([]);
  const [description, setDescription] = useState<string>();
  const [packageSizes, setPackageSizes] = useState<SizeJerseyType[]>([]);

  const onChangePkg = (value: string) => {
    console.log(value);
    const selectedPackage = data?.find(
      (pkg) => pkg.name === value.split("->")[0]
    );
    if (selectedPackage) {
      setDescription(selectedPackage.description);
      setPackageMedia(
        selectedPackage.image.map(
          (img) => `${import.meta.env.VITE_API_URL_SHORT}${img.url}`
        )
      );
      setPackageSizes(selectedPackage.size_jerseys);
    }
  };

  const formattedText = (value: string | undefined) => {
    if (!value) return null;
    return value.split("\n").map((line, idx) => (
      <span key={idx}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <Divider orientation="center">
            Seleccion tu paquete de participante
          </Divider>
          <Form.Item<FieldType>
            label="Selecciona un paquete"
            name="package"
            className="pt-2 mb-2"
            rules={[
              { required: true, message: "Selecciona el paquete que deseas" },
            ]}
          >
            <Select
              onChange={onChangePkg}
              options={data?.map((pkg) => ({
                label: `${pkg.name} - $${formatearPrice(pkg.price)}`,
                value: `${pkg.name}->${formatearPrice(pkg.price)}`,
              }))}
              placeholder="Elige un paquete"
              allowClear
            />
          </Form.Item>
          <Collapse
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Ver imagenes",
                children: (
                  <div className="flex row justify-center text-center ">
                    <Image.PreviewGroup items={packageMedia}>
                      <Image
                        width={"auto"}
                        src={packageMedia ? packageMedia[0] : packageEmpty}
                      />
                    </Image.PreviewGroup>
                    <Typography.Text>
                      {formattedText(description)}
                    </Typography.Text>
                  </div>
                ),
              },
            ]}
          />

          <Form.Item<FieldType>
            label="Elegir talla"
            name="size"
            className="pt-2 mb-2"
            rules={[
              { required: true, message: "Selecciona el talla que deseas" },
            ]}
          >
            <Radio.Group
              buttonStyle="solid"
              // disabled={jersey}
            >
              {packageSizes.map((size, key) => (
                <Radio.Button key={key} value={size.size}>
                  {size.size}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        </>
      ) : null}

      <Divider orientation="center"></Divider>
    </>
  );
}
