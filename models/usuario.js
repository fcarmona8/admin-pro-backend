const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'requerido'],
        unique: [true, 'requerido'],
    },
    password: {
        type: String,
        required: [true, 'requerido'],
    },
    img: {
        Type: String,
    },
    role: {
        type: String,
        required: [true, 'requerido'],
        default: 'USER_ROLE',
    },
    google: {
        type: Boolean,
        default: false,
    }

});

UsuarioSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema)