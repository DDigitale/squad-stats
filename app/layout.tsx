import './styles/reset.scss'
import './styles/normalize.scss'
import './styles/globals.scss'
import './styles/constants.scss'
import type { Metadata } from 'next'
import React from "react";
import {Navbar} from "@/app/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: 'OCSQ Statistics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
      <Navbar/>
      {children}
      </body>
    </html>
  )
}
