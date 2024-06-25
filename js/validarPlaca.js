//Valida si la placa cumple el patron Para carro NNN-LLL Para moto NNN-LLN
export function validarPlaca(placa, tipo){

    //variable que retorna si la placa es correcta (true) o incorrecta (false)
    let esCorrecta;
    // Transformar en Mayusculas
    placa.toUpperCase();
    console.log(placa)

    if(tipo === "carro"){
        //[A-Z]{3} = los primeros 3 caracteres deben ser letras
        //\d{3} = \d representa cuelaquier digito del 0 al 9 y el 3 especifica que debe haber 3 digitos numericos

        //patron que debe seguir placa del carro
        const placa_carro = /^[A-Z]{3}-\d{3}$/;

        if(placa_carro.test(placa)){
            esCorrecta = true;
        }else{
            esCorrecta = false;
        }
    }else if(tipo === "moto"){
        //[A-Z]{3} = los primeros 3 caracteres deben ser letras
        //\d{2} = \d representa cuelaquier digito del 0 al 9 y el 2 especifica que debe haber 2 digitos numericos
        //[A-Z] especifica que debe haber una letra despues

        //patron que debe seguir placa del moto
        const placa_moto = /^[A-Z]{3}-\d{2}[A-Z]$/;
        if(placa_moto.test(placa)){
            esCorrecta = true;
        }else{
            esCorrecta = false;
        }
    }

    return esCorrecta;

}