import styles from './public/sass/googleMaps.module.scss';

export const GoogleMaps = ({ car }) => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBhYZkQeGxy5n8UXnNF0P9V9fiWuGG4_ps&center=${car.latitude},${car.longitude}&zoom=17`;

  return (
    <div className={styles.googleMapsContainer}>
      <iframe
        title="Google Maps"
        className={styles.googleMaps}
        src={googleMapsUrl}
        width="400"
        height="300"
        frameBorder="none"
        allowFullScreen=""
        aria-hidden="false"
      ></iframe>
    </div>
  );
};
