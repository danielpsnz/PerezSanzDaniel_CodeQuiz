var scores = document.querySelector("scores");
var timer = document.querySelector("timer");
var time = document.getElementById("time");

var wrapper = document.querySelector("wrapper");
var start_screen = document.getElementById("start-screen");
var start = document.getElementById("start");

var questions = document.getElementById("questions");
var question_title = document.getElementById("question-title");
var choice1 = document.getElementById("one");
var choice2 = document.getElementById("two");
var choice3 = document.getElementById("three");
var choice4 = document.getElementById("four");
var choice5 = document.getElementById("five");
var questionButton = document.querySelector(".questionButton");

var end_screen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var submit = document.getElementById("submit");
var initials = document.getElementById("initials"); 

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
  questions.style.display = "none"; // Hide Questions
  end_screen.style.display = "none"; // Hide Final Score pages
}

// Reset global variables when quiz restarts
function resetVariables() {
  startScore = 0; 
  questionIndex = 0;
}

// Quiz starts 
function startQuiz() { 
  start_screen.style.display = "none"; // Hide Rules 
  questions.style.display = "block"; // Show Quiz Questions Page
  
  secondsLeft = 90; // seconds in Timer 
  
  var timerInterval = setInterval(function() { 
    secondsLeft--;
    time.textContent = secondsLeft;
    if (secondsLeft === 0 || quizQuestions.length === questionIndex) {
      clearInterval(timerInterval);
      showFinalScore();
    }
  }, 1000);
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

 // Check if the answer is correct
 function checkAnswer(event) {
  event.preventDefault();

  var answer = event.currentTarget.dataset.answer;
  var correctAnswer = null;

  if (quizQuestions[questionIndex].correct === answer) {
      correctAnswer = answer;
  }
  if (answer === correctAnswer) {
  answerResponse.textContent = "Correct!"; // If correct, say correct
  } else {
  answerResponse.textContent = "Wrong!"; // If wrong, say wrong & deduct 10 points
      secondsLeft -= 10
      if (secondsLeft < 0) {
          secondsLeft = 0;
      }
  }
  if (quizQuestions.length === questionIndex+1) {
    showFinalScore(); // If it has gone through all questions, show final score
    return; // If not, print the next question
  }
  questionIndex++;
  showQuestions();
}

// GO TO "ALL DONE" PAGE AND SHOW FINAL SCORE
function showFinalScore() { //Function to go to page when time out or quiz complete 
  questions.style.display = "none"; // Hide Questions
  end_screen.style.display = "block"; // Shows Final Score pages
  finalScore.textContent = secondsLeft; // Shows Final score
} // end of showFinalScore

var highScoreArray = [] // Global variable 

// SHOWS ALL HIGH SCORES 
function showHighScores() {
  scores.style.display = "block"; // Display scores
  timer.style.display = "none"; // Hide timer
  wrapper.style.display = "none" // Hide first page
  questions.style.display = "none" // Hide questions
  end_screen.style.display = "block" // Hide end_screen
  
  var getInitials = document.getElementById("initials").value; // captures the value of the initials 

  var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];
  
  var localStorageArray = { score: secondsLeft, initials: getInitials };
  highScoreArray.push(localStorageArray)
  localStorage.setItem("highScore", JSON.stringify(highScoreArray)); // Adds array 

  var highScores = getInitials + ": " + secondsLeft; // add in + getInitials when read it

  $("#highScoreList").append(highScores) // Appends high score & initials
}

// START BUTTON
start.addEventListener("click", function() { 
  startQuiz();
  console.log("start")
})

// CLICK TO VIEW HIGH SCORES - DOES NOT WORK 
scores.addEventListener("click", function() {
  showHighScores();
  console.log("view high scores")
})

// CLICK INTIAL BUTTON TO SHOW HIGH SCORES - WORKS
submit.addEventListener("click", function() { 
  showHighScores();
  console.log("Submit")
}) 

// CLEAR HIGH SCORES - WORKS
clearHighScore.addEventListener("click", function() {
  localStorage.clear();
})

// GO BACK BUTTON EVENT liSTENER - WORKS 
goBack.addEventListener("click", function() { // Go back to the home page
  $("#highScoreList").empty() // clears out container
  $("#initialInput").val("") // clears out the value in initial input 
  resetVariables()
  codeQuizChallenge();
  console.log("restart quiz")
})

// Page starts at home page 
codeQuizChallenge(); 