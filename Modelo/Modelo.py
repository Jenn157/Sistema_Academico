from ConfiguracionBD import conectarBD

def crear_usuario(id, nombre, id_rol,cont):
    try:
        conexion=conectarBD()
        cursor= conexion.cursor()
        SQL="INSERT INTO Usuarios(Identificacion,Nombre,Id_rol,Clave) VALUES (%s,%s,%s,%s)"
        cursor.execute(SQL,(id,nombre,id_rol,cont))
        conexion.commit()
        conexion.close()
        return {"Mensaje":"Usuario Creado!"}
    except Exception as e:
        return {"Error":str(e)}
    
def login(id,cont):
    try:
        conexion=conectarBD()
        cursor=conexion.cursor(dictionary=True)
        SQL="SELECT * FROM Usuarios WHERE identificacion= %s AND Clave = %s"
        cursor.execute(SQL,(id,cont))
        usuario=cursor.fetchone()
        conexion.close()
        return usuario
    except Exception as e:
        return {"ERROR LOGIN":str(e)}
    
#FUNCIONES DOCENTE

def asignar_materia_profesor(id,cod_materia,horario):
    try:
        conexion=conectarBD()
        cursor=conexion.cursor()
        SQL="INSERT INTO materia_dictada (id_usuario,cod_materia,horario)VALUES (%s,%s,%s)"
        cursor.execute(SQL,(id,cod_materia,horario))
        conexion.commit()
        conexion.close()
        return{"Mensaje":"Materia Asignada!"}
    except Exception as e:
        return {"ERROR EN LA ASIGNACIÓN":str(e)}
    
def visualizacion_estudiantes(id_materia_dictada):
    try:
        conexion = conectarBD()
        cursor = conexion.cursor(dictionary=True)
        SQL= "SELECT u.Nombre, u.Identificacion, m_i.id_materia_inscrita FROM Usuarios u JOIN Materia_inscrita m_i ON u.Id_usuario = m_i.id_usuario WHERE m_i.id_materia_dictada = %s"
        cursor.execute(SQL, (id_materia_dictada,))
        estudiantes = cursor.fetchall()
        for estudiante in estudiantes:
            SQL_N = "SELECT id_nota, nota, descripcion FROM Notas WHERE id_materia_inscrita = %s"
            notas_cursor = conexion.cursor(dictionary=True)
            notas_cursor.execute(SQL_N, (estudiante['id_materia_inscrita'],))
            estudiante['notas'] = notas_cursor.fetchall()
            notas_cursor.close()
        conexion.close()
        return estudiantes
    except Exception as e:
        print(f"ERROR en visualizacion_estudiantes: {e}")
        return {"ERROR EN VISUALIZACIÓN": str(e)}
    
def visualizacion_materias(id):
    try:
        conexion=conectarBD()
        cursor=conexion.cursor(dictionary=True)
        SQL="SELECT m_d.id_materia_dictada,m.nombre,m_d.horario FROM Materia_dictada m_d JOIN Materias m ON m_d.cod_materia=m.cod_materia WHERE m_d.id_usuario=%s"
        cursor.execute(SQL,(id,))
        materia_dictada=cursor.fetchall()
        conexion.close()
        return materia_dictada
    except Exception as e:
        return {"ERROR EN LA VISUALIZACIÓN DE MATERIAS":str(e)}

def visualizacion_general_materias():
    try:
        conexion=conectarBD()
        cursor=conexion.cursor(dictionary=True)
        SQL="SELECT * FROM Materias"
        cursor.execute(SQL)
        materias=cursor.fetchall()
        conexion.close()
        return materias
    except Exception as e:
        return {"ERROR EN VER LAS MATERIAS":str(e)}
        
def agregar_notas(id_materia_inscrita,nota,descripcion):   
    try:
        conexion=conectarBD()
        cursor=conexion.cursor()
        SQL="INSERT INTO Notas (id_materia_inscrita,nota,descripcion) VALUES (%s,%s,%s)"
        cursor.execute(SQL, (id_materia_inscrita, nota, descripcion))
        conexion.commit()
        id_nueva_nota = cursor.lastrowid
        conexion.close()
        return {"Mensaje": "Nota agregada exitosamente!", "id_nota": id_nueva_nota}
    except Exception as e:
        return {"ERROR EN LA ASIGNACIÓN DE LA NOTA":str(e)}

def editar_nota(id_nota, nota, descripcion):
    try:
        conexion = conectarBD()
        cursor = conexion.cursor()
        sql = "UPDATE Notas SET nota = %s, descripcion = %s WHERE id_nota = %s"
        cursor.execute(sql, (nota, descripcion, id_nota))
        conexion.commit()
        conexion.close()
        return {"Mensaje": "Nota actualizada exitosamente!"}
    except Exception as e:
        return {"ERROR": str(e)}
    
def eliminar_nota(id_nota):
    try:
        conexion = conectarBD()
        cursor = conexion.cursor()
        sql = "DELETE FROM Notas WHERE id_nota = %s"
        cursor.execute(sql, (id_nota,))
        conexion.commit()
        conexion.close()
        return {"Mensaje": "Nota eliminada exitosamente!"}
    except Exception as e:
        return {"ERROR": str(e)}   
    
# FUNCIONES ESTUDIANTES

def inscribir_materia(id_estudiante, id_materia_dictada):
    try:
        conexion = conectarBD()
        cursor = conexion.cursor()
        check_sql = "SELECT * FROM materia_inscrita WHERE id_usuario = %s AND id_materia_dictada = %s"
        cursor.execute(check_sql, (id_estudiante, id_materia_dictada))
        if cursor.fetchone():
            conexion.close()
            return {"ERROR EN LA INSCRIPCIÓN": "Ya estás inscrito en esta materia."}
        SQL = "INSERT INTO materia_inscrita (id_usuario, id_materia_dictada) VALUES (%s, %s)"
        cursor.execute(SQL, (id_estudiante, id_materia_dictada))
        conexion.commit()
        conexion.close()
        return {"Mensaje": "Inscripción Exitosa!"}
    except Exception as e:
        print(f"ERROR en inscribir_materia: {e}")
        return {"ERROR EN LA INSCRIPCIÓN": str(e)}

def consultar_materias():
    try:
        conexion=conectarBD()
        cursor=conexion.cursor(dictionary=True)
        SQL="SELECT m_d.id_materia_dictada,m.nombre,m_d.horario, u.nombre AS nombre_profesor FROM materia_dictada m_d JOIN materias m ON m_d.cod_materia=m.cod_materia JOIN Usuarios u ON m_d.id_usuario=u.id_usuario WHERE u.id_rol=1"
        cursor.execute(SQL)
        materias=cursor.fetchall()
        conexion.close()
        return materias
    except Exception as e:
        return {"ERROR EN LA CONSULTA DE MATERIAS": str(e)}
    
def visualizar_inscripcion(id_estudiante):
    try:
        conexion=conectarBD()
        cursor=conexion.cursor(dictionary=True)
        SQL="SELECT m.Nombre AS nombre_materia,u.Nombre AS nombre_profesor,m_d.Horario AS horario,m_d.id_materia_dictada,m_i.id_materia_inscrita FROM materia_inscrita m_i JOIN materia_dictada m_d ON m_i.id_materia_dictada=m_d.id_materia_dictada JOIN materias m ON m_d.cod_materia=m.cod_materia JOIN usuarios u ON m_d.id_usuario=u.id_usuario WHERE m_i.id_usuario=%s"
        cursor.execute(SQL,(id_estudiante,))
        materias_inscritas=cursor.fetchall()
        for materia in materias_inscritas:
            SQL_N = "SELECT id_nota, nota, descripcion FROM Notas WHERE id_materia_inscrita = %s"
            notas_cursor = conexion.cursor(dictionary=True)
            notas_cursor.execute(SQL_N, (materia['id_materia_inscrita'],))
            materia['notas'] = notas_cursor.fetchall() # Se crea una nueva clave 'notas' con la lista de notas
            notas_cursor.close()
        conexion.close()
        return materias_inscritas
    except Exception as e:
        print(f"ERROR en visualizar_inscripcion: {e}")
        return {"ERROR EN LA VISUALIZACIÓN DE LA INSCRIPCIÓN": str(e)}