// importar el modulo mysql2
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crear la conexion a la Base de datos
const conexion = mysql.createConnection({
    host : '127.0.0.1',
    user: 'root',
    password: '',
    database : 'test'
})

//Conectar a la BD
conexion.connect((err)=>{
    if(err){
        console.error('Error de conexion ' + err.stack);
        return;
    }
    console.log('Conexio exitosa' + conexion.threadId);
})

const app = express();
const port = 3000;

//Middleware
app.use(cors()); // Permite solicitudes desde cualquier origen
app.use(bodyParser.json())

// Ruta para insertar datos en base de datos
app.post('/vehiculo',( req, res) =>{
    const {placa, tipo, marca, modelo } = req.body;

    //sentencia sql
    const sqlSentence = "INSERT INTO vehiculo (placa, tipo, marca, modelo) VALUES (?, ?, ?, ?)"

    conexion.query(sqlSentence, [placa, tipo, marca, modelo], (err, results) =>{
        if(err){
            console.error("Error al insertar datos: " + err.stack);
            res.status(500).send('Error al insertar datos');
            return;
        }

        console.log("Datos insertados", results);
        res.status(200).json({ message: 'Datos insertados correctamente' });
    });

});

app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
});

