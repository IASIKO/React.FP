import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchQueryProducts,
  setSearchResults,
  useSearchResults,
} from "../../redux";
import { Typography } from "../shared";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchResults = useSearchResults();
  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchValue) {
        dispatch(fetchQueryProducts(searchValue));
      } else {
        dispatch(setSearchResults());
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchValue]);

  return (
    <Autocomplete
      freeSolo
      className="searchBar"
      sx={{ width: 500}}
      disableClearable
      options={searchResults}
      getOptionLabel={(option) => option.name}
      renderOption={(_, option) => {
        const { name, category, _id, price } = option;
        return (
          <Link
            style={{ textDecoration: "none", color: "black"}}
            to={`/products/categories/${category}/${name}`}
            key={_id}
            state={{ id: _id }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography>{name}</Typography>
              <Typography>{price}</Typography>
            </Box>
          </Link>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            label="Search Products"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        );
      }}
    />
  );
};

export default SearchBar;
