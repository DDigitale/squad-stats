import styles from './Navbar.module.scss';
import Image from "next/image";

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps) => {
    return (
        <div className={styles.Navbar}>
            <Image alt="logo" width={60} height={60} className={styles.Logo} src={"/images/oc.png"}/>
            <span className={styles.LogoText}>OCSQ Statistics</span>
            <span className={styles.stats}>КД: 1.21 Убийств: 545455 Смертей: 351355 Ранений: 413513 Возрождений: 134134 Тимкиллов: 341313 Матчей: 323452</span>
        </div>
    )
}