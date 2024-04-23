import { Route, Routes } from "react-router-dom";
import MoviesList from "src/features/movies/MoviesList";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MoviesList />} />
        <Route path="/movies/:movieId" element={<MoviesList />} />
      </Route>
    </Routes>
  );
}

export default App;
