import React from "react";
import styled from "styled-components";
import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Ranking from "../../reusable-ui/Ranking";
const Sidebar = ({ allTime, week, month }) => {
  return (
    <SidebarStyled>
      {/* Create one component to use 3 times below */}
      <Ranking title="Top Ranking" ranks={allTime} />
      <Ranking title="Ranking of the month" ranks={month} />
      <Ranking title="Ranking of the week" ranks={week} />
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarStyled = styled.div`
  background-color: rgb(159, 127, 127);
  width: 230px;
  overflow: auto;
`;
