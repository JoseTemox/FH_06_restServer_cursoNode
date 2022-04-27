const { Schema, model } = require('mongoose');

const UserSchema = Schema ({

    name: {
        type: String,
        required: [true , 'The name is necessary']
    },
    email: {
        type: String,
        required: [true , 'The email is necessary'],
        unique: true
    },
    password: {
        type: String,
        required: [true , 'The password is necessary'],
    },
    img: {
        type: String,
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    },

})

module.exports = model('User', UserSchema);