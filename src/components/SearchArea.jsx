import { React, useState } from "react";
import { TextField, Button, Autocomplete, Box } from "@mui/material";
import countries from "../countries";
import "../styles.css";

export default function SearchArea(props) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(null);
  const [cityError, setCityError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const cityRegex = /^([a-zA-Z\u0080-\u024F]+(?:.|-||'))*[a-zA-Z\u0080-\u024F]*$/;

  function handleSearch(e) {
    e.preventDefault();
    setCityError(false);
    setCountryError(false);

    if ((!city || !cityRegex.test(city)) && !country) {
      setCityError(true);
      setCountryError(true);
      return;
    }
    
    if (!cityRegex.test(city)) {
      setCityError(true);
      return;
    }

    if (!city) {
      setCityError(true);
      return;
    }

    if (!country) {
      setCountryError(true);
      return;
    }

    props.onSearch(city, country.code);
    setCity("");
    setCountry(null);
  }

  return (
    <form className="search-area" onSubmit={handleSearch}>
      <TextField
        id="cityName"
        label="Enter City here.."
        variant="outlined"
        style={{ width: "100%" }}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={cityError}
        helperText={
          cityError
            ? cityRegex.test(city)
              ? "City is required"
              : "Please enter a valid city"
            : ""
        }
      />
      <Autocomplete
        id="country-select"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.code === value.code}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt="flag"
            />
            {option.name} ({option.code})
          </Box>
        )}
        value={country}
        onChange={(e, newValue) => setCountry(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a country"
            inputProps={{
              ...params.inputProps,
            }}
            error={countryError}
            helperText={countryError ? "Country is required" : ""}
          />
        )}
      />
      <Button
        type="submit"
        variant="outlined"
        style={{ borderColor: "grey", color: "black", width: "100%" }}
      >
        Search
      </Button>
    </form>
  );
}
