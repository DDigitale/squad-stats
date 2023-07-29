'use client'
import styles from "./Main.module.scss"

export default function Loading() {
    return (
        <div className={styles.loadingWrapper}>
            <div className={styles.loading}>Грузим...</div>
        </div>
    )
}