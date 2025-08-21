"use client";
import { Image } from "antd";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={image.url} />
          </div>
        ),
      }}
    />
  );
}
