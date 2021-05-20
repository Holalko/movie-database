import React from "react";
import { Card } from "react-bootstrap";
import { Movie } from "../../../models/Movie";
import mergeProps from "merge-props";
import { NavLink } from "react-router-dom";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({
  movie,
  ...props
}: MovieCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  const mergedProps = mergeProps(props, {
    className: "movie-card",
  });
  return (
    <NavLink to={`/movies/${movie.imdbID}`}>
      <Card {...mergedProps}>
        <Card.Img variant="top" src={movie.Poster} height={150} />
        <Card.Body>
          <Card.Title className={"text-truncate"}>{movie.Title}</Card.Title>
          <Card.Text>
            <strong>Year: </strong>
            {movie.Year}
          </Card.Text>
          Detail
        </Card.Body>
      </Card>
    </NavLink>
  );
};

export default MovieCard;
