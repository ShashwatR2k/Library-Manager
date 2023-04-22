import { useState, useEffect } from "react";
import { Input, Button, Container, Flex } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useLibrary } from "../context/AppContext";
const SearchBar = () => {
  const {
    search,
    getDataSearch,
    filterParam,
    searchtext,
    setSearchText,
    searchInArray,
  } = useLibrary();

  const handleSearch = (event) => {
    setSearchText(event.currentTarget.value);
  };

  return (
    <>
      <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
        <Input
          value={searchtext}
          icon={<Search size={18} />}
          placeholder="Search"
          radius="xl"
          onChange={(event) => handleSearch(event)}
        />
      </Flex>
    </>
  );
};

export default SearchBar;
