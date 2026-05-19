// Importer les dépendances nécessaires

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from '../../pages/Sign';
import Home from '../../pages/Home';
import User from '../../pages/User';
import Post from '../../pages/Post';

// démarrage du composant AppRoutes

function AppRoutes() {
  // DOM virtuel //

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/home/:id" element={<Post />} />
        <Route path="*" element={<Sign />} />
      </Routes>
    </Router>
  );
}

// Exportation du composant AppRoutes

export default AppRoutes;
