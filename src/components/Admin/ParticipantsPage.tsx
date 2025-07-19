import { useEffect, useState } from "react";
import ParticipantsTable, { DataPType } from "./ParticipantsTable";
import { useParams } from "react-router-dom";
import { getParticipantListByEvent } from "src/models/event.server";
import { message } from "antd";

type paramsProps = {
  url: string;
};

function ParticipantsPage() {
  const { url } = useParams<paramsProps>();

  const [partData, setPartData] = useState<DataPType[]>([]);
  const [statsData, setStatsData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [consecNP, setConsecNP] = useState<number>(0);
  const [idEvent, setIdEvent] = useState<string>();
  const [urlE] = useState<string>(url ? url : "");

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     if (!url) {
  //       throw new Error("url is required");
  //     }
  //     const response = await getParticipantListByEvent(url);
  //     setConsecNP(response.data[0].consecNumberPart);
  //     setIdEvent(response.data[0].documentId);
  //     const formattedData: DataPType[] = response.data[0].participants.map(
  //       (part: any) => ({
  //         ...part,
  //         key: part.documentId,
  //         key2: part.documentId.slice(0, 6),
  //         participantNumber: part.participant_number,
  //         name:
  //           part.name +
  //           " " +
  //           part.paternal_surname +
  //           " " +
  //           part.maternal_surname,
  //         gender: part.gender,
  //         payment: part.payment?.[0],
  //       })
  //     );

  //     const genderCounts = response.data[0].participants.reduce(
  //       (acc: any, curr: any) => {
  //         acc[curr.gender] = (acc[curr.gender] || 0) + 1;
  //         return acc;
  //       },
  //       {} as Record<string, number>
  //     );

  //     const statusCounts: { Complete: number; Pending: 0 } =
  //       response.data[0].participants.reduce(
  //         (acc: any, curr: any) => {
  //           acc[curr.statusP] = (acc[curr.statusP] || 0) + 1;
  //           return acc;
  //         },
  //         { Complete: 0, Pending: 0 } as Record<string, number>
  //       );

  //     const paymentStatusCount = response.data[0].participants.reduce(
  //       (acc: Record<string, number>, curr: any) => {
  //         const hasPayment =
  //           curr.payment && curr.payment.length > 0 ? "Si" : "No";
  //         acc[hasPayment] = (acc[hasPayment] || 0) + 1;
  //         return acc;
  //       },
  //       {}
  //     );
  //     const pendingWithAndWithoutPayment = response.data[0].participants.reduce(
  //       (
  //         acc: { totalPending: number; pendingWithPayment: number },
  //         curr: any
  //       ) => {
  //         if (curr.statusP === "Pending") {
  //           acc.totalPending += 1;
  //           if (curr.payment && curr.payment.length > 0) {
  //             acc.pendingWithPayment += 1;
  //           }
  //         }
  //         return acc;
  //       },
  //       { totalPending: 0, pendingWithPayment: 0 }
  //     );

  //     const statsData = {
  //       genderCounts,
  //       statusCounts,
  //       paymentStatusCount,
  //       pendingWithAndWithoutPayment,
  //     };
  //     setStatsData(statsData);
  //     setPartData(formattedData);
  //   } catch (error) {
  //     console.error(error);
  //     message.error("Error while fetching Participants!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!url) {
          throw new Error("url is required");
        }
        const response = await getParticipantListByEvent(url);
        setConsecNP(response.data[0].consecNumberPart);
        setIdEvent(response.data[0].documentId);
        const formattedData: DataPType[] = response.data[0].participants.map(
          (part: any) => ({
            ...part,
            key: part.documentId,
            key2: part.documentId.slice(0, 6),
            participantNumber: part.participant_number,
            name:
              part.name +
              " " +
              part.paternal_surname +
              " " +
              part.maternal_surname,
            gender: part.gender,
            payment: part.payment?.[0],
          })
        );

        const genderCounts = response.data[0].participants.reduce(
          (acc: any, curr: any) => {
            acc[curr.gender] = (acc[curr.gender] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        const statusCounts: { Complete: number; Pending: 0 } =
          response.data[0].participants.reduce(
            (acc: any, curr: any) => {
              acc[curr.statusP] = (acc[curr.statusP] || 0) + 1;
              return acc;
            },
            { Complete: 0, Pending: 0 } as Record<string, number>
          );

        const paymentStatusCount = response.data[0].participants.reduce(
          (acc: Record<string, number>, curr: any) => {
            const hasPayment =
              curr.payment && curr.payment.length > 0 ? "Si" : "No";
            acc[hasPayment] = (acc[hasPayment] || 0) + 1;
            return acc;
          },
          {}
        );
        const pendingWithAndWithoutPayment =
          response.data[0].participants.reduce(
            (
              acc: { totalPending: number; pendingWithPayment: number },
              curr: any
            ) => {
              if (curr.statusP === "Pending") {
                acc.totalPending += 1;
                if (curr.payment && curr.payment.length > 0) {
                  acc.pendingWithPayment += 1;
                }
              }
              return acc;
            },
            { totalPending: 0, pendingWithPayment: 0 }
          );

        const statsData = {
          genderCounts,
          statusCounts,
          paymentStatusCount,
          pendingWithAndWithoutPayment,
        };
        setStatsData(statsData);
        setPartData(formattedData);
      } catch (error) {
        console.error(error);
        message.error("Error while fetching Participants!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updateData, url]);

  return (
    <div className="container-md py-10">
      <ParticipantsTable
        numParti={consecNP}
        statsData={statsData}
        data={partData}
        loading={loading}
        setLoading={setLoading}
        setUpdateData={setUpdateData}
        idEvent={idEvent}
        urlE={urlE}
      />
    </div>
  );
}

export default ParticipantsPage;
