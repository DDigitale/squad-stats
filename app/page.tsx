import {TopStatBlock} from "@/app/components/TopStatBlock/TopStatBlock";
import {PlayersList} from "@/app/components/PlayersList/PlayersList";
import {fetchPlayersListData} from "@/utils/api";

export default async function Home() {

    const playersData = await fetchPlayersListData();

    return (
        <main>
            <TopStatBlock players={playersData}/>
            <PlayersList players={playersData}/>
        </main>
    )
}