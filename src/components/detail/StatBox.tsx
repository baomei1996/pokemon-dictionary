import React from "react";
import { PokemonInfo } from "../../types";
import styles from "./StatBox.module.css";
import ProgressBar from "../ProgressBar";

type Props = {
    stats: PokemonInfo["stats"];
};

export default function StatBox({ stats }: Props) {
    return (
        <div className={styles.container}>
            <span>Stats</span>
            <div className={styles.stats}>
                {stats.map((stat) => (
                    <ProgressBar
                        key={stat.stat.name}
                        name={stat.stat.name}
                        baseStat={stat.base_stat}
                        effort={stat.effort}
                    />
                ))}
            </div>
        </div>
    );
}
