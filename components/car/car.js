// Importer les dépendances, les styles et les composants nécessaires
import React from 'react'
import styles from './public/sass/car.module.scss';

// Créer le composant Car qui reçoit les informations de la voiture en tant que propriété
export const Car = ({ carInfo, car }) => {
  // Utiliser les informations de la voiture fournies en tant que propriété ou, si elles sont absentes, utiliser les informations de la voiture par défaut
  const selectedCar = carInfo || car;

  // Si les informations de la voiture sont absentes, ne rien afficher
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