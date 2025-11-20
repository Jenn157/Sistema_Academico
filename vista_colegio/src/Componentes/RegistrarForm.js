import React, { useState } from 'react';

function RegisterForm({ onSwitchToLogin }) {
  const [identificacion, setIdentificacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [clave, setClave] = useState('');
  const [tipo, setTipo] = useState('Estudiante'); 
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('Registrando...');

    try {
      const respuesta = await fetch('http://127.0.0.1:5000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Identificacion: identificacion,
          Nombre: nombre,
          Tipo: tipo,
          Clave: clave,
        }),
      });
      const datos = await respuesta.json();

      if (respuesta.ok) {
        setMensaje(datos.Mensaje + " ¡Ahora puedes iniciar sesión!");
      } else {
        setMensaje(datos.Error || "Ocurrió un error en el registro.");
      }
    } catch (error) {
      setMensaje("Error de conexión. Inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Crear una Cuenta</h2>
      
      <div className="form-group">
        <label>Identificación:</label>
        <input type="text" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Nombre Completo:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Contraseña:</label>
        <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Tipo de Usuario:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Estudiante">Estudiante</option>
          <option value="Profesor">Profesor</option>
        </select>
      </div>

      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}

      <button type="submit">Registrarse</button>

      <p className="switch-form-text">
        ¿Ya tienes una cuenta?{' '}
        <span onClick={onSwitchToLogin} className="switch-form-link">
          Inicia sesión
        </span>
      </p>
    </form>
  );
}

export default RegisterForm;