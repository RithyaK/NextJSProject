import React from "react";
import styled from "styled-components";
import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Ranking from "../../reusable-ui/Ranking";

type UserData = {
  score: number;
  username: string;
};

type SidebarProps = {
  allTime: UserData[];
  month: UserData[];
  week: UserData[];
};
const Sidebar = ({ allTime, week, month }: SidebarProps) => {
  return (
    <SidebarStyled>
      {/* Create one component to use 3 times below */}
      <Ranking title="Top Ranking" rank={allTime} />
      <Ranking title="Ranking of the month" rank={month} />
      <Ranking title="Ranking of the week" rank={week} />
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarStyled = styled.div`
  background-color: rgb(159, 127, 127);
  width: 230px;
  overflow: auto;
`;
