// Importer les dépendances nécessaires //

import React, { useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink } from 'react-router-dom';
import Signout from './Sign/signout';
import { AuthContext } from '../helpers/authContext';

// démarrage du composant Navbar //

function Navbar() {
  // Déclaration du hook useContext //

  const { authState } = useContext(AuthContext);
  const profil = () => {
    window.location.replace(`/user/${authState.id}`);
  };

  // DOM virtuel //

  return (
    <nav>
      <div className="navbar">
        <div>
          <span className="navbar_welcome">
            Bienvenue {authState.username} !
          </span>
        </div>
        <NavLink to={'/home'} aria-label="retour accueil">
          <HomeIcon
            aria-label="bouton accueil"
            className="navbar_icon"
            alt="retour à l'accueil"
          />
        </NavLink>
        <PersonIcon
          onClick={profil}
          aria-label="bouton profil"
          className="navbar_icon"
        />
        <Signout />
      </div>
    </nav>
  );
}

// Exportation du componsant Navbar //

export default Navbar;
