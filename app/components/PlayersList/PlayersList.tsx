'use client'
import styles from './PlayersList.module.scss';
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {fetchListPlayersData} from "@/app/lib/api";

interface PlayersListProps {
    // players: any[]
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
                    <span className={styles.kd}>{player.kd}</span>
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

const PlayerNullItem = () => {

    return (
        <div className={styles.playerItem}>
            <span className={styles.position}>0</span>
            <div className={styles.info}>
                <div className={styles.top}>
                    <span className={styles.nickname}>{'{nickname: null}'}</span>
                    <span className={styles.kd}>0</span>
                </div>
                <div className={styles.bottom}>
                    <span className={styles.mtext}>0<span
                        className={styles.smtext}>убийств</span></span>
                    <span className={styles.mtext}>0<span
                        className={styles.smtext}>смертей</span></span>
                    <span className={styles.mtext}>0<span
                        className={styles.smtext}>ранений</span></span>
                    <span className={styles.mtext}>0<span
                        className={styles.smtext}>поднятий</span></span>
                    <span className={styles.mtext}>0<span className={styles.smtext}>тк</span></span>
                    <span className={styles.mtext}>0<span
                        className={styles.smtext}>матчей</span></span>
                </div>
            </div>
        </div>
    );
}

export const PlayersList = (props: PlayersListProps) => {
    // const {players} = props;
    const [searchValue, setSearchValue] = useState("");
    const [sortCriteria, setSortCriteria] = useState('');

    const {data} = useQuery({
        queryKey: ['players-list'],
        queryFn: fetchListPlayersData,
        // initialData: players,
    })

    const handleChange = (e: any) => {
        setSortCriteria(e.target.value);
    };

    const filteredList = data?.playersList?.filter((item: any) =>
        item.steamID.includes(searchValue) || item.lastname.toLowerCase().includes(searchValue.toLowerCase())
    )

    const sortList = (list: any) => {
        switch (sortCriteria) {
            case 'kd-asc':
                return list.sort((a: any, b: any) => a.kd - b.kd);
            case 'deaths-asc':
                return list.sort((a: any, b: any) => a.deaths - b.deaths);
            case 'deaths-desc':
                return list.sort((a: any, b: any) => b.deaths - a.deaths);
            case 'kills-asc':
                return list.sort((a: any, b: any) => a.kills - b.kills);
            case 'kills-desc':
                return list.sort((a: any, b: any) => b.kills - a.kills);
            case 'wounds-asc':
                return list.sort((a: any, b: any) => a.wounds - b.wounds);
            case 'wounds-desc':
                return list.sort((a: any, b: any) => b.wounds - a.wounds);
            case 'revives-asc':
                return list.sort((a: any, b: any) => a.revives - b.revives);
            case 'revives-desc':
                return list.sort((a: any, b: any) => b.revives - a.revives);
            case 'teamkills-asc':
                return list.sort((a: any, b: any) => a.teamkills - b.teamkills);
            case 'teamkills-desc':
                return list.sort((a: any, b: any) => b.teamkills - a.teamkills);
            case 'matches-asc':
                return list.sort((a: any, b: any) => a.matches - b.matches);
            case 'matches-desc':
                return list.sort((a: any, b: any) => b.matches - a.matches);
            default:
                return list;
        }
    };

    const sortedList = sortList(filteredList);

    if (data)
        return (
            <div className={styles.wrapper}>
                <div className={styles.searchSort}>
                    <input
                        placeholder={"Поиск по нику и steamID"}
                        className={styles.searchInput}
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <select className={styles.sortSelect} value={sortCriteria} onChange={handleChange}>
                        <option className={styles.sortSelectDefault} value="">КД (по убыванию)</option>
                        <option value="kd-asc">КД (по возрастанию)</option>
                        <option value="deaths-asc">Смерти (по возрастанию)</option>
                        <option value="deaths-desc">Смерти (по убыванию)</option>
                        <option value="kills-asc">Убийства (по возрастанию)</option>
                        <option value="kills-desc">Убийства (по убыванию)</option>
                        <option value="wounds-asc">Ранения (по возрастанию)</option>
                        <option value="wounds-desc">Ранения (по убыванию)</option>
                        <option value="revives-asc">Возрождения (по возрастанию)</option>
                        <option value="revives-desc">Возрождения (по убыванию)</option>
                        <option value="teamkills-asc">Тимкиллы (по возрастанию)</option>
                        <option value="teamkills-desc">Тимкиллы (по убыванию)</option>
                        <option value="matches-asc">Матчи (по возрастанию)</option>
                        <option value="matches-desc">Матчи (по убыванию)</option>
                    </select>
                </div>
                {sortedList.map((p: any) => (
                    <PlayerItem key={p.steamID} player={p}/>
                ))}
            </div>
        )

    if (!data) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.searchSort}>
                    <input
                        disabled={true}
                        placeholder={"Поиск по нику и steamID"}
                        className={styles.searchInput}
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <select disabled={true} className={styles.sortSelect} value={sortCriteria} onChange={handleChange}>
                        <option className={styles.sortSelectDefault} value="">КД (по убыванию)</option>
                    </select>
                </div>
                {Array(30).fill(1).map((_, index: any) => (
                    <PlayerNullItem key={index}/>
                ))}
            </div>
        )
    }
}