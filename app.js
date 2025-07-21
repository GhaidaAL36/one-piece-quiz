const question = document.getElementById("question");
const quizSection = document.querySelector(".quiz-container");
const answersBtns = document.getElementById("answers-btns");
const answerBtn = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("next-btn");

const questions = [
  {
    question: "كم كان مبلغ المكافأة على لوفي بعد سقوط إينيس لوبي؟",
    answer: [
      { text: "\u202B200 الف بيلي", correct: false },
      { text: "\u202B250 مليون بيلي", correct: false },
      { text: "\u202B350 مليون بيلي", correct: false },
      { text: "\u202B300 مليون بيلي", correct: true },
    ],
  },
  {
    question: "مين صاحب فاكهة هورما هورما نو مي؟",
    answer: [
      { text: "زورو", correct: false },
      { text: "كينق", correct: false },
      { text: "ايفانكوف", correct: true },
      { text: "روبين", correct: false },
    ],
  },
  {
    question: "مين اقوى سياف في ونبيس ؟",
    answer: [
      { text: "شانكس", correct: false },
      { text: "زورو", correct: false },
      { text: "ميهوك", correct: true },
      { text: "روكس", correct: false },
    ],
  },
  {
    question: "مين اكبر فان سيرفس ؟",
    answer: [
      { text: "زورو", correct: false },
      { text: "اللحية", correct: false },
      { text: "شانكس", correct: true },
      { text: "نامي", correct: false },
    ],
  },
  {
    question: "شخصية لازم تموت ؟",
    answer: [
      { text: "زورو", correct: false },
      { text: "السمكة", correct: true },
      { text: "شانكس", correct: false },
      { text: "تيتش", correct: false },
    ],
  },
  {
    question: "وش أسم عم زورو ؟",
    answer: [
      { text: "سانجي", correct: false },
      { text: "انا", correct: false },
      { text: "كوشيرو ", correct: true },
      { text: "ريوما ", correct: false },
    ],
  },
  {
    question: "وش أكبر انجاز لدراقون ؟",
    answer: [
      { text: "مافيه", correct: false },
      { text: "العالم ينتظر اجابتنا", correct: true },
      { text: "كسر بوابة العدالة ", correct: false },
      { text: "جاب لوفي ", correct: false },
    ],
  },
  {
    question: "ليش سانجي ما يستخدم الهاكي كثير؟",
    answer: [
      { text: "يعطي مجال لزورو", correct: true },
      { text: "مشغول يطبخ", correct: false },
      { text: "يلاحق نامي", correct: false },
      { text: "لأنه ضد العنف", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerText = "التالي";
  showQuestions();
}

function showQuestions() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerText = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    answersBtns.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedAnswer = e.target;
  const isCorrect = selectedAnswer.dataset.correct === "true";

  if (isCorrect) {
    selectedAnswer.classList.add("correct");
    score++;
  } else {
    selectedAnswer.classList.add("incorrect");
  }

  Array.from(answersBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

function handleNextBtn() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  question.innerText = `جبت ${score} من ${questions.length} `;
  nextBtn.innerText = "ألعب مرة ثانية";
  nextBtn.style.display = "block";

  const p = document.createElement("p");

  if (score < 6) {
    p.innerText = `عيد ون بيس`;
  } else {
    p.innerText = "ون بيسي حقيقي";
  }

  p.classList.add("score-message");
   answersBtns.appendChild(p);
}

function resetState() {
  nextBtn.style.display = "none";
  while (answersBtns.firstChild) {
    answersBtns.removeChild(answersBtns.firstChild);
  }
}

startQuiz();
