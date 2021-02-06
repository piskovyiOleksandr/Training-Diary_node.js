const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticAsset = require('static-asset');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = require('./config');
const routes = require('./routes');

const app = express();

// sessions
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// sets and uses
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

// routers


app.use('/', routes.auth);
app.use('/create-workout', routes.createWorkout);
app.use('/workouts', routes.Workouts);
app.use('/exercises', routes.exercises);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message
  });
});


async function start() {
  try {
    await mongoose.connect('mongodb+srv://oleksandr:oleksandr@cluster0.lleza.mongodb.net/<dbname>?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(4000, () => console.log('Start localhost:4000!'))
  } catch (e) {
    console.log('Server Error', e.message)
  }
}

start()

