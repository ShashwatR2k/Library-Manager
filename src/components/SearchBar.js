import { useState } from "react";
import { Input, Button, Container, Flex } from "@mantine/core";
import { Search } from "tabler-icons-react";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(`Searching for "${searchQuery}"...`);
  };

  return (
    <>
      <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
        <Input icon={<Search size={18} />} placeholder="Search" radius="xl" />
        <Button onClick={handleSearchClick} size="xs" radius="xl">
          Search
        </Button>
      </Flex>
    </>
  );
};

export default SearchBar;
