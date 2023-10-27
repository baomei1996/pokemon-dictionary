import React from "react";
import styles from "./ProgressBar.module.css";

type Props = {
    name: string;
    baseStat: number;
    effort: number;
};

export default function ProgressBar({ name, baseStat, effort }: Props) {
    return (
        <div className={styles.container}>
            <span>{name}</span>
            <progress max="100" value={(effort / baseStat) * 100}>
                70%
            </progress>
        </div>
    );
}
