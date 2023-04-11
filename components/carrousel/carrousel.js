import { useState, useEffect } from 'react';
import { searchCars } from '@/api/cars';
import styles from './public/sass/carrousel.module.scss';

export default function Carrousel({ setCarInfo }) {
  const [cars, setCars] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
        const data = await searchCars('');
        const shuffledData = data.slice(0, 240).sort(() => Math.random() - 0.5);
        setCars(shuffledData);
        setCarInfo({
            id: shuffledData[0].id,
            model: shuffledData[0].model,
            price: shuffledData[0].price,
            color: shuffledData[0].color,
            year: shuffledData[0].year,
      }); // mise à jour du texte avec les infos de la première voiture
    }
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((activeIndex + 1) % cars.length);
      setCarInfo({
        id: cars[(activeIndex + 1) % cars.length].id,
        model: cars[(activeIndex + 1) % cars.length].model,
        price: cars[(activeIndex + 1) % cars.length].price,
        color: cars[(activeIndex + 1) % cars.length].color,
        year: cars[(activeIndex + 1) % cars.length].year,
      }); // mise à jour du texte avec les infos de la voiture suivante
    }, 5000);
    return () => clearInterval(intervalId);
  }, [activeIndex, cars.length]);

  return (
    <div className={styles.containerCarrousel}>
      {cars.map((car, index) => (
        <div
          key={car.id}
          className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
          style={{ backgroundImage: `url(${car.image})` }}
        ></div>
      ))}
    </div>
  );
}