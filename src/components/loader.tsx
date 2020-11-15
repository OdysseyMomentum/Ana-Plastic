import React, { ReactElement } from "react";

const Loader: React.FC = (): ReactElement => {
  return (
    <div className="loader-box">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
