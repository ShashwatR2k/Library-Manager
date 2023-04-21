import { useState } from "react";
import { Input, Button, Container, Flex } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useLibrary } from "../context/AppContext";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { search } = useLibrary();
  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
    }
  };

  return (
    <>
      <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
        <Input
          icon={<Search size={18} />}
          placeholder="Search"
          radius="xl"
          onKeyPress={handleSearch}
        />
        <Button size="xs" radius="xl">
          Search
        </Button>
      </Flex>
    </>
  );
};

export default SearchBar;
