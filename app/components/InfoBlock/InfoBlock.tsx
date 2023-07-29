import styles from './InfoBlock.module.scss';
import React from "react";

interface InfoBlockProps {
    className?: string
    children: React.ReactNode
}

export const InfoBlock = (props: InfoBlockProps) => {
    const {className, children} = props;

    return (
        <div className={styles.InfoBlock}>
            <span className={styles.infoText}>{children}</span>
        </div>
    )
}