import React, { ReactElement, Suspense, lazy } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../assets/theme";
import history from "../utils/history";
import Loader from "../components/loader";

const Home = lazy(() => import("../views/home/App"));
const Game = lazy(() => import("../views/game/Game"));

const IndexRouter: React.FC = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter basename={`${process.env.PUBLIC_URL}/`} history={history}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/game" exact component={Game} />
          </Switch>
        </Suspense>
      </HashRouter>
    </ThemeProvider>
  );
};

export default IndexRouter;
