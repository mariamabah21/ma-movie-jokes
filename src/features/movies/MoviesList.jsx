import { Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { MOVIEDB_IMAGES_URL } from "src/common/constant";
import MovieCard from "./MovieCard";
import {
  useGetMovieByIdQuery,
} from "./moviesSlice";
import { useEffect } from "react";

function MoviesList() {
 const { data, isError, error, isLoading, isSuccess } = useGetMovieByIdQuery();
 
  let content;
  if (isSuccess) {
    content = (
      <SimpleGrid spacing={4} columns={{ sm: 1, md: 3, lg: 4 }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={`${MOVIEDB_IMAGES_URL}/${movie.poster_path}`}
            overview={movie.overview}
          />
        ))}
      </SimpleGrid>
    );
  } else if (isLoading) {
    content = (
      <Flex alignItems="center" justifyContent="center" minH="100vh">
        <Spinner text="Loading..." />
      </Flex>
    );
  } else if (isError) {
    content = (
      <Flex alignItems="center" justifyContent="center" minH="100vh">
        {error}
      </Flex>
    );
  }
  return (
    <>
      <Heading textAlign="center" size="xl" mb={4}>
        Trending movies
      </Heading>
      {content}
    </>
  );
}

export default MoviesList;

// ``
