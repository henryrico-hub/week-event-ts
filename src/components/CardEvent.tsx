import { Card, ConfigProvider, Tooltip, Typography } from "antd";

import { Link } from "react-router-dom";
import { formatearFecha } from "../utils/helpers";
import { EventType } from "../types";

interface CardEventProps {
  eve: EventType;
  colSpan: number;
}

const { Meta } = Card;
const { Text, Title } = Typography;

const CardEvent: React.FC<CardEventProps> = ({ eve, colSpan }) => {
  return (
    <div className={`col-md-${colSpan} py-2`}>
      <Link to={`/evento/${eve.url}`} style={{ textDecoration: "none" }}>
        <Card
          hoverable
          type="inner"
          style={{ width: "100%", padding: 0 }}
          cover={
            <img
              alt="event image"
              src={`${import.meta.env.VITE_API_URL_SHORT}${eve.img_main.url}`}
              style={{
                width: "100%",
                objectFit: "cover",
                height: "250px",
              }}
            />
          }
        >
          <Meta
            title={
              <>
                <div className="bg-white">
                  <div
                    className="flex justify-content-center mb-2 p-1"
                    style={{
                      backgroundColor: "#e6f4ff",
                      borderBottomLeftRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }}
                  >
                    <Typography.Text style={{ color: "#003366" }}>
                      {`${eve.city_state}, ${eve.state.name}`}
                    </Typography.Text>
                  </div>
                  <div className="flex justify-content-between mb-2">
                    <a
                      className="badge badge-primary text-uppercase font-weight-semi-bold p-2"
                      aria-disabled={true}
                    >
                      {eve.category.name}
                    </a>
                    <a className="text-body" aria-disabled={true}>
                      <p>{formatearFecha(eve.date_event)}</p>
                    </a>
                  </div>
                  <Tooltip title={eve.name}>
                    <Title
                      level={4}
                      style={{
                        textTransform: "uppercase",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                      className="descript-resume"
                    >
                      {eve.name}
                    </Title>
                  </Tooltip>
                </div>
              </>
            }
            description={
              <>
                <Text type="secondary" className="descript-resume">
                  {eve.description1}
                </Text>
                {/* <Divider style={{ borderColor: "#E4E7ED" }} /> */}
                <div className="d-flex justify-content-between border-top pt-2 mt-4">
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle mr-2"
                      src={`${import.meta.env.VITE_API_URL_SHORT}${
                        eve.author_sc.avatar.url
                      }`}
                      width="35"
                      height="35"
                      alt=""
                    />
                    {/* <img className="rounded-circle mr-2" src={`${import.meta.env.VITE_API_URL_SHORT}${eve.img_desc1.url}`} width="25" height="25" alt=""/> */}
                    <Text type="secondary" style={{ textDecoration: "none" }}>
                      {eve.author_sc.name}
                    </Text>
                  </div>
                  <div className="d-flex align-items-center">
                    <Text type="secondary" className="ml-3">
                      <i className="far fa-eye mr-2"></i>12345
                    </Text>
                    <Text type="secondary" className="ml-3">
                      <i className="far fa-comment mr-2"></i>
                      123
                    </Text>
                  </div>
                </div>
              </>
            }
          />
        </Card>
      </Link>
    </div>
  );
};

export default CardEvent;
