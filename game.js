var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userInput = [];

var started = false;
var level = 0;

//starting the game
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//clicking buttons
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userInput.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userInput.length - 1);
});

//checking condition
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userInput[currentLevel]) {
    if (userInput.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      playSound("right");
      $("body").addClass("next-round");
      $("#level-title").text("Right answer, Be ready for next round.");

      setTimeout(function () {
        $("body").removeClass("next-round");
      }, 200);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//new sequence and flash animation for showing new sequence.
function nextSequence() {
  userInput = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//animation when pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//restart game.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
