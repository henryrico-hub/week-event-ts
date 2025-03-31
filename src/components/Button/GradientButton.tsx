import { AntDesignOutlined, PlayCircleFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Flex } from "antd";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #ffcc00);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const GradientButton = () => {
  const { styles } = useStyle();

  const scroll = () => {
    const sliderElement = document.getElementById("slider");
    if (sliderElement) {
      sliderElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Flex style={{ paddingTop: 5, gap: 10, alignItems: "center" }}>
        <Button type="primary" size="large" block icon={<AntDesignOutlined />}>
          Gradient Button
        </Button>
        <Button type="primary" shape="circle" size="large" onClick={scroll}>
          <PlayCircleFilled style={{ fontSize: 20 }} />
        </Button>
      </Flex>
    </ConfigProvider>
  );
};

export default GradientButton;
