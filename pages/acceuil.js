import Head from 'next/head';
import styles from '@/styles/acceuil.module.css';
import Link from 'next/link';
import { Navbar } from '@/components/navbar/navbar';
import Carrousel from '@/components/carrousel/carrousel';


export default function Accueil() {

  return (
    <div>
      <Navbar/>
      <Carrousel/>
      
    </div>
  );
}