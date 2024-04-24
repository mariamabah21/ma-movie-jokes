import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "src/features/movies/MovieDetails";
import MoviesList from "src/features/movies/MoviesList";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/">
          <Route index element={<MoviesList />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
