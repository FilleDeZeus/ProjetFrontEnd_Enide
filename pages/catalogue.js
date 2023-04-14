import { useRouter } from 'next/router';
import { searchCars } from '@/api/cars';
import { Car } from '../components/car/car';
import styles from '@/styles/catalogue.module.scss';
import Link from 'next/link';
import { Navbar } from '../components/navbar/navbar';
import { Footer } from '../components/footer/footer';
import ReactPaginate from 'react-paginate';
import {SideBar} from '../components/sideBar/sideBar';
import { useState } from 'react';
// Nombre de voitures par page
const carsPerPage = 9;

// Composant principal Catalogue
export default function Catalogue({ cars, currentPage, totalPages }) {
  const router = useRouter();
  const [pageCount, setPageCount] = useState(totalPages);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [yearRange, setYearRange] = useState([0, 50000]);
  const maxPrice = Math.max(...cars.map((car) => car.price));
  const maxYear = Math.max(...cars.map((car) => car.year));

  // Gérer la visibilité de la barre latérale
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Fonction pour basculer l'affichage de la barre latérale
  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  // Fonctions pour gérer les changements de filtres
  function handlePriceRangeChange(newPriceRange) {
    setPriceRange(newPriceRange);
  }
  function handleYearRangeChange(newYearRange) {
    setYearRange(newYearRange);
  }

  // Fonction pour obtenir les voitures filtrées et paginées
  function getPageCars() {
    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    return cars
      .filter((car) => selectedColors.length === 0 || selectedColors.includes(car.color))
      .filter((car) => car.price >= priceRange[0] && car.price <= priceRange[1])
      .sort((a, b) => a.price - b.price) // Trier les voitures par prix (croissant)
      .filter((car) => car.year >= yearRange[0] && car.year <= yearRange[1])
      .sort((a, b) => a.year - b.year) 
      .slice(startIndex, endIndex);
  }

  // Gestion du clic sur la pagination
  function handlePageClick(data) {
    const selectedPage = data.selected + 1;
    router.push(`/catalogue?page=${selectedPage}`);
  }

  // Gestion de la sélection des couleurs
  function handleColorSelect(color) {
    if (color === 'all') {
      setSelectedColors([]);
    } else {
      const newSelectedColors = selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color];
      setSelectedColors(newSelectedColors);
    }
  }

  // Récupérer les couleurs uniques des voitures
  const colors = cars.reduce((acc, curr) => {
    if (!acc.includes(curr.color)) {
      acc.push(curr.color);
    }
    return acc;
  }, []);


  return (
    <div>
      <Navbar />
      <div className={styles.container}>
      {sidebarVisible ? (
        <SideBar
        colors={colors}
        selectedColors={selectedColors}
        onColorSelect={handleColorSelect}
        onPriceRangeChange={handlePriceRangeChange}
        onYearRangeChange={handleYearRangeChange}
        maxYear={maxYear}
        maxPrice={maxPrice}
        onClose={toggleSidebar} // Ajoutez cette ligne
      />
      ) : (
        <div className={styles.image}>
          <img
          src="images/volant.png"
          alt="Filter icon"
          className={styles.filterIcon}
          onClick={toggleSidebar}
          style={{ cursor: 'pointer' }}
        />
        </div>
        
      )}
      <div className={styles.catalogueContainer}>
        <ul className={styles.catalogueList}>
          {getPageCars().map((car) => (
            <li key={car.id} className={styles.catalogueListItem}>
              <Link href={`/${car.id}`}>
                <Car car={car} />
              </Link>
            </li>
          ))}
        </ul>
        <ReactPaginate
        previousLabel={'←'}
        nextLabel={'→'}
        breakLabel={'...'}
        breakClassName={styles.breakme}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        pageClassName={styles.paginationPage}
        pageLinkClassName={styles.paginationLink}
        />
      </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const currentPage = query.page || '1';
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const cars = await searchCars('', startIndex, endIndex);
  const totalPages = Math.ceil(cars.length / carsPerPage);
  return {
    props: {
      cars,
      currentPage: parseInt(currentPage),
      totalPages,
    },
  };
}