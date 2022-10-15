// Importer les dépendances nécessaires

import './styles/index.css';
import { AuthContext } from './helpers/authContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Routes from './components/Routes';

// Application du point d'entrée

function App() {
  // Declare le hook useState

  const [authState, setAuthState] = useState({
    id: 0,
    username: '',
    email: '',
    biography: '',
    image: '',
    isAdmin: false,
    status: false,
  });

  // Exécute cette fonction immédiatement à l'ouverture de la page
  // S'il y a une erreur, change l'authState en false
  // Sinon change authState à true

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/sign/auth`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            biography: res.data.biography,
            image: res.data.image,
            isAdmin: res.data.isAdmin,
            status: true,
          });
        }
      });
  }, []);

  // DOM virtuel

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Header />
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}

// Exportation du componsant App

export default App;
