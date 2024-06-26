const question = [
    {
        question: "Is dark magician a good card?",
        answers: [
            { text: "Yes", correct: false },
            { text: "No", correct: true },
            { text: "Maybe", correct: false },
            { text: "I don't know", correct: false },
        ]
        
    },
    {
        question: "Is Ash Blossom a cursed card?",
        answers: [
            { text: "Yes", correct: true },
            { text: "No", correct: false },
            { text: "Maybe", correct: false },
            { text: "I don't know", correct: false },
        ]
    },
    {
        question: "What is the best card in the game?",
        answers: [
            { text: "Pot of Greed", correct: true },
            { text: "Pot of Desires", correct: false },
            { text: "Pot of Duality", correct: false },
            { text: "Pot of Extravagance", correct: false },
        ]
    },
    {
        question: "Is Dark Armed Dragon a fun card to play?",
        answers: [
            { text: "Yes", correct: false },
            { text: "No", correct: true },
            { text: "Maybe", correct: false },
            { text: "I don't know", correct: false },
        ]
    },
    {
        question: "Is the game fun?",
        answers: [
            { text: "Yes", correct: true },
            { text: "No", correct: false },
            { text: "Maybe", correct: false },
            { text: "I don't know", correct: false },
        ]
    },
    {
        question: "When you activate the effect of Graceful Charity, what happens?",
        answers: [
            { text: "You draw 3 cards and you must send 2 cards from your hand to the graveyard", correct: true },
            { text: "You draw 2 cards and you must send 1 card from your hand to the graveyard", correct: false },
            { text: "You draw 3 cards and you must send 1 card from your hand to the graveyard", correct: false },
            { text: "You draw 2 cards and you must send 2 cards from your hand to the graveyard", correct: false },
        ]
    },
    {
        question: "What is the maximum number of cards you can have in your hand?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false },
            { text: "8", correct: false },
        ]
    },
    {
        question: "Which dragon card is the best?",
        answers: [
            { text: "Borrelload Dragon", correct: false },
            { text: "Blue-Eyes White dragon", correct: false },
            { text: "Borrelload Savage Dragon", correct: true },
            { text: "Red Dragon Archfiend", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersButtons.appendChild(button); // Use answersButtons instead of answerButton
        button.addEventListener("click", selectAnswer);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    });
}

const nextButton = document.getElementById("next-btn");
const answersButtons = document.getElementById('answer-buttons');

function resetState() {
    nextButton.style.display = "none";
    while (answersButtons.firstChild) {
        answersButtons.removeChild(answersButtons.firstChild); // Use answersButtons instead of answerButton
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${question.length}`
}
function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        questionElement.innerHTML = "Your score is " + score;
        nextButton.innerHTML = "Restart";
        nextButton.addEventListener("click", startQuiz);
    }
}
function selectAnswer(e) {
    const selectedbtm = e.target;
    const isCorrect = selectedbtm.dataset.correct;
    if (isCorrect) {
        selectedbtm.classList.add("correct");
        score++;
    } else {
        selectedbtm.classList.add("wrong");
    }
    Array.from(answersButtons.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    handleNextQuestion();
});
startQuiz();