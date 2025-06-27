const questions = [
  {
    question: "Quelle est la capitale de Madagascar ?",
    answers: ["Toamasina", "Antananarivo", "Antsirabe", "Fianarantsoa"],
    correct: "Antananarivo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Antananarivo_Rova.jpg/640px-Antananarivo_Rova.jpg"
  },
  {
    question: "Quelle langue est principalement parlée à Madagascar ?",
    answers: ["Swahili", "Français", "Anglais", "Malagasy"],
    correct: "Malagasy"
  },
  {
    question: "Combien de provinces avait Madagascar avant leur division en régions ?",
    answers: ["4", "5", "6", "7"],
    correct: "6"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let corrections = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const correctionEl = document.getElementById("correction");
const imageEl = document.getElementById("image");

const audioCorrect = document.getElementById("audio-correct");
const audioWrong = document.getElementById("audio-wrong");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  progressEl.textContent = `Question ${currentQuestion + 1} / ${questions.length}`;
  timeLeft = 15;
  updateTimerDisplay();

  // Affiche image si dispo
  if (q.image) {
    imageEl.src = q.image;
    imageEl.classList.remove("hidden");
  } else {
    imageEl.classList.add("hidden");
  }

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(answer);
    answersEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
  startTimer();
}

function selectAnswer(answer) {
  stopTimer();
  const correct = questions[currentQuestion].correct;

  if (answer === correct) {
    score++;
    audioCorrect.play();
  } else {
    audioWrong.play();
  }

  corrections.push({
    question: questions[currentQuestion].question,
    userAnswer: answer,
    correctAnswer: correct
  });

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  stopTimer();
  document.getElementById("question-container").classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreEl.textContent = score;

  correctionEl.innerHTML = "<h3>Correction :</h3>";
  corrections.forEach(c => {
    const div = document.createElement("div");
    div.classList.add(c.userAnswer === c.correctAnswer ? "" : "wrong");
    div.innerHTML = `
      <strong>${c.question}</strong><br>
      Ta réponse : ${c.userAnswer}<br>
      Bonne réponse : ${c.correctAnswer}
    `;
    correctionEl.appendChild(div);
  });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  corrections = [];
  scoreContainer.classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  showQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      stopTimer();
      corrections.push({
        question: questions[currentQuestion].question,
        userAnswer: "⏰ Temps écoulé",
        correctAnswer: questions[currentQuestion].correct
      });
      nextBtn.style.display = "inline-block";
      audioWrong.play();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function updateTimerDisplay() {
  timerEl.textContent = `Temps : ${timeLeft}s`;
}

// Lancement
showQuestion();
