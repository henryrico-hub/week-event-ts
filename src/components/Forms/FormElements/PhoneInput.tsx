import { Input, Form, Select } from "antd";
import { FieldType } from "../Step1";
import { useState } from "react";

const countryCodes = [
  { code: "+52", name: "México", flag: "🇲🇽" },
  { code: "+1", name: "Estados Unidos / Canadá", flag: "🇺🇸" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+34", name: "España", flag: "🇪🇸" },
  { code: "+55", name: "Brasil", flag: "🇧🇷" },
  { code: "+44", name: "Reino Unido", flag: "🇬🇧" },
  { code: "+33", name: "Francia", flag: "🇫🇷" },
  { code: "+49", name: "Alemania", flag: "🇩🇪" },
  { code: "+81", name: "Japón", flag: "🇯🇵" },
  { code: "+91", name: "India", flag: "🇮🇳" },
];

type Props = {
  label: string;
  name: string;
  prefix: string;
  init?: any;
};

function PhoneInput({ label, name, prefix, init }: Props) {
  const [prefixV, setPrefixV] = useState("+52");

  const prefixSelector = (
    <Form.Item<FieldType>
      name={prefix}
      initialValue={init ? null : prefixV}
      noStyle
    >
      <Select
        showSearch
        value={init ? null : prefixV}
        onChange={setPrefixV}
        style={{ width: 100 }}
        size="small"
      >
        {countryCodes.map((country, key) => (
          <Select.Option key={key} value={country.code}>
            {`${country.flag} ${country.code}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <Form.Item<FieldType>
      label={label}
      name={name}
      className="col-span-2 md:col-span-1"
      hasFeedback
      rules={[
        {
          required: true,
          message: "El campo es requerido",
        },
        {
          pattern: /^\d+$/,
          message: "Solo se permiten números",
        },
        {
          validator: (_, value) => {
            const digits = (value || "").replace(/\D/g, "");
            if (digits.length >= 7 && digits.length <= 15) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Debe contener entre 7 y 15 dígitos")
            );
          },
        },
      ]}
    >
      <Input
        size="middle"
        type="tel"
        addonBefore={prefixSelector}
        placeholder="1234567890"
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </Form.Item>
  );
}

export default PhoneInput;
