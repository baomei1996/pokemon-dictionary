import React from "react";
import styles from "./ContentTop.module.css";

type Props = {
    name: string;
    krName: string;
    id: number;
};

export default function ContentTop({ name, krName, id }: Props) {
    return (
        <div className={styles.container}>
            <h3>{`${name} / ${krName}`}</h3>
            <span>{`#${id.toString().padStart(4, "0")}`}</span>
        </div>
    );
}
