import React, { useEffect, useState } from "react";
import { PokemonInfo } from "../../types";
import { getPokemonInfo } from "../../api";
import styles from "./PokemonCircleProfile.module.css";

type Props = {
    name: string;
};

export default function PokemonCircleProfile({ name }: Props) {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | null>(null);

    useEffect(() => {
        fetchPokemonInfo();
    }, []);

    const fetchPokemonInfo = async () => {
        try {
            const { data: pokemonInfo } = await getPokemonInfo(name);
            setPokemonInfo(pokemonInfo);
        } catch (err) {
            console.error(err);
        }
    };

    if (!pokemonInfo) return <div>loading...</div>;

    return (
        <div className={styles.container}>
            <img
                src={
                    pokemonInfo.sprites.other["official-artwork"].front_default
                }
                alt={pokemonInfo.name}
            />
            <h3>{pokemonInfo.name}</h3>
            <div className={styles.types}>
                {pokemonInfo.types.map((type) => (
                    <span className={styles.type} key={type.type.name}>
                        {type.type.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
