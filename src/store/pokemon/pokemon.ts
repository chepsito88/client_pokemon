import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemon: [],
  },
  reducers: {
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
    addPokemon: (state, action) => {
      state.pokemon.push(action.payload);
    },
    updatePokemon: (state, action) => {
      const { _id } = action.payload;
      const existingPokemon = state.pokemon.find(
        (pokemon) => pokemon._id === _id
      );

      if (existingPokemon) {
        Object.assign(existingPokemon, action.payload);
      }
    },
    deletePokemonById: (state, action) => {
      state.pokemon = state.pokemon.filter(
        (pokemon) => pokemon._id !== action.payload
      );
    },
  },
});

export const { setPokemon, addPokemon, updatePokemon, deletePokemonById } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
