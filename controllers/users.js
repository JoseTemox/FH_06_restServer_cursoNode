const { response,request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');



const usersGet = (req = request, res = response) => {

    const {q, nombre='No name', apiKey, page =1, limit=1} = req.query;
    res.json({
        msg: 'get API  - usersGet',
        q,
        nombre,
        apiKey,
        page,
        limit
    });
}

const usersPost = async (req, res = response) => {

    //validar los campos
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    console.log(errors);

    // const body = req.body;
    const { name, email, password, rol } = req.body;
    //creacion de la instancia en BD
    const user = new User({ name, email,password,rol });

    // Verificar si el correo existe
    const existEmail = await User.findOne({email});
    if(existEmail){
        return res.status(400).json({
            msg: 'Email already registered'
        })
    }



    //Encriptar la contrasenia
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);




    //almacenar en la base de datos
    await user.save();

    res.json({
        msg: 'post API  - usersPost',
        user
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;
    res.json({
        msg: 'put API  - usersPut',
        id
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API  - usersPatch'
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API  - usersDelete'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}