const { response } = require("express");
const bcryptjs = require("bcryptjs");


const  User  = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

    const {email,password} = req.body;


    try {

        //Verificar si el email existe
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                msg: 'User / Email wrong - email'
            });

        }


        //Verificar si el usuario existe (Borrado logico)
        if(!user.estado){
            return res.status(400).json({
                msg: 'User / Email wrong - estado: false'
            });

        }


        // Verificar la contrasenia
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'User / Email wrong - password'
            });
        }



        // Generar JWT

        const token = await generarJWT( user.id);








        res.json({
            msg: 'Ok Login',
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        });

    }


};




module.exports = {
    login
}

