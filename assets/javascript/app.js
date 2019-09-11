
var userPick;
var correctAnswers = 0;
var incorrectAnswers = 0;
var notAnswered = 0;
var currentQuestion = 0;
var timeLeft = 30;
var clicked = false;
var correct;
var interval;
var questions = [
    //1
    {
        question: "What is Director Fury's real name?",
        choices: ['Jayden', 'Nicholas', 'Xavier', 'Maxwell'],
        correct: '1',
        image: "assets/images/Fury.gif",
    },  //2
    {
        question: "What is the name of Loki's brother?",
        choices: ['Clint', 'Bruce', 'Thor', 'Odin'],
        correct: '2',
        image: "assets/images/lokiBro.gif",
    }, //3
    {
        question: "Which Avengers possesed no powers or body modifications?",
        choices: ['Wanda & Clint', 'Natasha & Tony', 'Bruce & Steve', 'Natasha & Clint'],
        correct: '3',
        image: "assets/images/clint.gif",
    }, //4
    {
        question: "Which Avenger was not from Earth?",
        choices: ['Loki', 'Thor', 'Wanda', 'Jarvis'],
        correct: '1',
        image: "assets/images/thor.gif",
    }, //5
    {
        question: "What is the name of Tony Stark's Artificial Intelligence?",
        choices: ['Jocasta', 'FRIDAY', 'Ultron', 'JARVIS'],
        correct: '3',
        image: "assets/images/jarvis.gif",
    }, //6
    {
        question: "What is Agent Coulson's first name?",
        choices: ['Phil', 'Robert', 'Nick', 'Max'],
        correct: '0',
        image: "assets/images/phil.gif",
    }, //7
    {
        question: "Who called Loki a 'Puny god' and proceeded to throw him around?",
        choices: ['Iron Man', 'Hawkeye', 'Thor', 'Hulk'],
        correct: '3',
        image: "assets/images/hulk.gif",
    }, //8
    {
        question: "What is the name of the blue glowing square Loki used as a weapon?",
        choices: ['Time Stone', 'The Ark of the Covenant', 'The Tesseract', 'The Obelisk'],
        correct: '2',
        image: "assets/images/tesseract.gif",
    }, //9
    {
        question: "Where did Black Widow find Bruce Banner?",
        choices: ['Sokovia', 'Africa', 'India', 'China'],
        correct: '2',
        image: "assets/images/india.gif",
    }, //10
    {
        question: "When the Avengers are in NY, Captain America issues what order to Hulk?",
        choices: ['Crash', 'Trash', 'Smash', 'Fast'],
        correct: '2',
        image: "assets/images/smash.gif",
    }];

function startGame() {
    correctAnswers = 0;
    incorrectAnswers = 0;
    notAnswered = 0;
    timeLeft = 30;
    currentQuestion = 0;
    clicked = false;
    displayQuestion();
    $('#startButton').hide();
    $('#correct').text("");
    $('#incorrect').text("");
    $('#notAnswered').text("");
    $('#gamedone').text("");
    document.getElementById('jumbotron').style.display = "block";
    document.getElementById("gameOver").style.display = "none";
}

function timer() {
    timeLeft--;
    if (timeLeft === 0) {
        unAnswered();
        $('#timer').text("You ran out of time");
        clearTimeout(interval);
        return;
    }
    $('#timer').text("Time remaining: " + timeLeft + " Seconds");
}

function displayQuestion() {
    if (currentQuestion === questions.length) {
        gameOver();
        return;
    }
    if (interval != null) {
        clearTimeout(interval);
    }
    var question = questions[currentQuestion];
    correct = question.correct;
    timeLeft = 30;
    interval = setInterval(timer, 1000);
    clicked = false;
    $('#timer').text("Time remaining: " + timeLeft + " Seconds");
    $('#questions').text(question.question);
    $('#choices').text("");
    var buttons = $('#choices');
    for (i = 0; i < question.choices.length; i++) {
        buttons.append('<button id="eachButton" onclick=\"checkAnswer(' + i + ');\">' + question.choices[i] + "</button><br>");
    }
    $('#correct').text("Correct: " + correctAnswers);
    $('#incorrect').text("Incorrect: " + incorrectAnswers);
    $('#notAnswered').text("Unaswered: " + notAnswered);
    currentQuestion++;
}

function showImage () {
    var photo = questions[currentQuestion-1].image;
    $("#questionImage").html("<img src=" + photo + ">");
}
function hideImage() {
    $('#questionImage').text("");
}

function checkAnswer(index) {
    clearTimeout(interval);
    if (correct == index) {
        $('#choices').html("Congrats, <b>" + questions[currentQuestion-1].choices[correct] + "</b> was correct!");

        //var photo = questions[currentQuestion-1].image;
        showImage();
        setTimeout(hideImage, 4500);
        //$("#questionImage").html("<img src=" + photo + ">");
        
        setTimeout(correctPath, 5000);
    } else {
        $('#incorrect').text("Incorrect: " + incorrectAnswers++);
        incorrectPath();
    }
}

function correctPath() {
    correctAnswers++;
    displayQuestion();
}

function incorrectPath() {
    $('#choices').text("");
    $('#choices').html("<div> That is wrong! </div>");
    $('#choices').append("<div> The correct answer is <b>" + questions[currentQuestion - 1].choices[correct] + "!</b></div>");
    setTimeout(displayQuestion, 5000);
}

function unAnswered() {
    notAnswered++;
    $('#choices').text("");
    $('#choices').append("<div> The correct answer is <b>" + questions[currentQuestion - 1].choices[correct] + "!</b></div>");
    setTimeout(displayQuestion, 4000);
}

function gameOver() {
    if (currentQuestion === questions.length) {
        console.log("Game OVer");
        $('#timer').text("");
        $('#questions').text("");
        $('#choices').text("");
        $('#gamedone').text("Game Over!");
        $('#correct').text("Correct: " + correctAnswers);
        $('#incorrect').text("Incorrect: " + incorrectAnswers);
        $('#notAnswered').text("Not Answered: " + notAnswered);
        document.getElementById("gameOver").style.display = "block";
    }

}

