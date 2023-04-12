import React, {useState} from 'react';
import Link from 'next/link';
import styles from './public/sass/navbar.module.scss';
import { Recherche } from './public/components/recherche/recherche';
import { selectUser } from '@/slices/authSlice';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const user = useSelector(selectUser);
console.log(user);
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">
          <div className={styles.navLink}>
              <img src={"images/volant.png"}/>
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
          <Link href="/contact">
            <div className={styles.navLink}>Contact</div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/blog">
            <div className={styles.navLink}>Blog</div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/connection">
            <div className={styles.navLink}>
              {user ? (
                <span>{user.name}</span>
              ) : (
                <i className="fa fa-user" aria-hidden="true"></i>
              )}
            </div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/panier">
            <div className={styles.navLink}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </div>
          </Link>
        </li>
      <Recherche/>
      </ul>
    </nav>
  );
};
