# Sistema de Gestión Académica - Prueba Técnica

Este proyecto es una aplicación web full-stack hecha en python, que simula un sistema de gestión academica, en este se permite a profesores y estudiantes gestionar materias, inscripciones y calificaciones.

## Características Principales

*   Roles de Usuario: Es un sistema para Profesores y Estudiantes con diferentes permisos.
*   Gestión de Profesores: Permite la asignación de materias y gestión de notas de sus estudiantes.
*   Gestión de Estudiantes: Permite la inscripción a materias disponibles y visualización de calificaciones.
*   API RESTful: Maneja un backend robusto construido con Flask que se comunica con el frontend a través de JSON.
*   Frontend: Maneja la interfaz de usuario moderna y reactiva construida con React.js.


## Tecnologías Utilizadas

*   Frontend: React.js
*   Backend: Python (Flask)
*   Base de Datos: MySQL

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:
*   Node.js (v16 o superior)
*   Python (v3.8 o superior)
*   Un servidor de MySQL en ejecución

## Instrucciones de Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto:

### 1. Configuración de la Base de Datos

1.  Abre tu cliente de MySQL.
2.  Crea una nueva base de datos. Puedes llamarla `db_colegio`.
3.  Selecciona la base de datos recién creada e importa el script de configuración. Ejecuta el contenido del archivo `BD.sql` que se encuentra en la raíz de este proyecto. Esto creará todas las tablas necesarias y cargará los datos de prueba.

### 2. Configuración del Backend (Flask)

1.  Navega a la raíz del proyecto en tu terminal.
2.  (Opcional, recomendado) Crea un entorno virtual: `python -m venv venv` y actívalo.
3.  Instala las dependencias de Python:
    Usando: pip install -r requirements.txt

4.  Abre el archivo `ConfiguracionBD.py` y asegúrate de que las credenciales (usuario, contraseña, host) coincidan con las de tu servidor MySQL local.
5.  Inicia el servidor del backend:
    Usando: python Controlador/Controlador.py 
    El servidor estará corriendo en `http://127.0.0.1:5000`.

### 3. Configuración del Frontend (React)

1.  Abre una nueva terminal.
2.  Navega a la carpeta del frontend:
    Usando: cd vista_colegio
3.  Instala las dependencias de Node.js:
    Usando: npm install
4.  Inicia la aplicación de React:
    Usando: npm start
    La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`.


## Usuarios de Prueba

Puedes usar las siguientes credenciales para probar la aplicación:
*   Profesor:
    *   Identificación: 1026578586
    *   Contraseña: Profyaa202511
*   Estudiante:
    *   Identificación: 1023362600
    *   Contraseña: Esjdaa20251
---

## Documentación y Pruebas de la API (Postman)

La API completa se puede probar utilizando la colección de Postman. El siguiente link te permitirá importar la colección completa y el entorno preconfigurado a tu propia aplicación de Postman.

A traves del link : 
https://jenn157-7364567.postman.co/workspace/Jenn's-Workspace~9ccd1234-1afb-46a8-85c4-db20c25d00eb/collection/50065679-c19b5858-26e4-4bce-9c22-cb91fe612b9c?action=share&creator=50065679 

## Instrucciones:##
1.  Haz clic en el link.
2.  Puedes elegir "Fork" para copiar la colección a tu propio Postman o explorarla directamente en la web.
3.  La colección incluye un entorno llamado "API Sistema Educativo" con la variable `base_url` preconfigurada a `http://127.0.0.1:5000`.

Una vez seleccionado el entorno, ya puedes explorar las carpetas y ejecutar cualquiera de las peticiones para probar la API.