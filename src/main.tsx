import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import { AuthProvider } from "./context/AuthContext.tsx";

import "jquery"; // asegura la carga
import jQuery from "jquery";
(window as any).$ = jQuery;
(window as any).jQuery = jQuery;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            // fontFamily: '"Montserrat", sans-serif',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </AuthProvider>
  </StrictMode>
);
