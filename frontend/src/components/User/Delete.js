// Importer les dépendances nécessaires

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/authContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// démarrage du composant Delete

function Delete() {
  // Déclaration des hooks useState, useContext et useParams

  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { authState } = useContext(AuthContext);
  let { id } = useParams();

  // Exécute cette fonction immédiatement à l'ouverture de la page

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

  // demande DELETE

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/users/delete/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        sessionStorage.removeItem('JWToken');
        navigate('/');
      });
  };

  // DOM virtuel
  // on fait une vérification si l'utilisateur en cours à le même mail ou si c'est l'admin.
  // Après vérification, l'admin ou l'utilisateur en cours peut supprimer.

  return (
    <>
      {(authState.email === email && (
        <>
          <div className="user_delete">
            <button onClick={handleDelete} className="user_delete_button">
              Supprimer le compte !
            </button>
          </div>
        </>
      )) ||
        (authState.isAdmin === true && (
          <>
            <div className="user_delete">
              <button onClick={handleDelete} className="user_delete_button">
                Supprimer le compte !
              </button>
            </div>
          </>
        ))}
    </>
  );
}

// Exportation du componsant Delete

export default Delete;
