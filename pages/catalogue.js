import { useState } from 'react';
import { useRouter } from 'next/router';
import { searchCars } from '@/api/cars';
import { Car } from '../components/car/car';
import styles from '@/styles/catalogue.module.scss';
import Link from 'next/link';
import { Navbar } from '../components/navbar/navbar';
import { Footer } from '../components/footer/footer';
import ReactPaginate from 'react-paginate';

const carsPerPage = 10;

export default function Catalogue({ cars, currentPage, totalPages }) {
  const router = useRouter();
  const [pageCount, setPageCount] = useState(totalPages);

  function handlePageClick(data) {
    const selectedPage = data.selected + 1;
    router.push(`/catalogue?page=${selectedPage}`);
  }

  function getPageCars() {
    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    return cars.slice(startIndex, endIndex);
  }

  return (
    <div>
      <Navbar />
        <ul className={styles.catalogueContainer}>
          {getPageCars().map((car) => (
            <li key={car.id} className={styles.catalogueListItem}>
              <Link href={`/${car.id}`}>
                  <Car car={car} />
              </Link>
            </li>
          ))}
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
        </ul>
        
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const currentPage = query.page || '1';
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const cars = await searchCars('', startIndex, endIndex);
  return {
    props: {
      cars,
      currentPage: parseInt(currentPage),
      totalPages: Math.ceil(cars.length / carsPerPage),
    },
  };
}