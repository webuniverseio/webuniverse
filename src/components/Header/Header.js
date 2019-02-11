import React from "react"
import Link from "../Link";
import styles from "./Header.module.css";

export default () => <header className={styles.header} role="banner">
  <Link>
    <h1 className={styles.logo} itemProp="name">
      Web
      <span className={styles.logoUniverse}>Universe</span>
    </h1>
  </Link>
</header>