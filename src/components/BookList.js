import React, { useRef } from "react";
import { useLibrary } from "../context/AppContext";
import {
  Image,
  Accordion,
  Grid,
  Group,
  Button,
  ActionIcon,
  Badge,
  Text,
  AccordionControlProps,
  Box,
  Paper,
  ScrollArea,
} from "@mantine/core";
import { Sun } from "tabler-icons-react";
const BooksList = ({ fbooks }) => {
  const { cart, setCart, books, setBooks, setCallMore, endList } = useLibrary();
  const viewport = useRef(null);
  function handleClick(book) {
    if (!book?.inCart) {
      console.log(book);
      setCart([...cart, book]);
      let arr1 = books.map((b) => {
        if (book.id === b.id) b.inCart = 1;
        return b;
      });
      setBooks(arr1);
      book.inCart = 1;
    } else {
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
      book.inCart = 0;
    }
  }

  function AccordionControl(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Accordion.Control {...props} />
        <ActionIcon size="lg" style={{ marginLeft: "-2rem" }}>
          <Sun size={200} />
        </ActionIcon>
      </Box>
    );
  }

  return (
    <Paper>
      <ScrollArea
        type="scroll"
        style={{ height: "100%" }}
        scrollbarSize={8}
        scrollHideDelay={300}
        viewportRef={viewport}
        onScrollPositionChange={({ y }) => {
          if (
            y + viewport.current.clientHeight >=
            viewport.current.scrollHeight - 25
          ) {
            if (!endList) setCallMore(true);
          }
        }}
      >
        <Accordion
          variant="contained"
          transitionDuration={1000}
          chevron={null}
          styles={{ chevron: { display: "none" } }}
        >
          <Group align="flex-start">
            {fbooks?.map((book) => {
              return (
                <Accordion.Item value={book.title}>
                  <AccordionControl style={{ width: 300 }}>
                    <Image
                      height={300}
                      width={"100%"}
                      fit="contain"
                      className="rounded-md"
                      src={book.imageUrl}
                    />
                    <Grid justify="center">
                      <Grid.Col
                        span={12}
                        style={{
                          textAlign: "center",
                          paddingBottom: 0,
                        }}
                      >
                        <Text weight={500} ta="center">
                          {book.title}
                        </Text>
                      </Grid.Col>
                      <Grid.Col
                        span={12}
                        style={{
                          textAlign: "center",
                          paddingTop: 0,
                        }}
                      >
                        <Button
                          variant="subtle"
                          onClick={() => {
                            handleClick(book);
                          }}
                        >
                          {books.filter((b) => {
                            if (book.id === b.id) return b;
                          })[0]?.inCart
                            ? "Remove From Cart"
                            : "Add to Cart"}
                          {console.log()}
                        </Button>
                      </Grid.Col>
                    </Grid>
                  </AccordionControl>
                  <Accordion.Panel style={{ width: 300, paddingLeft: "2rem" }}>
                    <Text size="sm" color="dimmed" ta="justify">
                      {book.description}
                    </Text>
                    <Group style={{ paddingTop: "1rem" }}>
                      {book?.genre?.map((gen) => (
                        <Badge color="gray" radius="md" variant="filled">
                          {gen}
                        </Badge>
                      ))}
                    </Group>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Group>
        </Accordion>
      </ScrollArea>
    </Paper>
  );
};
export default BooksList;
