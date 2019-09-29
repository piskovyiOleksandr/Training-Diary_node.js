/* eslint-disable no-undef */
$(function() {
  var exercises = [];
  
  $("#e-add").on("click", function() {
    var id = $('#exercises').val().slice(0, 24);
    var data = {
      id: id,
      exerciseName: $('#exercises').val().slice(25),
      weight: $('#weight').val(),
      repeat: $('#repeat').val(),
      sets: $('#sets').val(),
      recommendations: $('#recommendations')
  }

  $('.workout').find('ul.list-exercises').append("<li>"+data.exerciseName+' '+data.weight+'lb./'+ data.repeat + 'р./' + data.sets +'п.'+"</li>");
    console.log(data);
    exercises.push(data);
  $('.not-w').css("display", "none");
  $('.yes-w').css("display", "block");
 });
 

  $('#save-w').on('click', function(e) {
    e.preventDefault();
    var data = {
      workoutName: $('#name-workout').val().toUpperCase(),
      exercises: exercises,
      recommendations: $('#recommendations').val()
    }

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/create-workout/add-workout'
    }).done(function(data) {
      if (!data.ok) {
        alert("Error")
      } else {
        $('.alert').css("display", "block").text(data.msg);
        setTimeout(function() {
          $(location).attr('href', '/workouts');
        }, 3000)
        
      }
    });
  });

});
    /* eslint-enable no-undef */