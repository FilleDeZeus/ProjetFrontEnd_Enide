import { useState, useEffect } from 'react';
import { searchCars } from '@/api/cars';
import styles from './public/sass/carrousel.module.scss';

export default function Carrousel() {
    const [cars, setCars] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
    async function fetchData() {
        const data = await searchCars('');
        const shuffledData = data.slice(0, 240).sort(() => Math.random() - 0.5);
        setCars(shuffledData);
    }
        fetchData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((activeIndex + 1) % cars.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [activeIndex, cars.length]);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={styles.containerCarrousel}>
        {cars.map((car, index) => (
            <div
            key={car.id}
            className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleItemClick(index)}
            style={{ backgroundImage: `url(${car.image})` }}
            />
        ))}
        </div>
    );
}