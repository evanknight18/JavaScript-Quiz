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

/* */
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
  
  function endQuiz() {
    clearInterval(timerInterval);
  
    quizScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
  
    scoreText.textContent = score;
  }
  
  function updateTimer() {
    timeLeft--;
    timeLeftText.textContent = timeLeft;
  
    if (timeLeft <= 0) {
      endQuiz();
    }
  }
  
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
  
