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
        res.render('system/create-workout', {
          ok: true,
          exercises,
          user: {
            userId,
            userLogin
          }
        })
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

  router.post('/add-workout', (req, res) => {

    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    console.log(req.body);

    models.Workout.create({
      userId: userId,
      workoutName: req.body.workoutName,
      number: 1,
      exercises: req.body.exercises,
      recommendations: req.body.recommendations

  })
  .then(workout => {
      if(!workout) {
          res.json({
              ok: false,
              error: 'Ошибка, попробуйте позже!'
          });
      } else {
          console.log(workout);
          res.json({
              workout,
              ok: true,
              msg: "Тенування успішно добавлено",
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