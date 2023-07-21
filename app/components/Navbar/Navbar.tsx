import styles from './Navbar.module.scss';
import Image from "next/image";
import Link from "next/link";
import {fetchServerSummaryData} from "@/utils/api";
import {SummaryCounter} from "@/app/components/SummaryCounter/SummaryCounter";

export const Navbar = async () => {

    const serverSummaryData = await fetchServerSummaryData();

    return (
        <div className={styles.Navbar}>
            <Link href={'/'}>
                <Image alt="logo" width={70} height={70} className={styles.Logo}
                       src={"/images/oc.png"}/>
            </Link>
            <span className={styles.LogoText}>OCSQ Statistics</span>
            <SummaryCounter summaryData={serverSummaryData}/>
        </div>
    )
}