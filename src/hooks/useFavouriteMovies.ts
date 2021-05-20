import { useState } from "react";
import { MovieDetail } from "../models/MovieDetail";

const FAVOURITE_MOVIES_KEY = "__favourite-movies-key__";
export const useFavouriteMovies = (): [
  Array<MovieDetail>,
  (movie: MovieDetail) => void
] => {
  const [favouriteMovies, setFavouriteMovies] = useState<Array<MovieDetail>>(
    () => {
      const localStorageItem = localStorage.getItem(FAVOURITE_MOVIES_KEY);
      return localStorageItem ? JSON.parse(localStorageItem) : [];
    }
  );

  const handleFavouriteClick = (movie: MovieDetail) => {
    const localStorageItem = localStorage.getItem(FAVOURITE_MOVIES_KEY);
    const favouriteMovies: Array<MovieDetail> = localStorageItem
      ? JSON.parse(localStorageItem)
      : [];
    const isFavourite = favouriteMovies.find(
      (fm) => fm.imdbID === movie.imdbID
    );

    let newFavouriteMovies;
    if (isFavourite) {
      newFavouriteMovies = favouriteMovies.filter(
        (fm) => fm.imdbID !== movie.imdbID
      );
    } else {
      newFavouriteMovies = [...favouriteMovies, movie];
    }
    localStorage.setItem(
      FAVOURITE_MOVIES_KEY,
      JSON.stringify(newFavouriteMovies)
    );
    setFavouriteMovies(newFavouriteMovies);
  };

  return [favouriteMovies, handleFavouriteClick];
};
