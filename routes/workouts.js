const express = require('express');
const router = express.Router();
const moment = require('moment');
moment.locale('uk');

const models = require('../models');

router.get('/', (req, res) => {

  const userId = req.session.userId;
  const userLogin = req.session.userLogin;

  models.Workout.find({userId: userId})
  .then(w => {
      if(!w) {
          res.json({
              ok: false,
              error: 'Ошибка, попробуйте позже!'
          });
      } else {
          const workouts = w.reverse();
          console.log(workouts);
          res.render('system/workouts', {
              moment,
              workouts,
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
        error: 'Ошибка, попробуйте позже!'
      });
    });
});


module.exports = router;