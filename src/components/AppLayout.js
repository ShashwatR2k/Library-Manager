import React, { useState } from "react";
import "../App.css";
import { Route, Routes } from "react-router-dom";
import {
  AppShell,
  Footer,
  Aside,
  MediaQuery,
  ScrollArea,
  MantineProvider,
  ColorSchemeProvider,
} from "@mantine/core";

import { useLibrary } from "../context/AppContext";
import Home from "./Home";
import NavBar from "./NavBar";
import HeaderApp from "./HeaderBar";

const AppLayout = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useLibrary();
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
          footer={<Footer height={"3rem"} width="100vw" p="md" />}
        >
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div style={{ height: "max-content" }}>
                  <Home />
                </div>
              }
            />
            <Route path="/about" element={<div>About</div>} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
export default AppLayout;
