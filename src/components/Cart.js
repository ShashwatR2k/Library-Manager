import React from "react";
import "../App.css";
import {
  Button,
  Grid,
  ScrollArea,
  useMantineTheme,
  Text,
  Group,
} from "@mantine/core";
import { useLibrary } from "../context/AppContext";
import { Minus } from "tabler-icons-react";
const Cart = () => {
  const theme = useMantineTheme();
  const { cart, colorScheme, setCart, books, setBooks } = useLibrary();
  const handleRemove = (book) => {
    setCart(
      cart.filter((b) => {
        if (b.id !== book.id) return b;
      })
    );
    let arr2 = books.map((b) => {
      if (book.id === b.id) b.inCart = 0;
      return b;
    });
    setBooks(arr2);
  };
  return (
    <ScrollArea
      style={
        colorScheme === "dark"
          ? { backgroundColor: theme.colors.dark[5], width: "100%" }
          : { backgroundColor: theme.colors.gray[0], width: "100%" }
      }
      h={250}
      type="never"
      scrollbarSize={8}
      scrollHideDelay={1000}
    >
      <Grid
        style={{
          height: "12rem",
          alignContent: "flex-start",
        }}
      >
        {cart.map((book) => {
          return (
            <Grid.Col
              span={12}
              style={{
                textAlign: "left",
                paddingBottom: "0",
              }}
            >
              <Group position="apart">
                <Text> {book.title}</Text>
                <Button variant="Outline" onClick={() => handleRemove(book)}>
                  <Minus />
                </Button>
              </Group>
            </Grid.Col>
          );
        })}
      </Grid>
    </ScrollArea>
  );
};
export default Cart;
