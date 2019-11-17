const {
    Schema,
    model
} = require('mongoose');

const user = Schema({
    name: {
        type: String,
        require: true
    },
    gmail: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    },
    active: {
        type: Boolean
    },
    token: {
        type: String
    },

}, {
    timestamp: true,
});

module.exports = model('user', user, 'user');