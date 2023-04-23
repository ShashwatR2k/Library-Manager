import { useState, useEffect } from "react";
import { Input, Checkbox, Group, Flex } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useLibrary } from "../context/AppContext";
const SearchBar = () => {
  const { filterParam, searchtext, setSearchText, setFilterParam } =
    useLibrary();

  const handleSearch = (event) => {
    setSearchText(event.currentTarget.value);
  };

  return (
    <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
      <Input
        value={searchtext}
        icon={<Search size={18} />}
        placeholder="Search"
        radius="xl"
        onChange={(event) => handleSearch(event)}
      />

      {searchtext ? (
        <Checkbox.Group
          value={filterParam}
          onChange={setFilterParam}
          defaultValue={["title"]}
          label="Select Search Filters"
          style={{ display: "flex" }}
          styles={{ label: { marginTop: "0.635rem", paddingRight: "0.5rem" } }}
          fz={0}
        >
          <Group mt="xs">
            <Checkbox value="title" label="Title" />
            <Checkbox value="author" label="Author" />
            <Checkbox value="description" label="Description" />
            <Checkbox value="genre" label="Genre" />
          </Group>
        </Checkbox.Group>
      ) : null}
    </Flex>
  );
};

export default SearchBar;
