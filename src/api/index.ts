import axios, { AxiosResponse } from "axios";
import {
    PokemonListResponse,
    PokemonInfoResponse,
    PokemonSpeciesResponse,
    EvolutionChainResponse,
} from "../types";

const request = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
});

/**
 * 포켓몬 목록을 가져옵니다.
 */
const getPokemonList = async (
    limit: number,
    offset: number
): Promise<AxiosResponse<PokemonListResponse, any>> => {
    return await request.get<PokemonListResponse>(
        `/pokemon?limit=${limit}&offset=${offset}`
    );
};

/**
 * 포켓몬 정보를 가져옵니다.
 */
const getPokemonInfo = async (
    name: string
): Promise<AxiosResponse<PokemonInfoResponse, any>> => {
    return await request.get<PokemonInfoResponse>(`/pokemon/${name}`);
};

/**
 * 포켓몬 종 정보를 가져옵니다.
 */
const getPokemonSpecies = async (
    name: string
): Promise<AxiosResponse<PokemonSpeciesResponse, any>> => {
    return await request.get<PokemonSpeciesResponse>(
        `/pokemon-species/${name}`
    );
};

/**
 * 포켓몬 진화 정보를 가져옵니다.
 */
const getEvolutionChain = async (
    url: string
): Promise<AxiosResponse<EvolutionChainResponse, any>> => {
    return await request.get<EvolutionChainResponse>(url);
};

export { getPokemonList, getPokemonInfo, getPokemonSpecies, getEvolutionChain };
