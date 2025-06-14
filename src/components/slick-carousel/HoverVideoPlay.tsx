import { PlayCircleFilled } from "@ant-design/icons";

import { useState } from "react";
import ReactPlayer from "react-player";

type HoverVideoPlayerProps = {
  url: string;
  name: any;
};

export default function HoverVideoPlayer({ url, name }: HoverVideoPlayerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [, setHasPlayed] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        setHasPlayed(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={isHovered}
        muted
        loop
        controls
        /* light={!hasPlayed ? true : false}
        playIcon={
          <PlayCircleFilled
            style={{
              fontSize: "4rem",
              color: "#FFCC00",
              opacity: 0.85,
            }}
          />
        } */
        style={{
          borderRadius: "10px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        {!isHovered && (
          <PlayCircleFilled
            onClick={() => setIsHovered(true)}
            style={{ fontSize: "4rem", color: "#FFCC00" }}
          />
        )}
      </div>
      <div
        style={{
          position: "relative",
          height: "48px",
          width: "100%",
          alignContent: "center",
          backgroundColor: "#FFCC00",
          color: "black",

          textAlign: "center",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,

          padding: 6,
          fontSize: ".8rem",
          fontWeight: 600,
          // borderTopLeftRadius: "10px",
          // borderTopRightRadius: "10px",
        }}
      >
        <p>{name}</p>
      </div>
    </div>
  );
}
