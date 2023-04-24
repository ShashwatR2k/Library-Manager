import React, { useState } from "react";
import "../App.css";
import { Route, Routes } from "react-router-dom";
import {
  AppShell,
  Aside,
  MediaQuery,
  MantineProvider,
  ColorSchemeProvider,
} from "@mantine/core";

import { useLibrary } from "../context/AppContext";
import Home from "./Home";
import NavBar from "./NavBar";
import HeaderApp from "./HeaderBar";
import FooterApp from "./FooterBar";
import BorrowedBooks from "./BooksBorrowed";
import DonateBooks from "./DonateBooks";
const AppLayout = () => {
  const { colorScheme, toggleColorScheme } = useLibrary();
  return (
    <ColorSchemeProvider
      colorScheme={{
        colorScheme,
      }}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          navbarOffsetBreakpoint="sm"
          navbar={<NavBar />}
          aside={
            <MediaQuery smallerThan="sm" styles={{ width: "2rem" }}>
              <Aside
                p="md"
                hiddenBreakpoint="sm"
                width={{ sm: "2rem", lg: "3rem" }}
              />
            </MediaQuery>
          }
          header={<HeaderApp />}
          footer={<FooterApp />}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/books" element={<BorrowedBooks />} />
            <Route path="/donate" element={<DonateBooks />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
export default AppLayout;
