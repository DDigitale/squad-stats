import {UserProfile} from "@/app/components/UserProfile/UserProfile";
import {InfoBlock} from "@/app/components/InfoBlock/InfoBlock";
import {fetchPlayerDetailsData} from "@/app/lib/api";

export default async function UserDetailsPage({params}: { params: { id: string } }) {

    const steamid = params.id;

    // const playerDetailsData = await fetchPlayerDetailsData(steamid.toString());

    return (
        <UserProfile steamid={steamid}/>
    )
}