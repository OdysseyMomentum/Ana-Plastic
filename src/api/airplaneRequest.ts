import APIRequest from "./request";
import Airplane from "../core/objects/airplane";

const API_KEY = "fefde424a973e343f49dbf4192f53167";

class airplaneRequest {
  static get = (latMin, longMin, latMax, longMax) => {
    return APIRequest(
      "GET",
      `https://opensky-network.org/api/states/all?lamin=${latMin}&lomin=${longMin}&lamax=${latMax}&lomax=${longMax}`,
      []
    );
  };
}

const getAirplanesOverSargosso = () => {
  // Sargosso sea
  const latMin = "-85.585";
  const latMax = "-29.2436";
  const longMin = "15.563";
  const longMax = "35.9825";

  airplaneRequest.get(latMin, longMin, latMax, longMax).then((response) => {
    const airplanes = [];

    console.log(response);

    response.states.forEach((airplaneResponse) => {
      const airplane = new Airplane(airplaneResponse[5], airplaneResponse[6]);

      airplanes.push(airplane);
    });

    return airplanes;
  });
};

export default { getAirplanesOverSargosso };
