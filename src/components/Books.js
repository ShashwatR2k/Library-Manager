import React, { useEffect } from "react";
import { useLibrary } from "../context/AppContext";
import {
  Image,
  Group,
  Button,
  Badge,
  Text,
  ScrollArea,
  Card,
  Flex,
} from "@mantine/core";
const Books = () => {
  const { borrowed } = useLibrary();

  return (
    <ScrollArea>
      <Flex
        gap="lg"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {borrowed?.map((book) => {
          return (
            <Card
              shadow="sm"
              padding="sm"
              radius="md"
              withBorder
              style={{ width: "40%" }}
            >
              <Card.Section>
                <Image
                  src={book.imageUrl}
                  fit="contain"
                  height={160}
                  alt="Book"
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{book.title}</Text>
                <Badge color="pink" variant="light">
                  On Sale
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                {book.description}
              </Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Return Now
              </Button>
            </Card>
          );
        })}
      </Flex>
    </ScrollArea>
  );
};
export default Books;
