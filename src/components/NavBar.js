import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Navbar,
  MediaQuery,
  Flex,
  Burger,
  Button,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useLibrary } from "../context/AppContext";
import Cart from "./Cart";

const NavBar = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { cart } = useLibrary();

  return (
    <MediaQuery smallerThan="sm" styles={{ width: "3rem" }}>
      <Navbar width={{ sm: 150, md: 200, lg: 300 }} height="100vh">
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>

          <Flex
            gap="xs"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
            style={{ width: "100%" }}
          >
            <Navbar.Section>
              <Button variant="subtle">
                <Link to="/">
                  <Text ta={"center"}>Home</Text>
                </Link>
              </Button>
            </Navbar.Section>

            <Navbar.Section>
              <Button variant="subtle">
                <Link to="/books">Borrowed</Link>
              </Button>
            </Navbar.Section>

            <Navbar.Section grow>
              <Button variant="subtle">
                <Link to="/donate">Donate</Link>
              </Button>
            </Navbar.Section>
            {cart.length && (
              <Navbar.Section sx={{ paddingBottom: "7.5rem", width: "100%" }}>
                <Text ta={"center"}>Cart</Text>
                <Cart />
              </Navbar.Section>
            )}
          </Flex>
        </div>
      </Navbar>
    </MediaQuery>
  );
};
export default NavBar;
