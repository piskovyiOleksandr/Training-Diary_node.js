$(function(){function o(){$("form.login p.error, form.register p.error").remove(),$("form.login input, form.register input").removeClass("error")}var e=!0;$(".switch-button").on("click",function(t){t.preventDefault(),$("input").val(""),o(),e?(e=!1,$(".register").show("slow"),$(".login").hide()):(e=!0,$(".login").show("slow"),$(".register").hide())}),$("form.login input, form.register input").on("focus",function(){o()}),$("#register-button").on("click",function(o){o.preventDefault();var e={login:$("#r-login").val(),password:$("#r-password").val(),passwordConfirm:$("#r-confirmPassword").val()};console.log(e),$.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:"/register"}).done(function(o){o.ok?$(location).attr("href","/"):$(".alert").css("display","block").text(o.error)})}),$("#login-button").on("click",function(o){o.preventDefault();var e={login:$("#login").val(),password:$("#password").val()};console.log(e),$.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:"/login"}).done(function(o){o.ok?$(location).attr("href","/create-workout"):$(".alert").css("display","block").text(o.error)})})}),$(function(){var o=[];$("#e-add").on("click",function(){var e=$("#exercises").val().slice(0,24),t={id:e,exerciseName:$("#exercises").val().slice(25),weight:$("#weight").val(),repeat:$("#repeat").val(),sets:$("#sets").val(),recommendations:$("#recommendations")};$(".workout").find("ul.list-exercises").append('<li class="text-info">'+t.exerciseName+" "+t.weight+"lb./"+t.repeat+"р./"+t.sets+"п.</li>"),console.log(t),o.push(t),$(".not-w").css("display","none"),$(".yes-w").css("display","block")}),$("#save-w").on("click",function(e){e.preventDefault();var t={workoutName:$("#name-workout").val().toUpperCase(),exercises:o,recommendations:$("#recommendations").val()};$.ajax({type:"POST",data:JSON.stringify(t),contentType:"application/json",url:"/create-workout/add-workout"}).done(function(o){o.ok?($(".alert").css("display","block").text(o.msg),setTimeout(function(){$(location).attr("href","/workouts")},3e3)):alert("Error")})})}),$(function(){});