const baseUrl = "https://localhost:7061/api/WeatherInformation/getWeatherInfo/";
const envApiKeys = process.env.REACT_APP_API_KEYS;
const weatherApiKeys = envApiKeys.split(",");
let currentIndex = 0;

export async function fetchWeather(city, country) {
  const apiKey = weatherApiKeys[currentIndex];
  const headers = { "x-api-key": apiKey };
  const url = `${baseUrl}${city}/${country}`;

  try {
    const response = await fetch(url, { headers });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    if (response.status === 429) {
      if (currentIndex < weatherApiKeys.length - 1) {
        currentIndex++;
      } else {
        throw new Error(
          "All API keys have reached their request limit. Please wait an hour to make another request."
        );
      }
      throw new Error(
        "Current API key has reached its request limit. Please try again to use another API key for your request."
      );
    }

    if (response.status === 404) {
      throw new Error("City not found. Please enter a valid City and Country");
    }

    throw new Error("Unable to retrieve weather data. Please try again.");
  } catch (error) {
    throw error;
  }
}
