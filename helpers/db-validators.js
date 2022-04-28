const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async(role = '') => {
    const existRole = await Role.findOne({role});
    if( !existRole ){
        throw new Error(`Role ${ role } is not registered in BD`)
    }
}

const isEmailExist = async(email = '') =>{
    const existEmail = await User.findOne({email});
    if(existEmail){
        // return res.status(400).json({
        //     msg: 'Email already registered'
        // })
        throw new Error(`Email: ${ email }  already registered`)

    };
}

const isExistUserById = async(id) => {

    // verificar si el id existe
    const existUser = await User.findById(id);
    if(!existUser){
        // return res.status(400).json({
        //     msg: 'Email already registered'
        // })
        throw new Error(`UserId: ${ id }  is not registered`);

    };
}

module.exports = {
    isValidRole,
    isEmailExist,
    isExistUserById
}