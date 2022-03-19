const express = require('express');
const userModel = require('../models/User');
const register = express();

register.post('/register-validate', (req, res) => {
    let createdUser = new userModel({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        createdon: new Date()
    });

    try {
        createdUser.save();
        res.send('<script>window.location.href = "/login"</script>');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = register;