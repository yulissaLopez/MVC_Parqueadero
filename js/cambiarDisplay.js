function mostrarDisplay(campo){
    if(campo.style.display === "none"){
        campo.style.display = "block";
    }
}

function ocultarDisplay(campo){
    if(campo.style.display != "none"){
        campo.style.display = "none";
    }
}

export{mostrarDisplay, ocultarDisplay}