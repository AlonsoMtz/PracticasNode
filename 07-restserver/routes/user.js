
const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');
const { esRoleValido, EmailValido, IDExiste } = require('../helpers/db-validators');
const ValidateFields = require('../middlewares/validateField');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(IDExiste),
    check('rol').custom(esRoleValido),
    ValidateFields
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras.').isLength({min: 6}),
    // check('correo', 'El correo no es válido.').isEmail(),
    // check('rol', 'No es un rol válido.').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    check('correo').custom(EmailValido),
    ValidateFields,
],usuariosPost);

router.delete('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(IDExiste),
    ValidateFields,
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;



 