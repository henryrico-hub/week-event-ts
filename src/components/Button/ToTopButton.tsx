import { FloatButton } from "antd";
import { Icon } from "@iconify-icon/react";

export default function ToTopButton() {
  return (
    <FloatButton.BackTop
      icon={<Icon icon={"bxs:to-top"} />}
      visibilityHeight={900}
      style={{
        bottom: 80,
      }}
    />
  );
}
