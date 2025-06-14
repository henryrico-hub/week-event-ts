import { Table, ConfigProvider } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";

// import Highlighter from "react-highlight-words";

const useStyle = createStyles(({ css }) => {
  return {
    customTable: css`
      .ant-table {
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

    // {
    //   title: "genero",
    //   dataIndex: "gender",
    //   width: 200,
    // },
    // {
    //   title: "Categoria",
    //   dataIndex: "category",
    //   width: 100,
    // },
    // {
    //   title: "Estado",
    //   dataIndex: "statusP",
    //   width: 200,
    //   render(value) {
    //     return (
    //       <div className="flex justify-center items-center">
    //         <Typography.Text>{value.toUpperCase()}</Typography.Text>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Comp. de Pago",
    //   dataIndex: "payment",
    //   width: 150,
    //   render(value) {
    //     return <></>;
    //   },
    // },
  ];

  return (
    <div className="py-4">
      {data && (
        <ConfigProvider
          theme={{
            components: {
              Table: {
                rowHoverBg: "#f7f7f7",
              },
            },
          }}
        >
          <Table<StatsPType>
            className={styles.customTable}
            columns={columns}
            loading={loading}
            dataSource={[data]}
            bordered
            size="small"
            pagination={false}
          />
        </ConfigProvider>
      )}
    </div>
  );
};

export default EventsTable;
