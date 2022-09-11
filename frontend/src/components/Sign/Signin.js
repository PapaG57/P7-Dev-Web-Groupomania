// Importer les dépendances nécessaires //

import React, { useState } from 'react';
import axios from 'axios';

// démarrage du composant Signin //

function Signin() {
  // Déclaration du hook useState //

  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  // Requête POST connexion à la route de l'API //

  const handleSignin = (event) => {
    event.preventDefault();
    const data = { email: email, password: password };
    axios
      .post(`${process.env.REACT_APP_API_URL}api/sign/signin`, data)
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          sessionStorage.setItem('JWToken', response.data.token);
          window.location.replace('/home');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DOM virtuel //

  return (
    <form onSubmit={handleSignin} className="sign_form">
      <h1>Connexion</h1>
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

// Exportation du composant Signin //

export default Signin;
