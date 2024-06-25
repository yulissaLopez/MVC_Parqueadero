import { mostrarDisplay, ocultarDisplay } from "./cambiarDisplay.js";

// Clase
class Usuario{
    constructor(id, nombre, correo){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
    }
}

//Modelo
class UsuarioModel{
    constructor(){
        this.usuarios = []
    }

    //Agregar Usuario
    agregarUsusuario(usuario){
        this.usuarios.push(usuario);
        console.log(this.usuarios);
    }
}

// View
class UsuarioView{
    constructor(){
        this.contenedor = document.getElementById("contenedor");
        this.formUsuario = document.getElementById("formUsuario");
        this.id = document.getElementById("idUsu");
        this.nombre = document.getElementById("nombre");
        this.correo = document.getElementById("email");
        this.btnRegistroUsu = document.getElementById("btnRegistroUsu");
    }

    // Metodo para mostrar el formulario de usuario
    mostarFormularioUsuario(){
        this.contenedor.style.display = "block";
    }

    ocultarFormularioUsuario(){
        this.contenedor.style.display = "none";
    }
}

// Controlador
class UsuarioController {
    constructor(){
        // Creamos una instancia del modelo del usuario
        this.modelo = new UsuarioModel();
        // Creamos una instancia de la vista del usuario
        this.vista = new UsuarioView();
        // Creamos un manejador de eventos para el metodo de agregar usuario del controlador
        this.agregarUsusuarioHandler = this.agregarUsusuario.bind(this); 
        // Llamamos el metodo incialiazar del controlador del usuarios
        this.inicializar();
    }

    // Metodo que incializa el primer metodo en el usuario
    inicializar(){
        this.vista.btnRegistroUsu.addEventListener('click', this.agregarUsusuario.bind(this));
    }

    agregarUsusuario(){
        // Recolectar los datos del formulario
        const id = this.vista.id.value;
        const nombre = this.vista.nombre.value;
        const correo = this.vista.correo.value;

        // Aqui van las validaciones

        // Crear una nueva instancia de la clase Usuario
        const usuario = new Usuario(id,nombre,correo);

        // Llamar al metodo agreagar usuario del UsuarioModel
        this.modelo.agregarUsusuario(usuario);

        // Reiniciar el formulario
        this.vista.formUsuario.reset();

        // Ocultar el Formulario
        this.vista.ocultarFormularioUsuario();


    }

}

export {Usuario, UsuarioController}
