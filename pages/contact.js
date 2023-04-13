import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import styles from '@/styles/contact.module.scss'

export default function Contact() {

  return (
    <div className={styles.contact}>
        <Navbar />
        <h1>Contactez-nous</h1>
      <form>
        <label htmlFor="name">Nom</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="subject">Sujet</label>
        <input type="text" id="subject" name="subject" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Envoyer</button>
      </form>
          <Footer />
      </div>
  );
}