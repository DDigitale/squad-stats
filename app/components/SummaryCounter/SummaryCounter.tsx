'use client'
import styles from './SummaryCounter.module.scss';
import {useQuery} from "@tanstack/react-query";
import {fetchServerSummaryData} from "@/app/lib/api";

interface SummaryCounterProps {
    className?: string
    // summaryData: any
}

export const SummaryCounter = (props: SummaryCounterProps) => {
    // const {className, summaryData} = props;

    const {data} = useQuery({
        queryKey: ['summary-server'],
        queryFn: fetchServerSummaryData,
        // initialData: summaryData,
    })

    const summary = data?.serverData

    return (
        <>
            {summary ? <span className={styles.stats}>
                КД: {(summary[0].kills / summary[0].deaths).toFixed(2)} Убийств: {summary[0].kills} Смертей: {summary[0].deaths} Ранений: {summary[0].wounds} Возрождений: {summary[0].reviwes} Тимкиллов: {summary[0].teamkills} Матчей: {summary[0].matches}
            </span>
                : null
            }
        </>
    )
}