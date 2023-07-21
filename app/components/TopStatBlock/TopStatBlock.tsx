'use client'
import styles from './TopStatBlock.module.scss';
import {useQuery} from "@tanstack/react-query";
import {fetchPlayersListData} from "@/utils/api";

interface Props {
    name: string
    nickname: string
    steamid: string
    count: string
}

interface PlayersListProps {
    players: any[]
}

const Block = ({name, nickname, steamid, count}: Props) => {
    return (
        <div className={styles.blockWrapper}>
            <div className={styles.title}>{name}</div>
            <div className={styles.block}>
                <span className={styles.nickname}>{nickname}</span>
                <span className={styles.count}>{count}</span>
            </div>
        </div>
    )
}

export const TopStatBlock = (props: PlayersListProps) => {
    const {players} = props;

    const {data} = useQuery({
        queryKey: ['players-top'],
        queryFn: fetchPlayersListData,
        initialData: players
    })

    console.log(data.topPlayers)

    return (
        <div className={styles.container}>
            <Block name={"ТОП УБИЙСТВ"}
                   nickname={data.topPlayers.topKills[0].lastname}
                   steamid={data.topPlayers.topKills[0].steamid}
                   count={data.topPlayers.topKills[0].kills}
            />
            <Block name={"ТОП СМЕРТЕЙ"}
                   nickname={data.topPlayers.topDeaths[0].lastname}
                   steamid={data.topPlayers.topDeaths[0].steamid}
                   count={data.topPlayers.topDeaths[0].deaths}
            />
            <Block name={"ТОП РАНЕНИЙ"}
                   nickname={data.topPlayers.topWounds[0].lastname}
                   steamid={data.topPlayers.topWounds[0].steamid}
                   count={data.topPlayers.topWounds[0].wounds}
            />
            <Block name={"ТОП КД"}
                   nickname={data.topPlayers.topKd[0].lastname}
                   steamid={data.topPlayers.topKd[0].steamid}
                   count={data.topPlayers.topKd[0].kd.toFixed(2)}/>
            <Block name={"ТОП ПОДНЯТИЙ"}
                   nickname={data.topPlayers.topRevives[0].lastname}
                   steamid={data.topPlayers.topRevives[0].steamid}
                   count={data.topPlayers.topRevives[0].revives}/>
            <Block name={"ТОП ТИМКИЛЛОВ"}
                   nickname={data.topPlayers.topTeamkills[0].lastname}
                   steamid={data.topPlayers.topTeamkills[0].steamid}
                   count={data.topPlayers.topTeamkills[0].teamkills}/>
            <Block name={"ТОП МАТЧЕЙ"}
                   nickname={data.topPlayers.topMatches[0].lastname}
                   steamid={data.topPlayers.topMatches[0].steamid}
                   count={data.topPlayers.topMatches[0].matches}/>
            <Block name={"АНТИ-ТОП КД"}
                   nickname={data.topPlayers.antiTopKd[0].lastname}
                   steamid={data.topPlayers.antiTopKd[0].steamid}
                   count={data.topPlayers.antiTopKd[0].kd.toFixed(2)}/>
        </div>
    )
}