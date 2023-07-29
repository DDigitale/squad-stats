'use client'
import styles from './UserProfile.module.scss';
import Link from "next/link";
import React, {useState} from 'react';
import {SmallChart} from "@/app/components/SmallChart/SmallChart";
import {TfiBarChart} from "react-icons/tfi";
import {SiSteam} from "react-icons/si";
import {useQuery} from "@tanstack/react-query";
import {fetchPlayerDetailsData} from "@/app/lib/api";
import {dateTimeFormat} from "@/app/lib/other";
import {InfoBlock} from "@/app/components/InfoBlock/InfoBlock";
import Loading from "@/app/loading";


interface UserProfileProps {
    // player: any
    steamid: string
}

const Block = ({children, name}: any) => {
    return (
        <div className={styles.blockWrapper}>
            <div className={styles.title}>{name}</div>
            <div className={styles.block}>
                {children}
            </div>
        </div>
    )
}

export const UserProfile = (props: UserProfileProps) => {
    const {steamid} = props;
    const [showChart, setShowChart] = useState(false);

    const toggleChart = () => {
        setShowChart(!showChart)
    }

    const {data, isLoading} = useQuery({
        queryKey: ['player-details', steamid],
        queryFn: () => fetchPlayerDetailsData(steamid),
        // initialData: player,
    })


    if (isLoading) {
        return <Loading/>
    }

    if (!data?.info) {
        return <InfoBlock>Нет информации о пользователе</InfoBlock>
    }

    return (
        <div className={styles.UserProfile}>
            <div className={styles.top}>
                <img
                    alt={'avatar'} width={150} height={150} src={data.avatar}/>
                <div className={styles.info}>
                    <span className={styles.nickname}>{data.info.lastname}</span>
                    <div className={styles.infoCounts}>
                        <span className={styles.kd}>{data.info.kd} </span>
                        <span className={styles.mtext}>{data.info.kills}<span
                            className={styles.smtext}>убийств</span></span>
                        <span className={styles.mtext}>{data.info.deaths}<span
                            className={styles.smtext}>смертей</span></span>
                        <span className={styles.mtext}>{data.info.wounds}<span
                            className={styles.smtext}>ранений</span></span>
                        <span className={styles.mtext}>{data.info.revives}<span
                            className={styles.smtext}>поднятий</span></span>
                        <span className={styles.mtext}>{data.info.teamkills}<span
                            className={styles.smtext}>тк</span></span>
                        <span className={styles.mtext}>{data.info.matches}<span
                            className={styles.smtext}>матчей</span></span>
                    </div>
                </div>
                <div className={styles.topBtns}>
                    <TfiBarChart className={styles.icon} onClick={toggleChart}/>
                    <Link href={`https://steamcommunity.com/profiles/${data.info.steamID}/`} target={"_blank"}>
                        <SiSteam className={styles.icon}/>
                    </Link>
                </div>
            </div>
            {showChart &&
              <SmallChart chartData={data.statsByDate}/>
            }
            {!showChart &&
              <div className={styles.columns}>
                <Block name={"ТОП 50 ПО УБИЙСТВАМ"}>
                    {data.topKills.map((tk: any) => (
                        <div className={styles.tempStyle} key={tk.victimName}>
                            <Link href={`/user/${tk.victim}`} className={styles.link}>
                                <span className={styles.smnickname}>{tk.victimName}</span>
                            </Link>
                            <span>{tk.count}</span>
                        </div>
                    ))}
                </Block>
                <Block name={"ТОП 50 ПО СМЕРТЯМ"}>
                    {data.topDeaths.map((td: any) => (
                        <div className={styles.tempStyle} key={td.attackerName}>
                            <>
                                <Link href={`/user/${td.attacker}`} className={styles.link}>
                                    <span className={styles.smnickname}>{td.attackerName}</span>
                                </Link>
                                <span>{td.count}</span>
                            </>
                        </div>
                    ))}
                </Block>
                <Block name={"ТОП 50 ПО ОРУЖИЮ"}>
                    {data.topWeapons.map((tw: any) => (
                        <div className={styles.tempStyle} key={tw.weapon}>
                            <span>{tw.weapon.replace("BP", "").replaceAll("_", " ")}</span>
                            <span>{tw.count}</span>
                        </div>
                    ))}
                </Block>
                <Block name={"ПОСЛЕДНИЕ 50 УБИЙСТВ"}>
                    {data.lastKills.map((lk: any, index: number) => (
                        <div className={styles.tempStyleLastData} key={index}>
                            <span className={styles.server}>{lk.server === 1 ? "OC1" : "OC2"}</span>
                            <span className={styles.time}>{dateTimeFormat(lk.time)}</span>
                            {lk.victimName !== null
                                ? <Link href={`/user/${lk.victim}`} className={styles.link}>
                                      <span
                                          className={lk.tk === "false" ? styles.smnickname : styles.smnicknamered}>{lk.victimName}</span>
                                </Link>
                                :
                                <span
                                    className={lk.tk === "false" ? styles.smNullnickname : styles.smNullnicknamered}
                                    style={{cursor: 'default'}}>{'{"nickname":"null"}'}</span>
                            }
                        </div>
                    ))}
                </Block>
                <Block name={"ПОСЛЕДНИЕ 50 СМЕРТЕЙ"}>
                    {data.lastDeaths.map((ld: any, index: number) => (
                        <div className={styles.tempStyleLastData} key={index}>
                            <span className={styles.server}>{ld.server === 1 ? "OC1" : "OC2"}</span>
                            <span className={styles.time}>{dateTimeFormat(ld.time)}</span>
                            {ld.attackerName !== null
                                ? <Link href={`/user/${ld.attacker}`} className={styles.link}>
                                      <span
                                          className={ld.tk === "false" ? styles.smnickname : styles.smnicknamered}>{ld.attackerName}</span>
                                </Link>
                                :
                                <span
                                    className={ld.tk === "false" ? styles.smNullnickname : styles.smNullnicknamered}
                                    style={{cursor: 'default'}}>{'{"nickname":"null"}'}</span>
                            }
                        </div>
                    ))}
                </Block>
              </div>
            }
        </div>
    )
}
