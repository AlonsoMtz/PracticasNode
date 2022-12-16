
const { response, request } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = new require('../models/usuario');


const usuariosGet = async (req, res = response) => {

    // const {q, nomb = "asd"} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true};
    // const usuarios = await Usuario.find(query)
    //                                 .limit(Number(limite))
    //                                 .skip(Number(desde));

    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                .limit(Number(limite))
                .skip(Number(desde))
    ])

    res.json({
        // respuesta
        total,
        usuarios
    });
    // res.json({
    //     msg: "GET - Controller",
    //     q,
    //     nomb
    // })
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar contra BD
    if( password ){
        //Encripta Password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json({
        msg: "PUT - Controller",
        usuario
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

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );
    
    // Logico
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    
    res.json({
        // msg: "DELETE - Controller",
        usuario
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