import React from 'react';
import AsignarMateriaForm from './AsignarMateriaForm';
import VerEstudiantes from './VerEstudiantes';

function ProfesorDashboard({ user, onLogout }) {
   if (!user || !user.Id_usuario) {
    return <div>Cargando panel del profesor...</div>;
  }
  return (
    <div className="dashboard">
      <div className="welcome-header">
        <h2>Panel del Profesor: {user.Nombre}</h2>
      </div>
      <AsignarMateriaForm profesorId={user.Id_usuario} />
      <hr className="divider" /> 
      <VerEstudiantes profesorId={user.Id_usuario} />
    </div>
  );
}

export default ProfesorDashboard;