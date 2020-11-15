import React, { ReactElement, useEffect } from "react";
import "../../assets/css/home/App.css";
import airplaneRequest from "../../api/airplaneRequest";

const App: React.FC = (): ReactElement => {
  useEffect(() => {
    airplaneRequest.getAirplanesOverSargosso();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://cdn.discordapp.com/attachments/776780435903873026/777188544774406174/turtlesmall200.png" style={{width: "500px"}} />
        <h1>Balance The World</h1>
        <p className="lead">Understand the world of finance and climate</p>
        <a className="btn btn-primary mt-5" href="/#/game">
          Begin the journey
        </a>
      </header>
      <footer>
        <p>Copyright ana-plastic </p>
        <p>Also check: DasMeer / PlastPick</p>
      </footer>
    </div>
  );
};

export default App;
