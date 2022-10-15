// Importer les dépendances nécessaires

import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

// démarrage du composant Signout

function Signout() {
  // Suppression du token dans sessionStorage

  const Signout = () => {
    sessionStorage.removeItem('JWToken');
    window.location.replace('/');
  };

  // DOM virtuel

  return (
    <div onClick={Signout}>
      <LogoutIcon alt="bouton déconnexion" className="navbar_icon" />
    </div>
  );
}

// Exportation du composant Signout

export default Signout;
