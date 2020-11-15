import airplaneRequest from "../api/airplaneRequest";
import weatherRequest from "../api/weatherRequest";

class Startup {
  constructor() {
    const weather = weatherRequest.getSargossoSeaWeather();
    const airplanes = airplaneRequest.getAirplanesOverSargosso();

    
  }
}
