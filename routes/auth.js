const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const models = require('../models');

router.get('/', (req, res) => {
  res.render('index', {
    user: false
  });
});

// REGISTRATION USER
router.post('/register', (req, res) => {
  
    const login = req.body.login;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
  
    if (!login ||  !password || !passwordConfirm) {
      const fields = [];
      if (!login) fields.push('login');
      if (!password) fields.push('password');
      if (!passwordConfirm) fields.push('passwordConfirm');
  
      res.json({
        ok: false,
        error: 'Все поля должны быть заполнены!',
        fields
      });
    } else if (!/^[a-zA-Z0-9]+$/.test(login)) {
      res.json({
        ok: false,
        error: 'Тільки латинську букви і цифри!',
        fields: ['login']
      });
    } else if (login.length < 3 || login.length > 16) {
      res.json({
        ok: false,
        error: 'Логін повинен бути від 3 до 16 символів!',
        fields: ['login']
      });
    } else if (password !== passwordConfirm) {
      res.json({
        ok: false,
        error: 'Паролі не співпадають!',
        fields: ['password', 'confirmPassword']
      });
    } else if (password.length < 5) {
      res.json({
        ok: false,
        error: 'Мінімальна кількість символів 6!',
        fields: ['password']
      });
    } else {
      models.User.findOne({
        login
      }).then(user => {
        if (!user) {
          bcrypt.hash(password, null, null, (err, hash) => {
            models.User.create({
              login,
              password: hash
            })
              .then(user => {
                console.log(user);
                req.session.userId = user._id;
                req.session.userLogin = user.login;
                res.json({
                  ok: true
                });
              })
              .catch(err => {
                console.log(err);
                res.json({
                  ok: false,
                  error: 'Помилка, спробуйте ще!'
                });
              });
          });
        } else {
          res.json({
            ok: false,
            error: 'Імя зайняте!',
            fields: ['login']
          });
        }
      });
    }
  });
  
  // LOGIN USER
  router.post('/login', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
  
    if (!login || !password) {
      const fields = [];
      if (!login) fields.push('login');
      if (!password) fields.push('password');
  
      res.json({
        ok: false,
        error: 'Всі поля повинні бути заповнені!',
        fields
      });
    } else {
      models.User.findOne({
        login
      })
        .then(user => {
          if (!user) {
            res.json({
              ok: false,
              error: 'Логін і пароль не вірні!',
              fields: ['login', 'password']
            })
          } else {
            bcrypt.compare(password, user.password, function(err, result) {
              if (!result) {
                res.json({
                  ok: false,
                  error: 'Логін і пароль не вірні!',
                  fields: ['login', 'password']
                });
              } else {
                console.log(user);
                req.session.userId = user.id;
                req.session.userLogin = user.login;
                res.json({
                  ok: true,
                  user
                });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.json({
            ok: false,
            error: 'Помилка, спробуйте ще!'
          });
        });
    }
  });
  
  // LOGOUT
  router.get('/logout', (req, res) => {
    if (req.session) {
      // delete session object
      req.session.destroy(() => {
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  });

module.exports = router;