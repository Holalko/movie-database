import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  actions,
  FetchMoviesFilterType,
  moviesSelector,
  statusSelector,
} from "../slice";
import { useEffect } from "react";

export const useMovies = (filter: FetchMoviesFilterType) => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(moviesSelector);
  const loadingStatus = useAppSelector(statusSelector);

  useEffect(() => {
    dispatch(actions.fetchMovies(filter));
  }, [filter, dispatch]);

  return {
    movies,
    loadingStatus,
  };
};
