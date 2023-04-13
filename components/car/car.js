import React from 'react'
import styles from './public/sass/car.module.scss';


export const Car = ({ carInfo, car }) => {
  const selectedCar = carInfo || car;

  if (!selectedCar) {
    return null;
  }
  
  return (
    <div
      className={`${styles.contenu} ${
        selectedCar.model !== '' && selectedCar.price !== '' ? styles.visible : ''
      }`}
      style={{
        backgroundImage: selectedCar.image ? `url(${selectedCar.image})` : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className={styles.texte}>
        <h1>{selectedCar.make_id}</h1>
        <div>
          <h3> Model: {selectedCar.model}</h3>
          <p> Prix: {selectedCar.price} €</p>
          <p>Color: {selectedCar.color}</p>
          <p>Année: {selectedCar.year}</p>
        </div>
      </div>
    </div>
  );
};