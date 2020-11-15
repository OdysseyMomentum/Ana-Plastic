import React, { ReactElement, useEffect } from "react";
import "../../assets/css/home/App.css";
import airplaneRequest from "../../api/airplaneRequest";

const App: React.FC = (): ReactElement => {
  useEffect(() => {
    airplaneRequest.getAirplanesOverSargosso();
  });

  return (
    <div className="App">
      <h1>Balance the World</h1>
    </div>
  );
};

export default App;
