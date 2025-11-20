import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginForm({ onLoginSuccess,onSwitchToRegister }) {
  const [identificacion, setIdentificacion] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const manejarLogin = async (evento) => {
    evento.preventDefault();
    setError('');

    try {
      const respuesta = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Identificacion: identificacion,
          Clave: contraseña,
        }),
      });
      const datos = await respuesta.json();
      if (respuesta.ok && datos.usuario) {
        onLoginSuccess(datos.usuario);
      } else {
        setError(datos.ERROR || 'Error al iniciar sesión.');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <form onSubmit={manejarLogin} className="login-form">
      <h2>Iniciar Sesión</h2>
      <div className="form-group">
        <label>Identificación:</label>
        <input
          type="text"
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Contraseña:</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className="password-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Ingresar</button>
      <p className="switch-form-text">
        ¿No tienes una cuenta?{' '}
        <span onClick={onSwitchToRegister} className="switch-form-link">
          Regístrate aquí
        </span>
      </p>
    </form>
  );
}

export default LoginForm;