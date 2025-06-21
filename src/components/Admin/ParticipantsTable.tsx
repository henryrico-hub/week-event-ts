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
  ConfigProvider,
} from "antd";
import type {
  InputRef,
  TableColumnsType,
  TableColumnType,
  TableProps,
} from "antd";
import { Icon } from "@iconify-icon/react";
import { createStyles } from "antd-style";
import { Payment } from "src/types";
import type { MenuProps } from "antd";
import axios from "axios";
import type { FilterDropdownProps } from "antd/es/table/interface";
import ParticipantsTableHeader from "./ParticipantsTableHeader";
import SizeTagColor from "./utils/SizeTagColor";
// import Highlighter from "react-highlight-words";

const useStyle = createStyles(({ css }) => {
  return {
    customTable: css`
      .ant-table {
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
  // lastname: string;
  // lastname2: string;
  birthday: string;
  package: string;
  size: string;
  gender: string;
  payment: Payment;
  statusP: "Pending" | "Success" | string;
  categoryP: string;
};

type Props = {
  statsData: any;
  data: DataPType[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
};

type DataIndex = keyof DataPType;

const EventsTable = ({
  data,
  loading,
  setLoading,
  setUpdateData,
  statsData,
}: Props) => {
  const { styles } = useStyle();

  console.log(data);

  const [, setSearchText] = useState("");
  const [, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

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
      className: "bg-blue-200",
      dataIndex: "key2",
      fixed: "left",
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
      title: "Nombre",
      dataIndex: "name",
      fixed: "left",
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      width: 200,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Paquete",
      dataIndex: "package",
      onFilter: (value, record) =>
        record.package.indexOf(value as string) === 0,
      sorter: (a, b) => a.package.localeCompare(b.package),
      sortDirections: ["ascend", "descend"],
      width: 150,
      render(value) {
        // Extract the package name before the arrow, or fallback to the whole value
        if (value) {
          const packageName = value.replace(" -> ", " ");
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
      onFilter: (value, record) => record.size.indexOf(value as string) === 0,
      sorter: (a, b) => a.size.localeCompare(b.size),
      sortDirections: ["ascend", "descend"],
      width: 150,
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
    // {
    //   title: "Fecha de nacimiento",
    //   dataIndex: "birthday",
    //   onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    //   sorter: (a, b) => a.name.localeCompare(b.name),
    //   sortDirections: ["ascend", "descend"],
    //   width: 150,
    // },
    {
      title: "Genero",
      dataIndex: "gender",
      // onFilter: (value, record) => record.gender.indexOf(value as string) === 0,
      // sorter: (a, b) => a.gender.localeCompare(b.gender),
      // sortDirections: ["ascend", "descend"],
      width: 100,
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
      width: 120,
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
      render(value) {
        return value?.url ? (
          <div className="flex justify-center">
            <Image
              src={`${import.meta.env.VITE_API_URL_SHORT}${value?.url}`}
              style={{
                maxWidth: "100px",
                border: " npx dashed #28a745",
                boxShadow: "5px 5px 10px rgba(0,0,0,0.4)",
              }}
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
          <Dropdown menu={{ items }} trigger={["click"]}>
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
      const Newstatus = "Complete";
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/participants/${record.key}`,
        {
          data: {
            statusP: Newstatus,
          },
        }
      );
      console.log(response);
      setUpdateData((prev) => !prev);
      message.success("Estado actualizado con éxito", 5);
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
      console.log(response);
      setUpdateData((prev) => !prev);
      message.success("Estado actualizado con éxito", 5);
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

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/participants/${record.key}`
      );
      console.log(response);
      setUpdateData((prev) => !prev);
      message.success(`El participante ${record.name} a sido eliminado`, 10);
    } catch (error) {
      console.error(error);
      message.error("Error al intentar elimianr el Participante", 10);
    } finally {
      setLoading(false);
    }
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
      case "send":
        // ...
        break;
    }
  };

  const onChange: TableProps<DataPType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <ParticipantsTableHeader data={statsData} loading={loading} />
      <ConfigProvider
        theme={{
          components: {
            Table: {
              rowHoverBg: "#f7f7f7",
            },
          },
        }}
      >
        <Table<DataPType>
          className={styles.customTable}
          style={{ paddingTop: "16px", paddingBottom: "16px" }}
          columns={columns}
          loading={loading}
          dataSource={data}
          onChange={onChange}
          showSorterTooltip={{ target: "sorter-icon" }}
          scroll={{ x: "max-content", y: 55 * 10 }}
          // size="small"
        />
      </ConfigProvider>
    </>
  );
};

export default EventsTable;
