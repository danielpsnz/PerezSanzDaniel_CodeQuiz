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
var answerResponse = document.getElementById("answerResponse");
var questionButton = document.querySelector(".questionButton");

var end_screen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var submit = document.getElementById("submit");
var initials = document.getElementById("initials"); 

var feedback = document.getElementById("feedback");
var clear = document.getElementById("clear");
var highScoreButtons = document.getElementById("highScoreButtons");
var highscores = document.getElementById("highscores");

// QUESTIONS

var quizQuestions = [
    {
    question_title : "What is the capital of Finland?", 
    one : "London",
    two : "Madrid",
    three : "Oslo",
    four : "Helsinki",
    correct : "Helsinki",
    },{
    question_title : "What's a baby rabbit called?", 
    one : "Bunny",
    two : "Puppy",
    three : "Foal",
    four : "Pup",
    correct : "Bunny",
    }, {
    question_title : "Name one landlocked country in Europe", 
    one : "Spain",
    two : "Italy",
    three : "Norway",
    four : "Macedonia",
    correct : "Macedonia",
    }, {
    question_title : "Where in England would you find the themepark Dreamland?", 
    one : "Brighton",
    two : "Margate",
    three : "Edinburgh",
    four : "London",
    correct : "Margate",
    }, {
    question_title : "Which London Underground line has the most stations?", 
    one : "District Line",
    two : "North Line",
    three : "Central Line",
    four : "Elizabeth Line",
    correct : "District Line",
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
    time.innerText = secondsLeft;
    secondsLeft--;
    
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

var highScoreArray = [] // Initialize variable 

function showHighScores() {
  
  var getInitials = document.getElementById("initials").value; // captures the value of the initials 

  var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];
  
  var localStorageArray = { score: secondsLeft, initials: getInitials };
  highScoreArray.push(localStorageArray)
  localStorage.setItem("highScore", JSON.stringify(highScoreArray)); // Adds array 

  var highScores = getInitials + ": " + secondsLeft; // add in + getInitials when read it

  document.getElementById("highscores").append(highScores) // Appends high score & initials
}

// START BUTTON
start.addEventListener("click", () => {
  startQuiz();
  console.log("start");
});

// CLICK INTIAL BUTTON TO SHOW HIGH SCORES - DOES NOT WORK
submit.addEventListener("click", function() { 
  showHighScores()
  console.log("initial button")
}) 

// CLEAR HIGH SCORES - WORKS
clear.addEventListener("click", () => {
  localStorage.clear()
});

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