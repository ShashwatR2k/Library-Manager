import React from "react";
import { MediaQuery, Aside } from "@mantine/core";
const AsideApp = () => {
  return (
    <MediaQuery smallerThan="sm" styles={{ width: "2rem" }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: "2rem", lg: "3rem" }} />
    </MediaQuery>
  );
};
export default AsideApp;
