import {NextResponse} from "next/server";
import {dbFunc} from "@/app/lib/mysql";

export async function GET(request: Request) {
    try {
        const playersList = await dbFunc({
            query: `
                SELECT *,
                       ROW_NUMBER
                           ()
                               OVER (ORDER BY kd DESC) AS position
                FROM squadjs.DBLog_Calculated
            `
        })

        return NextResponse.json({playersList})
    } catch (e: any) {
        return NextResponse.json({error: 'Internal Server Error: ' + e}, {status: 500})
    }
}