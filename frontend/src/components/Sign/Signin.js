// Importer les dépendances nécessaires

import React, { useState } from 'react';
import axios from 'axios';

// démarrage du composant Signin

function Signin() {
  // Déclaration du hook useState

  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Requête POST connexion à la route de l'API

  const handleSignin = (event) => {
    event.preventDefault();
    setError('');
    
    const envUrl = process.env.REACT_APP_API_URL || '';
    if (!envUrl) {
      setError("Erreur : L'URL de l'API n'est pas configurée dans le fichier .env");
      return;
    }
    
    setLoading(true);
    const data = { email: email, password: password };
    const apiUrl = envUrl.replace(/\/$/, '');
    console.log("Tentative de connexion sur :", apiUrl);

    axios
      .post(`${apiUrl}/api/sign/signin`, data)
      .then((response) => {
        setLoading(false);
        if (response.data.error) {
          setError(response.data.error);
        } else {
          sessionStorage.setItem('JWToken', response.data.token);
          window.location.replace('/home');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Erreur API :", error);
        setError(error.response?.data?.error || "Le serveur est injoignable ou met trop de temps à répondre.");
      });
  };

  // DOM virtuel

  return (
    <form onSubmit={handleSignin} className="sign_form">
      <h1>Connexion</h1>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      {loading && <p style={{ color: '#163972' }}>Connexion en cours (réveil du serveur)...</p>}
      <br />
      <p>Pas encore compte ? Pensez à vous inscrire</p>
      <br />
      <br />
      <input
        aria-label="votre adresse email"
        placeholder="Votre adresse email"
        type="text"
        name="email"
        id="email"
        autoComplete="off"
        onChange={(event) => SetEmail(event.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <br />
      <input
        aria-label="votre mot de passe"
        placeholder="Votre mot de passe"
        type="password"
        name="password"
        id="password"
        autoComplete="off"
        onChange={(event) => SetPassword(event.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <button className="sign_form_button" type="submit" aria-label="valider">
        Valider
      </button>
    </form>
  );
}

// Exportation du composant Signin

export default Signin;
