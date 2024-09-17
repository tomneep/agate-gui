import React from "react";
import ReactDOM from "react-dom/client";
import Agate from "../lib/Agate.tsx";
import httpPathHandler from "./handler.tsx";

import "./font.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Agate httpPathHandler={httpPathHandler} extVersion="Mock" />
  </React.StrictMode>
);
