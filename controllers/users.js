const { response,request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');



const usersGet = async (req = request, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const query = {estado:true};
    // const users = await User.find(query)
    // //TODO: VALIDAR QUE SOLO RECIBA NUMEROS
    //     .skip(Number(from))
    //     .limit(Number(limit));

    // const totalUsers = await User.countDocuments(query);
    // const currentsUsersQuery = await users.length;


    const [totalUsers, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        //TODO: VALIDAR QUE SOLO RECIBA NUMEROS
        .skip(Number(from))
        .limit(Number(limit)),

    ])

    res.json({

        totalUsers,
        currentsUsersQuery: users.length,
        users,
    });
}

const usersPost = async (req, res = response) => {

    // const body = req.body;
    const { name, email, password, role } = req.body;
    //creacion de la instancia en BD
    const user = new User({ name, email,password,role });

    // Verificar si el correo existe

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

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google,email, ...rest } = req.body;

    if( password ){
        //Encriptar la contrasenia
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate(id,rest)



    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API  - usersPatch'
    });
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    //Borrado fisico
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id,{ estado: false });
    // const userAutenticated = req.user

    res.json({
        user,
        // userAutenticated
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}