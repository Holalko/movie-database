import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {
  movieSlice,
  sagas as moviesSaga,
} from "../visual/pages/MoviesPage/slice";
import {
  movieDetailSlice,
  sagas as movieDetailSaga,
} from "../visual/pages/MovieDetailPage/slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
    movieDetail: movieDetailSlice.reducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(moviesSaga);
sagaMiddleware.run(movieDetailSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
