import React from 'react'
import styles from './public/sass/car.module.scss';

export const Car = ({ car }) => {
  
    return (
      <div className={styles.carPage}>
        <h1 className={styles.carTitre}>{car.make_id} {car.model}</h1>
        <div className={styles.carInfo}>
          <img className={styles.carImage} src={car.image} alt={car.model} />
          <ul className={styles.carDetails}>
            <li><span>Année:</span> {car.year}</li>
            <li><span>Couleur:</span> {car.color}</li>
            <li><span>Prix:</span> {car.price}</li>
          </ul>
        </div>
      </div>
    );
  }



  
  