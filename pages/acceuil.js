import styles from '@/styles/acceuil.module.scss';
import Link from 'next/link';
import { Navbar } from '@/components/navbar/navbar';
import Carrousel from '@/components/carrousel/carrousel';
import { Footer } from '@/components/footer/footer';
import { useState } from 'react';

export default function Accueil() {
  const [carInfo, setCarInfo] = useState({  id: '', model: '', price: '', color: '', year: ''});

  return (
    <div>
        <Navbar />
        <div className={styles.enTeteAcceuil}>

        <Link href={`/${carInfo.id}`}>
          <div className={`${styles.contenu} ${carInfo.model !== '' && carInfo.price !== '' ? styles.visible : ''}`}>
            <h1>Need For Speed</h1>
            <div>
              <h3> Model: {carInfo.model}</h3>
              <p> Prix: {carInfo.price} €</p>
              <p>Color: {carInfo.color}</p>
              <p>Année: {carInfo.year}</p>
            </div>
          </div>
        </Link>
              <Carrousel setCarInfo={setCarInfo} />
        </div>
          <Footer />
      </div>
  );
}