import React, { ReactElement, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../assets/theme";
import history from "../utils/history";

const Home = lazy(() => import("../views/home/App"));
const Game = lazy(() => import("../views/game/Game"));

const IndexRouter: React.FC = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={`${process.env.PUBLIC_URL}/`} history={history}>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/game" exact component={Game} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default IndexRouter;
