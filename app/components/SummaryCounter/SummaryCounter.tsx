'use client'
import styles from './SummaryCounter.module.scss';
import {useQuery} from "@tanstack/react-query";
import {fetchServerSummaryData} from "@/utils/api";

interface SummaryCounterProps {
    className?: string
    summaryData: any
}

export const SummaryCounter = (props: SummaryCounterProps) => {
    const {className, summaryData} = props;

    const {data, isError} = useQuery({
        queryKey: ['summary-server'],
        queryFn: fetchServerSummaryData,
        initialData: summaryData
    })

    return (
        <>
            {data && <span className={styles.stats}>
            КД: {(data.kills / data.deaths).toFixed(2)} Убийств: {data.kills} Смертей: {data.deaths} Ранений: {data.wounds} Возрождений: {data.reviwes} Тимкиллов: {data.teamkills} Матчей: {data.matches}
        </span>}
            {isError && <span className={styles.stats}>Ошибка получения данных с сервера</span>}
        </>
    )
}