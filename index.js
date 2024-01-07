const difficultyEl = document.getElementById("difficulty");
const genreEl = document.getElementById("genre");
const questionEl = document.getElementById("question");
const scoreEl = document.getElementById("score");
const correctAnswerEl = document.getElementById("correctAnswer");
const gameOverDisplayEl = document.getElementById("gameOverDisplay");
const finalScoreEl = document.getElementById("finalScore");


const nextQuestionBtnEl = document.getElementById("nextQuestionBtn");
const getQuestionSetEl = document.getElementById("getQuestionSet");
const startGameBtnEl = document.getElementById("startGameBtn");

const buttonEl1 = document.getElementById("btn1");
const buttonEl2 = document.getElementById("btn2");
const buttonEl3 = document.getElementById("btn3");
const buttonEl4 = document.getElementById("btn4");

const buttons = document.querySelectorAll(".answerDiv button");

let questionSetArray = [];
let answersArray = [];
let correctAnswer;
let index = 0;
let score = 0;
const maxQuestion = 9
let questionCount = 0;

const apiURL = `https://opentdb.com/api.php?amount=10&category=9&type=multiple`;

async function getQuestion() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    for (let i = 0; i <= data.results.length; i++) {
      questionSetArray.push(data.results);
    }
    console.log(questionCount);
  } catch (error) {
    console.log("something failed please try again");
  }
}

function getNewQuestion() {
  correctAnswerEl.innerText = "";
  index++;
  difficultyEl.innerText = questionSetArray[0][index].difficulty;
  genreEl.innerText = questionSetArray[0][index].category;
  questionEl.innerText = questionSetArray[0][index].question;
  correctAnswer = questionSetArray[0][index].correct_answer;
  scoreEl.innerText = score;

  answersArray = questionSetArray[0][index].incorrect_answers;
  answersArray.push(questionSetArray[0][index].correct_answer);
  ///shuffle Array
  answersArray.sort(() => Math.random() - 0.5);
  // console.log(answersArray);

  buttonEl1.innerText = answersArray[0];
  buttonEl2.innerText = answersArray[1];
  buttonEl3.innerText = answersArray[2];
  buttonEl4.innerText = answersArray[3];
}

startGameBtnEl.addEventListener('click', () => {
  location.reload()
})

getQuestionSetEl.addEventListener("click", () => {
  questionSetArray = [];
  buttons.forEach((button) => {
    button.classList.remove("correct");
    button.classList.remove("wrong");
  });

  getQuestion();
});

nextQuestionBtnEl.addEventListener("click", (e) => {
  e.preventDefault();
  getNewQuestion();
  buttons.forEach((button) => {
    button.classList.remove("correct");
    button.classList.remove("wrong");
  });
  questionCount++;
  if(questionCount == maxQuestion){
    gameOverDisplayEl.classList.add("visible");
    finalScoreEl.innerText = score
  }
});

buttonEl1.addEventListener("click", () => {
  if (buttonEl1.innerText === correctAnswer) {
    buttonEl1.classList.add("correct");
    score++;
  } else {
    buttonEl1.classList.add("wrong");
  }
  correctAnswerEl.innerText = correctAnswer;
});

buttonEl2.addEventListener("click", () => {
  if (buttonEl2.innerText === correctAnswer) {
    buttonEl2.classList.add("correct");
    score++;
  } else {
    buttonEl2.classList.add("wrong");
  }
  correctAnswerEl.innerText = correctAnswer;
});

buttonEl3.addEventListener("click", () => {
  if (buttonEl3.innerText === correctAnswer) {
    buttonEl3.classList.add("correct");
    score++;
  } else {
    buttonEl3.classList.add("wrong");
  }
  correctAnswerEl.innerText = correctAnswer;
});

buttonEl4.addEventListener("click", () => {
  if (buttonEl4.innerText === correctAnswer) {
    buttonEl4.classList.add("correct");
    score++;
  } else {
    buttonEl4.classList.add("wrong");
  }
  correctAnswerEl.innerText = correctAnswer;
});
