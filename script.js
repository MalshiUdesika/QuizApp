const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d"
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Computer Style Sheets",
        d: "Creative Style System",
        correct: "b"
    },
    {
        question: "What does HTML stand for?",
        a: "Hyper Trainer Markup Language",
        b: "Hyper Text Marketing Language",
        c: "Hyper Text Markup Language",
        d: "Hyper Tool Multi Language",
        correct: "c"
    },
    {
        question: "In what year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "1997",
        correct: "b"
    }
];

const quiz = document.querySelector(".quiz-container");
const answerEls = document.querySelector(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const progress = document.getElementById("progress");
const timerEl = document.getElementById("time");

let currentQuiz = 0;
let score = 0;
let timeleft = 15;
let timer;
let answerReview = [];

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    progress.style.width = ((currentQuiz / quizDate.length) * 100) + "%";

    resetTimer();
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerEl.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    const answer = getSelected();
    const correctAnswer = quizData[currentQuiz].correct;

    if(answer) {
        if(answer === correctAnswer) {
            score++;
        }
        answerReview.push({question: quizData[currentQuiz].question, choosen: answer, correct: correctAnswer});
    }else{
        answerReview.push({question: quizData[currentQuiz].question, choosen: "none", correct: correctAnswer});
    }

    currentQuiz++;
    if(currentQuiz < quizData.length) {
        loadQuiz();
    }else{
        showResult();
    }
}

submitBtn.addEventListener("click", () => {
    clearInterval(timer);
    nextQuestion();
});

function showResult() {
    quiz.innerHTML = `
    <div class="result">
    <h2>you Scored ${score}/${quizData.length}</h2>
    <button onclick="location.reload()">Restart Quiz</button>
    <div class="review">
    <h3>Review:</h3>
    <ul>
    ${answerReview.map(item => `
        <li>
        <strong>${item.question}</strong><br>
        Your Answer: <span class="${item.choosen === item.correct ? 'correct' : 'wrong'}"> ${item.choosen.toUpperCase()}</span><br>
        Correct Answer: <span class="correct">${item.correct.toUpperCase()}</span>
        </li>
        `).join("")}
        </ul>
        </div>
        </div>
        `;
    }
