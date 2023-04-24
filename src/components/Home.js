import React, { useRef } from "react";
import { useState } from "react";
import { Tabs, ScrollArea, Checkbox, Group } from "@mantine/core";
import {
  School,
  Photo,
  MessageCircle,
  Pokeball,
  BuildingCastle,
} from "tabler-icons-react";
import { useLibrary } from "../context/AppContext";
import BooksList from "./BookList";
const Home = () => {
  const viewport = useRef(null);
  const { books, getFive, endList } = useLibrary();

  return (
    <ScrollArea
      h={540}
      type="scroll"
      scrollbarSize={8}
      scrollHideDelay={300}
      viewportRef={viewport}
      onScrollPositionChange={({ y }) => {
        if (
          y + viewport.current.clientHeight >=
          viewport.current.scrollHeight - 25
        ) {
          if (!endList) {
            getFive();
          }
        }
      }}
    >
      <Tabs defaultValue="All" h={540}>
        <Tabs.List>
          <Tabs.Tab value="All" icon={<Photo size="0.8rem" />}>
            All
          </Tabs.Tab>
          <Tabs.Tab value="Fiction" icon={<BuildingCastle size="0.8rem" />}>
            Fiction
          </Tabs.Tab>
          <Tabs.Tab value="Non-Fiction" icon={<School size="0.8rem" />}>
            Non-Fiction
          </Tabs.Tab>
          <Tabs.Tab value="Motivational" icon={<MessageCircle size="0.8rem" />}>
            Motivational
          </Tabs.Tab>
          <Tabs.Tab value="Manga" icon={<Pokeball size="0.8rem" />}>
            Manga
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="All" pt="xs">
          <BooksList fbooks={books} />
        </Tabs.Panel>
        <Tabs.Panel value="Fiction" pt="xs">
          <BooksList
            fbooks={books?.filter((value) => {
              if (value.type == "Fiction") return value;
            })}
          />
        </Tabs.Panel>
        <Tabs.Panel value="Non-Fiction" pt="xs">
          <BooksList
            fbooks={books?.filter((value) => {
              if (value.type == "Non-fiction") return value;
            })}
          />
        </Tabs.Panel>
        <Tabs.Panel value="Motivational" pt="xs">
          <BooksList
            fbooks={books?.filter((value) => {
              if (value.type == "Motivational") return value;
            })}
          />
        </Tabs.Panel>
        <Tabs.Panel value="Manga" pt="xs">
          <BooksList
            fbooks={books?.filter((value) => {
              if (value.type == "Manga") return value;
            })}
          />
        </Tabs.Panel>
      </Tabs>
    </ScrollArea>
  );
};
export default Home;
