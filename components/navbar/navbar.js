import React, {useState, useEffect} from 'react'; // Importation de React, de useState et de useEffect
import Link from 'next/link'; // Importation du composant Link de Next.js
import styles from './public/sass/navbar.module.scss'; // Importation des styles CSS pour styliser la navbar
import { Recherche } from './public/components/recherche/recherche'; // Importation du composant Recherche
import { selectUser } from '@/slices/authSlice'; // Importation de la fonction selectUser du slice authSlice de Redux
import { useSelector } from 'react-redux'; // Importation du hook useSelector de Redux

export const Navbar = () => {
  const user = useSelector(selectUser); // Récupération de l'utilisateur connecté à partir du store Redux
  
  // Retour de la fonction pour afficher la navbar
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {/* Lien vers la page d'accueil */}
        <li className={styles.navItem}>
          <Link href="/">
          <div className={styles.navLink}>
              <img src={"images/volant.png"}/>
            </div>
          </Link>
        </li>
        {/* Lien vers la page Home */}
        <li className={styles.navItem}>
          <Link href="/acceuil">
            <div className={styles.navLink}>Home</div>
          </Link>
        </li>
        {/* Lien vers la page Catalogue */}
        <li className={styles.navItem}>
          <Link href="/catalogue">
            <div className={styles.navLink}>Catalogue</div>
          </Link>
        </li>
        {/* Lien vers la page Contact */}
        <li className={styles.navItem}>
          <Link href="/contact">
            <div className={styles.navLink}>Contact</div>
          </Link>
        </li>
        {/* Lien vers la page Connection ou vers la page du profil de l'utilisateur */}
        <li className={styles.navItem}>
          <Link href="/connection">
            <div className={styles.navLink}>
              {/* Si l'utilisateur est connecté, affiche son prénom, sinon affiche l'icône d'utilisateur */}
              {user ? (
                <span>{user.firstName}</span>
              ) : (
                <i className="fa fa-user" aria-hidden="true"></i>
              )}
            </div>
          </Link>
        </li>
        {/* Lien vers la page des favoris de l'utilisateur */}
        <li className={styles.navItem}>
        <Link href="/favoris">
          <div className={styles.navLink}>
            <i className="fa fa-heart" aria-hidden="true"></i>
            
          </div>
          </Link>
        </li>
        
        {/* Affichage du composant Recherche */}
        <Recherche/>
      </ul>
    </nav>
  );
};