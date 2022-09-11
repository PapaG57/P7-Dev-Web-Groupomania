// Importer les dépendances nécessaires //

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignComponent from '../components/Sign';

// démarrage du composant Sign //

function Sign() {
  // Déclaration du hook useNavigate //

  let navigate = useNavigate();

  // Exécute cette fonction immédiatement à l'ouverture de la page //

  useEffect(() => {
    if (sessionStorage.getItem('JWToken')) {
      navigate('/home');
    }
  }, []);

  // DOM virtuel //

  return (
    <div className="page_container">
      <SignComponent signin={true} signup={false} />
    </div>
  );
}

// Exportation du componsant Sign //

export default Sign;
