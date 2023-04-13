import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../slices/authSlice';
import firebase, {firestore} from '../firebase';
import { Footer } from '@/components/footer/footer';
import { Navbar } from '@/components/navbar/navbar';
import styles from '@/styles/connection.module.scss'

export default function Connection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [resetPassword, setResetPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const currentUser = useSelector(selectUser);

  const addUserToFirestore = async (user) => {
    try {
      await firestore.collection('users').doc(user.uid).set({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        uid: user.uid,
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur à Firestore', error);
    }
  };
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      dispatch(setUser(user));
    } catch (error) {
      console.error('Erreur de connexion', error);
    }
  };
  const sendPasswordResetEmail = async (e) => {
    e.preventDefault();
  
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Un e-mail de réinitialisation de mot de passe a été envoyé à ' + email);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation de mot de passe', error);
    }
  };
  const signUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await user.updateProfile({ displayName: `${firstName} ${lastName}` });

      // Ajouter l'utilisateur à Firestore
      await addUserToFirestore({
        firstName,
        lastName,
        email,
        uid: user.uid,
      });

    dispatch(setUser({ ...user, displayName: `${firstName} ${lastName}` }));
  } catch (error) {
    console.error('Erreur d\'inscription', error);
  }
};
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Erreur de déconnexion', error);
    }
  };
  return(
    <>
    
      <div className={styles.container}>
        <Navbar />
        {currentUser ? (
          <div>
            <h1>Bienvenue, {currentUser.firstName}</h1>
            <button onClick={signOut}>Se déconnecter</button>
          </div>
        ) : (
          <>
            <h1>{!showSignUp ? 'Connexion' : 'Inscription'}</h1>
            {!resetPassword ? (
              !showSignUp ? (
                <form onSubmit={signIn}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">Se connecter</button>
                  <button type="button" onClick={() => setShowSignUp(true)}>
                    S'inscrire
                  </button>
                  <button type="button" onClick={() => setResetPassword(true)}>
                    Mot de passe oublié ?
                  </button>
                </form>
              ) : (
                <form onSubmit={signUp}>
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">S'inscrire</button>
                  <button type="button" onClick={() => setShowSignUp(false)}>
                    Se connecter
                  </button>
                </form>
              )
            ) : (
              <form onSubmit={sendPasswordResetEmail}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Envoyer l'e-mail de réinitialisation</button>
                <button type="button" onClick={() => setResetPassword(false)}>
                  Retour
                </button>
              </form>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}  
  