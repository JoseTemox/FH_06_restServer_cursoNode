
const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { validateAdminRole,haveRole } = require('../middlewares/validar-roles');
const {
    validarCampos,
    validarJWT,
    validateAdminRole,
    haveRole
} = require('../middlewares');

const { isValidRole, isEmailExist,isExistUserById } = require('../helpers/db-validators');

const {usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
} = require('../controllers/users');


const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must to be min 6 characters').isLength({min:6}),
    check('email', 'Email is invalid').isEmail(),
    check('email').custom(isEmailExist),
    check('role').custom( isValidRole),
    // check('role').custom( (role) => isValidRole(role)), es igual que lo anterior
    // check('rol', 'Rol is invalid').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
],usersPost);

router.put('/:id', [
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom(isExistUserById),
    check('role').custom( isValidRole),
    validarCampos
],usersPut);


router.delete('/:id', [
    validarJWT,

    //CON LOS MIDDLEWARE SIGUIENTES SE PUEDEN FORZAR LAS DOS FORMAS DIFERENTES DE VERFICAR LOS ROLES
    // validateAdminRole,
    haveRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom(isExistUserById),
    validarCampos
],usersDelete);

router.patch('/', usersPatch);





module.exports = router;


