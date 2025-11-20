import React, { useState, useEffect } from 'react';

function AsignarMateriaForm({ profesorId }) {
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [horario, setHorario] = useState('');
  const [mensaje, setMensaje] = useState('');

  
  useEffect(() => {
    const fetchMaterias = async () => {
      if (!profesorId) return;

      try {
        // Petición para obtener la lista de todas las materias disponibles.
        const respuesta = await fetch('http://127.0.0.1:5000/materias');
        const data = await respuesta.json();
        
        if (Array.isArray(data)) {
          setMaterias(data);
          // Si la lista no está vacía, seleccionamos la primera materia por defecto.
          if (data.length > 0) {
            setMateriaSeleccionada(data[0].cod_materia);
          }
        } else {
          setMensaje("No se pudieron cargar las materias.");
        }
      } catch (error) {
        setMensaje("Error de conexión al cargar las materias.");
      }
    };
    fetchMaterias();
  }, [profesorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materiaSeleccionada || !horario) {
      setMensaje("Por favor, complete todos los campos.");
      return;
    }
    setMensaje('Asignando materia...');

    try {
      const respuesta = await fetch('http://127.0.0.1:5000/profesores/asignar_materia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Id_profesor: profesorId,
          Cod_materia: parseInt(materiaSeleccionada),
          Horario: horario,
        }),
      });
      const datos = await respuesta.json();
      setMensaje(datos.Mensaje || datos["ERROR EN LA ASIGNACIÓN"] || "Error desconocido.");
    } catch (error) {
      setMensaje("Error de conexión al asignar la materia.");
    }
  };

  return (
    <div className="feature-section">
      <h3>Asignar Nueva Materia</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Materia:</label>
          <select value={materiaSeleccionada} onChange={(e) => setMateriaSeleccionada(e.target.value)}>
            {materias.length > 0 ? (
              materias.map(materia => (
                <option key={materia.Cod_materia} value={materia.Cod_materia}>
                  {materia.Nombre}
                </option>
              ))
            ) : (
              <option>Cargando materias...</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Horario:</label>
          <input
            type="text"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            placeholder="Ej: Lunes 7-9 AM"
            required
          />
        </div>
        <button type="submit">Asignar Materia</button>
      </form>
      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
    </div>
  );
}

export default AsignarMateriaForm;