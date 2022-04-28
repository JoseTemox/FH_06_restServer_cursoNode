const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [ true, 'Rol is necessary']
    }
});

module.exports = model ('Role', RoleSchema);