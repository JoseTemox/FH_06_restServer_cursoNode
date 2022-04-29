const { response } = require("express")


const validateAdminRole = ( req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'Required to verify the role without validating the token first'
        });
    }


    const { role, name } = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ name } is not administrator - you can not do that! `
        })
    }




    next();

}

const haveRole = (...roles) => {

    return (req, res = response, next ) => {

        if(!req.user){
            return res.status(500).json({
                msg: 'Required to verify the role without validating the token first'
            });
        }

        if( !roles.includes(req.user.role) ){
            return res.status(401).json({
                msg: `Service require some of these roles ${roles}`
            })
        }



        next();



    }



}


module.exports = {
    validateAdminRole,
    haveRole
}


