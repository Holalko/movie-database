import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "../../../requests/network";
import { ApiResponse } from "../../../models/ApiResponse";
import { RootState } from "../../../redux/store";
import { MovieDetail } from "../../../models/MovieDetail";

type RequestStatus = "idle" | "loading" | "failed";

type MovieState = {
  movie: ApiResponse<MovieDetail> | null;
  status: RequestStatus;
};

const initialState: MovieState = {
  movie: null,
  status: "idle",
};

type FetchAction = PayloadAction<{ movieId: string }>;
type FetchSuccessAction = PayloadAction<{ movie: ApiResponse<MovieDetail> }>;

export const movieDetailSlice = createSlice({
  name: "movieDetailSlice",
  initialState,
  reducers: {
    fetchMovie: (state, action: FetchAction) => {
      state.status = "loading";
    },
    fetchSuccess: (state, action: FetchSuccessAction) => {
      state.movie = action.payload.movie;
      state.status = "idle";
    },
    fetchError: (state) => {
      state.status = "failed";
    },
  },
});

export const actions = movieDetailSlice.actions;
export const movieDetailSelector = (
  state: RootState
): ApiResponse<MovieDetail> | null => state.movieDetail.movie;
export const statusSelector = (state: RootState): RequestStatus =>
  state.movieDetail.status;

function* fetchMovieDetailSaga(action: FetchAction) {
  try {
    const response: ApiResponse<MovieDetail> = yield getRequest<
      ApiResponse<MovieDetail>
    >(`https://omdbapi.com/?apikey=${"34b99d"}&i=${action.payload.movieId}`);
    yield put(
      actions.fetchSuccess({
        movie: response,
      })
    );
  } catch (err) {
    yield put(actions.fetchError);
  }
}

export function* sagas() {
  yield all([yield takeLatest(actions.fetchMovie.type, fetchMovieDetailSaga)]);
}
