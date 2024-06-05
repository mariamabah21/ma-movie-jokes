import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { OPENAI_COMPLETETIONS_API_URL } from "src/common/constant";

const initialState = {
  rules: [{ name: "Joke type", description: "Programmers" }],
  jokes: {
    jokes: [],
    status: "idle", // "idle" / "loading" / "succeeded" / "failed"
    error: null,
  },
};

export const fetchJoke = createAsyncThunk(
  "aiJokes/fetchJoke",
  async ({ movieId, movieTitle, movieDescription }) => {
    const messages = [
      {
        role: "user",
        content: `Movie Title: ${movieTitle}, Movie Description: ${movieDescription}, ${rulesParams} Joke:`,
      },
    ];

    return { movieId, joke: "Funny joke!" };
  }
);

const response = await axios.post(
  OPENAI_COMPLETETIONS_API_URL,
  {
    messages,
    model: "gpt-3.5-turbo",
  },
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
  }
);

console.log(response);

const aiJokesSlice = createSlice({
  name: "ai-jokes",
  initialState,
  reducers: {
    ruleAdded(state, action) {
      const ruleIndex = state.rules.findIndex(
        (rule) => rule.name === action.payload.name
      );
      if (ruleIndex >= 0) return;
      state.rules.push(action.payload);
    },

    ruleRemoved(state, action) {
      const ruleIndex = state.rules.findIndex(
        (rule) => rule.name === action.payload
      );
      if (ruleIndex < 0) return;

      state.rules.splice(ruleIndex, 1);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.jokes.status = "loading";
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.jokes.status = "succeeded";
        const jokeIndex = state.jokes.jokes.findIndex(
          (joke) => joke.movieId === action.payload.movieId
        );

        if (jokeIndex > -1) {
          state.jokes.jokeIndex[jokeIndex] = action.payload;
        } else {
          state.jokes.jokes.push(action.payload);
        }
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.jokes.status = "failed";
        state.jokes.error = action.error.message;
      });
  },
});

export const selectMovieById = (state, movieId) =>
  state.movies.find((movie) => movie.id === Number(movieId));

export const { ruleAdded, ruleRemoved } = aiJokesSlice.actions;

export const selectJokeByMovieId = (state, movieId) =>
  state.aiJokes.jokes.jokes.find((joke) => joke.movieId === movieId);
export const selectJokesStatus = (state) => state.aiJokes.jokes.status;
export const selectJokesRules = (state) => state.aiJokes.rules;

export default aiJokesSlice.reducer;
