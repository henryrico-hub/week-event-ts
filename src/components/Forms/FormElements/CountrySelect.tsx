import { Form, Input, Select } from "antd";
import { FieldType } from "../Step1";
import { countrys } from "src/data";
import { useState } from "react";

export default function CountrySelect() {
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);

  const countryFormated = countrys.map((country) => ({
    label: country.name,
    value: country.code3,
  }));

  const onChangeC = (value: string) => {
    const selectedCountry = countrys.find((country) => country.code3 === value);
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
        name="country"
        hasFeedback
        rules={[{ required: true, message: "El campo es requerido" }]}
      >
        <Select
          onChange={onChangeC}
          showSearch
          optionFilterProp="label"
          style={{ width: "100%" }}
          placeholder="Selecciona País"
          options={countryFormated}
        ></Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Estado"
        name="state"
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
        ></Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Ciudad"
        name="city"
        hasFeedback
        rules={[{ required: true, message: "El campo es requerido" }]}
      >
        <Input placeholder="Ciudad ó Localidad"></Input>
      </Form.Item>
    </>
  );
}
