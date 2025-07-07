import {
  Input,
  Select,
  Image,
  Button,
  message,
  Divider,
  Tooltip,
  Form,
  FormInstance,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getParticipantListByEvent,
  updateParticipant,
} from "src/models/event.server";
import { EventType, Participant } from "src/types";
import { Icon } from "@iconify-icon/react";
import { FieldType } from "../Forms/Step1";
import CountrySelect from "../Forms/FormElements/CountrySelect";
import PhoneInput from "../Forms/FormElements/PhoneInput";

interface SubmitButtonProps {
  form: FormInstance;
  initialValues: any;
}
type paramsProps = {
  urlE: string;
  participant: string;
};

function DetailsParticipants() {
  const [messageApi, contextHolder] = message.useMessage();
  const { urlE, participant } = useParams<paramsProps>();
  const [initialFormValues, setInitialFormValues] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [participantSelected, setParticipantSelected] = useState<Participant>();
  const [updateData, setUpdateData] = useState<boolean>(false);
  const [dataEvent, setDataEvent] = useState<EventType>();

  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!urlE) {
        throw new Error("url is required");
      }
      const response = await getParticipantListByEvent(urlE);
      const foundParticipant = response.data[0].participants.find(
        (part: Participant) => part.documentId === participant
      );

      // Si se encuentra, estructura el objeto con los campos que necesitas
      if (foundParticipant) {
        // console.log("fetch", foundParticipant);

        const formattedParticipant: any = {
          id: foundParticipant.id,
          documentId: foundParticipant.documentId,
          name: foundParticipant.name,
          paternalSurname: foundParticipant.paternal_surname,
          maternalSurname: foundParticipant.maternal_surname,
          gender: foundParticipant.gender,
          birthday: foundParticipant.birthday,
          bloodType: foundParticipant.bloodType,
          email: foundParticipant.email,
          categoryP: foundParticipant.categoryP,
          country: foundParticipant.country,
          state: foundParticipant.state,
          city: foundParticipant.city,
          address: foundParticipant.address,
          team: foundParticipant.team,
          package: foundParticipant.package,
          size: foundParticipant.size,
          payment: foundParticipant.payment,
          phone: foundParticipant.phone.split("-")[1],
          emergencyContactName: foundParticipant.emergency_contact_name,
          emergencyContactPhone:
            foundParticipant.emergency_contact_phone.split("-")[1],
          prefix1: foundParticipant.phone.split("-")[0],
          prefix2: foundParticipant.emergency_contact_phone.split("-")[0],
          statusP: foundParticipant.statusP,
          participantNumber: foundParticipant.participant_number,
          publishedAt: foundParticipant.publishedAt,
          createdAt: foundParticipant.createdAt,
          updatedAt: foundParticipant.updatedAt,
        };

        setParticipantSelected(formattedParticipant);
        // console.log(formattedParticipant);
        const initial = {
          name: formattedParticipant.name,
          lastname: formattedParticipant.paternalSurname,
          lastnameS: formattedParticipant.maternalSurname,
          birthday: formattedParticipant.birthday,
          gender: formattedParticipant.gender,
          email: formattedParticipant.email,
          address: formattedParticipant.address,
          country: formattedParticipant.country,
          state: formattedParticipant.state,
          city: formattedParticipant.city,
          team: formattedParticipant.team,
          phone: formattedParticipant.phone,
          emergencyContactName: formattedParticipant.emergencyContactName,
          emergencyContactPhone: formattedParticipant.emergencyContactPhone,
          prefix1: formattedParticipant.prefix1,
          prefix2: formattedParticipant.prefix2,
        };

        setInitialFormValues(initial);
      }
    } catch (error) {
      console.error(error);
      message.error("Error while fetching Participants!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [, updateData]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Errores ->", errorInfo);
  };

  const onFinish = (values: any) => {
    setLoading(true);
    // console.log("values", values);

    const updatedUser = async () => {
      const dataToSend: {
        name: string;
        paternal_surname: string;
        maternal_surname: string;
        birthday: Date;
        gender: "Masculino" | "Femenino";
        // event: string | undefined;
        // categoryP: string;
        // package: string;
        // size: string;
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
        // categoryP: values.category,
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
        // package: values.package,
        phone: values.prefix1 + "-" + values.phone,
        // size: values.size,
        state: values.state,
        team: values.team,
        // event: data?.documentId,
      };
      // console.log(dataToSend, "aqui" + participantSelected?.documentId);

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
        } = await updateParticipant(
          participantSelected?.documentId,
          dataToSend
        );
        // setRegisterId(response.data.documentId.slice(0, 6));
        // setDataParticipant(response.data);
        setTimeout(() => {
          successM();
          window.scrollTo(0, 0);
          form.setFieldsValue(initialFormValues);
          form.resetFields();
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Error fetching path User:", error);
        setTimeout(() => {
          errorM();
          setLoading(false);
        }, 2000);
        // window.scrollTo(0, 0);
      } finally {
        setUpdateData((prev) => !prev);
      }
    };
    updatedUser();
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

  const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
    form,
    children,
    initialValues = {},
  }) => {
    const [submittable, setSubmittable] = useState<boolean>(false);
    // Watch all values
    const currentValues = Form.useWatch([], form);

    useEffect(() => {
      const isChanged = Object.keys(initialValues).some((key) => {
        return currentValues?.[key] !== initialValues?.[key];
      });
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(isChanged))
        .catch(() => setSubmittable(false));
    }, [currentValues, form, initialValues]);

    return (
      <Button
        className="w-100"
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
    <div className="container p-4 md:p-10">
      {contextHolder}
      {participantSelected && (
        <Form
          form={form}
          name="basic"
          // style={{ maxWidth: "486px", backgroundColor: "white" }}
          // wrapperCol={{ span: 16 }}
          // labelCol={{ span: 10 }}
          variant={variant || "filled"}
          initialValues={{
            name: participantSelected.name,
            lastname: participantSelected.paternalSurname,
            lastnameS: participantSelected.maternalSurname,
            birthday: participantSelected.birthday,
            gender: participantSelected.gender,
            email: participantSelected.email,
            address: participantSelected.address,
            country: participantSelected.country,
            state: participantSelected.state,
            city: participantSelected.city,
            team: participantSelected.team,
            phone: participantSelected.phone,
            emergencyContactName: participantSelected.emergencyContactName,
            emergencyContactPhone: participantSelected.emergencyContactPhone,
            prefix1: participantSelected.prefix1,
            prefix2: participantSelected.prefix2,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={loading}
        >
          <div className="flex md:flex-row flex-col justify-between bg-white rounded-xl shadow gap-2 p-6 my-4">
            <div>
              <h2>Numero de Participante</h2>
              <span className="text-6xl">#</span>
              <span className="text-6xl">
                {participantSelected.participantNumber
                  ? participantSelected.participantNumber
                  : "Sin asignar"}
              </span>
            </div>
            <div className="flex items-center">
              <Form.Item label={null} noStyle>
                <SubmitButton form={form} initialValues={initialFormValues}>
                  Actualizar Participante
                </SubmitButton>
              </Form.Item>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-10">
            <>
              <div className="grid grid-cols-2 gap-x-5">
                <Form.Item<FieldType>
                  label="Nombres"
                  name="name"
                  className="col-span-2 md:col-span-1"
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
                  className="col-span-2 md:col-span-1"
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
                  className="col-span-2 md:col-span-1"
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
                  className="col-span-2 md:col-span-1"
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
                  className="col-span-2 md:col-span-1"
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

                {/* <Form.Item<FieldType>
                    label="Tipo de Sangre"
                    name="bloodtype"
                    hasFeedback
                    rules={[{ required: true, message: "El campo es requerido" }]}
                  >
                    <Select size="middle" disabled>
                      <Select.Option value="A+">A+</Select.Option>
                      <Select.Option value="A-">A-</Select.Option>
                      <Select.Option value="B+">B+</Select.Option>
                      <Select.Option value="B-">B-</Select.Option>
                      <Select.Option value="AB+">AB+</Select.Option>
                      <Select.Option value="AB-">AB-</Select.Option>
                      <Select.Option value="O+">O+</Select.Option>
                      <Select.Option value="O-">O-</Select.Option>
                    </Select>
                  </Form.Item> */}
                <Form.Item<FieldType>
                  label="Correo electronico"
                  name="email"
                  className="col-span-2 md:col-span-1"
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
                {/* {data?.event_category_scs && data.event_category_scs.length > 0 ? (
                    <Form.Item<FieldType>
                      label="Categoría"
                      name="category"
                      hasFeedback
                      rules={[
                        { required: true, message: "Selecciona una categoría" },
                      ]}
                    >
                      <Select placeholder="Selecciona una categoría" size="middle">
                        {data?.event_category_scs.map((cate) => (
                          <Select.Option key={cate.id} value={cate.slug}>
                            {cate.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  ) : null} */}

                <Divider className="col-span-2" orientation="center">
                  Dirección de contacto
                </Divider>

                {/* Country-State-City */}
                <CountrySelect nameC="country" nameCt="city" nameS="state" />

                <Form.Item<FieldType>
                  label="Dirección"
                  name="address"
                  className="col-span-2 md:col-span-1"
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

                <Form.Item<FieldType>
                  label={"Equipo"}
                  name="team"
                  className="col-span-2 md:col-span-1"
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
                  label="Contacto de emergencia"
                  className="col-span-2 md:col-span-1"
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
                  init={true}
                />
              </div>

              <div className="flex flex-col text-center justify-center px-4 md:px-16">
                <Divider>
                  <Tooltip title={"Edición no disponible"} arrow={false}>
                    <span className="text-lg font-bold">
                      Comprobante de pago
                    </span>
                  </Tooltip>
                </Divider>

                {participantSelected.payment ? (
                  <Image
                    style={{ maxWidth: 350, margin: "0 auto" }}
                    src={`${import.meta.env.VITE_API_URL_SHORT}${
                      participantSelected.payment[0].url
                    }`}
                    alt={`comprobante de pago${participantSelected.name}`}
                  />
                ) : (
                  <Icon
                    icon={"carbon:no-image"}
                    width={42}
                    className="flex content-center p-4"
                  ></Icon>
                )}
              </div>

              {/* <PackageForm data={data?.packages} /> */}
            </>
          </div>
        </Form>
      )}
    </div>
  );
}

export default DetailsParticipants;
