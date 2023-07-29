import {dbFunc} from "@/app/lib/mysql";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    try {
        const topTeamkills = await dbFunc({
            query: `
                SELECT steamID, lastname, teamkills as count
                FROM squadjs.DBLog_Calculated
                ORDER BY teamkills DESC
                LIMIT 1
            `
        })

        const topKills = await dbFunc({
            query: `
                SELECT steamID, lastname, kills as count
                FROM squadjs.DBLog_Calculated
                ORDER BY kills DESC
                LIMIT 1
            `
        })

        const topMatches = await dbFunc({
            query: `
                SELECT steamID, lastname, matches as count
                FROM squadjs.DBLog_Calculated
                ORDER BY matches DESC
                LIMIT 1;
            `
        })

        const topWounds = await dbFunc({
            query: `
                SELECT steamID, lastname, wounds as count
                FROM squadjs.DBLog_Calculated
                ORDER BY wounds DESC
                LIMIT 1;
            `
        })

        const topRevives = await dbFunc({
            query: `
                SELECT steamID, lastname, revives as count
                FROM squadjs.DBLog_Calculated
                ORDER BY revives DESC
                LIMIT 1;
            `
        })

        const topDeaths = await dbFunc({
            query: `
                SELECT steamID, lastname, deaths as count
                FROM squadjs.DBLog_Calculated
                ORDER BY deaths DESC
                LIMIT 1;
            `
        })

        const topKd = await dbFunc({
            query: `
                SELECT steamID, lastname, kills, deaths, kd as count
                FROM squadjs.DBLog_Calculated
                ORDER BY kd DESC
                LIMIT 1;
            `
        })

        const antiTopKd = await dbFunc({
            query: `
                SELECT steamID, lastname, kills, deaths, kd as count
                FROM squadjs.DBLog_Calculated
                ORDER BY kd ASC
                LIMIT 1;
            `
        })


        return NextResponse.json({
            // @ts-ignore
            topTeamkills: topTeamkills[0],
            // @ts-ignore
            topKills: topKills[0],
            // @ts-ignore
            topMatches: topMatches[0],
            // @ts-ignore
            topWounds: topWounds[0],
            // @ts-ignore
            topRevives: topRevives[0],
            // @ts-ignore
            topDeaths: topDeaths[0],
            // @ts-ignore
            topKd: topKd[0],
            // @ts-ignore
            antiTopKd: antiTopKd[0],
        })
    } catch (e: any) {
        return NextResponse.json({error: 'Internal Server Error: ' + e}, {status: 500})
    }
}

// export async function POST(request: Request) {
//     // const {fullname, email, message} = await req.json();
//     //
//     // try {
//     //     await connectDB();
//     //     await Contact.create({fullname, email, message});
//     //
//     //     return NextResponse.json({
//     //         msg: ["Message sent successfully"],
//     //         success: true,
//     //     });
//     // } catch (error) {
//     //     if (error instanceof mongoose.Error.ValidationError) {
//     //         let errorList = [];
//     //         for (let e in error.errors) {
//     //             errorList.push(error.errors[e].message);
//     //         }
//     //         console.log(errorList);
//     //         return NextResponse.json({msg: errorList});
//     //     } else {
//     //         return NextResponse.json({msg: ["Unable to send message."]});
//     //     }
//     // }
//     const {db} = await connectToDatabase();
//
//     const collection = db.collection('def-coll');
//     const newData = {name: 'Новая запись'};
//     await collection.insertOne(newData);
//
//     return NextResponse.json({
//         msg: ["Message sent successfully"],
//         success: true,
//     })
// }