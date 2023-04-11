import Link from 'next/link';
import styles from './public/sass/footer.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.containerFooter}>
                <div className={styles.col}>
                    <Link href="/">
                        <div className={styles.logo}>
                            <img src={"images/volant.png"}/>
                        </div>
                        <h2 className={styles.titre}>Enide</h2>
                        <p>Enide For Speed</p>
                    </Link>
                </div>
                <div className={styles.col}>
                    <h3 className={styles.titre}>À propos</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec purus eget odio sodales euismod. Sed id leo turpis. Donec rutrum bibendum ligula, vel convallis velit pharetra vel.</p>
                </div>
                <div className={styles.col}>
                    <h3 className={styles.titre}>Liens utiles</h3>
                    <ul className={styles.liste}>
                        <li><Link href="/accueil">Accueil</Link></li>
                        <li><Link href="/catalogue">Catalogue</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h3 className={styles.title}>Contactez-nous</h3>
                    <p>123 Rue des Lorem Ipsum<br />75000 Paris<br />France<br /><br />contact@example.com<br />+33 (0)1 23 45 67 89</p>
                </div>
                <div className={styles.col}>
                    <h3 className={styles.titre}>Reseaux sociaux</h3>
                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.socialIcon}>
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="#" className={styles.socialIcon}>
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="#" className={styles.socialIcon}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <p className={styles.footerText}>© Enide 2023. Tous droits réservés.</p>
            </div>
        </footer>
    );
};