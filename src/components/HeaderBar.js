import React from "react";

import { useLibrary } from "../context/AppContext";
import {
  Header,
  Group,
  ActionIcon,
  Title,
  Avatar,
  Menu,
  Button,
} from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";
const HeaderApp = () => {
  const { colorScheme, toggleColorScheme, startLogin, name, loggedIn, logOut } =
    useLibrary();
  return (
    <Header height="4rem" width="100vw" p="xs">
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Group sx={{ height: "100%" }}>
          <Title order={3}>Library Management</Title>
        </Group>
        <Group sx={{ height: "100%" }} position="center">
          <ActionIcon variant="default" onClick={toggleColorScheme} size={30}>
            {colorScheme === "dark" ? (
              <Sun size={16} />
            ) : (
              <MoonStars size={16} />
            )}
          </ActionIcon>
          {!loggedIn ? (
            <Button onClick={startLogin}>Login</Button>
          ) : (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle">
                  <Avatar color="cyan" radius="xl">
                    MK
                  </Avatar>
                  {name}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={logOut}>Log Out</Menu.Item>
                <Menu.Divider />
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Group>
    </Header>
  );
};
export default HeaderApp;
