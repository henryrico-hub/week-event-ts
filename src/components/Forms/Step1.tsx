import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Space,
  Divider,
  Result,
  Select,
} from "antd";
import { Icon } from "@iconify-icon/react";
import Title from "antd/es/typography/Title";
// import { City, Country, ICountry, State } from "country-state-city";
import type { FormInstance } from "antd";
import { notification } from "antd";
import { postParticipant } from "src/models/event.server";
import { EventType } from "src/types";
import ModalConfirm from "./Upload/ModalConfirm";
import CountrySelect from "./FormElements/CountrySelect";
import PackageForm from "./FormElements/PackageForm";

const { Text } = Typography;
export type FieldType =
  | "name"
  | "lastname"
  | "lastnameS"
  | "gender"
  | "birthday"
  | "bloodtype"
  | "email"
  | "category"
  | "country"
  | "state"
  | "city"
  | "address"
  | "allergies"
  | "medicine"
  | "team"
  | "package"
  | "size"
  | "phone"
  | "emergencyContactName"
  | "emergencyContactPhone"
  | "remember";

interface SubmitButtonProps {
  form: FormInstance;
}
// type NotificationPlacement = NotificationArgsProps["placement"];

type Step1Props = {
  next: () => void;
  setRegisterId: React.Dispatch<React.SetStateAction<string>>;
  data: EventType | null;
  setDataParticipant: React.Dispatch<React.SetStateAction<any>>;
};

export default function Step1({
  next,
  setRegisterId,
  data,
  setDataParticipant,
}: Step1Props) {
  const [, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);

  const [loading, setLoading] = useState(false);
  const [validForm] = useState(false);
  // const [jersey, setjersey] = useState<boolean>(true);

  const [open, setOpen] = useState(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Errores ->", errorInfo);
  };

  // const openNotificationError = (placement: NotificationPlacement) => {
  //   api.info({
  //     message: `Ocurrio un error mientras se hacia el registro`,
  //     description: "Intentelo de nuevo",
  //     placement,
  //     icon: <CloseCircleTwoTone twoToneColor="rgb(255, 77, 79)" />,
  //   });
  // };

  // const bottomEle = document.querySelector("#flag-success");
  // console.log("--->", data);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("values", values);

    const createUser = async () => {
      // const datatoSend = {
      //   name: values.name,
      //   lastname: values.lastname,
      //   birthday: values.birthday,
      //   gender: values.gender,

      //   country: countrySelected?.name,
      //   state: stateSelected?.label,
      //   city: values.city,

      //   address: values.address,
      //   allergies: values.allergies,
      //   medicine: values.medicine,
      //   bloodtype: values.bloodtype,
      //   team: values.team,
      //   phone: values.phone,
      //   email: values.email,
      //   package : values.package,
      //   size: values.size
      //   emergencyContactName: values.emergencyContactName,
      //   emergencyContactPhone: values.emergencyContactPhone,
      //   // remember: values.remember,
      //   // ...values,
      //   // country: countrySelected?.name,
      //   // state: stateSelected?.label,
      // };

      const datatoSend2: {
        name: string;
        event: string | undefined;
        categoryP: string;
        size: string;
        package: string;
      } = {
        name: values.name,
        event: data?.documentId,
        categoryP: values.category,
        size: values.size,
        package: values.package,
      };

      try {
        const response: {
          data: {
            birthdate: string | null;
            createdAt: string;
            documentId: string;
            gender: string | null;
            id: number;
            maternal_surname: string | null;
            name: string;
            paternal_surname: string | null;
            publishedAt: string;
            updatedAt: string;
            payment: string | File | null;
            size: string;
            package: string;
          };
        } = await postParticipant(datatoSend2);
        setRegisterId(response.data.documentId.slice(0, 6));
        setDataParticipant(response.data);

        setTimeout(() => {
          window.scrollTo(0, 0);
          setLoading(false);
          setOpen(true);
          // setValidForm(true);
        }, 3000);
      } catch (error) {
        console.error("Error fetching post User:", error);
        // openNotificationError("top");
        // window.scrollTo(0, 0);
      } finally {
        // setLoading(false);
      }
    };

    createUser();
  };

  // const onChange1 = () => {
  //   setjersey(!jersey);
  // };

  const contentText = () => {
    return (
      <Space direction="vertical" size={"small"}>
        <Text type="secondary">
          Continua el proceso de inscripción realizando el pago
        </Text>
      </Space>
    );
  };

  const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
    form,
    children,
  }) => {
    const [submittable, setSubmittable] = useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
      <Button
        className=" w-100 mt-2 p-3"
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        loading={loading}
      >
        {children}
      </Button>
    );
  };

  // const generateUUID = (): string => {
  //   return uuidv4();
  // };

  // const generateShortUUID = (): string => {
  //   return uuidv4().split("-")[0].slice(0, 6);
  // };

  return (
    <>
      {contextHolder}

      {/* <div id='flag-success'></div> */}

      <div
        className="md:py-5 lg:py-10 flex justify-center"
        style={{ zIndex: 8 }}
      >
        {!validForm ? (
          <>
            {/* Formulario */}
            <Form
              form={form}
              className="md:p-10 md:py-6 px-0 py-0 rounded-lg shadow-lg "
              name="basic"
              style={{ maxWidth: "486px", backgroundColor: "white" }}
              // wrapperCol={{ span: 16 }}
              // labelCol={{ span: 10 }}
              variant={variant || "filled"}
              initialValues={{}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              disabled={loading}
            >
              <img
                alt="event image"
                className=" rounded-tl-lg rounded-tr-lg"
                // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                src={`${import.meta.env.VITE_API_URL_SHORT}${
                  data?.img_main.url
                }`}
                style={{
                  width: "100%",
                  objectFit: "cover",
                  height: "250px",
                }}
              />

              <div className="px-4 py-6">
                <Space
                  direction="vertical"
                  size={"small"}
                  style={{ textAlign: "center" }}
                >
                  <Title level={2}>{data?.name}</Title>
                  <Title level={3}>Registrate Ahora!</Title>
                  <Text style={{ fontSize: "16px" }} type="secondary" strong>
                    Plazo de inscripción: Del dia 15 de febrero al 28 de febrero
                  </Text>
                </Space>
                <Divider></Divider>

                <Form.Item<FieldType>
                  label="Nombres"
                  name="name"
                  hasFeedback
                  rules={[{ required: true, message: "Ingresa tu nombre" }]}
                >
                  <Input size="middle" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Apellido paterno"
                  name="lastname"
                  hasFeedback
                  rules={[{ required: true, message: "Ingresa apellido" }]}
                >
                  <Input size="middle" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Apellido materno"
                  name="lastnameS"
                  hasFeedback
                  rules={[{ required: true, message: "Ingresa apellido" }]}
                >
                  <Input size="middle" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Sexo"
                  name="gender"
                  hasFeedback
                  rules={[{ required: true, message: "El campo es requerido" }]}
                >
                  <Select size="middle">
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item<FieldType>
                  label="Fecha de Nacimiento"
                  name="birthday"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu fecha de nacimiento!",
                    },
                  ]}
                >
                  <Input type="date" size="middle" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Tipo de Sangre"
                  name="bloodtype"
                  hasFeedback
                  rules={[{ required: true, message: "El campo es requerido" }]}
                >
                  <Select size="middle">
                    <Select.Option value="A+">A+</Select.Option>
                    <Select.Option value="A-">A-</Select.Option>
                    <Select.Option value="B+">B+</Select.Option>
                    <Select.Option value="B-">B-</Select.Option>
                    <Select.Option value="AB+">AB+</Select.Option>
                    <Select.Option value="AB-">AB-</Select.Option>
                    <Select.Option value="O+">O+</Select.Option>
                    <Select.Option value="O-">O-</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item<FieldType>
                  label="Correo electronico"
                  name="email"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "El email es requerido",
                      type: "email",
                    },
                  ]}
                >
                  <Input size="middle" />
                </Form.Item>
                {data?.event_category_scs &&
                data.event_category_scs.length > 0 ? (
                  <Form.Item<FieldType>
                    label="Categoría"
                    name="category"
                    hasFeedback
                    rules={[
                      { required: true, message: "Selecciona una categoría" },
                    ]}
                  >
                    <Select
                      placeholder="Selecciona una categoría"
                      size="middle"
                    >
                      {data?.event_category_scs.map((cate) => (
                        <Select.Option key={cate.id} value={cate.slug}>
                          {cate.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}

                {/* <Form.Item<FieldType>
                    label="País"
                    name="country"
                    hasFeedback
                    rules={[
                      { required: true, message: "El campo es requerido" },
                    ]}
                  >
                    <Select
                      onChange={onChangeC}
                      showSearch
                      optionFilterProp="label"
                      style={{ width: "100%" }}
                      placeholder="Selecciona País"
                      options={countrys}
                    ></Select>
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Estado"
                    name="state"
                    hasFeedback
                    rules={[
                      { required: true, message: "El campo es requerido" },
                    ]}
                  >
                    <Select
                      onChange={onChangeS}
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
                    rules={[
                      { required: true, message: "El campo es requerido" },
                    ]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="label"
                      placeholder="Selecciona Ciudad"
                      options={cities}
                    ></Select>
                  </Form.Item> */}
                <Divider orientation="center">Dirección de contacto</Divider>
                <Form.Item<FieldType>
                  label="Dirección"
                  name="address"
                  hasFeedback
                  rules={[{ required: true, message: "El campo es requerido" }]}
                >
                  <Input size="middle" />
                </Form.Item>
                <CountrySelect />

                {/* <Form.Item<FieldType>
                  label="Alergias"
                  name="allergies"
                  hasFeedback
                >
                  <Input.TextArea
                    size="middle"
                    placeholder="En caso de no aplicar, dejar en blanco"
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Medicina"
                  name="medicine"
                  hasFeedback
                >
                  <Input.TextArea
                    size="middle"
                    placeholder="En caso de no aplicar, dejar en blanco"
                  />
                </Form.Item> */}

                <Form.Item<FieldType>
                  label="Equipo"
                  name="team"
                  hasFeedback
                  rules={[{ required: true, message: "El campo es requerido" }]}
                >
                  <Input size="middle" placeholder="Agrega a tu equipo"></Input>
                </Form.Item>

                <Form.Item<FieldType>
                  label="Numero de teléfono"
                  name="phone"
                  hasFeedback
                  rules={[{ required: true, message: "El campo es requerido" }]}
                >
                  <Input type="number" size="middle" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Nombre de contacto de emergencia"
                  name="emergencyContactName"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "El campo es requerido",
                    },
                  ]}
                  required
                >
                  <Input size="middle" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Teléfono de contacto de emergencia"
                  name="emergencyContactPhone"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "El campo es requerido",
                    },
                  ]}
                >
                  <Input type="number" size="middle" />
                </Form.Item>

                <PackageForm data={data?.packages} />

                {/*   */}

                <Form.Item<FieldType>
                  name="remember"
                  valuePropName="checked"
                  label={null}
                  rules={[
                    {
                      required: true,
                      message: "Debe aceptar los términos y condiciones",
                    },
                  ]}
                  required
                >
                  <Checkbox required>Acepto Terminos y Condiciones</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                  <SubmitButton form={form}>Registrar</SubmitButton>
                  {/* <Button
                    loading={loading}
                    className=" w-100 mt-2 p-3"
                    type="primary"
                    htmlType="submit"
                  >
                    Registrar
                  </Button> */}
                </Form.Item>
              </div>
            </Form>

            <ModalConfirm
              title="Todo luce correcto!"
              content={contentText()}
              handleSubmit={next}
              open={open}
              setOpen={setOpen}
              confirmLoading={loading}
              setConfirmLoading={setLoading}
              type="success"
            />
          </>
        ) : (
          <Result
            icon={
              <Icon
                icon={"material-symbols:check-circle"}
                // fade={validBeat}
                style={{
                  color: "#52c41a",
                  fontSize: "4rem",
                }}
              />
            }
            className="rounded-lg shadow-lg"
            style={{ width: "auto", backgroundColor: "white" }}
            title={
              <Typography.Title level={2}>Todo luce correcto!</Typography.Title>
            }
            subTitle={
              <Typography.Text type="secondary" style={{ fontSize: 16 }}>
                Continua el proceso de inscripcion realizando el pago
              </Typography.Text>
            }
            extra={[
              <Button
                // icon={}
                iconPosition="start"
                size="large"
                key="console"
                type="primary"
                className="mx-auto"
                // style={{ color: "black", backgroundColor: "white" }}
                onClick={() => next()}
              >
                Continuar{" "}
                <Icon
                  icon={"fa:forward"}
                  // beatFade={validBeat}
                  // size="lg"
                  style={{ color: "#FFF" }}
                />
              </Button>,
            ]}
          />
        )}
      </div>
    </>
  );
}
