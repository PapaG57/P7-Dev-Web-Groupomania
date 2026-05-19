// Importer les dépendances nécessaires

import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Signin from './Signin';

// démarrage du composant Signup

function Signup() {
  // Déclaration du hook useState

  const [formSubmit, setFormSubmit] = useState(false);
  const [error, setError] = useState('');

  // Déclaration des valeurs initials

  const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmation: '',
  };

  // Déclaration de la validation des valeurs

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, 'Au moins 3 caractères')
      .max(15, 'Pas plus de 15 caractères')
      .required('Veuillez remplir ce champ'),
    lastname: Yup.string()
      .min(3, 'Au moins 3 caractères')
      .max(15, 'Pas plus de 15 caractères')
      .required('Veuillez remplir ce champ'),
    username: Yup.string()
      .min(3, 'Au moins 3 caractères')
      .max(15, 'Pas plus de 15 caractères')
      .required('Veuillez remplir ce champ'),
    email: Yup.string()
      .email('Email non valide (nom@email.com)')
      .required('Veuillez remplir ce champ'),
    password: Yup.string()
      .min(8, 'Au moins 8 caractères')
      .max(24, 'Pas plus de 24 caractères')
      .required('Veuillez remplir ce champ')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$/,
        'Doit contenir une majuscule, une minuscule et un chiffre (8-24 car.)'
      ),
    confirmation: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Les mots de passes ne correspondent pas'
      )
      .required('Veuillez remplir ce champ'),
  });

  // Création de la fonction onSubmit contenant les données

  const onSubmit = (data) => {
    setError(''); 
    
    const envUrl = process.env.REACT_APP_API_URL || '';
    if (!envUrl) {
      setError("Erreur : L'URL de l'API n'est pas configurée dans le fichier .env");
      return;
    }
    
    const apiUrl = envUrl.replace(/\/$/, '');
    console.log("Tentative d'inscription sur :", apiUrl);

    axios
      .post(`${apiUrl}/api/sign/signup`, data)
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setError(err.response?.data?.error || "Le serveur est injoignable ou met trop de temps à répondre.");
      });
  };

  // DOM virtuel

  return (
    <>
      {formSubmit ? (
        <>
          <Signin />
          <br />
          <div>
            <p className="sign_valid">
              Inscription validé, vous pouvez vous connecter !
            </p>
          </div>
        </>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="sign_form">
            <h1>Créer un compte</h1>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            <br />
            <ErrorMessage name="firstname" component="span" />
            <br />
            <Field
              aria-label="votre prénom"
              className="sign_form_input"
              name="firstname"
              placeholder="Votre prénom"
              autoComplete="off"
            />
            <ErrorMessage name="lastname" component="span" />
            <br />
            <Field
              aria-label="votre nom de famille"
              className="sign_form_input"
              name="lastname"
              placeholder="Votre nom de famille"
              autoComplete="off"
            />
            <ErrorMessage name="username" component="span" />
            <br />
            <Field
              aria-label="votre nom d'utilisateur"
              className="sign_form_input"
              name="username"
              placeholder="Votre nom d'utilisateur"
              autoComplete="off"
            />
            <br />
            <ErrorMessage name="email" component="span" />
            <br />
            <Field
              aria-label="votre adresse email"
              className="sign_form_input"
              name="email"
              placeholder="Votre adresse email"
              autoComplete="off"
            />
            <br />
            <ErrorMessage name="password" component="span" />
            <br />
            <Field
              aria-label="votre mot de passe"
              className="register_form_input"
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              autoComplete="off"
            />
            <br />
            <ErrorMessage name="confirmation" component="span" />
            <br />
            <Field
              aria-label="confirmer votre mot de passe"
              className="sign_form_input"
              type="password"
              name="confirmation"
              placeholder="Confirmez votre mot de passe"
              autoComplete="off"
            />
            <br />
            <button
              className="sign_form_button"
              type="submit"
              aria-label="valider"
            >
              Valider
            </button>
          </Form>
        </Formik>
      )}
    </>
  );
}

// Exportation du componsant Signup

export default Signup;
