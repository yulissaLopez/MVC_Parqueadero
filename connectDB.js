// importar el modulo mysql2
const mysql = require('mysql2')

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

//agregar datos 
const placa = 'ABR-890';
const tipo = 'carro';
const marca ='MAZDA'
const modelo = '2025';

const sqlSentence = "insert into vehiculo (placa, tipo, marca, modelo) value (?,?,?,?)"

conexion.query(sqlSentence, [placa, tipo, marca, modelo], (err,results)=>{
    if(err){
        console.error('Error al insertar datos: ' + err.stack)
        return;
    }
    console.log("Datos insertados", results);
})

//Realizar consulta
conexion.query('SELECT * FROM vehiculo', (err,results,fields)=>{
    if(err){
        console.error('Error en la consulta ' + err.stack)
        return;
    }
    console.log(results);
})


conexion.end();

// PA QUE ESTA VAINA MENDIO FUNCIONE
// Hacer una base de datos prueba con los datos de la conexion
// Verificar que node esta instalado e instalar el modulo npm install mysql2
// Ejecutar el archivo con node nombre archivo