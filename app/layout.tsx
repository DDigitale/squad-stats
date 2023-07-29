import './styles/reset.scss'
import './styles/normalize.scss'
import './styles/globals.scss'
import './styles/constants.scss'
import type {Metadata} from 'next'
import Providers from "@/app/providers";
import React, {Suspense} from "react";
import {Navbar} from "@/app/components/Navbar/Navbar";
import Loading from "@/app/loading";

export const metadata: Metadata = {
    title: `OCSQ Statistics`,
}

export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="ru">
        <body>
        <Providers>
            <Navbar/>
            <Suspense fallback={<Loading/>}>
                {children}
            </Suspense>
        </Providers>
        </body>
        </html>
    )
}
