import { PokemonInfo } from "../types";
import styles from "./PokemonCard.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
    pokemonInfo: PokemonInfo;
};

export default function PokemonCard({ pokemonInfo }: Props) {
    const navigate = useNavigate();

    const onClickCard = (): void => {
        navigate(`/detail/${pokemonInfo.name}`);
    };

    return (
        <div className={styles.card} onClick={onClickCard}>
            <img
                src={
                    pokemonInfo.sprites.other["official-artwork"].front_default
                }
                alt={pokemonInfo.name}
            />
            <p className="">{`#${pokemonInfo.id
                .toString()
                .padStart(4, "0")}`}</p>
            <h3>{pokemonInfo.name}</h3>
            <div className={styles.tags}>
                {pokemonInfo.types.map((typeInfo) => (
                    <span key={typeInfo.slot} className={styles.tag}>
                        {typeInfo.type.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
