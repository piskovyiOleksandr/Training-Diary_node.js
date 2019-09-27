/* eslint-disable no-undef */
$(function() {

    // REMOVE ERRORS
  function removeErrors() {
    $('form.login p.error, form.register p.error').remove();
    $('form.login input, form.register input').removeClass('error');
  }

  // TOGGLE AUTH
  var flag = true;
  $('.switch-button').on('click', function(e) {
    e.preventDefault();

    $('input').val('');
    removeErrors();

    if (flag) {
      flag = false;
      $('.register').show('slow');
      $('.login').hide();
    } else {
      flag = true;
      $('.login').show('slow');
      $('.register').hide();
    }
  });

  // CLEAR
  $('form.login input, form.register input').on('focus', function() {
    removeErrors();
  });


  // REGISTRATION
  $('#register-button').on('click', function(e) {
    e.preventDefault();

    var data = {
      login: $('#r-login').val(),
      password: $('#r-password').val(),
      passwordConfirm: $('#r-confirmPassword').val()
    };
    console.log(data); 

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/register'
    }).done(function (data) {
      if (!data.ok) {
        $('.register h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function (item) {
            $('input[name=' + item + ']').addClass('error');
          });
        }
      } else {
        $(location).attr('href', '/');
      }
    });
  });

  // LOGIN
  $('#login-button').on('click', function(e) {
    e.preventDefault();

    var data = {
      login: $('#login').val(),
      password: $('#password').val()
    };
    console.log(data);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/login'
      }).done(function(data) {
        if (!data.ok) {
          $('.login h2').after('<p class="error">' + data.error + '</p>');
          if (data.fields) {
            data.fields.forEach(function(item) {
              $('input[name=' + item + ']').addClass('error');
            });
          }
        } else {
          console.log(data)
         $(location).attr('href', '/create-workout');
        }
      });
    
  });

});
/* eslint-enable no-undef */