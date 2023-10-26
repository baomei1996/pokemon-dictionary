import React from "react";
import styles from "./LoadingIndicator.module.css";

export default function LoadingIndicator() {
    return (
        <div className={styles.indicatorContainer}>
            <div className={styles.indicator}></div>
        </div>
    );
}
