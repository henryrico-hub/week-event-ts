import { Button, ConfigProvider } from "antd";
import { createStyles } from "antd-style";
import { useNavigate } from "react-router-dom";

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
type GradientButtonProps = {
  url: string | undefined;
  text?: string;
  icon?: React.ReactNode;
};

const GradientButton = ({ url, text, icon }: GradientButtonProps) => {
  const { styles } = useStyle();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/form/${url}`);
  };

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Button
        type="primary"
        size="large"
        block
        onClick={handleNavigate}
        icon={icon}
        className="uppercase font-bold"
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};

export default GradientButton;
