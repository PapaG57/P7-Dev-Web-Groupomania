// Importer les dépendances nécessaires

import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

// démarrage du composant index

function Index(props) {
  // Déclaration du hook useState

  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  // Système de basculement des modes

  const handleModals = (event) => {
    if (event.target.id === 'signup') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (event.target.id === 'signin') {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  // DOM virtuel

  return (
    <div className="sign">
      <div className="sign_list">
        <ul>
          <li
            onClick={handleModals}
            id="signup"
            className={signUpModal ? 'sign_active' : null}
          >
            S'inscrire
          </li>
          <br />
        </ul>
        {signUpModal && <Signup />}
        {signInModal && <Signin />}
      </div>
    </div>
  );
}

// Exportation du composant index

export default Index;
