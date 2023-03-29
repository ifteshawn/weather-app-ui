import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import ContainerCard from "./ContainerCard";
import { fetchWeather } from "../utils/weatherUtils";

jest.mock("../utils/weatherUtils");
describe("weather app renders properly and weather API response is rendered accordingly", () => {
  test("renders search area properly", async () => {
    const { getByText, getByLabelText } = render(<App />);
    expect(getByLabelText("Enter City here..")).not.toBeNull();
    expect(getByLabelText("Select a country")).not.toBeNull();
    expect(getByText("Search")).not.toBeNull();
  });

  test("search area displays input validation error messages for empty fields", () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText("Search"));

    expect(getByText("City is required")).not.toBeNull();
    expect(getByText("Country is required")).not.toBeNull();
  });

  test("search area displays input validation error messages for invalid characters", () => {
    const { getByText, getByLabelText } = render(<App />);

    const input = getByLabelText("Enter City here..");

    fireEvent.change(input, { target: { value: "3Mel@bourne" } });
    fireEvent.click(getByText("Search"));

    expect(getByText("Please enter a valid city")).not.toBeNull();
    expect(getByText("Country is required")).not.toBeNull();
  });

  test("weather info area is not rendered initially", () => {
    const { queryByTestId } = render(<App />);

    expect(queryByTestId("weather-info-area")).toBeNull();
  });

  test("renders loading spinner before displaying weather info after successful API response", async () => {
    const mockResponse = {
      name: "Melbourne",
      weather: [
        {
          main: "Clouds",
          description: "Broken Clouds",
          icon: "04d",
          iconSource: "http://openweathermap.org/img/wn/04d@2x.png",
        },
      ],
      sys: {
        country: "AU",
      },
      main: {
        temp: 19.16,
      },
    };

    fetchWeather.mockResolvedValueOnce(mockResponse);
    const {
      queryByTestId,
      getByText,
      getByLabelText,
      getByRole,
      getByAltText,
    } = render(<ContainerCard />);

    const inputCity = getByLabelText("Enter City here..");
    const inputCountry = getByRole("combobox", { name: "Select a country" });
    const button = getByText("Search");

    fireEvent.change(inputCity, { target: { value: "Melbourne" } });

    fireEvent.focus(inputCountry);
    fireEvent.change(inputCountry, { target: { value: "Australia" } });
    fireEvent.keyDown(inputCountry, { key: "ArrowDown" });
    fireEvent.keyDown(inputCountry, { key: "Enter" });

    await act(async () => {
      fireEvent.click(button);
    });

    waitFor(() => expect(queryByTestId("loading-spinner")).toBeInTheDocument());

    expect(screen.queryByText("City is required")).toBeNull();
    expect(screen.queryByText("Country is required")).toBeNull();

    expect(fetchWeather).toHaveBeenCalledTimes(1);
    expect(fetchWeather).toHaveBeenCalledWith("Melbourne", "AU");

    expect(screen.getByTestId("weather-info-area")).toBeInTheDocument();
    expect(screen.getByTestId("cardcontent")).toHaveTextContent("Melbourne");
    expect(screen.getByTestId("cardcontent")).toHaveTextContent("AU");
    expect(screen.getByTestId("cardcontent")).toHaveTextContent("19.16");
    expect(screen.getByTestId("cardcontent")).toHaveTextContent(
      "Broken Clouds"
    );
    expect(getByAltText("Current weather icon.")).toBeInTheDocument();
  });

  test("displays error info when API returns an error response", async () => {
    const errorMessage =
      "City not found. Please enter a valid City and Country";
    fetchWeather.mockRejectedValueOnce(new Error(errorMessage));

    const { getByText, getByLabelText, getByRole, getByAltText } = render(
      <ContainerCard />
    );

    const inputCity = getByLabelText("Enter City here..");
    const inputCountry = getByRole("combobox", { name: "Select a country" });
    const button = getByText("Search");

    fireEvent.change(inputCity, { target: { value: "Non-existing" } });

    fireEvent.focus(inputCountry);
    fireEvent.change(inputCountry, { target: { value: "Australia" } });
    fireEvent.keyDown(inputCountry, { key: "ArrowDown" });
    fireEvent.keyDown(inputCountry, { key: "Enter" });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(fetchWeather).toHaveBeenCalledTimes(1);
    expect(fetchWeather).toHaveBeenCalledWith("Non-existing", "AU");

    expect(screen.getByTestId("cardcontent")).toHaveTextContent(errorMessage);
    expect(getByAltText("Error icon")).toBeInTheDocument();
  });
});
