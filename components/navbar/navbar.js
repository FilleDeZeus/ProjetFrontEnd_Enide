import React, {useState, useEffect} from 'react'; 
import Link from 'next/link'; 
import styles from './public/sass/navbar.module.scss'; 
import { Recherche } from './public/components/recherche/recherche';
import { selectUser } from '@/slices/authSlice'; 
import { useSelector } from 'react-redux'; 

export const Navbar = () => {
  const user = useSelector(selectUser); 
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
          <Link href="/connection">
            <div className={styles.navLink}>
              {user ? (
                <span>{user.firstName}</span>
              ) : (
                <i className="fa fa-user" aria-hidden="true"></i>
              )}
            </div>
          </Link>
        </li>
        <li className={styles.navItem}>
        <Link href="/favoris">
          <div className={styles.navLink}>
            <i className="fa fa-heart" aria-hidden="true"></i>
            
          </div>
          </Link>
        </li>
        
        <Recherche/>
      </ul>
    </nav>
  );
};