import { Link } from "react-router-dom";
import { data } from "./data";
import MovieCard from "./MovieCard";
import { SimpleGrid } from "@chakra-ui/react";

function MoviesList() {
  return (
    <SimpleGrid spacing={4} columns={4}>
      {data.results.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          {" "}
          {movie.title}
          <MovieCard />
        </Link>
      ))}
    </SimpleGrid>
  );
}

export default MoviesList;
