// Importer les dépendances nécessaires

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Upload from '../components/User/Upload';
import UpdateBio from '../components/User/UpdateBio';
import UpdateEmail from '../components/User/UpdateEmail';
import Delete from '../components/User/Delete';
import UpdatePassword from '../components/User/UpdatePassword';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// démarrage du composant User //

function User() {
  // Déclaration des hooks useState et useParams//

  const [username, setUsername] = useState('');
  const [profile, setImage] = useState('');
  let { id } = useParams();

  // Exécute cette fonction immédiatement à l'ouverture de la page //

  useEffect(() => {
    if (!sessionStorage.getItem('JWToken')) {
      window.location.replace(`/`);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((res) => {
          setUsername(res.data.username);
          setImage(res.data.profile);
        });
    }
  }, []);

  // DOM virtuel //

  return (
    <div className="user">
      <Navbar />
      <div className="user_profile">
        <div className="user_leftside">
          <div className="user_image">
            <img src={profile} alt="profil" />
            <Upload />
          </div>
        </div>
        <div className="user_rightside">
          <h1>Profil de {username}</h1>
          <UpdateBio />
          <div className="user_email_password">
            <UpdateEmail />
            <UpdatePassword />
          </div>
          <div>
            <Delete />
          </div>
        </div>
      </div>
    </div>
  );
}

// Exportation du componsant User //

export default User;
