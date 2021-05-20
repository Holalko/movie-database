import { Movie } from "../../../models/Movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, debounce, put } from "redux-saga/effects";
import { getRequest } from "../../../requests/network";
import { PagedApiResponse } from "../../../models/ApiResponse";
import { RootState } from "../../../redux/store";

type RequestStatus = "idle" | "loading" | "failed";

type MoviesState = {
  movies: PagedApiResponse<Movie> | null;
  status: RequestStatus;
};

const initialState: MoviesState = {
  movies: null,
  status: "idle",
};

export type FetchMoviesFilterType = { search: string; page: number };
type FetchAction = PayloadAction<FetchMoviesFilterType>;
type FetchSuccessAction = PayloadAction<{ movies: PagedApiResponse<Movie> }>;

export const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    fetchMovies: (state, action: FetchAction) => {
      state.status = "loading";
    },
    fetchSuccess: (state, action: FetchSuccessAction) => {
      state.movies = action.payload.movies;
      state.status = "idle";
    },
    fetchError: (state) => {
      state.status = "failed";
    },
  },
});

export const actions = movieSlice.actions;
export const moviesSelector = (
  state: RootState
): PagedApiResponse<Movie> | null => state.movies.movies;
export const statusSelector = (state: RootState): RequestStatus =>
  state.movies.status;

function* searchMoviesSaga(action: FetchAction) {
  try {
    const response: PagedApiResponse<Movie> = yield getRequest<
      PagedApiResponse<Movie>
    >(
      `https://omdbapi.com/?apikey=${"34b99d"}&s=${
        action.payload.search
      }&page=${action.payload.page}`
    );
    yield put(
      actions.fetchSuccess({
        movies: response,
      })
    );
  } catch (err) {
    yield put(actions.fetchError);
  }
}

export function* sagas() {
  yield all([yield debounce(300, actions.fetchMovies.type, searchMoviesSaga)]);
}
