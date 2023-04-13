import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';
import firebase from '../firebase';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import styles from '@/styles/favoris.module.scss';
import { Car } from '@/components/car/car';
import Link from 'next/link';
const db = firebase.firestore();

export default function Favoris() {
    const currentUser = useSelector(selectUser);
    const [userFavoris, setUserFavoris] = useState([]);
    useEffect(() => {
    if (currentUser) {
        const unsubscribe = db
            .collection('users') // changez 'user' en 'users'
            .doc(currentUser.uid)
            .collection('favoris')
            .onSnapshot((snapshot) => {
            const favorisData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserFavoris(favorisData);
            });
    
        return () => {
            unsubscribe();
        };
    }
  }, [currentUser]);

  return (
    <div>
        <Navbar />
        <div className={styles.favorisContainer}>
            <h1>Vos favoris</h1>
            {userFavoris.length === 0 ? (
            <p>Vous n'avez pas encore de favoris.</p>
            ) : (
            <ul className={styles.favorisList}>
                {userFavoris.map((car) => (
                    <li key={car.id} className={styles.favoriItem}>
                    <Link href={`/${car.id}`}>
                        <Car car={car.favori} />
                    </Link>
                    </li>
                ))}
                </ul>
            )}
        </div>
        <Footer />
    </div>
  );
};

