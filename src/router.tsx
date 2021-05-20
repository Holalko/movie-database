import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ApplicationOverlay from "./visual/overlays/ApplicationOverlay";

const MoviesPage = React.lazy(() => import("./visual/pages/MoviesPage"));
const MovieDetailPage = React.lazy(
  () => import("./visual/pages/MovieDetailPage")
);
const FavouriteMoviesPage = React.lazy(
  () => import("./visual/pages/FavouriteMoviesPage")
);

const Router = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={"Loading..."}>
        <ApplicationOverlay>
          <Switch>
            <Route
              exact
              path={"/"}
              render={() => <Redirect to={"/movies"} />}
            />
            <Route exact path={"/movies"}>
              <MoviesPage />
            </Route>
            <Route exact path={"/movies/favourites"}>
              <FavouriteMoviesPage />
            </Route>
            <Route exact path={"/movies/:id"}>
              <MovieDetailPage />
            </Route>
          </Switch>
        </ApplicationOverlay>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;
