import React from "react";
import "./App.css";
import { useState } from "react";
import {
  AppShell,
  UnstyledButton,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  Icon,
  Group,
  useMantineTheme,
  MantineProvider,
  ColorSchemeProvider,
  ActionIcon,
  Title,
} from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState("light");
  const [active, setActive] = useState(false);
  const toggleColorScheme = () =>
    setColorScheme((scheme) => (scheme === "dark" ? "light" : "dark"));
  const SHIMMER_IMAGE_URL =
    "https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png";
  return (
    <ColorSchemeProvider
      colorScheme={{
        colorScheme,
        colors: {
          blue: theme.colors.red[0],
        },
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
          navbar={
            <MediaQuery smallerThan="sm" styles={{ width: "3rem" }}>
              <Navbar width={{ sm: 100, md: 150, lg: 200 }} height="100vh">
                <div style={{ display: "flex", height: "100%" }}>
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>
                </div>
              </Navbar>
            </MediaQuery>
          }
          header={
            <Header height="4rem" width="100vw" p="xs">
              <Group sx={{ height: "100%" }} px={20} position="apart">
                <Group sx={{ height: "100%" }}>
                  <Title order={3}>Library Management</Title>
                </Group>

                <ActionIcon
                  variant="default"
                  onClick={toggleColorScheme}
                  size={30}
                >
                  {colorScheme === "dark" ? (
                    <Sun size={16} />
                  ) : (
                    <MoonStars size={16} />
                  )}
                </ActionIcon>
              </Group>
            </Header>
          }
          aside={
            <MediaQuery smallerThan="sm" styles={{ width: "2rem" }}>
              <Aside
                p="md"
                hiddenBreakpoint="sm"
                width={{ sm: "2rem", lg: "3rem" }}
              ></Aside>
            </MediaQuery>
          }
          footer={
            <Footer height={60} width="100vw" p="md">
              Application footer
            </Footer>
          }
        >
          <div data-testid="shimmer">
            {Array(10)
              .fill("")
              .map((item, index) => (
                <Group sx={{ width: "100%", paddingBottom: 20 }}>
                  <img
                    width="250vw"
                    className="rounded-md"
                    src={SHIMMER_IMAGE_URL}
                    style={{ borderStyle: "double" }}
                  />
                  <img
                    width="250vw"
                    className="rounded-md"
                    src={SHIMMER_IMAGE_URL}
                    style={{ borderStyle: "double" }}
                  />
                  <img
                    width="250vw"
                    className="rounded-md"
                    src={SHIMMER_IMAGE_URL}
                    style={{ borderStyle: "double" }}
                  />
                  <img
                    width="250vw"
                    className="rounded-md"
                    src={SHIMMER_IMAGE_URL}
                    style={{ borderStyle: "double" }}
                  />
                </Group>
              ))}
          </div>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
