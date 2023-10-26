import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PokemonInfo } from "../types";

export interface pokemonDictionaryState {
    page: number;
    pokemonList: PokemonInfo[];
}

const initialState: pokemonDictionaryState = {
    page: 1,
    pokemonList: [],
};

export const pokemonDictionarySlice = createSlice({
    name: "pokemon-dictionary",
    initialState,
    reducers: {
        setPokemonList: (state, action: PayloadAction<PokemonInfo[]>) => {
            state.pokemonList = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setPokemonList, setPage } = pokemonDictionarySlice.actions;

export default pokemonDictionarySlice.reducer;
