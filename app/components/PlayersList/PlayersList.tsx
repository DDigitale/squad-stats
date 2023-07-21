'use client'
import styles from './PlayersList.module.scss';
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {fetchPlayersListData} from "@/utils/api";

interface PlayersListProps {
    players: any[]
}

interface Props {
    player: any
}

const PlayerItem = ({player}: Props) => {

    return (
        <div className={styles.playerItem} key={player.steamID}>
            <span className={styles.position}>{player.position}</span>
            <div className={styles.info}>
                <div className={styles.top}>
                    <Link href={`/user/${player.steamID}`} className={styles.link}>
                        <span className={styles.nickname}>{player.lastname}</span>
                    </Link>
                    <span className={styles.kd}>{player.kd.toFixed(2)}</span>
                </div>
                <div className={styles.bottom}>
                    <span className={styles.mtext}>{player.kills}<span className={styles.smtext}>убийств</span></span>
                    <span className={styles.mtext}>{player.deaths}<span className={styles.smtext}>смертей</span></span>
                    <span className={styles.mtext}>{player.wounds}<span className={styles.smtext}>ранений</span></span>
                    <span className={styles.mtext}>{player.revives}<span
                        className={styles.smtext}>поднятий</span></span>
                    <span className={styles.mtext}>{player.teamkills}<span className={styles.smtext}>тк</span></span>
                    <span className={styles.mtext}>{player.matches}<span className={styles.smtext}>матчей</span></span>
                </div>
            </div>

        </div>
    );
}

export const PlayersList = (props: PlayersListProps) => {
    const {players} = props;

    const {data} = useQuery({
        queryKey: ['players-list'],
        queryFn: fetchPlayersListData,
        initialData: players
    })

    return (
        <div className={styles.wrapper}>
            {data?.list?.map((p: any) => (
                <PlayerItem key={p.steamID} player={p}/>
            ))}
        </div>
    )
}