import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useMovieDetail } from "./hooks";
import FullStarIcon from "../../components/icons/FullStarIcon";
import EmptyStarIcon from "../../components/icons/EmptyStarIcon";
import { useFavouriteMovies } from "../../../hooks/useFavouriteMovies";
import Tooltip from "../../components/Tooltip";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { movieDetail, status } = useMovieDetail(id);

  const [favouriteMovies, handleFavouriteClick] = useFavouriteMovies();
  const isFavourite = favouriteMovies.find((fm) => fm.imdbID === id);

  const handleFavouriteChange = () => {
    if (movieDetail) handleFavouriteClick(movieDetail);
  };

  return (
    <Container>
      <Loader isLoading={status === "loading"}>
        <Card className={"shadow-sm"}>
          <Card.Body>
            <Row>
              <Col md={3}>
                <img
                  src={movieDetail?.Poster}
                  alt={`movie-${movieDetail?.Title}`}
                  width={"100%"}
                />
              </Col>
              <Col md={9}>
                <h4>
                  {movieDetail?.Title}{" "}
                  <Tooltip
                    id={`movie-favourite-${movieDetail?.imdbID}`}
                    tooltip={"Click to add to favourites!"}
                  >
                    {isFavourite ? (
                      <FullStarIcon
                        onClick={handleFavouriteChange}
                        className={"cursor-pointer"}
                      />
                    ) : (
                      <EmptyStarIcon
                        onClick={handleFavouriteChange}
                        className={"cursor-pointer"}
                      />
                    )}
                  </Tooltip>
                </h4>
                {movieDetail ? JSON.stringify(movieDetail) : null}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Loader>
    </Container>
  );
};

export default MovieDetailPage;
