/* This first block is declaring the quizData constant which is the questions and anwsers of the quiz. 
The answers are in the form of an array and the correctAnswerIndex is the correct answer based on its number in the array */
const quizData = [
    {
      question: "Commonly used data types DO NOT include:",
      answers: ["strings", "boolean", "alerts", "numbers"],
      correctAnswerIndex: 2
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      answers: ["var", "let", "const", "all of the above"],
      correctAnswerIndex: 3
    },
    {
      question: "Which operator is used for strict equality comparison?",
      answers: ["==", "===", "!=", "!=="],
      correctAnswerIndex: 1
    },
    {
      question: "The condition in an if / else statement is enclosed within _____.",
      answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
      correctAnswerIndex: 2
    },
    {
      question: "What is the output of the following code?\nconsole.log(2 + 3 + '4');",
      answers: ["234", "9", "7", "undefined"],
      correctAnswerIndex: 0
    }
  ];
  
// In this second block there are constants set for various elements of the quiz inside index.html file.
  const quizScreen = document.getElementById("quiz-screen");
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const timeLeftText = document.getElementById("time-left");
  const gameOverScreen = document.getElementById("game-over-screen");
  const initialsInput = document.getElementById("initials");
  const scoreText = document.getElementById("score");
  const submitButton = document.getElementById("submit-score");
  
/* This block sets up variables for the current question index, the time left in the quiz, the timer interval, and the score. 
These variables will be updated as the quiz progresses. */
  let currentQuestionIndex;
  let timeLeft;
  let timerInterval;
  let score;
  
/* Here the start quiz and submit score buttons are given event listeners to react to user clicks. 
When the start button is clicked, it will call the startQuiz() function. 
When the submit button is clicked, it will call the saveScore() function. */
  document.getElementById("start-button").addEventListener("click", startQuiz);
  submitButton.addEventListener("click", saveScore);


/* This block elaborates on the startQuiz() function. The initial values of the about "lets" will be set here.
It will then hide the start screen and proceed to the quiz screen. A timer will start and it will update timeLeft every second.
After all this the showQuestion() function will be called next. */
  function startQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    score = 0;
  
    document.getElementById("start-screen").classList.add("hidden");
    quizScreen.classList.remove("hidden");
  
    timerInterval = setInterval(updateTimer, 1000);
  
    showQuestion();
  }

/* In the showQuestion() function, it will get the current question data from the quizData based on 
currentQuestionIndex. It will then set the text of the question text element to the current question
and will also remove any existing answer buttons from the element answer button. After this, it will loop
through each answer in the current question and create a new button for each answer. 
The checkAnswer() function will be called, adding an event listener to the new buttons. */
  function showQuestion() {
    const questionData = quizData[currentQuestionIndex];
  
    questionText.textContent = questionData.question;
  
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  
    questionData.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.addEventListener("click", () => checkAnswer(index));
      answerButtons.appendChild(button);
    });
  }
  
/* When the user selects an answer button, the checkAnswer() function is called. 
It will retrieve the first question and if answered correctly it will add 10 points to the score variable.
Otherwise it will subtract 10 from the timeLeft variable. 
It will then look to see if it needs to proceed to the next question 
or end the quiz based on the time left or if there are no questions.
*/
  function checkAnswer(answerIndex) {
    const questionData = quizData[currentQuestionIndex];
  
    if (answerIndex === questionData.correctAnswerIndex) {
      score += 10;
    } else {
      timeLeft = Math.max(0, timeLeft - 10);
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length && timeLeft > 0) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
/* This is the end of quiz function. It is called when the quiz is over. 
When this happens it clears the timer, hides the quiz screen, shwos the game over screen, 
and then sets the text content of the score text to the final score. */
  function endQuiz() {
    clearInterval(timerInterval);
  
    quizScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
  
    scoreText.textContent = score;
  }

/* The updateTimer() function is called every second by the timer interval set up earlier in startQuiz().
It decrements the timeLeft variable, updates the text content of the time left, 
and calls endQuiz() if the time left is zero */
  function updateTimer() {
    timeLeft--;
    timeLeftText.textContent = timeLeft;
  
    if (timeLeft <= 0) {
      endQuiz();
    }
  }

/* The final function is called when the user submits their score. The prevent default is set in place.
The user types their initials in the input field and trims any white space from it. 
If not blank, it retrieves any existing high score from local storage otherwise it will start an empty array.
Then the new high score with the user's initials will be pushed and saves the updated array.
After all this is completed, the user will be redirected to the high scores page html file */
  function saveScore(event) {
    event.preventDefault();
  
    const initials = initialsInput.value.trim();
  
    if (initials !== "") {
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials, score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
      window.location.href = "highscores.html";
    }
  }
  
