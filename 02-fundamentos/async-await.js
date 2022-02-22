

const empleados = [
    {
        id: 1,
        nombre: 'Fernando'
    },
    {
        id: 2,
        nombre: 'Linda'
    },
    {
        id: 3,
        nombre: 'Karen'
    },
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    },
    /* {
        id: 3,
        nombre: 'Karen'
    }, */
];



const getEmpleado = ( id, callback ) => {
    
    return new Promise( ( resolve, reject ) => {

        const empleado = empleados.find( e => e.id === id)?.nombre;

        (empleado)
            ? resolve(empleado)
            : reject(`No existe empleado con id ${id}`);

    } );
}

const getSalario = ( id, callback ) => {
    
    return new Promise( ( resolve, reject ) => {

        const salario = salarios.find( e => e.id === id)?.salario;

        (salario)
            ? resolve(salario)
            : reject(`No existe salario con id ${id}`);

    } );
}


const getInfoUsuario = async(id)=>{
    //return 'Hola mundo';

    try{
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
    
        return `El salario del empleado ${ empleado } es ${ salario }`;

    }catch (error){
        throw error;
    }
    
}


const id = 3;
getInfoUsuario(id)
    .then(msg => {
        console.log('Todo bien')
        console.log(msg)
    })
    .catch(err => {
        console.log('Todo mal')
        console.log(err)
    });










