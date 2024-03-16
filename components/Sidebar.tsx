import React from "react";
import Ranking from "./reusable-ui/Ranking";
import styled from "styled-components";
const Sidebar = () => {
  return (
    <SidebarStyled>
      {/* Create one component to use 3 times below */}
      <Ranking title="Top Ranking" />
      <Ranking title="Ranking of the week" />
      <Ranking title="Ranking of the month" />
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarStyled = styled.div`
  background-color: rgb(159, 127, 127);
  width: 230px;
`;
