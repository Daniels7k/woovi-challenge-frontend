import React from "react";

import { sidebarData } from "./sidebarData";
import { IconContext } from "react-icons";
import style from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={style.sidebarContainer}>
      <ul>
        {sidebarData.map((item, key) => (
          <li
            key={key}
            onClick={() => {
              window.location.pathname = item.link;
            }}
            id={window.location.pathname === item.link ? style.active : ""}
          >
            {item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
