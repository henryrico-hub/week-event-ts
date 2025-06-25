import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";

// import Highlighter from "react-highlight-words";

const useStyle = createStyles(({ css }) => {
  return {
    customTable: css`
      .ant-table {
        .ant-table-title {
          background-color: #ffcc00;
          font-size: 14px;
        }
        .ant-table-container {
          .ant-table-body,
          .ant-table-content {
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

export type StatsPType = {
  genderCounts: {
    Femenino: number;
    Masculino: number;
  };
  statusCounts: {
    Complete: number;
    Pending: number;
  };
  paymentStatusCount: {
    pendingWithPayment: number;
    totalPending: number;
  };
  pendingWithAndWithoutPayment: {
    pendingWithPayment: number;
    totalPending: number;
  };
};

type Props = {
  data: StatsPType;
  loading: boolean;
};

const EventsTable = ({ loading, data }: Props) => {
  const { styles } = useStyle();

  const columns: TableColumnsType<StatsPType> = [
    {
      title: "Género",
      align: "center",
      key: "gender",
      children: [
        {
          title: "Masculino",
          align: "center",
          dataIndex: ["genderCounts", "Masculino"], // ✅ forma segura de acceder
          key: "masculino",
          width: 150,
        },
        {
          title: "Femenino",
          align: "center",
          dataIndex: ["genderCounts", "Femenino"],
          key: "femenino",
          width: 150,
        },
      ],
    },
    {
      title: "Estatus",
      key: "status",
      children: [
        {
          title: "Completados",
          align: "center",
          dataIndex: ["statusCounts", "Complete"],
          key: "complete",
        },
        {
          title: "Pendientes",
          align: "center",
          dataIndex: ["statusCounts", "Pending"],
          key: "pending",
        },
        {
          title: "Pendientes con pago",
          align: "center",
          dataIndex: ["pendingWithAndWithoutPayment", "pendingWithPayment"],
          key: "pendingWithPayment",
        },
      ],
    },
  ];

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 750
  );
  const [filteredColumns, setFilteredColumns] = useState(
    isMobile ? columns.filter((col) => col.key !== "gender") : columns
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 750;
      setIsMobile(mobile);
      setFilteredColumns(
        mobile ? columns.filter((col) => col.key !== "gender") : columns
      );
    };

    window.addEventListener("resize", handleResize);
    // Call once to set initial state
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-4">
      {data && (
        // <ConfigProvider
        //   theme={{
        //     components: {
        //       Table: {
        //         // rowHoverBg: "#f7f7f7",
        //         // borderColor: "#000",
        //         // headerBg: "#FFCC00",
        //       },
        //     },
        //   }}
        // >
        <Table<StatsPType>
          className={styles.customTable}
          columns={filteredColumns}
          loading={loading}
          dataSource={[data]}
          bordered
          size="small"
          pagination={false}
          title={() => (
            <h2 className="p-1 text-center">Estadisticas de Participantes</h2>
          )}
        />
        // </ConfigProvider>
      )}
    </div>
  );
};

export default EventsTable;
