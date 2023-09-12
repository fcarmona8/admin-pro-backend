const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt')

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;




const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}


const crearUsuario = async(req, res = response) => {

    const {password, email} = req.body;

    try{

        const existeEmail = await Usuario.findOne({ email })

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ja esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Guardar usuario
        await usuario.save();

        //Generar token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
    })

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const id = (req.params.id).substring(1);

    const uid = new ObjectId(id);


    try {

        const usuarioDB = await Usuario.findOne({ _id: uid });
        
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario',
                usuarioDB
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        campos.email = email;

        const usuarioActualizado = await Usuario.findOneAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarUsuario = async(req, res = response) => {

    const id = (req.params.id).substring(1);

    const uid = new ObjectId(id);

    try{

        const usuarioDB = await Usuario.findOne({ _id: uid });
        
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario',
                usuarioDB
            });
        }

        await Usuario.findOneAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: "Usuario borrado"
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar"
        })

    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}