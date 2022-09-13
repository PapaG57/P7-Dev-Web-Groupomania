// Importer les dépendances nécessaires

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/authContext';
import { useParams } from 'react-router-dom';

// démarrage du composant Upload //

function Upload() {
  // Déclaration des hooks useState, useContext et useParams //

  let { id } = useParams();
  const [image, setImage] = useState('');
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  // Exécute cette fonction immédiatement à l'ouverture de la page //

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setEmail(res.data.email);
      });
  }, []);

  // demande PUT //

  const handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('image', image);
    axios
      .put(`${process.env.REACT_APP_API_URL}api/users/update/${id}`, data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setImage({ ...image, image: data });
          window.location.replace(`/user/${id}`);
        }
      });
  };

  // DOM virtuel //

  return (
    <>
      {(authState.email === email && (
        <form onSubmit={handleUpload} className="upload">
          <br />
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpeg, .jpg, .png, .gif, .webp"
            onChange={(event) => setImage(event.target.files[0])}
            aria-label="modifier votre image"
          />
          <br />
          <button type="submit" aria-label="valider">
            Modifier
          </button>
        </form>
      )) ||
        (authState.isAdmin === true && (
          <form onSubmit={handleUpload} className="upload">
            <br />
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpeg, .jpg, .png, .gif, .webp"
              onChange={(event) => setImage(event.target.files[0])}
              aria-label="modifier votre image"
            />
            <br />
            <button type="submit" aria-label="valider">
              Modifier
            </button>
          </form>
        ))}
    </>
  );
}

// Exportation du componsant Upload //

export default Upload;
