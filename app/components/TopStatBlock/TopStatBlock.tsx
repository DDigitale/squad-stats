import styles from './TopStatBlock.module.scss';

interface TopStatBlockProps {
    className?: string
}

export const TopStatBlock = (props: TopStatBlockProps) => {

    return (
        <div className={styles.TopStatBlock}>
            TopStatBlock
        </div>
    )
}