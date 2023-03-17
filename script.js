const quizData = [
    {
      question: "What is the file extension for a JavaScript file?",
      answers: ["js", "html", "css", "txt"],
      correctAnswerIndex: 0
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
      question: "Which method can be used to add a new element to an array?",
      answers: [".push()", ".pop()", ".shift()", ".unshift()"],
      correctAnswerIndex: 0
    },
    {
      question: "What is the output of the following code?\nconsole.log(2 + 3 + '4');",
      answers: ["234", "9", "7", "undefined"],
      correctAnswerIndex: 0
    }
  ];
  
  const quizScreen = document.getElementById("quiz-screen");
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const timeLeftText = document.getElementById("time-left");
  const gameOverScreen = document.getElementById("game-over-screen");
  const initialsInput = document.getElementById("initials");
  const scoreText = document.getElementById("score");
  const submitButton = document.getElementById("submit-score");
  
  let currentQuestionIndex;
  let timeLeft;
  let timerInterval;
  let score;
  
  document.getElementById("start-button").addEventListener("click", startQuiz);
  submitButton.addEventListener("click", saveScore);
  
  function startQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    score = 0;
  
    document.getElementById("start-screen").classList.add("hidden");
    quizScreen.classList.remove("hidden");
  
    timerInterval = setInterval(updateTimer, 1000);
  
    showQuestion();
  }
  
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
  