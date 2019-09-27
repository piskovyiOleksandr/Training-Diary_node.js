/* eslint-disable no-undef */
$(function() {


  var exercises = [];
  $('.nav-exercises').on('click',".ex", function(e){
    
    var data = {
      muscleGroup: muscleGroup = e.target.id
    }

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/create-workout/get-muscle'
    }).done(function(data) {
      if (!data.ok) {
        alert("Error")
      } else {
          alert("good")
         console.log(data);
      }
    });
  });

 $("#e-add").on("click", function() {

  var id = $('#exercises').val().slice(0, 24);

  console.log(id);
 
  var data = {
    id: id,
    exerciseName: $('#exercises').val().slice(25),
    weight: $('#weight').val(),
    repeat: $('#repeat').val(),
    sets: $('#sets').val(),
    recommendations: $('#recommendations')

  }

  $('.workout').find('ul').append("<li>"+data.exerciseName+"</li>");
    console.log(data);
    exercises.push(data);
  //console.log(exercises);
 });
 

  $('#save-w').on('click', function(e) {
    e.preventDefault();
    var data = {
      workoutName: $('#name-workout').val().toUpperCase(),
      exercises: exercises,
      recommendations: $('#recommendations').val()
    }

    console.log(data);

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/create-workout/add-workout'
    }).done(function(data) {
      if (!data.ok) {
        alert("Error")
      } else {
          alert("good")
        console.log(data);
      }
    });
  });

});
    /* eslint-enable no-undef */