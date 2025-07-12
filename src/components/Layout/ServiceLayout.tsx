import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Icon } from "@iconify-icon/react";

import Header2 from "src/components/ServiceNetwork/ServiceHeader";
import Footer2 from "src/components/ServiceNetwork/ServiceFooter";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  width: "auto",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

function ServiceLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const collapsedSider = () => {
    if (!collapsed) {
      setCollapsed((prev) => !prev);
    }
  };

  const items: MenuItem[] = [
    getItem(
      <a href={"#signin"} onClick={collapsedSider}>
        Inscripciones
      </a>,
      "1",
      <Icon icon={"material-symbols:assignment-add"} inline={true} width={20} />
    ),
    getItem(
      <a href={"#times"} onClick={collapsedSider}>
        Tiempos / Cronos
      </a>,
      "2",
      <Icon
        icon={"material-symbols:avg-time-outline-rounded"}
        inline={true}
        width={20}
      />
    ),
    getItem(
      <a href={"#photographer"} onClick={collapsedSider}>
        Fotografia
      </a>,
      "3",
      <Icon
        icon={"material-symbols:monochrome-photos-rounded"}
        inline={true}
        width={20}
      />
    ),
    getItem(
      <a href="#support" onClick={collapsedSider}>
        Soporte
      </a>,
      "4",
      <Icon
        icon={"material-symbols:support-agent-rounded"}
        inline={true}
        width={20}
      />
    ),
    getItem(
      <a href={"#analytics"} onClick={collapsedSider}>
        Analiticas
      </a>,
      "5",
      <Icon icon={"material-symbols:graph-7"} inline={true} width={20} />
    ),
    // getItem(
    //   <a href={"#dashboard"} onClick={collapsedSider}>
    //     Panel de Administrador
    //   </a>,
    //   "6",
    //   <Icon
    //     icon={"material-symbols:dashboard-2-outline-rounded"}
    //     inline={true}
    //     width={20}
    //   />
    // ),
  ];

  return (
    <>
      <Layout hasSider>
        <Sider
          style={siderStyle}
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={250}
          // onCollapse={(value) => setCollapsed(value)}
          // breakpoint="lg"
          // collapsedWidth="0"
          // onBreakpoint={(broken) => {
          //   console.log(broken);
          // }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "14px",
            }}
          >
            <Button
              style={{
                display: "flex",
                justifyContent: !collapsed ? "flex-end" : "center",
                alignItems: "center",
                width: "100%",
                fontSize: "18px",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={() => setCollapsed(!collapsed)}
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ color: "#FFF" }} />
                ) : (
                  <MenuFoldOutlined style={{ color: "#FFF" }} />
                )
              }
            />
          </div>

          <div className="demo-logo-vertical" />
          {/* <ConfigProvider
            theme={{
              token: {},
            }}
          > */}
          {/* El resto de tu app */}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ paddingTop: "0rem", fontWeight: 700 }}
            items={items}
          />
          {/* </ConfigProvider> */}
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              zIndex: 10,
              height: "60px",
            }}
          >
            <Header2 />
          </Header>

          <Content
            style={{
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="md:p-6 md:m-4"
          >
            {/* Aquí va el contenido de la ruta */}
            <Outlet />
          </Content>

          {/* <Footer /> */}

          <Footer2 />
        </Layout>
      </Layout>
    </>
  );
}

export default ServiceLayout;
