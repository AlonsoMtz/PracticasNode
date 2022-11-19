
const { response, request } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = new require('../models/usuario');


const usuariosGet = (req, res = response) => {

    const {q, nomb = "asd"} = req.query;

    res.json({
        msg: "GET - Controller",
        q,
        nomb
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: "PUT - Controller",
        id: id
    })
}

const usuariosPost = async (req, res = response) => {

    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);
    // }
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {
        nombre, 
        correo, 
        password, 
        rol
    } );

    //Verifica Correo
    // const existeEmail = await Usuario.findOne({correo});
    // if(existeEmail){
    //     return res.status(400).json({
    //         msg: 'El correo ya existe en la BD.'
    //     });
    // }

    //Encripta Password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        msg: "POST - Controller",
        // body: body,
        usuario
    })
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: "DELETE - Controller"
    })
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: "PATCH - Controller"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}