import React from "react";
import styles from "./SearchPokemon.module.css";

type Props = {
    onSubmit: (search: string) => void;
};

export default function SearchPokemon({ onSubmit }: Props) {
    const [search, setSearch] = React.useState<string>("");

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(search);
    };

    return (
        <form onSubmit={onSubmitHandler} className={styles.search}>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Enter Pokemon id or name..."
            />
            <button type="submit">검색</button>
        </form>
    );
}
