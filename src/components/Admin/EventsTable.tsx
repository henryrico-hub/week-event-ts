import React from "react";
import { Button, Table, Tooltip, Typography } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Icon } from "@iconify-icon/react";
import { createStyles } from "antd-style";
import { useNavigate } from "react-router-dom";
import DownloadMultipleFiles from "./utils/DownloadPayments";

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

  const columns: TableColumnsType<DataEType> = [
    {
      title: "Nombre",
      dataIndex: "name",
      fixed: "left",
      // showSorterTooltip: { target: "full-header" },
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
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
        return (
          <div className="flex justify-center">
            <Tooltip
              title={<p className="text-center">Gestionar participantes</p>}
              placement="top"
              arrow={false}
            >
              <Button
                type="link"
                // href={`myEvents/${value}`}
                onClick={() => {
                  navigate(`/admin/myEvents/${value}`, { replace: true });
                }}
                icon={
                  <Icon icon={"icons8:right-round"} inline={true} width={22} />
                }
              />
            </Tooltip>
            <DownloadMultipleFiles docCode={value} />
          </div>
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
    />
  );
};

export default EventsTable;
