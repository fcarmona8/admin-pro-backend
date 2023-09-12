
// Ruta: /api/usuarios

const {Router} = require('express');
const { check } = require('express-validator')
const { validationResult } = require('express-validator');


const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios-controller');
const { ExpressValidator } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post(
    '/', 
    [
        check('nombre', 'Campo obligatorio').not().isEmpty(),
        check('password', 'Campo obligatorio').not().isEmpty(),
        check('email', 'Campo obligatorio').isEmail(),
        validarCampos
    ], 
    crearUsuario
);

router.put('/:id',
    [   
        validarJWT,
        check('nombre', 'Campo obligatorio').not().isEmpty(),
        check('email', 'Campo obligatorio').isEmail(),
        check('role', 'Campo obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario);

router.delete('/:id',
    [
        validarJWT
    ],
    borrarUsuario
)




module.exports = router;
