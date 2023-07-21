import {NextResponse} from "next/server";
import {sql} from "@/utils/db";
import {Request} from "next/dist/compiled/@edge-runtime/primitives";
import axios from "axios";

export async function GET(request: Request, context: any) {
    const steamid = context.params.id
    const avatar = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=D24E3D9EB90500EB1979B72B06B4D903&steamids=${steamid}`)
        .then(result => {
            return result.data.response.players[0].avatarfull
        })

    const info = await sql({
        query: `
            SELECT steamID,
                   lastname,
                   kd,
                   kills,
                   deaths,
                   wounds,
                   teamkills,
                   matches,
                   revives
            FROM squadjs.DBLog_Calculated
            WHERE steamID = ?
        `,
        values: [steamid]
    })

    const topKills = await sql({
        query: `
            SELECT victimName, victim, COUNT(victim) AS count
            FROM squadjs.DBLog_Deaths
                     JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Deaths.match = squadjs.DBLog_Matches.id
            WHERE attacker = ?
              AND (teamkill = 0)
              AND squadjs.DBLog_Matches.layerClassname NOT LIKE '%seed%'
            GROUP BY victim, victimName
            ORDER BY count DESC
            LIMIT 50
        `,
        values: [steamid]
    })

    const topDeaths = await sql({
        query: `
            SELECT attackerName, attacker, COUNT(victim) AS count
            FROM squadjs.DBLog_Deaths
                     JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Deaths.match = squadjs.DBLog_Matches.id
            WHERE victim = ?
              AND (teamkill = 0)
              AND squadjs.DBLog_Matches.layerClassname NOT LIKE '%seed%'
            GROUP BY attacker, attackerName
            ORDER BY count DESC
            LIMIT 50
        `,
        values: [steamid]
    })

    const topWeapons = await sql({
        query: `
            SELECT weapon, COUNT(weapon) AS count
            FROM squadjs.DBLog_Wounds
                     JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Wounds.match = squadjs.DBLog_Matches.id
            WHERE attacker = ?
              AND (teamkill = 0)
              AND squadjs.DBLog_Matches.layerClassname NOT LIKE '%seed%'
            GROUP BY weapon
            ORDER BY count DESC
            LIMIT 50
        `,
        values: [steamid]
    })

    const lastKills = await sql({
        query: `
            SELECT victimName,
                   victim,
                   time,
                   CASE WHEN teamkill = 0 THEN 'false' ELSE 'true' END AS tk
            FROM squadjs.DBLog_Deaths
                     JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Deaths.match = squadjs.DBLog_Matches.id
            WHERE attacker = ?
            ORDER BY time DESC
            LIMIT 50
        `,
        values: [steamid]
    })

    const statsByDate = await sql({
        query: `
            SELECT date,
                   SUM(kills)     AS total_kills,
                   SUM(deaths)    AS total_deaths,
                   SUM(wounds)    AS total_wounds,
                   SUM(teamkills) AS total_teamkills,
                   SUM(revives)   AS total_revives
            FROM (SELECT DATE(squadjs.DBLog_Deaths.time) AS date,
                         COUNT(victimName)               AS kills,
                         0                               AS deaths,
                         0                               AS wounds,
                         0                               AS teamkills,
                         0                               AS revives
                  FROM squadjs.DBLog_Deaths
                           JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Deaths.match = squadjs.DBLog_Matches.id
                  WHERE attacker = ?
                    AND (teamkill = 0)
                    AND squadjs.DBLog_Matches.layerClassname NOT LIKE '%seed%'
                  GROUP BY date

                  UNION ALL

                  SELECT DATE(squadjs.DBLog_Deaths.time) AS date,
                         0                               AS kills,
                         COUNT(attackerName)             AS deaths,
                         0                               AS wounds,
                         0                               AS teamkills,
                         0                               AS revives
                  FROM squadjs.DBLog_Deaths
                           JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Deaths.match = squadjs.DBLog_Matches.id
                  WHERE victim = ?
                    AND (teamkill = 0)
                    AND squadjs.DBLog_Matches.layerClassname NOT LIKE '%seed%'
                  GROUP BY date

                  UNION ALL

                  SELECT DATE(squadjs.DBLog_Wounds.time) AS date,
                         0                               AS kills,
                         0                               AS deaths,
                         COUNT(attackerName)             AS wounds,
                         0                               AS teamkills,
                         0                               AS revives
                  FROM squadjs.DBLog_Wounds
                           JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Wounds.match = squadjs.DBLog_Matches.id
                  WHERE victim = ?
                    AND (teamkill = 0)
                    AND squadjs.DBLog_Matches.layerClassname NOT LIKE '%seed%'
                  GROUP BY date

                  UNION ALL

                  SELECT DATE(squadjs.DBLog_Wounds.time) AS date,
                         0                               AS kills,
                         0                               AS deaths,
                         0                               AS wounds,
                         COUNT(attackerName)             AS teamkills,
                         0                               AS revives
                  FROM squadjs.DBLog_Wounds
                           JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Wounds.match = squadjs.DBLog_Matches.id
                  WHERE victim = ?
                    AND (teamkill = 1)
                    AND squadjs.DBLog_Matches.layerClassname NOT LIKE '%seed%'
                  GROUP BY date

                  UNION ALL

                  SELECT DATE(squadjs.DBLog_Revives.time) AS date,
                         0                                AS kills,
                         0                                AS deaths,
                         0                                AS wounds,
                         0                                AS teamkills,
                         COUNT(reviverName)               AS revives
                  FROM squadjs.DBLog_Revives
                           JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Revives.match = squadjs.DBLog_Matches.id
                  WHERE reviver = ?
                    AND (teamkill = 0)
                    AND squadjs.DBLog_Matches.layerClassname NOT LIKE '%seed%'
                  GROUP BY date

                  UNION ALL

                  SELECT DATE(squadjs.DBLog_Revives.time) AS date,
                         0                                AS kills,
                         0                                AS deaths,
                         0                                AS wounds,
                         0                                AS teamkills,
                         COUNT(reviverName)               AS revives
                  FROM squadjs.DBLog_Revives
                           JOIN squadjs.DBLog_Matches ON squadjs.DBLog_Revives.match = squadjs.DBLog_Matches.id
                  WHERE reviver = ?
                    AND (teamkill = 0)
                    AND squadjs.DBLog_Matches.layerClassname NOT LIKE '%seed%'
                  GROUP BY date) AS combined_counts
            GROUP BY date
            ORDER BY date DESC
        `,
        values: [steamid, steamid, steamid, steamid, steamid, steamid]
    })
    return NextResponse.json({
        // @ts-ignore
        info: info[0],
        topKills,
        topDeaths,
        topWeapons,
        lastKills,
        statsByDate,
        avatar
    })
}