import { Footer } from '../footer/footer';
import { GoogleMaps } from './public/components/googleMaps/googleMaps';
import styles from './public/sass/carDetails.module.scss';

export const CarDetails = ({ car }) => {

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
              src={car.image}
              alt={car.model}
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
                <GoogleMaps car={car} />
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