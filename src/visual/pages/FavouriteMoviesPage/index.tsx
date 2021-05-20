import React from "react";
import { Card, CardDeck, Col, Container } from "react-bootstrap";
import MovieCard from "../../components/MovieCard";
import { useFavouriteMovies } from "../../../hooks/useFavouriteMovies";

const FavouriteMoviesPage = () => {
  const [favouriteMovies] = useFavouriteMovies();

  return (
    <Container>
      <Card className={"shadow-sm"}>
        <Card.Header>
          <h4>My favourite movies</h4>
        </Card.Header>
        <Card.Body>
          <CardDeck>
            {favouriteMovies?.map((movie) => (
              <Col md={3} className={"my-2"} key={movie.imdbID}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </CardDeck>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FavouriteMoviesPage;
