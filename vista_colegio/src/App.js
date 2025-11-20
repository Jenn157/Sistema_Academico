import React, { useState } from 'react';
import LoginForm from './Componentes/LoginForm';
import ProfesorDashboard from './Componentes/ProfesorDashboard';
import EstudianteDashboard from './Componentes/EstudianteDashboard';
import RegistrarForm from './Componentes/RegistrarForm';
import './App.css'; 
import { FaSignOutAlt } from 'react-icons/fa';


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const handleLoginSuccess = (userData) => {
    console.log("LOGIN EXITOSO EN APP.JS! Usuario recibido:", userData);
    setLoggedInUser(userData);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

   const renderDashboard = () => {
    if (loggedInUser.Id_rol === 1) { 
      return <ProfesorDashboard user={loggedInUser} onLogout={handleLogout} />;
    } else if (loggedInUser.Id_rol === 2) { 
      return <EstudianteDashboard user={loggedInUser} onLogout={handleLogout} />;
    }
    return null;
  };

  return (
    <div className="App">
      {loggedInUser && (
        <button onClick={handleLogout} className="global-logout-button" title="Cerrar Sesión">
          <FaSignOutAlt /> 
        </button>
      )}

      <header className="App-header">
        <h1 className="app-title">Portal Educativo</h1>
        {!loggedInUser ? (
           isRegistering ? (
             <RegistrarForm onSwitchToLogin={() => setIsRegistering(false)} />
           ) : (
          <LoginForm 
             onLoginSuccess={handleLoginSuccess} 
             onSwitchToRegister={() => setIsRegistering(true)}
          />
           )
        ) : (
          renderDashboard()
        )}
      </header>
    </div>
  );
}

export default App;