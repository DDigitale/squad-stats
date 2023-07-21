import {NextResponse} from "next/server";
import {sql} from "@/utils/db";

export async function GET(request: Request) {

    try {
        const result = await sql({
            query: `
                SELECT *
                FROM squadjs.DBLog_ServerStat
            `
        })

        return NextResponse.json(result)
    } catch (e: any) {
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}