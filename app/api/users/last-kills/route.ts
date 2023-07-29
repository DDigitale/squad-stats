import {NextResponse} from "next/server";
import {dbFunc} from "@/app/lib/mysql";

export async function GET(request: Request) {
    try {
        const lastKills = await dbFunc({
            query: `
                SELECT *,
                       CASE WHEN teamkill = 0 THEN 'false' ELSE 'true' END AS tk
                FROM squadjs.DBLog_Wounds
                ORDER BY id DESC
                LIMIT 500
            `
        })

        return NextResponse.json({lastKills})
    } catch (e: any) {
        return NextResponse.json({error: 'Internal Server Error: ' + e}, {status: 500})
    }
}