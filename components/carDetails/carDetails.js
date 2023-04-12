import { Footer } from '../footer/footer';
import styles from './public/sass/carDetails.module.scss';

export const CarDetails = ({ car }) => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBhYZkQeGxy5n8UXnNF0P9V9fiWuGG4_ps&center=${car.latitude},${car.longitude}&zoom=17`;

  return (
    <div>
    <div className={styles.carDetails}
    style={{
      backgroundImage: car.image ? `url(${car.image})` : '',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
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
        <div className={styles.googleMapsContainer}>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          <iframe
            title="Google Maps"
            className={styles.googleMaps}
            src={googleMapsUrl}
            width="600"
            height="450"
            frameBorder="none"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
            </a>

        </div>
      </div>
    </div>
    <Footer/>

    </div>
  );
};