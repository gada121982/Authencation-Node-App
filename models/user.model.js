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
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        default: ''
    },

}, {
    timestamp: true,
});

module.exports = model('user', user, 'user');