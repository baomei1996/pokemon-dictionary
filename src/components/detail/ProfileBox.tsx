import React from "react";
import { PokemonInfo } from "../../types";
import styles from "./ProfileBox.module.css";

type Props = {
    pokemonInfo: PokemonInfo;
};

export default function ProfileBox({ pokemonInfo }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <span className={styles.label}>Height</span>
                <div>{pokemonInfo.height}</div>
            </div>
            <div className={styles.item}>
                <span className={styles.label}>Weight</span>
                <div>{pokemonInfo.weight}</div>
            </div>
            <div className={styles.item}>
                <span className={styles.label}>Abilities</span>
                <div className={styles.tags}>
                    {pokemonInfo.abilities.map((ability) => (
                        <span className={styles.tag} key={ability.ability.name}>
                            {ability.ability.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
