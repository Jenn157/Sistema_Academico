import React, { useState, useEffect } from 'react';

function EstudianteDashboard({ user, onLogout }) {

  const [materiasDisponibles, setMateriasDisponibles] = useState([]);
  const [misMaterias, setMisMaterias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (!user || !user.Id_usuario) return;
    setIsLoading(true);

    try {
      const [resDisponibles, resInscritas] = await Promise.all([
        fetch('http://127.0.0.1:5000/materias_disponibles'),
        fetch(`http://127.0.0.1:5000/estudiantes/${user.Id_usuario}/materias_inscritas`)
      ]);

      const dataDisponibles = await resDisponibles.json();
      const dataInscritas = await resInscritas.json();
      console.log("Datos de materias inscritas recibidos:", dataInscritas);

      if (Array.isArray(dataDisponibles)) setMateriasDisponibles(dataDisponibles);
      if (Array.isArray(dataInscritas)) setMisMaterias(dataInscritas);

    } catch (error) {
      setMensaje("Error de conexión al cargar los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleInscribir = async (idMateriaDictada) => {
    setMensaje('Inscribiendo...');
    try {
      const respuesta = await fetch('http://127.0.0.1:5000/estudiantes/inscribir_materia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Id_estudiante: user.Id_usuario,
          Id_materia_dictada: idMateriaDictada,
        }),
      });
      const datos = await respuesta.json();
      setMensaje(datos.Mensaje || datos["ERROR EN LA INSCRIPCIÓN"] || "Error desconocido.");
      if (respuesta.ok && datos.Mensaje) {
        fetchData(); 
      }
    } catch (error) {
      setMensaje("Error de conexión al realizar la inscripción.");
    }
  };

  const idsMateriasInscritas = new Set(misMaterias.map(m => m.id_materia_dictada));

  if (isLoading) {
    return <div className="dashboard">Cargando panel del estudiante...</div>;
  }

  return (
    <div className="dashboard">
      <div className="welcome-header">
        <h2>Panel del Estudiante: {user.Nombre}</h2>
      </div>

      <div className="feature-section">
        <h3>Mis Materias Inscritas</h3>
        {misMaterias.length > 0 ? (
          <ul className="lista-materias">
            {[...new Map(misMaterias.map(item => [item.id_materia_dictada, item])).values()].map(materia => (
              <li key={materia.id_materia_dictada}>
                <span>{materia.nombre_materia} - Prof. {materia.nombre_profesor} ({materia.horario})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aún no estás inscrito en ninguna materia.</p>
        )}
      </div>

      <hr className="divider" />


      <div className="feature-section">
        <h3>Mis Calificaciones</h3>
        {misMaterias.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>Materia</th>
                <th>Descripción de la Nota</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {misMaterias.flatMap(materia =>
                materia.notas.map(nota => (
                  <tr key={nota.id_nota}>
                    <td>{materia.nombre_materia}</td>
                    <td>{nota.descripcion}</td>
                    <td><strong>{nota.nota}</strong></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <p>Aún no tienes calificaciones registradas.</p>
        )}
      </div>

      <hr className="divider" />
      <div className="feature-section">
        <h3>Materias Disponibles para Inscripción</h3>
        {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
        {materiasDisponibles.length > 0 ? (
          <ul className="lista-materias">
            {materiasDisponibles.map(materia => {
              const yaInscrito = idsMateriasInscritas.has(materia.id_materia_dictada);
              return (
                <li key={materia.id_materia_dictada}>
                  <span>{materia.nombre} - Prof. {materia.nombre_profesor} ({materia.horario})</span>
                  
                  {yaInscrito ? (
                    <button className="ya-inscrito-btn" disabled>Inscrito</button>
                  ) : (
                    <button onClick={() => handleInscribir(materia.id_materia_dictada)}>
                      Inscribir
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay materias disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
}

export default EstudianteDashboard;





