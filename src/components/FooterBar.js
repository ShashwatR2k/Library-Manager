import React from "react";

import { useLibrary } from "../context/AppContext";
import { Footer, Flex, Button } from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";
const FooterApp = () => {
  const { borrowBooks, cart } = useLibrary();
  return (
    <Footer height={"3rem"} width="100vw">
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
        w={200}
        pt={0}
      >
        {cart.length ? (
          <Button padding={"5rem"} fullWidth onClick={borrowBooks}>
            Check Out
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </Footer>
  );
};
export default FooterApp;
