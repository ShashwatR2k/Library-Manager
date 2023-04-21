import { useState } from "react";
import { Input, Button, Container, Flex } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useLibrary } from "../context/AppContext";
const SearchBar = () => {
  const { search, getDataSearch } = useLibrary();
  const [value, setValue] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      search.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
    }
  };

  return (
    <>
      <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
        <Input
          value={value}
          icon={<Search size={18} />}
          placeholder="Search"
          radius="xl"
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyPress={handleSearch}
        />
      </Flex>
    </>
  );
};

export default SearchBar;
