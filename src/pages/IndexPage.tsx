import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setPage, setPokemonList } from "../redux/pokemonDictionarySlice";
import { getPokemonList, getPokemonInfo } from "../api";
import { LIST_LIMIT } from "../static/constants";
import { PokemonInfo } from "../types";
import styles from "./IndexPage.module.css";
import PokemonCard from "../components/PokemonCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIndicator from "../components/LoadingIndicator";
import SearchPokemon from "../components/SearchPokemon";

const IndexPage: React.FC = () => {
    const page = useAppSelector((state) => state.page);
    const pokemonList = useAppSelector((state) => state.pokemonList);
    const dispatch = useAppDispatch();
    const [hasMoreItem, setHasMoreItem] = useState<boolean>(true);
    const [searchedPokemon, setSearchedPokemon] = useState<PokemonInfo | null>(
        null
    );

    useEffect(() => {
        fetchPokemonList();
    }, []);

    const fetchPokemonList = async (): Promise<void> => {
        try {
            // 페이지 번호와 오프셋을 이용해 포켓몬 리스트를 받아온다.
            const offset = (page - 1) * LIST_LIMIT;
            const { data } = await getPokemonList(LIST_LIMIT, offset);

            // 받아온 리스트의 개수가 요청한 개수보다 적으면 더 이상 받아올 리스트가 없다고 판단한다.
            if (data.count <= pokemonList.length) {
                setHasMoreItem(false);
                return;
            }

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

    const onSubmitHandler = async (search: string): Promise<void> => {
        try {
            if (search === "") {
                setSearchedPokemon(null);
                return;
            }

            // 검색한 포켓몬의 상세 정보를 받아온다.
            const { data: pokemonInfo } = await getPokemonInfo(search);
            setSearchedPokemon(pokemonInfo);
        } catch (err: any) {
            console.error(err);
            // 검색 결과가 없어 404 에러가 발생하는 경우 에러 메시지를 띄운다.
            if (err.response.status === 404) {
                alert("검색 결과가 없습니다.");
            }
        }
    };

    return (
        <div className={styles.container}>
            <SearchPokemon onSubmit={onSubmitHandler} />
            {searchedPokemon ? (
                <div className={styles.list}>
                    <PokemonCard pokemonInfo={searchedPokemon} />
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={pokemonList.length}
                    next={fetchPokemonList}
                    hasMore={hasMoreItem}
                    loader={<LoadingIndicator />}
                >
                    <div className={styles.list}>
                        {pokemonList.map((pokemonInfo) => (
                            <PokemonCard
                                pokemonInfo={pokemonInfo}
                                key={pokemonInfo.id}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default IndexPage;
