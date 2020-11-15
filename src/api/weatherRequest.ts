import APIRequest from "./request";
import Weather from "../core/objects/weather";

const API_KEY = "fefde424a973e343f49dbf4192f53167";

class weatherRequest {
  static getData = (lat, lon) => {
    return APIRequest(
      "GET",
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      []
    );
  };
}

const getSargossoSeaWeather = () => {
  // Coord for sargossoSea
  const lat = "34.307144";
  const lon = "-66.269531";

  weatherRequest.getData(lat, lon).then((response) => {
    const weather = new Weather(
      response.data["temp"],
      response.data["pressure"],
      response.data["humidity"]
    );
  });
};

export default { getSargossoSeaWeather };

// Response from Api
// base: "stations"
// clouds:
// all: 89
// __proto__: Object
// cod: 200
// coord:
// lat: 34.31
// lon: -66.27
// __proto__: Object
// dt: 1605353522
// id: 0
// main:
// feels_like: 294.4
// grnd_level: 1015
// humidity: 86
// pressure: 1015
// sea_level: 1015
// temp: 296.09
// temp_max: 296.09
// temp_min: 296.09
// __proto__: Object
// name: ""
// sys:
// sunrise: 1605351469
// sunset: 1605388896
// __proto__: Object
// timezone: -14400
// visibility: 10000
// weather: Array(1)
// 0: {id: 804, main: "Clouds", description: "overcast clouds", icon: "04d"}
// length: 1
// __proto__: Array(0)
// wind:
// deg: 335
// speed: 8.01
// __proto__: Object
// __proto__: Object
