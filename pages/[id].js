import { searchCars } from '@/api/cars';
import { Navbar } from '@/components/navbar/navbar';
import { CarDetails } from '../components/carDetails/carDetails';

export default function CarPage({ car }) {
  console.log(car);
  return (
    <div>
      <Navbar/>
      <CarDetails car={car} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const cars = await searchCars('');
  const car = cars.find((car) => car.id === parseInt(id))

  if (!car) {
    return { props: { car: null } };
  }

  return {
    props: {
      car,
    },
  };
}