import React, { useState } from "react";
import { useLibrary } from "../context/AppContext";
import { Upload } from "tabler-icons-react";
import {
  TextInput,
  ScrollArea,
  Textarea,
  Grid,
  Select,
  Rating,
  MultiSelect,
  FileInput,
  Center,
  Button,
} from "@mantine/core";
function DonateBooks() {
  const [data, setData] = useState([
    "Adventure",
    "Fantasy",
    "Science",
    "Self-Help",
    "Finance",
    "History",
  ]);
  const [searchValue, onSearchChange] = useState("");
  const {
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
    type,
    setType,
    rating,
    setRating,
    genre,
    setGenre,
    file,
    setFile,
    uploadImg,
  } = useLibrary();

  const handleSubmit = () => {
    const result = {
      title: title,
      author: author,
      description: description,
      type: type,
      rating: rating,
      genre: genre,
    };
    uploadImg(result, file.name, file);
  };
  return (
    <ScrollArea h={500} sx={{ overflowX: "hidden" }} mx={"auto"} px={"auto"}>
      <Grid mx={"auto"} px={"auto"}>
        <Grid.Col span={6}>
          <TextInput
            placeholder="Book name"
            label="Title of the book"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            placeholder="Author Name"
            label="Author of the book"
            value={author}
            onChange={(event) => setAuthor(event.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Enter Description"
            placeholder="Enter Description"
            autosize
            minRows={2}
            maxRows={6}
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Select
            label="Enter type of book"
            placeholder="Pick one"
            value={type}
            onChange={setType}
            data={[
              { value: "Fiction", label: "Fiction" },
              { value: "Non-fiction", label: "Non-fiction" },
              { value: "Motivational", label: "Motivational" },
              { value: "Manga", label: "Manga" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <MultiSelect
            label="Your favorite frameworks/libraries"
            placeholder="Pick all that you like"
            value={genre}
            onChange={setGenre}
            data={data}
            searchable
            clearable
            creatable
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            nothingFound="Nothing found"
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setData((current) => [...current, item]);
              return item;
            }}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <FileInput
            label="Upload Cover Art"
            placeholder="Upload image"
            accept="image/png,image/jpeg"
            icon={<Upload size={22} />}
            value={file}
            onChange={setFile}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Center>
            <Rating
              value={rating}
              fractions={5}
              onChange={setRating}
              size="xl"
            />
          </Center>
        </Grid.Col>
      </Grid>
      <Center>
        <Button px={50} onClick={handleSubmit}>
          Hello
        </Button>
      </Center>
    </ScrollArea>
  );
}

export default DonateBooks;
