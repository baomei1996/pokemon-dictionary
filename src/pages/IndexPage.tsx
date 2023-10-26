import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setPage, setPokemonList } from "../redux/pokemonDictionarySlice";
import { getPokemonList, getPokemonInfo } from "../api";
import { LIST_LIMIT } from "../static/constants";
import { PokemonInfo } from "../types";

const IndexPage: React.FC = () => {
    const page = useAppSelector((state) => state.page);
    const pokemonList = useAppSelector((state) => state.pokemonList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchPokemonList();
    }, []);

    // TODO: Add infinite scroll
    const fetchPokemonList = async (): Promise<void> => {
        try {
            // 페이지 번호와 오프셋을 이용해 포켓몬 리스트를 받아온다.
            const offset = page * LIST_LIMIT;
            const { data } = await getPokemonList(LIST_LIMIT, offset);

            // 받아온 리스트를 하나씩 순회하며 각 포켓몬의 상세 정보를 받아온다.
            const newPokemonList: PokemonInfo[] = [];
            for (const simplePokemonInfo of data.results) {
                const { data: pokemonInfo } = await getPokemonInfo(
                    simplePokemonInfo.name
                );
                newPokemonList.push(pokemonInfo);
            }

            // 새로 받아온 포켓몬 리스트를 스토어에 저장하고 페이지 카운트를 하나 올려 저장한다.
            dispatch(setPage(page + 1));
            dispatch(setPokemonList([...pokemonList, ...newPokemonList]));
        } catch (err) {
            console.error(err);
        }
    };

    return <div>IndexPage</div>;
};

export default IndexPage;
