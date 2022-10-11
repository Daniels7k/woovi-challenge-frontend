import React from "react";

import GraphicsComponent from "../../components/GraphicsComponent";
import Table from "../../components/Table";

import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import style from "./home.module.scss";

const Home = () => {
  const response: any = useLazyLoadQuery(
    graphql`
      query HomeQuery {
        despesas {
          ...Table_table
        }
      }
    `,
    {},
  );

  console.log(response);
  return (
    <div className={style.container}>
      <GraphicsComponent />
      <Table data={response.despesas} />
    </div>
  );
};

export default Home;
