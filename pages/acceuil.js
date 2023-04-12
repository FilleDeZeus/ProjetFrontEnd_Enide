import styles from '@/styles/acceuil.module.scss';
import Link from 'next/link';
import { Navbar } from '@/components/navbar/navbar';
import Carrousel from '@/components/carrousel/carrousel';
import { Footer } from '@/components/footer/footer';
import { useState } from 'react';
import { Car } from '@/components/car/car';

export default function Accueil() {
  const [carInfo, setCarInfo] = useState({  id: '', model: '', price: '', color: '', year: '', iamge: ''});

  return (
    <div>
        <Navbar />
        <div className={styles.enTeteAcceuil}>
          <div className={styles.bulle}>
            <Link href={`/${carInfo.id}`}>
            <Car  carInfo={carInfo}/>
            </Link>
          </div>
          <Carrousel setCarInfo={setCarInfo} />
        </div>
          <Footer />
      </div>
  );
}