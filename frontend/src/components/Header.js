// Importer les dépendances nécessaires //

import React from 'react';
import Logo from '../image/icon-left-font.png';

// démarrage du composant Header //

function Header() {
  // DOM virtuel //

  return (
    <header className="container">
      <div>
        <img src={Logo} alt="Logo du réseau social groupomania" />
      </div>
    </header>
  );
}

// Exportation du componsant Header //

export default Header;
