import styles from './Navbar.module.scss';
import Link from "next/link";
import {SummaryCounter} from "@/app/components/SummaryCounter/SummaryCounter";
import {fetchServerSummaryData} from "@/app/lib/api";

export const Navbar = async () => {

    // const serverSummaryData = await fetchServerSummaryData();

    return (
        <div className={styles.Navbar}>
            <Link href={'/'}>
                <img alt="logo" className={styles.logo}
                     src={"/images/oc.png"}/>
            </Link>
            <span className={styles.logoText}>OCSQ Statistics</span>
            <SummaryCounter/>
        </div>
    )
}