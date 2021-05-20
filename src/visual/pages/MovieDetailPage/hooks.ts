import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import { actions, movieDetailSelector, statusSelector } from "./slice";

export const useMovieDetail = (movieId: string) => {
  const dispatch = useAppDispatch();
  const movieDetail = useAppSelector(movieDetailSelector);
  const status = useAppSelector(statusSelector);
  useEffect(() => {
    dispatch(
      actions.fetchMovie({
        movieId,
      })
    );
  }, [movieId, dispatch]);

  return {
    movieDetail,
    status,
  };
};
