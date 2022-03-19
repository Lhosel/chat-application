const express = require('express');
const userModel = require('../models/User');
const login = express();

login.get('/login-validate', (req, res) => {
    var usernameInput = req.query.username;
    var passwordInput = req.query.password;

    userModel.findOne({ username: usernameInput })
        .then(user => {
            if (user) {
                if (user.username == usernameInput && user.password == passwordInput) {
                    res.redirect('/join');
                } else {
                    res.send('<script>alert("incorrect username or password"); window.location.href = "/login"; </script>');
                }
            } else {
                res.send('<script>alert("user does not exist"); window.location.href = "/login"; </script>');
            }
        });
});

module.exports = login;