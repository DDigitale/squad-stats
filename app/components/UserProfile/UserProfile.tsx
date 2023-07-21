import styles from './UserProfile.module.scss';
import Link from "next/link";

interface UserProfileProps {
    player: any
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
    const {player} = props;

    return (
        <div className={styles.UserProfile}>
            <div className={styles.top}>
                <img
                    alt={'avatar'} width={150} height={150} src={player.avatar}/>
                <div className={styles.info}>
                    <span className={styles.nickname}>{player.info.lastname}</span>
                    <div className={styles.infoCounts}>
                        <span className={styles.kd}>{player.info.kd.toFixed(2)} </span>
                        <span className={styles.mtext}>{player.info.kills}<span className={styles.smtext}>убийств</span></span>
                        <span className={styles.mtext}>{player.info.deaths}<span
                            className={styles.smtext}>смертей</span></span>
                        <span className={styles.mtext}>{player.info.wounds}<span
                            className={styles.smtext}>ранений</span></span>
                        <span className={styles.mtext}>{player.info.revives}<span
                            className={styles.smtext}>поднятий</span></span>
                        <span className={styles.mtext}>{player.info.teamkills}<span
                            className={styles.smtext}>тк</span></span>
                        <span className={styles.mtext}>{player.info.matches}<span
                            className={styles.smtext}>матчей</span></span>
                    </div>
                </div>
                <div>ЗДЕСЬ СТАТА ПО ДНЯМ ЗДЕСЬ СТАТА ПО ДНЯМ ЗДЕСЬ СТАТА ПО ДНЯМ ЗДЕСЬ СТАТА ПО ДНЯМ</div>
            </div>
            <div className={styles.columns}>
                <Block name={"ТОП 50 ПО УБИЙСТВАМ"}>
                    {player.topKills.map((tk: any) => (
                        <div className={styles.tempStyle} key={tk.victimName}>
                            <Link href={`/user/${tk.victim}`} className={styles.link}>
                                <span>{tk.victimName}</span>
                            </Link>
                            <span>{tk.count}</span>
                        </div>
                    ))}
                </Block>
                <Block name={"ТОП 50 ПО СМЕРТЯМ"}>
                    {player.topDeaths.map((td: any) => (
                        <div className={styles.tempStyle} key={td.attackerName}>
                            <Link href={`/user/${td.attacker}`} className={styles.link}>
                                <span className={styles.smnickname}>{td.attackerName}</span>
                            </Link>
                            <span>{td.count}</span>
                        </div>
                    ))}
                </Block>
                <Block name={"ТОП 50 ПО ОРУЖИЮ"}>
                    {player.topWeapons.map((tw: any) => (
                        <div className={styles.tempStyle} key={tw.weapon}>
                            <span>{tw.weapon}</span>
                            <span>{tw.count}</span>
                        </div>
                    ))}
                </Block>
                <Block name={"ПОСЛЕДНИЕ 100 УБИЙСТВ"}>
                    {player.lastKills.map((lk: any, index: number) => (
                        <div className={styles.tempStyle} key={index}>
                            <span>{new Date(lk.time).toLocaleString("ru-RU")}</span>
                            <Link href={`/user/${lk.victim}`} className={styles.link}>
                                <span
                                    className={lk.tk === "false" ? styles.smnickname : styles.smnicknamered}>{lk.victimName}</span>
                            </Link>
                        </div>
                    ))}
                </Block>
            </div>
        </div>
    )
}
