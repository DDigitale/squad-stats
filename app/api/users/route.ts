import {NextResponse} from "next/server";
import {sql} from "@/utils/db";

export async function GET(request: Request) {

    const playersList = await sql({
        query: `
            SELECT *,
                   ROW_NUMBER
                       ()
                           OVER (ORDER BY kd DESC) AS position
            FROM squadjs.DBLog_Calculated
        `
    })

    const topTeamkills = await sql({
        query: `
            SELECT steamID, lastname, teamkills
            FROM squadjs.DBLog_Calculated
            ORDER BY teamkills DESC
            LIMIT 10
        `
    })

    const topKills = await sql({
        query: `
            SELECT steamID, lastname, kills
            FROM squadjs.DBLog_Calculated
            ORDER BY kills DESC
            LIMIT 10
        `
    })

    const topMatches = await sql({
        query: `
            SELECT steamID, lastname, matches
            FROM squadjs.DBLog_Calculated
            ORDER BY matches DESC
            LIMIT 10;
        `
    })

    const topWounds = await sql({
        query: `
            SELECT steamID, lastname, wounds
            FROM squadjs.DBLog_Calculated
            ORDER BY wounds DESC
            LIMIT 10;
        `
    })

    const topRevives = await sql({
        query: `
            SELECT steamID, lastname, revives
            FROM squadjs.DBLog_Calculated
            ORDER BY revives DESC
            LIMIT 10;
        `
    })

    const topDeaths = await sql({
        query: `
            SELECT steamID, lastname, deaths
            FROM squadjs.DBLog_Calculated
            ORDER BY deaths DESC
            LIMIT 10;
        `
    })

    const topKd = await sql({
        query: `
            SELECT steamID, lastname, kills, deaths, kd
            FROM squadjs.DBLog_Calculated
            ORDER BY kd DESC
            LIMIT 10;
        `
    })

    const antiTopKd = await sql({
        query: `
            SELECT steamID, lastname, kills, deaths, kd
            FROM squadjs.DBLog_Calculated
            ORDER BY kd ASC
            LIMIT 10;
        `
    })

    return NextResponse.json({
        list: playersList,
        topPlayers: {
            topTeamkills,
            topKills,
            topMatches,
            topWounds,
            topRevives,
            topDeaths,
            topKd,
            antiTopKd
        }
    })
}