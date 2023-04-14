import { Footer } from '../footer/footer';
import { GoogleMaps } from './public/components/googleMaps/googleMaps';
import styles from './public/sass/carDetails.module.scss';
import { useState } from 'react';
import { db } from '@/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '@/slices/authSlice';

export const CarDetails = ({ car }) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [favoris, setFavoris] = useState([]);
  const currentUser = useSelector(selectUser);

  function toggleMap() {
    setIsMapVisible(!isMapVisible);
  }

  function ajouterFavori(favori) {
    db.collection('users').doc(currentUser.uid).collection('favoris').add({
      favori: favori,
    })
  }

  function supprimerFavori(favoriId) {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('favoris')
      .doc(favoriId.toString()) 
      .delete()
  }

  function toggleFavoris() {
    if (favoris.includes(car.id)) {
      setFavoris(favoris.filter((id) => id !== car.id));
      supprimerFavori(car.id);
    } else {
      setFavoris([...favoris, car.id]);
      ajouterFavori(car);
    }
  }
  

  return (
    <div>
      <div
        className={styles.carDetails}
        style={{
          backgroundImage: car.image ? `url(${car.image})` : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.carDetailsText}>
          <h1 className={styles.carTitle}>
            {car.make_id} {car.model}
          </h1>
          <div className={styles.carImageContainer}>
            <img
              className={styles.carImage}
            />
          </div>
          <div className={styles.carInfo}>
            <ul className={styles.carDetailsList}>
              <li>
                <span>Année:</span> {car.year}
              </li>
              <li>
                <span>Couleur:</span> {car.color}
              </li>
              <li>
                <span>Vendeur:</span> {car.seller}
              </li>
              <li>
                <span>Prix:</span> {car.price}
              </li>
              <li>
                <div className={styles.btnGoogle}>
                  <button
                    className={styles.mapButton}
                    onClick={toggleMap}
                    style={{ border: 'none', background: 'none' }}
                  >
                    <img
                      src="/images/google.svg"
                      alt="Google Maps icon"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </button>
                  {isMapVisible && <GoogleMaps car={car} />}
                </div>
              </li>
              <li>
                <button
                  className={styles.favorisButton}
                  onClick={toggleFavoris}
                  style={{ border: 'none', background: 'none' }}
                >
                  {favoris.includes(car.id) ? (
                    <i className="fa fa-heart" style={{ color: 'red' }}></i>
                  ) : (
                    <i className="fa fa-heart-o"></i>
                  )}
                </button>
              </li>
            </ul>

            <p className={styles.carDescription}>{car.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};