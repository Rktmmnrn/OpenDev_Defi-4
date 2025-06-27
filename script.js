const questions = [
  {
    question: "Quelle est la capitale de Madagascar ?",
    answers: ["Toamasina", "Antananarivo", "Antsirabe", "Fianarantsoa"],
    correct: "Antananarivo"
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

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(answer);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(answer) {
  const correct = questions[currentQuestion].correct;
  if (answer === correct) score++;
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextBtn.style.display = "none";
  } else {
    endQuiz();
  }
});

function endQuiz() {
  document.getElementById("question-container").classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreEl.textContent = score;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreContainer.classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  nextBtn.style.display = "none";
  showQuestion();
}

// Démarrage
showQuestion();
nextBtn.style.display = "none";
