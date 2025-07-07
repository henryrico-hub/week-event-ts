import React, { useRef, useState } from "react";
import {
  Table,
  Image,
  Tag,
  Typography,
  Dropdown,
  Space,
  message,
  Popconfirm,
  Input,
  Button,
  // ConfigProvider,
  Checkbox,
} from "antd";
import type {
  InputRef,
  TableColumnsType,
  TableColumnType,
  // TableProps,
  CheckboxOptionType,
} from "antd";
import { Icon } from "@iconify-icon/react";
import { createStyles } from "antd-style";
import { Payment } from "src/types";
import type { MenuProps } from "antd";
import axios from "axios";
import type { FilterDropdownProps } from "antd/es/table/interface";
import ParticipantsTableHeader from "./ParticipantsTableHeader";
import SizeTagColor from "./utils/SizeTagColor";
import { useNavigate } from "react-router-dom";

const useStyle = createStyles(({ css }) => {
  return {
    customTable: css`
      .ant-table {
        .ant-table-title {
          background-color: #ffcc00;
          font-size: 20px;
          padding: 8px;
        }
        .ant-table-container {
          .ant-table-body,
          .ant-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

export type DataPType = {
  key2: React.Key;
  key: React.Key;
  name: string;
  participantNumber: number;
  bloodTpye: string;
  lastname: string;
  lastname2: string;
  birthday: string;
  package: string;
  size: string;
  gender: string;
  payment: Payment;
  email: string;
  statusP: "Pending" | "Success" | string;
  categoryP: string;
  country: string;
  state: string;
  city: string;
  address: string;
  team: string;
  phone: number;
  emergencyContactName: string;
  emergencyContactPhone: number;
};

type Props = {
  statsData: any;
  data: DataPType[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
  numParti: number;
  idEvent?: string;
  urlE: string;
};

type DataIndex = keyof DataPType;

const defaultCheckedList = [
  "key2",
  "name",
  "participantNumber",
  // "birthday",
  "package",
  "size",
  "gender",
  // "categoryP",
  "statusP",
  "payment",
  "action",
];

const EventsTable = ({
  data,
  loading,
  setLoading,
  setUpdateData,
  statsData,
  numParti,
  idEvent,
  urlE,
}: Props) => {
  // console.log(data && data);

  const navigate = useNavigate();
  const { styles } = useStyle();
  const [, setSearchText] = useState("");
  const [, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataPType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex === "key" ? "Id" : "nomber"}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<Icon icon="mdi:magnify" />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Borrar
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <Icon
        icon="mdi:magnify"
        style={{ color: filtered ? "#1677ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      dataIndex === "key" ? (
        <Typography.Text
          strong
          className="flex justify-center underline text-md"
        >
          {text}
        </Typography.Text>
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataPType> = [
    {
      title: "Id",
      className: "bg-blue-100",
      dataIndex: "key2",
      key: "key2",
      // fixed: "left",
      width: 90,
      // render(value) {
      //   return (
      //     <Typography.Text
      //       strong
      //       className="flex justify-center underline text-md"
      //     >
      //       {value.slice(0, 6)}
      //     </Typography.Text>
      //   );
      // },
      ...getColumnSearchProps("key2"),
    },
    {
      title: "#",
      dataIndex: "participantNumber",
      key: "participantNumber",
      // fixed: "left",
      width: 70,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      width: 200,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Fecha de nacimiento",
      dataIndex: "birthday",
      key: "birthday",
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      width: 150,
    },
    {
      title: "Paquete",
      dataIndex: "package",
      key: "package",
      className: "bg-blue-100",
      onFilter: (value, record) =>
        record.package.indexOf(value as string) === 0,
      sorter: (a, b) => a.package.localeCompare(b.package),
      sortDirections: ["ascend", "descend"],
      width: 150,
      render(value) {
        // Extract the package name before the arrow, or fallback to the whole value
        if (value) {
          const packageName = value.replace(" -> ", " $");
          return (
            <>
              <div className="flex justify-center font-bold">{packageName}</div>
            </>
          );
        }
      },
    },
    {
      title: "Talla",
      dataIndex: "size",
      key: "size",
      className: "bg-blue-100",
      onFilter: (value, record) => record.size.indexOf(value as string) === 0,
      sorter: (a, b) => a.size.localeCompare(b.size),
      sortDirections: ["ascend", "descend"],
      width: 100,
      render(value) {
        return (
          <>
            <div className="flex justify-center">
              {/* <Tag
                color={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              >
                {value}
              </Tag> */}
              <SizeTagColor value={value} />
            </div>
          </>
        );
      },
    },
    {
      title: "Genero",
      dataIndex: "gender",
      key: "gender",
      className: "bg-blue-100",
      // onFilter: (value, record) => record.gender.indexOf(value as string) === 0,
      // sorter: (a, b) => a.gender.localeCompare(b.gender),
      // sortDirections: ["ascend", "descend"],
      width: 70,
      render(value) {
        return (
          <>
            {value === "Masculino" ? (
              <div className="flex justify-center items-center">
                <Icon
                  icon="fa:male"
                  className="text-blue-400 mr-2"
                  width={20}
                  height={20}
                  inline={true}
                />
                {"M"}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <Icon
                  icon="fa:female"
                  className="text-rose-400 mr-2"
                  width={20}
                  height={20}
                  inline={true}
                />
                {"F"}
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Categoria",
      dataIndex: "categoryP",
      key: "categoryP",
      className: "bg-blue-100",
      onFilter: (value, record) =>
        record.categoryP.indexOf(value as string) === 0,
      sorter: (a, b) => a.categoryP.localeCompare(b.categoryP),
      sortDirections: ["ascend", "descend"],
      width: 200,
      render(value) {
        return (
          <div className="flex justify-center items-center">
            <Typography.Text>{value.toUpperCase()}</Typography.Text>
          </div>
        );
      },
    },
    {
      title: "Estado",
      dataIndex: "statusP",
      key: "statusP",
      className: "bg-blue-100",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Completo",
          value: "Complete",
        },
        {
          text: "Pendiente",
          value: "Pending",
        },
      ],
      onFilter: (value, record) =>
        record.statusP.indexOf(value as string) === 0,
      sorter: (a, b) => a.statusP.localeCompare(b.statusP),
      sortDirections: ["ascend", "descend"],
      width: 110,
      render(value) {
        return (
          <>
            {value === "Complete" ? (
              <div className="flex justify-center">
                <Tag color={"green"}>{"COMPLETADO"}</Tag>
              </div>
            ) : (
              <div className="flex justify-center">
                <Tag color={"processing"}>{"PENDIENTE"}</Tag>
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Comp. de Pago",
      dataIndex: "payment",
      key: "payment",
      fixed: "right",
      onFilter: (value, record) =>
        record.payment && typeof record.payment.url === "string"
          ? record.payment.url.indexOf(value as string) === 0
          : false,
      sorter: (a, b) => {
        const aUrl = a.payment?.url || "";
        const bUrl = b.payment?.url || "";
        return aUrl.localeCompare(bUrl);
      },
      sortDirections: ["ascend", "descend"],
      width: 150,
      render(value, record) {
        return value?.url ? (
          <div className="flex justify-center">
            <Image
              src={`${import.meta.env.VITE_API_URL_SHORT}${value?.url}`}
              style={{
                maxWidth: "80px",
                maxHeight: "80px",
                border: " npx dashed #28a745",
                boxShadow: "5px 5px 10px rgba(0,0,0,0.4)",
              }}
              alt={`payment by ${record.name}`}
              placeholder={
                <Image
                  preview={true}
                  src={`${import.meta.env.VITE_API_URL_SHORT}${value?.url}`}
                />
              }
            />
          </div>
        ) : (
          <Icon
            icon={"carbon:no-image"}
            width={28}
            height={28}
            className="flex content-center"
          ></Icon>
        );
      },
    },
    {
      title: "Acción",
      dataIndex: "action",
      fixed: "right",
      key: "action",
      width: 80,
      render: (_, record) => {
        const items: MenuProps["items"] = [
          record.statusP === "Complete"
            ? {
                key: "pending",
                label: (
                  <Popconfirm
                    title="Quieres cambiar el estado a PENDIENTE?"
                    onConfirm={() => handleMenuClick("pending", record)}
                    okText="Aceptar"
                    cancelText="Cancelar"
                  >
                    <div className="flex gap-1.5 items-center">
                      <Icon icon={"stash:arrows-switch-solid"} width={22} />
                      <span className="custom-dropdown-item">
                        Cambiar estado a Pendiente
                      </span>
                    </div>
                  </Popconfirm>
                ),
              }
            : {
                key: "accept",
                label: (
                  <>
                    <Popconfirm
                      title="¿Aceptar este comprobante? Está acción enviara una notificación al participante"
                      onConfirm={() => handleMenuClick("accept", record)}
                      okText="Aceptar"
                      cancelText="Cancelar"
                    >
                      <div className="flex gap-1.5 items-center">
                        <Icon
                          icon={"mdi:check-circle-outline"}
                          width={18}
                          // style={{ color: "#52c42a" }}
                          inline={true}
                        />
                        <span className="custom-dropdown-item">
                          Aceptar Comprobante
                        </span>
                      </div>
                    </Popconfirm>
                  </>
                ),
              },
          record.statusP === "Complete"
            ? {
                key: "send",
                label: (
                  <Popconfirm
                    title="Quieres reenviar la notificaición al participante?"
                    onConfirm={() => handleMenuClick("send", record)}
                    okText="Aceptar"
                    cancelText="Cancelar"
                  >
                    <div className="flex gap-2.5 items-center">
                      <Icon
                        icon={"icon-park-outline:accept-email"}
                        width={18}
                      />
                      <span onClick={() => handleMenuClick("send", record)}>
                        Reenviar Ticket
                      </span>
                    </div>
                  </Popconfirm>
                ),
              }
            : null,
          {
            type: "divider",
          },
          {
            key: "details",
            label: (
              <div
                className="flex gap-1.5 items-center"
                onClick={() => handleMenuClick("edit", record)}
              >
                <Icon icon={"mdi:pencil-outline"} width={18} />
                <span className="custom-dropdown-item">Detalles</span>
              </div>
            ),
          },
          {
            key: "delete",
            danger: true,
            label: (
              <Popconfirm
                title="Quieres ELIMINAR el participante?"
                onConfirm={() => handleMenuClick("delete", record)}
                // okText="Aceptar"
                cancelText="Cancelar"
              >
                <div className="flex gap-1.5 items-center">
                  <Icon icon={"mdi:trash-can-outline"} width={18} />
                  <span className="custom-dropdown-item">Borrar</span>
                </div>
              </Popconfirm>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }}>
            <a
              onClick={(e) => e.preventDefault()}
              className="flex justify-center"
            >
              <Space>
                <Icon icon={"uis:ellipsis-v"} width={24} height={24}></Icon>
              </Space>
            </a>
          </Dropdown>
        );
      },
    },
  ];

  const acceptPayment = async (record: DataPType) => {
    setLoading(true);
    try {
      if (!record.key) {
        throw new Error("key is required");
      }
      const token = localStorage.getItem("authToken");
      let numPartiSet;
      if (!record.participantNumber) {
        numPartiSet = (numParti ?? 0) + 1;
        //z if (numParti === null) {
        //   numPartiSet = 1;
        // } else {
        //   numPartiSet = numParti + 1;
        // }

        const Newstatus = "Complete";

        await axios.put(
          `${import.meta.env.VITE_API_URL}/participants/${record.key}`,
          {
            data: {
              statusP: Newstatus,
              participant_number: numPartiSet,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await axios.put(
          `${import.meta.env.VITE_API_URL}/events/${idEvent}`,
          {
            data: {
              consecNumberPart: numPartiSet,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUpdateData((prev) => !prev);
        message.success("Estado actualizado con éxito", 5);
      } else {
        const Newstatus = "Complete";
        await axios.put(
          `${import.meta.env.VITE_API_URL}/participants/${record.key}`,
          {
            data: {
              statusP: Newstatus,
              // participant_number: numPartiSet,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUpdateData((prev) => !prev);
        message.success("Estado actualizado con éxito", 5);
      }
    } catch (error) {
      console.error(error);
      message.error("Error al realizar la acción Success");
    } finally {
      setLoading(false);
    }
  };
  const PendingPayment = async (record: DataPType) => {
    setLoading(true);
    try {
      if (!record.key) {
        throw new Error("key is required");
      }
      const Newstatus = "Pending";
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/participants/${record.key}`,
        {
          data: {
            statusP: Newstatus,
          },
        }
      );
      if (response.status === 200) {
        setUpdateData((prev) => !prev);
        message.success("Estado actualizado con éxito", 5);
      }
    } catch (error) {
      console.error(error);
      message.error("Erro al intentar la acción Pen");
    } finally {
      setLoading(false);
    }
  };
  const DeleteP = async (record: DataPType) => {
    setLoading(true);
    try {
      if (!record.key) {
        throw new Error("key is required");
      }

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/participants/${record.key}`
      );
      // console.log(response);
      setUpdateData((prev) => !prev);
      message.success(`El participante ${record.name} a sido eliminado`, 10);
    } catch (error) {
      console.error(error);
      message.error("Error al intentar elimianr el Participante", 10);
    } finally {
      setLoading(false);
    }
  };

  const detailsP = (record: DataPType) => {
    // Navegar a la ruta de detalles del participante usando useNavigate
    navigate(`/admin/details/${urlE}/${record.key}`);
  };

  const handleMenuClick = (action: string, record: DataPType) => {
    switch (action) {
      case "accept":
        acceptPayment(record);
        break;
      case "delete":
        DeleteP(record);
        break;
      case "pending":
        PendingPayment(record);
        break;
      case "edit":
        detailsP(record);
        break;
      case "send":
        // ...
        break;
    }
  };

  // const onChange: TableProps<DataPType>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };

  const alwaysVisibleKeys = ["payment", "action"];
  const options = columns
    .filter(({ key }) => !alwaysVisibleKeys.includes(key as string))
    .map(({ key, title }) => ({
      label: title,
      value: key,
    }));

  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !(
      checkedList.includes(item.key as string) ||
      alwaysVisibleKeys.includes(item.key as string)
    ),
  }));

  return (
    <>
      <ParticipantsTableHeader data={statsData} loading={loading} />
      {/* <ConfigProvider
        theme={{
          token: {
            Checkbox: {
              colorPrimary: "#1677ff",
              colorPrimaryHover: "#4096ff",
              colorBgContainer: "#fffbe6",
              colorText: "#333",
              checkboxColor: "#1677ff",
              checkboxSize: 20,
            },
          },
        }}
      > */}
      <Checkbox.Group
        value={checkedList}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 2fr))",
        }}
        options={options as CheckboxOptionType[]}
        onChange={(value) => {
          setCheckedList(value as string[]);
        }}
      />

      {/* </ConfigProvider> */}
      <Table<DataPType>
        bordered={true}
        className={styles.customTable}
        style={{ paddingTop: "16px", paddingBottom: "16px" }}
        columns={newColumns}
        loading={loading}
        dataSource={data}
        // onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        scroll={{ x: "max-content", y: 60 * 10 }}
        title={() => <h2 className="text-center ">Inscritos</h2>}
        size="small"
      />
    </>
  );
};

export default EventsTable;
