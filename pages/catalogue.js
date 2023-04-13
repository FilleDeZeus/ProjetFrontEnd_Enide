import { useState } from 'react';
import { useRouter } from 'next/router';
import { searchCars } from '@/api/cars';
import { Car } from '../components/car/car';
import styles from '@/styles/catalogue.module.scss';
import Link from 'next/link';
import { Navbar } from '../components/navbar/navbar';
import { Footer } from '../components/footer/footer';
import ReactPaginate from 'react-paginate';
import {SideBar} from '../components/sideBar/sideBar';

const carsPerPage = 9;

export default function Catalogue({ cars, currentPage, totalPages }) {
  const router = useRouter();
  const [pageCount, setPageCount] = useState(totalPages);
  const [selectedColors, setSelectedColors] = useState([]);

  function handlePageClick(data) {
    const selectedPage = data.selected + 1;
    router.push(`/catalogue?page=${selectedPage}`);
  }

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

  function getPageCars() {
    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    return cars
      .filter((car) => selectedColors.length === 0 || selectedColors.includes(car.color))
      .slice(startIndex, endIndex);
  }

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
      <SideBar
          colors={colors}
          selectedColors={selectedColors}
          onColorSelect={handleColorSelect}
        />
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