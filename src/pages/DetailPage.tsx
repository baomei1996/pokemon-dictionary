import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import {
    PokemonInfo,
    PokemonSpeciesResponse,
    EvolutionChainResponse,
} from "../types";
import { getPokemonInfo, getPokemonSpecies, getEvolutionChain } from "../api";
import ContentTop from "../components/detail/ContentTop";
import ContentCenter from "../components/detail/ContentCenter";
import ContentBottom from "../components/detail/ContentBottom";
import MetaTag from "../components/MetaTag";

const DetailPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | null>(null);
    const [pokemonSpecies, setPokemonSpecies] =
        useState<PokemonSpeciesResponse | null>(null);
    const [evolutionChain, setEvolutionChain] = useState<
        EvolutionChainResponse["chain"] | null
    >(null);

    useEffect(() => {
        fetchPokemonDetailData();
    }, []);

    const fetchPokemonDetailData = async (): Promise<void> => {
        try {
            if (!name) return;

            // 포켓몬의 상세 정보를 받아온다.
            const { data: pokemonInfo } = await getPokemonInfo(name);
            setPokemonInfo(pokemonInfo);

            // 포켓몬의 종류 정보를 받아온다.
            const { data: pokemonSpecies } = await getPokemonSpecies(name);
            setPokemonSpecies(pokemonSpecies);

            // 포켓몬의 진화 정보를 받아온다.
            const { data: evolutionChain } = await getEvolutionChain(
                pokemonSpecies.evolution_chain.url
            );
            setEvolutionChain(evolutionChain.chain);
        } catch (err) {
            console.error(err);
        }
    };

    const getKrName = (): string => {
        const language = pokemonSpecies?.names.find(
            (name) => name.language.name === "ko"
        );

        return language ? language.name : "";
    };

    if (!pokemonInfo || !pokemonSpecies || !evolutionChain)
        return <div>loading...</div>;

    return (
        <div className={styles.container}>
            <MetaTag
                title={`포켓몬 도감 / ${pokemonInfo.name}`}
                description={`내가 갖고싶은 포켓몬은 바로! ${pokemonInfo.name}`}
                keywords={`"포켓몬 도감 | 포켓몬 게임 | 포켓몬 | ${pokemonInfo.name}`}
                imgSrc={
                    pokemonInfo.sprites.other["official-artwork"].front_default
                }
            />
            <div className={styles.content}>
                <ContentTop
                    krName={getKrName()}
                    name={pokemonInfo.name}
                    id={pokemonInfo.id}
                />
                <ContentCenter
                    pokemonInfo={pokemonInfo}
                    pokemonSpecies={pokemonSpecies}
                />
                <ContentBottom evolutionChain={evolutionChain} />
            </div>
        </div>
    );
};

export default DetailPage;
