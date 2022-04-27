
const { Router } = require('express');
const { check } = require('express-validator');
const {usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
} = require('../controllers/users');


const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('email', 'Email is invalid').isEmail()
],usersPost);

router.put('/:id', usersPut);


router.delete('/', usersDelete);

router.patch('/', usersPatch);





module.exports = router;


