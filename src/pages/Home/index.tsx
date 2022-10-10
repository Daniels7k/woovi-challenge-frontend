import React from "react";
import GraphicsComponent from "../../components/GraphicsComponent";
import Table from "../../components/Table";

import style from "./home.module.scss";

const Home = () => {
  return (
    <div className={style.container}>
      <GraphicsComponent />
      <Table />
    </div>
  );
};

export default Home;
