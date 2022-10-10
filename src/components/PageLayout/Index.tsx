import React from "react";
import Sidebar from "../Sidebar/Sidebar";

import { Outlet } from "react-router-dom";

import style from "./pageLayout.module.scss";

const PageLayout = () => {
  return (
    <div className={style.pageLayoutContainer}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default PageLayout;
