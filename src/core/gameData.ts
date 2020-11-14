import { AmdDependency } from "typescript";

class GameData {
  static airplanes = [];

  static weather = {};

  static setAirplanes = (newAirplanes) => {
    GameData.airplanes = newAirplanes;
  };

  static getAirplanes = () => {
    return GameData.airplanes;
  };
}

export default GameData;
