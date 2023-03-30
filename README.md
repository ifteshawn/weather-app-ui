Weather App Front End
This Weather App Front End is a web application that allows users to search for weather information by entering a city and country. The app validates the user inputs and sends the user's input to a back end weather service and displays the weather information or error it receives in response. This app has a countries.js file that has a list of all the countries in the world and their respective country codes. The user can select the countries from this list in the drop down list in the UI.

# Tools required to run the application:

Node.js
Visual Studio Code

# Installation:

Clone the repository to your local machine.
In a terminal, navigate to the project directory.
Run "npm install" to install all dependencies.

# Configuration
This app has a .env file that has 5 API keys it can use to authenticate itself to the back end weather service by including the keys in the request header. After an API key has reached it request limit, the app switches to the next API key to let the user allow sending requests again.

# Usage:

Open the project directory in Visual Studio Code.
In a terminal, navigate to the project directory.
Run "npm start" to start the application.
This should automatically open the open browser with the URL: "http://localhost:3000".
Enter a city and country in the search bar and click the "Search" button.
The app will send the user's input to the back end weather service and display the weather information it receives in response.

# Note:

You'll need to have the weather App back end service running in order to fetch weather information from the front end.
Link to back end repo: https://github.com/ifteshawn/WeatherApi
Please follow instructions in the back end repo readme file to install and run the back end.

# Testing:
To run the react testing scripts, run "npm test" in the terminal.
