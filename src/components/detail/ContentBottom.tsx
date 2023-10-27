import React, { useEffect } from "react";
import styles from "./ContentBottom.module.css";
import { Chain } from "../../types";
import PokemonCircleProfile from "./PokemonCircleProfile";

type Props = {
    evolutionChain: Chain;
};

export default function ContentBottom({ evolutionChain }: Props) {
    const [evolutions, setEvolutions] = React.useState<string[]>([]);

    useEffect(() => {
        makeEvolutions(evolutionChain);

        return () => {
            setEvolutions([]);
        };
    }, []);

    const makeEvolutions = (chain: Chain): void => {
        setEvolutions((prev) => [...prev, chain.species.name]);

        if (chain.evolves_to.length) {
            const nextChain = chain.evolves_to[0];
            makeEvolutions(nextChain);
        }
    };

    return (
        <div className={styles.container}>
            {evolutions.map((name, index) => (
                <div key={name} className={styles.item}>
                    <PokemonCircleProfile name={name} />
                    {index !== evolutions.length - 1 && (
                        <svg height="45" viewBox="0 -960 960 960" width="45">
                            <path
                                d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                                fill="white"
                            />
                        </svg>
                    )}
                </div>
            ))}
        </div>
    );
}
