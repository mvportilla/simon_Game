
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var startGame = false;



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () { nextSequence() }, 1000);

        }

    } else {
        var wrongSound = new Audio('sounds/wrong.mp3');
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");

        }, 200);
        $("#level-title").text("GAME OVER, Press any key to Restart.");
        startOver();
        console.log("wrong");
    }
    console.log(currentLevel);
}

function startOver() {
    level = 0;
    gamePattern = [];
    startGame = false;

}


$('.btn').click(function () {

    var userChosenColor = $(this).attr("id");;
    userClickedPattern.push(userChosenColor);


    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

$(document).keypress(function () {
    if (!startGame) {
        $("#level-title").text("Level " + level);
        nextSequence();
        startGame = true;

    }

})



