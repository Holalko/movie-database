import React from "react";
import { Card, CardDeck, Col, Container, FormControl } from "react-bootstrap";
import MovieCard from "../../components/MovieCard";
import Loader from "../../components/Loader";
import { useMovies } from "./hooks/useMovies";
import Pagination from "../../components/Pagination";
import { useFilter } from "./hooks/useFilter";

const MoviesPage = () => {
  const { filter, actions } = useFilter();
  const { movies, loadingStatus } = useMovies(filter);

  const handleSearch = (evt: React.BaseSyntheticEvent) => {
    const { value } = evt.target;
    actions.handleMoviesSearch(value);
  };

  return (
    <Container>
      <Card className={"shadow-sm"}>
        <Card.Header>
          <h3>Movies</h3>
          <FormControl
            value={filter.search}
            placeholder={"Search movies..."}
            onChange={handleSearch}
          />
        </Card.Header>
        <Card.Body>
          <Loader isLoading={loadingStatus === "loading"}>
            <CardDeck>
              {movies?.Search?.map((movie) => (
                <Col md={3} className={"my-2"} key={movie.imdbID}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </CardDeck>
          </Loader>
        </Card.Body>
        <Card.Footer>
          {movies ? (
            <Pagination
              page={filter.page}
              totalResults={parseInt(movies?.totalResults)}
              resultsPerPage={10} // hardcoded cuz api returns 10 items per page
              onPageChange={actions.handlePageChange}
            />
          ) : null}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default MoviesPage;
