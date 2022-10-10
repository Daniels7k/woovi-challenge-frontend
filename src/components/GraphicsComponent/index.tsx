import React from "react";

import style from "./graphicsComponent.module.scss";

const GraphicsComponent = () => {
  return (
    <div className={style.graphicsContainer}>
      <div className={style.resumeBox}>
        <span className={style.resumeTitle}>Saídas Nessa Data</span>
        <h2 className={style.resumeValue}>R$ 5000,00</h2>
      </div>
      {/* TODO: Ainda falta a lógica para implementar o gráfico */}
      <div className={style.pizzaGraphicBox}>square2</div>
      <div className={style.resumeBox}>
        <span className={style.resumeTitle}>Categoria mais usada</span>
        <h2 className={style.resumeValue}>Carne</h2>
      </div>
    </div>
  );
};

export default GraphicsComponent;
