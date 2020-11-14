import weatherRequest from "../api/weatherRequest";

class Startup {
  constructor() {
    weatherRequest.getSargossoSeaWeather();
  }
}
