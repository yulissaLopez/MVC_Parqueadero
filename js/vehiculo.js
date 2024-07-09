// Model
import { validarPlaca } from "./validarPlaca.js";
import { mostrarDisplay, ocultarDisplay } from "./cambiarDisplay.js";
import {UsuarioController } from "./usuario.js";


class Vehiculo{
  // Modelo del vehiculo 
  // Logica del negocio y comunicacion con los datos

    constructor(tipo, placa, marca, modelo){
        this.tipo = tipo;
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
    }

    //Validar si la placa ya existe en los datos
    // existe(vehiculo){
    //   if(vehiculo.placa != placa){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // }

}
  
class VehicleModel{
    constructor(){
      this.vehiculos = [];
    }
    
    // Agregar Vehiculo
    agregarVehiculo(vehiculo){
      this.vehiculos.push(vehiculo)
      console.log(this.vehiculos)
    }
}

// View
class VehicleView {
// Interactua con la UI 
  constructor() {
    this.form_registro = document.getElementById("form_registro");
    this.tipo = document.getElementById("tipo");
    this.placa = document.getElementById("placa")
    this.btnVerificar = document.getElementById("btnVerificar");
    this.marca = document.getElementById("marca");
    this.modelo = document.getElementById("modelo");
    this.servicio = document.getElementById("servicio");
    this.campos = document.getElementById("campos");
    this.boton = document.getElementById("btnEnviar");
    this.bodyTabla = document.getElementById("bodyTablaVehiculos");

  }

  //Funcion que muestra el nuevo dato en una tabla
  mostrarTablaVehiculos(vehiculo) {
    let fila = this.bodyTabla.insertRow();
    let celdaTipo = fila.insertCell(0);
    let celdaPlaca = fila.insertCell(1);
    let celdaMarca = fila.insertCell(2);
    let celdaModelo = fila.insertCell(3);
    let celdaFecha = fila.insertCell(4);
    let celdaHora = fila.insertCell(5);
        
    
    //Establecer el contenido de las celdas
    celdaTipo.textContent = vehiculo.tipo;
    celdaPlaca.textContent = vehiculo.placa;
    celdaMarca.textContent = vehiculo.marca;
    celdaModelo.textContent = vehiculo.modelo; 

    let hora = new Date().getHours();
    let minutos = new Date().getMinutes();

    celdaFecha.textContent = new Date().toDateString(); 
    celdaHora.textContent = hora + ":" + minutos;
  }

  reiniciarVista(){
    // Oculte los campos del formulario
    ocultarDisplay(this.campos);
    // Muestre el boton de verificar
    mostrarDisplay(this.btnVerificar);
    // Desbloquear los inputs
    this.desbloquearInput();
    // Reset el formulario
    this.form_registro.reset();
  }

  bloquearInput(){
    this.tipo.disabled = true;
    this.placa.disabled = true;
  }

  desbloquearInput(){
    this.tipo.disabled = false;
    this.placa.disabled = false;
  }

}  

// Controller
class VehicleController {

  constructor(){
    this.modeloVehiculo = new VehicleModel();
    this.vista = new VehicleView();
    this.agregarVehiculoHandler = this.agregarVehiculo.bind(this);
    this.inicializar();
  }

  inicializar(){
    this.vista.btnVerificar.addEventListener('click', this.cualquierNombre.bind(this));
    this.vista.boton.addEventListener("click", this.agregarVehiculoHandler);
  }

  
  cualquierNombre(){
  //event.preventDefault()  
    const tipo = this.vista.tipo.value;
    const placa = this.vista.placa.value;
      
    //Validar si la placa cumple con los parametros
    if(validarPlaca(placa, tipo)){

      //Ocultar el boton de Verificar
      ocultarDisplay(this.vista.btnVerificar);

      // Bloquear Los inputs placa y tipo
      this.vista.bloquearInput();

      // Muestre los campos del formulario
      mostrarDisplay(this.vista.campos);

      // // Remover el listener previo antes de agregar uno nuevo
      // this.vista.boton.removeEventListener("click", this.agregarVehiculoHandler);

      // // Agregar Listener al boton que llama la funcion para agregar los datos
      // this.vista.boton.addEventListener("click", this.agregarVehiculoHandler);
    }else{
      console.log("placa mal")
    }
  }

  agregarVehiculo(){
    // Obtener los datos del formulario
    const tipo = this.vista.tipo.value;
    const placa = this.vista.placa.value;
    const marca = this.vista.marca.value;
    const modelo = this.vista.modelo.value;
    const servicio = this.vista.servicio.value;
    
    // Verificar si existe campos vacios
    
    if(servicio === 'mes'){
      const usuController = new UsuarioController();
      // Llamar al metodo mostrar formulario
      usuController.vista.mostarFormularioUsuario();
    }
      
    // Crear un nuevo Vehiculo
    const vehiculo = new Vehiculo(tipo, placa, marca, modelo);

    // Enviar los datos al servidor
    // Devuelve una promesa
    fetch('http://localhost:3000/vehiculo', {
      method: 'POST',
      headers: {
        'content-Type' : 'application/json'
      },
      body: JSON.stringify(vehiculo)
    })
    .then(response => {
      if (response.ok){
        return response.json()
      }

      throw new Error('Error en la solictud');
    })
    .then(data => {
      console.log("Vehiculo Agregado con exito", data)
      this.modeloVehiculo.agregarVehiculo(vehiculo);
      this.vista.mostrarTablaVehiculos(vehiculo);
      this.vista.reiniciarVista();
    })
    .catch(error =>{
      console.error('Error:', error);
    })

  }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const vehicleController = new VehicleController();
})