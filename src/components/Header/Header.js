import React from "react"
import Link from "../Link";
import styles from "./Header.module.css";

export default () => <header className={styles.header} role="banner">
  <Link>
    <h1 className={styles.logo} itemProp="name">
      Sergeyski Blog
    </h1>
  </Link>
</header>