import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';
import firebase from '../firebase';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import styles from '@/styles/favoris.module.scss';
import { Car } from '@/components/car/car';
import Link from 'next/link';
const db = firebase.firestore(); // Initialisation de la référence à la base de données Firebase

export default function Favoris() {
  // Récupération de l'utilisateur connecté à partir du store Redux
  const currentUser = useSelector(selectUser);
  // Initialisation de l'état local pour stocker les favoris de l'utilisateur
  const [userFavoris, setUserFavoris] = useState([]);

 // Hook useEffect pour écouter les modifications des favoris de l'utilisateur dans la base de données Firebase
 useEffect(() => {
    if (currentUser) {
      // Définition de l'abonnement à la collection 'favoris' de l'utilisateur dans la base de données Firebase
      const unsubscribe = db
        .collection('users')
        .doc(currentUser.uid)
        .collection('favoris')
        .onSnapshot((snapshot) => { // Définition de la fonction à exécuter lorsque des modifications sont apportées à la collection 'favoris'
          // Récupération des données des favoris de l'utilisateur à partir du snapshot
          const favorisData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // Mise à jour de l'état local avec les données des favoris de l'utilisateur
          setUserFavoris(favorisData);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  // affichage de la page de favoris
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

