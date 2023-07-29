'use client'
import styles from './KillFeed.module.scss';
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import Link from "next/link";
import {fetchLastKillsData} from "@/app/lib/api";
import {dateTimeFormat} from "@/app/lib/other";

interface KillFeedProps {
    className?: string
    // players: any[]
}

export const KillFeed = (props: KillFeedProps) => {
    // const {className, players} = props;
    const [searchValue, setSearchValue] = useState("");
    const [sortCriteria, setSortCriteria] = useState('');

    const {data} = useQuery({
        queryKey: ['kill-feed'],
        queryFn: fetchLastKillsData,
        // initialData: players,
        refetchInterval: 5000,
        enabled: false
    })

    console.log(data)

    const handleChange = (e: any) => {
        setSortCriteria(e.target.value);
    };

    const filteredList = data?.lastKills?.filter((item: any) => {
        if (item.attacker && item.attackerName && item.victim && item.victimName !== null) {
            return item.attacker.includes(searchValue)
                || item.attackerName.toLowerCase().includes(searchValue.toLowerCase())
                || item.victim.includes(searchValue)
                || item.victimName.toLowerCase().includes(searchValue.toLowerCase())
        }

        if (item.attacker && item.attackerName !== null) {
            return item.attacker.includes(searchValue)
                || item.attackerName.toLowerCase().includes(searchValue.toLowerCase())
        }

        if (item.victim && item.victimName !== null) {
            return item.victim.includes(searchValue)
                || item.victimName.toLowerCase().includes(searchValue.toLowerCase())
        }

        return item
    })

    const sortList = (list: any) => {
        switch (sortCriteria) {
            case '1':
                return list.filter((item: any) => item.server === 1)
            case '2':
                return list.filter((item: any) => item.server === 2)
            case '':
                return list
        }
    };

    const sortedList = sortList(filteredList);

    if (data) {
        return (
            <div className={styles.KillFeed}>
                <div className={styles.searchSort}>
                    <input
                        placeholder={"Поиск по нику и steamID"}
                        className={styles.searchInput}
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <select className={styles.sortSelect} value={sortCriteria} onChange={handleChange}>
                        <option className={styles.sortSelectDefault} value="">Все серверы</option>
                        <option value="1">ОС1</option>
                        <option value="2">ОС2</option>
                    </select>
                </div>
                <div className={styles.rows}>
                    {sortedList.map((lk: any) => (
                        <div key={lk.id} className={styles.row} style={{color: lk.tk === "true" ? 'red' : ''}}>
                            <span className={styles.date}>{dateTimeFormat(lk.time)}</span>
                            {lk.attackerName !== null
                                ? <Link href={`/user/${lk.attacker}`} className={styles.link}>
                            <span
                                className={styles.attacker}>{lk.attackerName}
                            </span>
                                </Link>
                                : <span
                                    className={styles.nullPlayer}>{'{nickname: null}'}
                            </span>
                            }
                            <span className={styles.weapon}>{lk.weapon.replace("BP", "").replaceAll("_", " ")}</span>
                            {lk.victimName !== null
                                ?
                                <Link href={`/user/${lk.victim}`} className={styles.rightLink}>
                            <span
                                className={styles.victim}>{lk.victimName}
                            </span>
                                </Link>
                                : <span
                                    className={styles.rightNullPlayer}>{'{nickname: null}'}
                            </span>
                            }
                            <span>{lk.server === 1 ? "OC1" : "OC2"}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className={styles.KillFeed}>
                <div className={styles.searchSort}>
                    <input
                        disabled={true}
                        placeholder={"Поиск по нику и steamID"}
                        className={styles.searchInput}
                        type="search"
                        value={searchValue}

                    />
                    <select disabled={true} className={styles.sortSelect}>
                        <option className={styles.sortSelectDefault} value="">Все серверы</option>
                    </select>
                </div>
                <div className={styles.rows}>
                    {Array(65).fill(1).map((_, index: any) => (
                        <div key={index} className={styles.row}>
                            <span className={styles.date}>{'{date: null}'}</span>
                            <span
                                className={styles.nullPlayer}>{'{nickname: null}'}
                            </span>
                            <span>{'{weapon: null}'}</span>
                            <span
                                className={styles.rightNullPlayer}>{'{"nickname":"null"}'}
                            </span>
                            <span>{'{server: 0}'}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}