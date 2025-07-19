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
  Tooltip,
  message,
} from "antd";
import { Icon } from "@iconify-icon/react";
import Title from "antd/es/typography/Title";
import type { FormInstance } from "antd";
import { postParticipant } from "src/models/event.server";
import { EventType } from "src/types";
import ModalConfirm from "./Upload/ModalConfirm";
import CountrySelect from "./FormElements/CountrySelect";
import PackageForm from "./FormElements/PackageForm";
import PhoneInput from "./FormElements/PhoneInput";
import ExpiredModal from "./FormElements/ModalExpired";
import { formatearFechalg } from "src/utils/helpers";
import FullModal from "./FormElements/ModalFullEvent";

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
  | "team"
  | "remember"
  | "prefix1"
  | "prefix2";

interface SubmitButtonProps {
  form: FormInstance;
}

type Step1Props = {
  next: () => void;
  setRegisterId: React.Dispatch<React.SetStateAction<string>>;
  data: EventType;
  setDataParticipant: React.Dispatch<React.SetStateAction<any>>;
};

export default function Step1({
  next,
  setRegisterId,
  data,
  setDataParticipant,
}: Step1Props) {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);

  const [loading, setLoading] = useState(false);
  const [validForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [openExpired, setOpenExpired] = useState<boolean>(false);
  const [openFull, setOpenFull] = useState<boolean>(false);

  useEffect(() => {
    if (!data?.endRegistrationDate) return;
    if (!data?.consecNumberPart && !data?.maxNumberP) return;

    const isFull = (number: number): boolean => {
      const numeroMaximo = data.maxNumberP;
      const numeroConsec = number;
      return numeroConsec >= numeroMaximo;
    };

    const isExpired = (dateEvent: Date): boolean => {
      const currentDate = new Date();
      const expiredDate = new Date(dateEvent);
      return currentDate > expiredDate;
    };

    const expired = isExpired(data.endRegistrationDate);
    const full = isFull(data.consecNumberPart);
    // setOpenExpired(expired);
    if (expired) {
      setTimeout(() => {
        setOpenExpired(true);
      }, 1000);
    } else if (full) {
      setOpenFull(true);
    } else {
      setOpenExpired(false);
      setOpenFull(false);
    }
  }, [data?.endRegistrationDate, data?.consecNumberPart, data?.maxNumberP]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Errores ->", errorInfo);
  };

  const onFinish = (values: any) => {
    setLoading(true);
    const createUser = async () => {
      const dataToSend: {
        name: string;
        paternal_surname: string;
        maternal_surname: string;
        birthday: Date;
        gender: "Masculino" | "Femenino";
        event: string | undefined;
        categoryP: string;
        package: string;
        size: string;
        country: string;
        state: string;
        city: string;
        address: string;
        emergency_contact_name: string;
        emergency_contact_phone: string;
        email: string;
        phone: string;
        team: string;
      } = {
        address: values.address,
        birthday: values.birthday,
        categoryP: values.category,
        city: values.city,
        country: values.country,
        email: values.email,
        emergency_contact_name: values.emergencyContactName,
        emergency_contact_phone:
          values.prefix2 + "-" + values.emergencyContactPhone,
        gender: values.gender,
        paternal_surname: values.lastname,
        maternal_surname: values.lastnameS,
        name: values.name,
        package: values.package,
        phone: values.prefix1 + "-" + values.phone,
        size: values.size,
        state: values.state,
        team: values.team,
        event: data?.documentId,
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
        } = await postParticipant(dataToSend);
        setRegisterId(response.data.documentId.slice(0, 6));
        setDataParticipant(response.data);
        setTimeout(() => {
          successM();
          window.scrollTo(0, 0);
          setLoading(false);
          setOpen(true);
          // setValidForm(true);
        }, 3000);
      } catch (error) {
        console.error("Error fetching post User:", error);
        setTimeout(() => {
          errorM();
          setLoading(false);
        }, 2000);
        // window.scrollTo(0, 0);
      } finally {
        // setLoading(false);
      }
    };
    createUser();
  };

  const successM = () => {
    messageApi.open({
      type: "success",
      content: "Registro correcto!",
    });
  };

  const errorM = () => {
    messageApi.open({
      type: "error",
      content: "Error mientras se intentaba registrar el participante",
    });
  };

  const contentText = () => {
    return (
      <Space direction="vertical" size={"small"}>
        <Text type="secondary">Completa tu inscripción realizando el pago</Text>
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
                    {`Plazo de inscripción: Disponible hasta el ${formatearFechalg(
                      data?.endRegistrationDate
                    )}`}
                  </Text>
                </Space>
                <Divider></Divider>

                <Form.Item<FieldType>
                  label="Nombres"
                  name="name"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu nombre",
                    },
                    { min: 2, message: "Por lo menos dos caracteres" },
                  ]}
                >
                  <Input size="middle" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Apellido paterno"
                  name="lastname"
                  hasFeedback
                  rules={[
                    { required: true, message: "Ingresa apellido" },
                    { min: 2, message: "Por lo menos dos caracteres" },
                  ]}
                >
                  <Input size="middle" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Apellido materno"
                  name="lastnameS"
                  hasFeedback
                  rules={[
                    { required: true, message: "Ingresa apellido" },
                    { min: 2, message: "Por lo menos dos caracteres" },
                  ]}
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
                    <Select.Option value="Masculino">Masculino</Select.Option>
                    <Select.Option value="Femenino">Femenino</Select.Option>
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
                      type: "email",
                      message: "Ingresa un email valido",
                    },
                    {
                      required: true,
                      message: "Ingresa tu email",
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

                <Divider orientation="center">Dirección de contacto</Divider>
                <Form.Item<FieldType>
                  label="Dirección"
                  name="address"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "El campo es requerido",
                    },
                    { min: 2, message: "Por lo menos dos caracteres" },
                  ]}
                >
                  <Input size="middle" />
                </Form.Item>

                {/* Country-State-City */}
                <CountrySelect nameC="country" nameCt="city" nameS="state" />

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
                  label={
                    <Tooltip
                      className="flex justify-center items-center py-2"
                      title="Ingresa el nombre de tu equipo si participas con amigos o compañeros. Esto nos ayuda a agrupar a los participantes y facilitar la organización en futuros eventos."
                    >
                      <span className="text-black font-bold">Equipo</span>
                      <Icon
                        icon={"akar-icons:question"}
                        className="text-black pl-1"
                        inline={true}
                      />
                    </Tooltip>
                  }
                  name="team"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "El campo es requerido",
                    },
                    { min: 2, message: "Por lo menos dos caracteres" },
                  ]}
                >
                  <Input size="middle" placeholder="Agrega a tu equipo"></Input>
                </Form.Item>

                {/* Phone */}
                <PhoneInput
                  label={"Num. de Teléfono"}
                  name={"phone"}
                  prefix="prefix1"
                />

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
                  <Input size="middle" placeholder="Contacto de emergencia" />
                </Form.Item>

                {/* Emergency Phone */}
                <PhoneInput
                  label={"Num. contacto de emergencia"}
                  name={"emergencyContactPhone"}
                  prefix={"prefix2"}
                />

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
            <ExpiredModal openM={openExpired} />
            <FullModal openM={openFull} />
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
