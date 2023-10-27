import React from "react";
import styles from "./ContentCenter.module.css";
import { PokemonInfo, PokemonSpeciesResponse } from "../../types";
import StatBox from "./StatBox";
import ProfileBox from "./ProfileBox";

type Props = {
    pokemonInfo: PokemonInfo;
    pokemonSpecies: PokemonSpeciesResponse;
};

export default function ContentCenter({ pokemonInfo, pokemonSpecies }: Props) {
    return (
        <div className={styles.container}>
            <div>
                <img
                    src={
                        pokemonInfo.sprites.other["official-artwork"]
                            .front_default
                    }
                    alt={pokemonInfo.name}
                />
                <StatBox stats={pokemonInfo.stats} />
            </div>
            <div>
                <p>{pokemonSpecies.flavor_text_entries[0].flavor_text}</p>
                <ProfileBox pokemonInfo={pokemonInfo} />
                <div className={styles.typeContainer}>
                    <h3>Type</h3>
                    <div className={styles.types}>
                        {pokemonInfo.types.map((type) => (
                            <span className={styles.type} key={type.type.name}>
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
