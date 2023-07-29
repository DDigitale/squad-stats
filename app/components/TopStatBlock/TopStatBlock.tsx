'use client'
import styles from './TopStatBlock.module.scss';
import {useQuery} from "@tanstack/react-query";
import React from "react";
import Link from "next/link";
import {fetchTopPlayersData} from "@/app/lib/api";

interface Props {
    name: string
    player: any
}

interface PlayersListProps {
    // players: any[]
}

const Block = ({name, player}: Props) => {

    return (
        <div className={styles.blockWrapper}>
            <div className={styles.title}>{name}</div>
            <div className={styles.block}>
                <div className={styles.blockItem} key={player.steamID}>
                    <Link href={`/user/${player.steamID}`} className={styles.link}>
                        <span className={styles.nickname}>{player.lastname}</span>
                    </Link>
                    <span className={styles.count}>{player.count}</span>
                </div>
            </div>
        </div>
    )
}

const NullBlock = ({name}: any) => {

    return (
        <div className={styles.blockWrapper}>
            <div className={styles.title}>{name}</div>
            <div className={styles.block}>
                <div className={styles.blockItem}>
                    <span className={styles.nickname}>{`{nickname: null}`}</span>
                    <span className={styles.count}>{`{counter: null}`}</span>
                </div>
            </div>
        </div>
    )
}


export const TopStatBlock = (props: PlayersListProps) => {
    // const {players} = props;

    const {data} = useQuery({
        queryKey: ['top-players'],
        queryFn: fetchTopPlayersData,
        // initialData: players
    })

    return (
        <div className={styles.container}>
            {data ?
                <>
                    <Block name={"ТОП УБИЙСТВ"} player={data.topKills}/>
                    <Block name={"ТОП СМЕРТЕЙ"} player={data.topDeaths}/>
                    <Block name={"ТОП РАНЕНИЙ"} player={data.topWounds}/>
                    <Block name={"ТОП КД"} player={data.topKd}/>
                    <Block name={"ТОП ПОДНЯТИЙ"} player={data.topRevives}/>
                    <Block name={"ТОП ТИМКИЛЛОВ"} player={data.topTeamkills}/>
                    <Block name={"ТОП МАТЧЕЙ"} player={data.topMatches}/>
                    <Block name={"АНТИ-ТОП КД"} player={data.antiTopKd}/>
                </>
                :
                <>
                    <NullBlock name={"ТОП УБИЙСТВ"}/>
                    <NullBlock name={"ТОП СМЕРТЕЙ"}/>
                    <NullBlock name={"ТОП РАНЕНИЙ"}/>
                    <NullBlock name={"ТОП КД"}/>
                    <NullBlock name={"ТОП ПОДНЯТИЙ"}/>
                    <NullBlock name={"ТОП ТИМКИЛЛОВ"}/>
                    <NullBlock name={"ТОП МАТЧЕЙ"}/>
                    <NullBlock name={"АНТИ-ТОП КД"}/>
                </>
            }
        </div>
    )
}