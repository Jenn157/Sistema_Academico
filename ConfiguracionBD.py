import mysql.connector 
from mysql.connector import Error

def conectarBD():
    try:
        conexion= mysql.connector.connect(
            host='localhost',
            database='bd_colegio',
            user='root',
            password='May1023++' 
        )
        if conexion.is_connected():
            print("Conexión Exitosa!")
            return conexion
    except Error as e:
        print(f"ERROR: Fallo la conexión:{e}")
        return None