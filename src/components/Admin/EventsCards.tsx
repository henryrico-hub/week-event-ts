import { ConfigProvider, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/context/AuthContext";
import { getUserEventsArticles } from "src/models/event.server";
import { ArticleType, EventType } from "src/types";
import EventsTable, { DataEType } from "./EventsTable";
import { formatearFechalg } from "src/utils/helpers";

type userProps = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author_scs: AuthorSCS[];
};
export type AuthorSCS = {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  article_scs: ArticleType[];
  events: EventType[];
};

const SocialCards = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState<DataEType[]>([]);
  // const [articles, setArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: userProps[] = await getUserEventsArticles(user.id);
        // console.log(response[0].author_scs[0].events);
        // setArticles(response[0].author_scs[0].article_scs);
        const formattedData = response[0].author_scs[0].events.map((eve) => ({
          key: eve.id,
          name: eve.name,
          category: eve.category.name,
          date: formatearFechalg(eve.date_event),
          url: eve.url,
          price: eve.price,
          countP: eve.participants.length,
        }));

        setEvents(formattedData);
      } catch (error) {
        console.error(error);
        message.error("Error while fetching profiles!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <div className="container-md py-10">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <ConfigProvider
            theme={{
              components: {
                Spin: {
                  colorPrimary: "#FFCC00",
                },
              },
            }}
          >
            <div className="flex flex-col gap-2 items-center justify-center">
              <Spin size="large" />
              <h1
                className="text-3xl text-[#FFCC00] font-bold uppercase"
                style={{
                  textShadow: `
                    1px 1px 2px #000,
                    -1px 1px 2px #000,
                    1px -1px 2px #000,
                    -1px -1px 2px #000
                  `,
                }}
              >
                Challenge <span className="text-white font-normal">You</span>
              </h1>
            </div>
          </ConfigProvider>
        </div>
      ) : (
        <EventsTable data={events} />
      )}
    </div>
  );
};

export default SocialCards;
