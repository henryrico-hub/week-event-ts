import { Form, Input, Select } from "antd";
import { FieldType } from "../Step1";
import { countrys } from "src/data";
import { useState } from "react";

type Props = {
  nameC: string;
  nameS: string;
  nameCt: string;
};

export default function CountrySelect({ nameC, nameCt, nameS }: Props) {
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);

  const countryFormated = countrys.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  const onChangeC = (value: string) => {
    const selectedCountry = countrys.find((country) => country.name === value);
    if (selectedCountry) {
      setStates(
        selectedCountry.states.map((state) => ({
          label: state.name,
          value: state.name,
        }))
      );
    }
  };

  return (
    <>
      <Form.Item<FieldType>
        label="País"
        name={nameC}
        hasFeedback
        className="col-span-2 md:col-span-1"
        rules={[{ required: true, message: "El campo es requerido" }]}
      >
        <Select
          onChange={onChangeC}
          showSearch
          optionFilterProp="label"
          style={{ width: "100%" }}
          placeholder="Selecciona País"
          options={countryFormated}
          // className="w-full"
        ></Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Estado"
        name={nameS}
        className="col-span-2 md:col-span-1"
        hasFeedback
        rules={[{ required: true, message: "El campo es requerido" }]}
      >
        <Select
          // onChange={onChangeS}
          showSearch
          optionFilterProp="label"
          style={{ width: "100%" }}
          placeholder="Selecciona Estado"
          options={states}
          // className="w-full"
        ></Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Ciudad"
        name={nameCt}
        className="col-span-2 md:col-span-1"
        hasFeedback
        rules={[
          { required: true, message: "El campo es requerido" },
          { min: 2, message: "Por lo menos dos caracteres" },
        ]}
      >
        <Input
          // className="w-full"
          placeholder="Ciudad ó Localidad"
        ></Input>
      </Form.Item>
    </>
  );
}
