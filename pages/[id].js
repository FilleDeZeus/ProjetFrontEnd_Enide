import { searchCars } from '@/api/cars'; // Importation de la fonction searchCars depuis le module cars de l'API
import { Navbar } from '@/components/navbar/navbar'; // Importation du composant Navbar
import { CarDetails } from '../components/carDetails/carDetails'; // Importation du composant CarDetails

export default function CarPage({ car }) {
  console.log(car); // Affichage des détails de la voiture dans la console du navigateur
  return (
    <div>
      {/* Affichage du composant Navbar */}
      <Navbar/>
      {/* Affichage du composant CarDetails avec les détails de la voiture */}
      <CarDetails car={car} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  // Récupération de l'identifiant de la voiture à partir des paramètres de l'URL
  const { id } = params;
  // Recherche de toutes les voitures dans la base de données de l'API
  const cars = await searchCars('');
  // Récupération de la voiture avec l'identifiant correspondant
  const car = cars.find((car) => car.id === parseInt(id))

  // Vérification si la voiture n'existe pas, retourne null
  if (!car) {
    return { props: { car: null } };
  }

  // Retourne les détails de la voiture en tant que propriété de la page
  return {
    props: {
      car,
    },
  };
}