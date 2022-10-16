// Importer les dépendances nécessaires

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../helpers/authContext';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';

// démarrage du composant UpdateBio

function UpdateBio() {
  // Déclaration des hooks useState, useContext et useParams

  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [biographyForm, setBiographyForm] = useState(false);
  const { authState } = useContext(AuthContext);
  let { id } = useParams();

  // Déclaration des valeurs initiales

  const initialValues = {
    description: `${description}`,
  };

  // Exécute cette fonction immédiatement à l'ouverture de la page

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setDescription(res.data.description);
        setUsername(res.data.username);
      });
  }, []);

  // demande PUT

  const handleUpdateBio = (data) => {
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
          setDescription(res.data.description);
          window.location.replace(`/user/${id}`);
        }
      });
  };

  // DOM virtuel

  return (
    <div className="user_biography">
      {biographyForm === false && (
        <>
          <p>{description}</p>
          {(authState.username === username && (
            <>
              <button
                onClick={() => setBiographyForm(!biographyForm)}
                aria-label="modifier"
              >
                <EditIcon />
              </button>
            </>
          )) ||
            (authState.isAdmin === true && (
              <>
                <button
                  onClick={() => setBiographyForm(!biographyForm)}
                  aria-label="modifier"
                >
                  <EditIcon />
                </button>
              </>
            ))}
        </>
      )}
      {biographyForm && (
        <>
          <Formik initialValues={initialValues} onSubmit={handleUpdateBio}>
            <Form>
              <Field
                as="textarea"
                aria-label="biographie"
                name="description"
                placeholder={authState.description}
                autoComplete="off"
              />
              <button type="submit" aria-label="modifier">
                <DoneIcon />
              </button>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
}

// Exportation du componsant UpdateBio

export default UpdateBio;
