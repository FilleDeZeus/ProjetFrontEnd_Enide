import React, {useState} from 'react';
import Link from 'next/link';
import styles from './public/sass/navbar.module.scss';
import { Recherche } from './public/components/recherche/recherche';

export const Navbar = () => {

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">
          <div className={styles.navLink}>
              <img
                src={"images/volant.png"}
                
              />
            </div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/acceuil">
            <div className={styles.navLink}>Home</div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/catalogue">
            <div className={styles.navLink}>Catalogue</div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/Contact">
            <div className={styles.navLink}>Contact</div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/Blog">
            <div className={styles.navLink}>Blog</div>
          </Link>
        </li>
      <Recherche/>
      </ul>
    </nav>
  );
};
