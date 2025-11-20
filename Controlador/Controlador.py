from flask import Flask, request,jsonify
from flask_cors import CORS #libreria que permite conectar backend con frontend
from Modelo import Modelo as modelo 

app = Flask(__name__) #instancia de flask 

CORS(app)

@app.route('/usuarios',methods=['POST'])

def crear_usu():
    print("Recibiendo datos,creación de usuario")
    datos=request.get_json()
    Identificacion=datos['Identificacion']
    Nombre=datos['Nombre']
    Tipo=datos['Tipo']
    Clave=datos['Clave']
    Id_rol=1 if Tipo.lower()=='profesor' else 2
    Resultado=modelo.crear_usuario(Identificacion,Nombre,Id_rol,Clave)
    return jsonify(Resultado)
    
@app.route('/login',methods=['POST'])

def login():
    print ("Recibiendo credenciales para realizar login...")
    datos=request.get_json()
    Identificacion=datos['Identificacion']
    Clave=datos['Clave']
    Usuario_encontrado=modelo.login(Identificacion,Clave)
    if Usuario_encontrado:
        return jsonify({"Mensaje":"Inicio Exitoso!","usuario":Usuario_encontrado})
    else:
        return jsonify({"ERROR": "Identificación o contraseña incorrectas"}), 401
    
@app.route('/profesores/asignar_materia',methods=['POST'])

def asignar_materia():
    print("Asignando materia")
    datos=request.get_json()
    Id_profesor=datos['Id_profesor']
    Cod_materia=datos['Cod_materia']
    Horario=datos['Horario']
    Asignacion=modelo.asignar_materia_profesor(Id_profesor,Cod_materia,Horario)
    return jsonify(Asignacion)

@app.route('/profesores/<int:id_profesor>/materias_dictadas',methods=['GET'])

def visualizar_materias_prof(id_profesor):
    print(f"Buscando materias dictadas por el profesor con ID:{id_profesor}")
    materias_prof=modelo.visualizacion_materias(id_profesor)
    return jsonify(materias_prof)

@app.route('/notas', methods=['POST'])

def agregar_una_nota():
    datos = request.get_json()
    id_materia_inscrita = datos['id_materia_inscrita']
    nota = datos['nota']
    descripcion = datos.get('descripcion', '')
    resultado = modelo.agregar_notas(id_materia_inscrita, nota, descripcion)
    return jsonify(resultado)

@app.route('/notas/<int:id_nota>', methods=['PUT'])

def editar_una_nota(id_nota):
    datos = request.get_json()
    nota = datos['nota']
    descripcion = datos.get('descripcion', '')
    resultado = modelo.editar_nota(id_nota, nota, descripcion)
    return jsonify(resultado)

@app.route('/notas/<int:id_nota>', methods=['DELETE'])

def eliminar_una_nota(id_nota):
    resultado = modelo.eliminar_nota(id_nota)
    return jsonify(resultado)

@app.route('/materias',methods=['GET'])
def listar_materias():
    materias=modelo.visualizacion_general_materias()
    return jsonify(materias)

@app.route('/materia_dictada/<int:id_materia_dictada>/estudiantes',methods=['GET'])

def visualizar_est(id_materia_dictada):
    print(f"Buscando estudiantes para la materia con ID:{id_materia_dictada}")
    lista=modelo.visualizacion_estudiantes(id_materia_dictada)
    return jsonify(lista)

@app.route('/materias_disponibles',methods=['GET'])

def materias_dispo():
    print("Consultando materias disponibles")
    materias=modelo.consultar_materias()
    return jsonify(materias)

@app.route('/estudiantes/inscribir_materia',methods=['POST'])

def inscribir_materia():
    print("Inscribiendo materia")
    datos=request.get_json()
    Id_estudiante=datos['Id_estudiante']
    Id_materia_dictada=datos['Id_materia_dictada']
    Inscripcion=modelo.inscribir_materia(Id_estudiante,Id_materia_dictada)
    return jsonify(Inscripcion)

@app.route('/estudiantes/<int:id_estudiante>/materias_inscritas',methods=['GET'])

def visualizar_materias(id_estudiante):
    print("Buscando materias del estudiante con ID:{id_estudiante}")
    Horario=modelo.visualizar_inscripcion(id_estudiante)
    return jsonify(Horario)

if __name__ == '__main__':
    app.run(debug=True,port=5000)