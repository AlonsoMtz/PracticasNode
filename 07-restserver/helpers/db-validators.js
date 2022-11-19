const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne( { rol } );
    if(!existeRol){
        throw new Error('El rol no está registrado en BD.')
    }
}

const EmailValido = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error('El correo ya está registrado en BD.')
    }
}

module.exports = {
    esRoleValido,
    EmailValido
}



