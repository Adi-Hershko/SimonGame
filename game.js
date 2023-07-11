var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// Start the game only if a key is pressed, and if it didn't start already
$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

// Check which button was clicked
$(".btn").click(function(){
    if(started){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
        // For testing purposes
        console.log(userClickedPattern);
    }
});

// Advance to the next level
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);    
    playSound(randomChosenColour);    
}

// Play the sound of the button that was clicked / chosen
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate the button that was clicked
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Restart the game - reset all variables
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// The user lost
function gameOver(){
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    // Reseting the variables - so when the user presses a key, the game will start over
    startOver(); 
}

// Check if the user's answer is correct in each step
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}