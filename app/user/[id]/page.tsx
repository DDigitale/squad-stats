'use client'
import {useEffect, useState} from "react";
import {UserProfile} from "@/app/components/UserProfile/UserProfile";

export default function UserDetailsPage({params}: { params: { id: string } }) {
    const [data, setData] = useState<any>(null);

    const steamid = params.id;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/user/${steamid}`);
            const json = await response.json();
            setData(json);
        };

        fetchData();
    }, [steamid]);

    return (
        <div>
            {data?.info ?
                <UserProfile player={data}/>
                : <h1>Loading...</h1>
            }
        </div>
    )
}
