from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)  # Crear el objeto app de la clase Flask

CORS(app)  # Modulo CORS es para que me permita acceder desde el frontend al backend

# Configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/sportmas'
# URI de la BBDD driver de la BD user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # None
db = SQLAlchemy(app)  # Crea el objeto db de la clase SQLAlchemy
ma = Marshmallow(app)  # Crea el objeto ma de la clase Marshmallow

# Defino la tabla
class Cliente(db.Model):  # La clase Cliente hereda de db.Model
    id = db.Column(db.Integer, primary_key=True)  # Define los campos de la tabla
    nombre = db.Column(db.String(30), nullable=False)
    apellido = db.Column(db.String(30), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    fecha_alta = db.Column(db.Date, nullable=False)
    plan = db.Column(db.Enum('Plan bronce', 'Plan plata', 'Plan oro', 'Plan diamante'), nullable=False)
    apto_fisico = db.Column(db.Enum('Sí', 'No'), nullable=False)
    foto = db.Column(db.String(400))

    def __init__(self, nombre, apellido, edad, fecha_alta, plan, apto_fisico, foto):  # Crea el constructor de la clase
        self.nombre = nombre
        self.apellido = apellido
        self.edad = edad
        self.fecha_alta = fecha_alta
        self.plan = plan
        self.apto_fisico = apto_fisico
        self.foto = foto

# Si hay que crear más tablas, se hace aquí
with app.app_context():
    db.create_all()  # Aquí crea todas las tablas

class ClienteSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'apellido', 'edad', 'fecha_alta', 'plan', 'apto_fisico', 'foto')

cliente_schema = ClienteSchema()  # El objeto cliente_schema es para traer un cliente
clientes_schema = ClienteSchema(many=True)  # El objeto clientes_schema es para traer múltiples registros de cliente

# Crea los endpoints o rutas (JSON)
@app.route('/clientes', methods=['GET'])
def get_clientes():
    all_clientes = Cliente.query.all()  # El método query.all() lo hereda de db.Model
    result = clientes_schema.dump(all_clientes)  # El método dump() lo hereda de ma.schema y trae todos los registros de la tabla
    return jsonify(result)  # Retorna un JSON de todos los registros de la tabla

@app.route('/clientes/<id>', methods=['GET'])
def get_cliente(id):
    cliente = Cliente.query.get(id)
    return cliente_schema.jsonify(cliente)  # Retorna el JSON de un cliente recibido como parámetro

@app.route('/clientes/<id>', methods=['DELETE'])
def delete_cliente(id):
    cliente = Cliente.query.get(id)
    db.session.delete(cliente)
    db.session.commit()
    return cliente_schema.jsonify(cliente)  # Me devuelve un JSON con el registro eliminado

@app.route('/clientes', methods=['POST'])  # Crea ruta o endpoint
def create_cliente():
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    edad = request.json['edad']
    fecha_alta = request.json['fecha_alta']
    plan = request.json['plan']
    apto_fisico = request.json['apto_fisico']
    foto = request.json['foto']
    
    new_cliente = Cliente(nombre, apellido, edad, fecha_alta, plan, apto_fisico, foto)
    db.session.add(new_cliente)
    db.session.commit()
    return cliente_schema.jsonify(new_cliente)

@app.route('/clientes/<id>', methods=['PUT'])
def update_cliente(id):
    cliente = Cliente.query.get(id)
    cliente.nombre = request.json['nombre']
    cliente.apellido = request.json['apellido']
    cliente.edad = request.json['edad']
    cliente.fecha_alta = request.json['fecha_alta']
    cliente.plan = request.json['plan']
    cliente.apto_fisico = request.json['apto_fisico']
    cliente.foto = request.json['foto']
    db.session.commit()
    return cliente_schema.jsonify(cliente)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

# Programa principal *******************************
if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Ejecuta el servidor Flask en el puerto 5000
    print("Running on http://127.0.0.1:5000/")
