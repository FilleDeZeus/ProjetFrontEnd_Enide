import React from 'react'
import styles from './public/sass/carRecherche.module.scss';

export const CarRecherche = ({ car }) => {
  
    return (
      <div className={styles.CarRecherche}>
        <h1 className={styles.carTitre}>{car.make_id} {car.model}</h1>
        <div className={styles.carInfo}>
          <img className={styles.carImage} src={car.image} alt={car.model} />
        </div>
      </div>
    );
  }
