import React, { useState, useEffect } from 'react';

function NotasEstudiante({ estudiante, onNotaAdded }) {
  const [nota, setNota] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  
  const handleAddNota = async (e) => {
    e.preventDefault();
    if (!nota || !descripcion) {
      setMensaje("Ambos campos son requeridos.");
      return;
    }
    setMensaje('Agregando...');

    try {
      const res = await fetch('http://127.0.0.1:5000/notas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_materia_inscrita: estudiante.id_materia_inscrita,
          nota: parseFloat(nota),
          descripcion: descripcion
        })
      });

      const data = await res.json();
      setMensaje(data.Mensaje || data.ERROR || "Error desconocido.");

      if (res.ok && data.Mensaje) {
        onNotaAdded(); 
        setNota('');
        setDescripcion('');
      }
    } catch (error) {
      setMensaje("Error de conexión al agregar la nota.");
    }
  };

  return (
    <div className="notas-container">
      <h5>Notas de {estudiante.Nombre}:</h5>
      <ul>
        {estudiante.notas && estudiante.notas.map(n => (
          <li key={n.id_nota}>
            {n.descripcion}: <strong>{n.nota}</strong>
          </li>
        ))}
        {estudiante.notas && estudiante.notas.length === 0 && <p>Este estudiante aún no tiene notas.</p>}
      </ul>
      <form onSubmit={handleAddNota} className="add-nota-form">
        <input type="number" step="0.1" min="0" max="5" value={nota} onChange={e => setNota(e.target.value)} placeholder="Nota" required />
        <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción (Ej: Quiz 1)" required />
        <button type="submit">Agregar Nota</button>
      </form>
      {mensaje && <p className="mensaje-feedback-small">{mensaje}</p>}
    </div>
  );
}

function VerEstudiantes({ profesorId }) {
  const [materiasDictadas, setMateriasDictadas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  useEffect(() => {
    const fetchMateriasDictadas = async () => {
      if (!profesorId) return;
      try {
        const respuesta = await fetch(`http://127.0.0.1:5000/profesores/${profesorId}/materias_dictadas`);
        const data = await respuesta.json();
        if (Array.isArray(data)) {
          setMateriasDictadas(data);
        } else {
          setMensaje("No se pudieron cargar las materias dictadas.");
        }
      } catch (error) {
        setMensaje("Error de conexión al cargar las materias dictadas.");
      }
    };
    fetchMateriasDictadas();
  }, [profesorId]);

  const handleVerEstudiantes = async (materia) => {
    setMateriaSeleccionada(materia); // Guardamos el objeto completo
    setEstudiantes([]); 
    setEstudianteSeleccionado(null);
    
    try {
      const respuesta = await fetch(`http://127.0.0.1:5000/materia_dictada/${materia.id_materia_dictada}/estudiantes`);
      const data = await respuesta.json();
      if (Array.isArray(data)) {
        setEstudiantes(data);
      } else {
        setMensaje("No se pudieron cargar los estudiantes.");
      }
    } catch (error) {
      setMensaje("Error de conexión al cargar los estudiantes.");
    }
  };

  const refrescarEstudiantes = () => {
      if(materiaSeleccionada) {
          handleVerEstudiantes(materiaSeleccionada);
      }
  }

  return (
    <div className="feature-section">
      <h3>Mis Materias Dictadas</h3>
      {materiasDictadas.length > 0 ? (
        <ul className="lista-materias">
          {materiasDictadas.map(materia => (
            <li key={materia.id_materia_dictada}>
              <span>{materia.nombre} ({materia.horario})</span>
              <button onClick={() => handleVerEstudiantes(materia)}>
                Ver Estudiantes
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aún no tienes materias asignadas.</p>
      )}

      {materiaSeleccionada && (
        <div className="students-list-container">
          <h4>Estudiantes Inscritos en {materiaSeleccionada.nombre}</h4>
          <ul className="lista-estudiantes">
            {estudiantes.map(est => (
              <li key={est.id_materia_inscrita} onClick={() => setEstudianteSeleccionado(est)}>
                {est.Nombre}
              </li>
            ))}
          </ul>
        </div>
       )}

       {estudianteSeleccionado && (
        <NotasEstudiante 
          estudiante={estudianteSeleccionado} 
          onNotaAdded={refrescarEstudiantes}
        />
      )}
    </div>
  );
}
   
export default VerEstudiantes;