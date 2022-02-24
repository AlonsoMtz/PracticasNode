const { mostarMenu } = require("./helpers/mensajes");
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasCompletar } = require('./helpers/inquirer');
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");

const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){

        tareas.cargarTareasFromArray(tareasDB);

    }

    do {

        opt = await inquirerMenu();
        console.log();
        switch(opt){
            case '1': //crear
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(false);
            break;

            case '4':
                tareas.listarPendientesCompletadas();
            break;

            case '5':
                const ids = await listadoTareasCompletar(tareas.listadoArr);
                //console.log(ids);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id!=0){
                    const borrar = await confirmar('¿Estas seguro?');
                    if(borrar){
                        tareas.borrarTarea(id);
                    }
                }
            break;
            
        }

        guardarDB(tareas.listadoArr);
        console.log();
        await pausa();

    }while(opt !== '0');

    
    //pausa();
}


main();


