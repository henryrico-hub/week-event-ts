import React from "react";
import { Dropdown, Space, Table, Typography } from "antd";
import type { MenuProps, TableColumnsType, TableProps } from "antd";
import { Icon } from "@iconify-icon/react";
import { createStyles } from "antd-style";
import { useNavigate } from "react-router-dom";
import DownloadMultipleFiles from "./utils/DownloadPayments";
import ExportModalTrigger from "./utils/ExportModalTrigger";

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

export type DataEType = {
  key: React.Key;
  name: string;
  category: string;
  date: string;
  url: string;
  price: number;
  countP: number;
};

type Props = {
  data: DataEType[];
};

const EventsTable = ({ data }: Props) => {
  const navigate = useNavigate();
  const { styles } = useStyle();
  console.log(data);

  const columns: TableColumnsType<DataEType> = [
    {
      title: "Nombre",
      dataIndex: "name",
      fixed: "left",
      // showSorterTooltip: { target: "full-header" },
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      width: 300,
      // render(value, record) {
      //   return (
      //     <p
      //       onClick={() => navigate(`/admin/myEvents/${record.url}`)}
      //       // className="hover:font-bold hover:cursor-pointer"
      //     >
      //       {value}
      //     </p>
      //   );
      // },
    },
    {
      title: "Categoria",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Pre-Inscritos",
      dataIndex: "countP",
      render(value) {
        return (
          <Typography.Text className="flex">
            {value}
            <Icon
              icon="mdi:account-group"
              width={20}
              height={20}
              className="ml-1"
              style={{ color: "var(--icon-dropHov)" }}
              inline={true}
            />
          </Typography.Text>
        );
      },
    },
    {
      title: "Fecha",
      dataIndex: "date",
    },
    {
      title: "Acción",
      dataIndex: "url",
      fixed: "right",
      width: 100,
      render(value) {
        const items: MenuProps["items"] = [
          {
            key: "details",
            label: (
              <div
                className="flex gap-1.5 items-center"
                onClick={() =>
                  navigate(`/admin/myEvents/${value}`, { replace: true })
                }
              >
                <Icon icon={"icons8:right-round"} inline={true} width={22} />
                <span className="custom-dropdown-item">Ver Inscritos</span>
              </div>
            ),
          },
          {
            key: "exportMedia",
            label: <DownloadMultipleFiles docCode={value} />,
          },
          {
            key: "exportData",
            label: <ExportModalTrigger url={value} />,
          },
        ];
        return (
          <Dropdown menu={{ items }}>
            <a className="flex justify-center">
              <Space>
                <Icon icon={"uis:ellipsis-v"} width={24} height={24}></Icon>
              </Space>
            </a>
          </Dropdown>
        );
      },
    },
  ];

  const onChange: TableProps<DataEType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table<DataEType>
      className={styles.customTable}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
      scroll={{ x: "max-content", y: 55 * 5 }}
      onRow={() => {
        return {
          onMouseEnter: (event) => {
            event.currentTarget.style.fontWeight = "600";
          },
          onMouseLeave: (event) => {
            event.currentTarget.style.fontWeight = "";
          },
          // onClick: (e) => {
          //   const target = e.target as HTMLElement;
          //   if (target.closest("button") || target.closest("a")) return;
          //   navigate(`/admin/myEvents/${record.url}`);
          // },
          style: {
            cursor: "pointer",
            // fontWeight: 600,
            // transition: "font-weight 0.2s",
          },
        };
      }}
    />
  );
};

export default EventsTable;
