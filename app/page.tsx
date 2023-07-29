import styles from './Main.module.scss'
import {TopStatBlock} from "@/app/components/TopStatBlock/TopStatBlock";
import {PlayersList} from "@/app/components/PlayersList/PlayersList";
import {KillFeed} from "@/app/components/KillFeed/KillFeed";
import {API_URL, PLAYERS_LIST} from "@/app/lib/api";

async function getData() {
    const res = await fetch(API_URL + PLAYERS_LIST)

    console.log(res)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function Home() {
    return (
        <main className={styles.main}>
            <TopStatBlock/>
            <div className={styles.columns}>
                <PlayersList/>
                <KillFeed/>
            </div>
        </main>
    )
}
