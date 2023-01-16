var scores = document.querySelector("scores");
var timer = document.querySelector("timer");
var time = document.getElementById("time");

var wrapper = document.querySelector("wrapper");
var start_screen = document.getElementById("start-screen");
var start = document.getElementById("start");

var questions = document.getElementById("questions");
var question_title = document.getElementById("question-title");
var choices = document.getElementById("choices");

var end_screen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var submit = document.getElementById("submit");

var feedback = document.getElementById("feedback");

// QUESTIONS

var quizQuestions = [
    {
    "question-title" : "What is the capital of Finland?", 
    "one" : "1. London",
    "two" : "2. Madrid",
    "three" : "3. Oslo",
    "four" : "4. Helsinki",
    "correct" : "Helsinki",
    },{
    "question-title" : "What's a baby rabbit called?", 
    "one" : "1. Bunny",
    "two" : "2. Puppy",
    "three" : "3. Foal",
    "four" : "4. Pup",
    "correct" : "Bunny",
    }, {
    "question-title" : "Name one landlocked country in Europe", 
    "one" : "1. Spain",
    "two" : "2. Italy",
    "three" : "3. Norway",
    "four" : "4. Macedonia",
    "correct" : "Macedonia",
    }, {
    "question-title" : "Where in England would you find the themepark Dreamland?", 
    "one" : "1. Brighton",
    "two" : "2. Margate",
    "three" : "3. Edinburgh",
    "four" : "4. London",
    "correct" : "Margate",
    }, {
    "question-title" : "Which London Underground line has the most stations?", 
    "one" : "1. District Line",
    "two" : "2. North Line",
    "three" : "3. Central Line",
    "four" : "4. Elizabeth Line",
    "correct" : "District Line",
    }
  ]

// Initialize variables
var startScore = 0; 
var questionIndex = 0;

// First page
function codeQuiz() {
  scores.style.display = "block"; // Shows score
  timer.style.display = "block"; // Shows timer
  wrapper.style.display = "block"; // Shows rules
  questions.style.display = "hide"; // Hide Questions
  end_screen.style.display = "hide"; // Hide Final Score pages
}

// Quiz starts 
function startQuiz() { 
  wrapper.style.display = "none"; // Hide Rules 
  questions.style.display = "block"; // Show Quiz Questions Page
  
  secondsLeft = 90; // seconds in Timer 
  
  var timerInterval = setInterval(function() { 
    secondsLeft--;
    time = secondsLeft;
    if (secondsLeft === 0 || quizQuestions.length === questionIndex) {
      clearInterval(timerInterval);
      showFinalScore();
    }
  }, 100);
}

// START BUTTON - DOES NOT WORK
start.addEventListener("click", function() { 
  startQuiz()
  console.log("start")
})

// Reset global variables when quiz restarts
function resetVariables() {
  startScore = 0; 
  questionIndex = 0;
}


  // Questions
function showQuestions() {
  var quest = quizQuestions[questionIndex];

  question_title.innerHTML = quest.question_title;
  choice1.innerHTML = quest.one;
  choice1.setAttribute("data-answer", quest.one);
  choice2.innerHTML = quest.two;
  choice2.setAttribute("data-answer", quest.two);
  choice3.innerHTML = quest.three;
  choice3.setAttribute("data-answer", quest.three);
  choice4.innerHTML = quest.four;
  choice4.setAttribute("data-answer", quest.four);
  choice5.innerHTML = quest.five;
  choice5.setAttribute("data-answer", quest.five);
}

// User clicks answer
showQuestions();
choice1.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice2.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice3.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice4.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice5.addEventListener("click", function (event) {
  checkAnswer(event);
})