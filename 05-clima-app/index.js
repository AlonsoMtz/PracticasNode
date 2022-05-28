require('dotenv').config();
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {

        opt = await inquirerMenu();

        switch(opt){
            case 1: 
                //Mostrar Mensaje
                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);
                const idSeleccionado = await listarLugares(lugares);
                if(idSeleccionado === '0') continue;
                const lugarSel = lugares.find( l => l.id === idSeleccionado);
                
                busquedas.agregarHistorial(lugarSel.nombre);

                const climas = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                console.log('\nInformación de la ciudad\n');
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', climas.temp);
                console.log('Mínima:', climas.min);
                console.log('Máxima:', climas.max);
                console.log('Estado del clima:', climas.desc);

            break;

            case 2:
                //Historial
                busquedas.hitorialCapitalizado.forEach((lugar, i) => {
                    const idx = i+1;
                    console.log(`${idx}. ${lugar}`);
                });
                
            break;
        }

        if (opt !== 0) await pausa();

    }while(opt !== 0);

}


main();

