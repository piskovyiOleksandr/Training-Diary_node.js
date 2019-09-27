const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    models.Exercise.find()
      .then((exercises) => {
        console.log(exercises);
        if(exercises) {
          res.render('system/exercises', {
            exercises,
            user: {
                userId,
                userLogin
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({
          ok: false,
          error: 'Помилка! Спробуйте пізніше!'
        });
      });
  });

  router.get('/:id', (req, res) => {

    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    const id = req.params.id;

      models.Exercise.findOne({_id: id})
      .then((exercise) => {
        console.log(exercise);
        if(exercise) {
          res.render('system/detail-exercise', {
            exercise,
            user: {
              userId,
              userLogin
          }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({
          ok: false,
          error: 'Помилка! Спробуйте пізніше!'
        });
      });
  });


module.exports = router;