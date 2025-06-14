import { EventType } from "src/types";
import { TicketPass } from "./Upload/TicketPass";
import { useEffect } from "react";

type Step2Props = {
  id: string;
  data: EventType;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
  dataParticipant: any;
};

export default function Step3({
  id,
  data,
  setUpdateData,
  dataParticipant,
}: Step2Props) {
  // setUpdateData((prev) => !prev);

  // const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="md:py-5 lg:py-10 lg:px-10 flex justify-center">
        <>
          {/* Formulario */}
          <div
            className="flex flex-col items-center p-10 rounded-lg shadow-large "
            style={{ backgroundColor: "white", width: "100%" }}
          >
            <TicketPass data={data} id={id} dataParticipant={dataParticipant} />
          </div>
        </>
      </div>
    </>
  );
}
