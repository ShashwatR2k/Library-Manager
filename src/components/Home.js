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
import HomeTabs from "./HomeTabs";
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
      <HomeTabs />
    </ScrollArea>
  );
};
export default Home;
