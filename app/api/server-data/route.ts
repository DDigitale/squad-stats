import {NextResponse} from "next/server";
import {dbFunc} from "@/app/lib/mysql";

export async function GET(request: Request) {
    try {
        const result = await dbFunc({
            query: `
                SELECT *
                FROM squadjs.DBLog_ServerStat
            `
        })

        return NextResponse.json({serverData: result})
    } catch (e: any) {
        return NextResponse.json({error: 'Internal Server Error: ' + e}, {status: 500})
    }
}
