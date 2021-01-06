const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
]

//INICIA O QUIZZ//
function init() {
  createQuestion(0);
}

//CRIA UMA NOVA PERGUNTA//
function createQuestion(i) {
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

//ALTERA O TEXTO DA PERGUNTA//
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question; ////////////////////
  questionNumber.textContent = i + 1;

//ALTERA O TEXTO DAS OPÇÕES//
  questions[i].answers.forEach(function(answer, i) {
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true); ////////////////////
    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");
    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];
    answerTemplate.setAttribute("correct-answer", answer["correct"]);

//REMOVE A CLASSE HIDE DO HTML//
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

//EXIBE VALOR DA ALTERNATIVA//
    answersBox.appendChild(answerTemplate);

//EVENTO ONCLICK//
    answerTemplate.addEventListener("click", function() {
      checkAnswer(this);
    });

  });

//ALTERA VALOR DA QUESTÃO//
  actualQuestion++;
}

//VERIFICA RESPOSTA DO USUÁRIO//
function checkAnswer(btn) {

  //SELECIONA TODOS OS BOTÕES//
  const buttons = answersBox.querySelectorAll("button");

//VERIFICA SE ALTERNATIVA ESTÁ CORRETA//
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") { ////////////////////

      button.classList.add("correct-answer");

      if(btn === button) {
        points++;
      }

    } else {

      button.classList.add("wrong-answer");

    }

  });

//PULA PARA PRÓXIMA PERGUNTA//
  nextQuestion();
}

//EXIBE A PRÓXIMA PERGUNTA//
function nextQuestion() {

//TIMER PARA EXIBIR RESPOTAS//
  setTimeout(function() {

    if(actualQuestion >= questions.length) {
      showSucccessMessage();
      return;
    }

    createQuestion(actualQuestion);

  }, 700);

}

//EXIBE TELA E REULTADO FINAL//
function showSucccessMessage() {

  hideOrShowQuizz();

//CLACULA-SE O SCORE FINAL//
  const score = ((points / questions.length) * 100).toFixed(2);
  const displayScore = document.querySelector("#display-score span");
  displayScore.textContent = score.toString();

//ALTERA O TOTAL DE PERGUNTAS CORRETAS//
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

//ALTERA O TOTAL DE PERGUNTAS//
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

//EXIBE OU ESCONDE O SCORE//
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

//REINICIA QUIZZ//
const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function() {

//O JOGO É ZERADO//
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();

});

//INICIA-SE UM NOVO QUIZZ//
init();