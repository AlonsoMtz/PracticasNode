const inquirer = require('inquirer');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('=======================');
    console.log(' Seleccione una opción ');
    console.log('=======================\n');

    const { option } = await inquirer.prompt(menuOptions);

    return option;
}

const leerInput = async(message) => {

    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length == 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(pregunta);
    
    return desc;
}

const pausa = async() => {

    const pregunta = [
        {
            input: 'input',
            name: 'enter',
            message: 'Presione enter para continuar ...',
        }
    ];

    await inquirer.prompt(pregunta);

}

const listadoTareasBorrar = async(tareas = []) => {

    const opciones = tareas.map((tarea, i) => {
        
        const idx = i + 1;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
        }
    });
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: opciones,
        }
    ]

    opciones.unshift({
        value: '0',
        name: '0. Cancelar'
    });
    
    const {id} = await inquirer.prompt(preguntas);

    return id;

}

const confirmar = async(mensaje) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje,
        }
    ]

    const {ok} = await inquirer.prompt(pregunta);

    return ok;

}

const listadoTareasCompletar = async(tareas = []) => {

    const opciones = tareas.map((tarea, i) => {
        
        const idx = i + 1;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn==null) ? false : true,
        }
    });
    
    const pregunta = [
        {
            type: 'checkbox',
            name: 'id',
            message: 'Seleccione: ',
            choices: opciones,
        }
    ]
    
    const {id} = await inquirer.prompt(pregunta);

    return id;

}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCompletar,
}


