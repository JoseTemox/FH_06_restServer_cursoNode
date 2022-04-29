
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User  = require('../models/user');



const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'there is not token in the request'

        });
    }

    try {

        const { uid } =  jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        //leer el usuario en el uid
        // req.user = await User.findById(uid);
        const user  = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Token Invalid - user is not in BD'
            })
        }

        //verificar si el uid tiene estado en true
        if(!user.estado){
            return res.status(401).json({
                msg: 'Token Invalid - user status in false'
            })
        }

        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            msg: 'Invalid Token'
        })

    }






}

module.exports = {
    validarJWT
}