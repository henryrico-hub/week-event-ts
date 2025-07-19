import { Button, ConfigProvider, Tooltip } from "antd";
import { createStyles } from "antd-style";
import { useNavigate } from "react-router-dom";
import { EventType } from "src/types";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
        z-index: 1;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #ffcc00);
        position: absolute;
        inset: 0;
        z-index: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0.45;
      }

      &[disabled],
      &.ant-btn-disabled {
        cursor: not-allowed;
        border: none;

        &::before {
          opacity: 0.8; /* o el valor que prefieras para "desactivado" */
          filter: grayscale(50%);
        }

        > span {
          opacity: 0.75;
          color: #fffb;
        }
      }
    }
  `,
}));

type GradientButtonProps = {
  url: string | undefined;
  text?: string;
  icon?: React.ReactNode;
  data?: EventType;
};

const GradientButton = ({ url, text, icon, data }: GradientButtonProps) => {
  const { styles } = useStyle();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/form/${url}`);
  };

  const isExpired = (dateEvent: Date): boolean => {
    const currentDate = new Date();
    const expiredDate = new Date(dateEvent);
    return currentDate < expiredDate;
  };

  return (
    <>
      <ConfigProvider
        button={{
          className: styles.linearGradientButton,
        }}
      >
        {data && isExpired(data.endRegistrationDate) ? (
          <Button
            type="primary"
            size="large"
            block
            icon={icon}
            onClick={handleNavigate}
            className="uppercase font-bold"
          >
            {text}
          </Button>
        ) : (
          <Tooltip
            title="El periodo de inscripción ha finalizado, te agradecemos tu interés en participar en este evento."
            // color="red"
            arrow={false}
          >
            <Button
              type="primary"
              size="large"
              block
              icon={icon}
              className="uppercase font-bold"
              disabled
            >
              {"Inscripcion cerrada"}
            </Button>
          </Tooltip>
        )}
      </ConfigProvider>
    </>
  );
};

export default GradientButton;
