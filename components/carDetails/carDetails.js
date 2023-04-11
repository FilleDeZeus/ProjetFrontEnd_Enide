import { useEffect, useState, useRef } from 'react';
import styles from './public/sass/carDetails.module.scss';

export const CarDetails = ({ car }) => {
  return (
    <div className={styles.carDetails}>
      <h1 className={styles.carTitle}>{car.make_id} {car.model}</h1>
      <div className={styles.carImageContainer}>
        <img className={styles.carImage} src={car.image} alt={car.model} />
      </div>
      <div className={styles.carInfo}>
        <ul className={styles.carDetailsList}>
          <li><span>Année:</span> {car.year}</li>
          <li><span>Couleur:</span> {car.color}</li>
          <li><span>Kilométrage:</span> {car.mileage}</li>
          <li><span>Prix:</span> {car.price}</li>
          </ul>
          <p className={styles.carDescription}>{car.description}</p>
          </div>
          </div>
);
};

