import { searchCars } from '@/api/cars'; // Importation de la fonction searchCars depuis le module cars de l'API
import { Navbar } from '@/components/navbar/navbar'; // Importation du composant Navbar
import { CarDetails } from '../components/carDetails/carDetails'; // Importation du composant CarDetails

export default function CarPage({ car }) {
  return (
    <div>
      <Navbar/>
      <CarDetails car={car} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  // cherche  toutes les voitures
  const cars = await searchCars('');
  // recup la voiture avec l'identifiant correspondant
  const car = cars.find((car) => car.id === parseInt(id))

  // la voiture n'existe pas = null
  if (!car) {
    return { props: { car: null } };
  }

  return {
    props: {
      car,
    },
  };
}