document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const resultScreen = document.getElementById("result-screen");
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionText = document.getElementById("question");
    const options = document.querySelectorAll(".option");
    const scoreText = document.getElementById("score");
    const timerText = document.getElementById("timer");

    let currentQuestion = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;

    const questions = [
        { question: "What is 5 + 3 * 2?", answers: ["16", "11", "10", "13"], correct: 1 },
        { question: "If a rooster lays an egg on top of a roof, which way does it roll?", answers: ["Left", "Right", "Doesn't roll", "Roosters don't lay eggs"], correct: 3 },
        { question: "Which word is spelled incorrectly in every dictionary?", answers: ["Incorrectly", "Wrong", "Misspelled", "Dictionary"], correct: 0 },
        { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answers: ["The letter M", "Time", "Breath", "Daylight"], correct: 0 },
        { question: "If you have three apples and take away two, how many do you have?", answers: ["1", "2", "3", "None"], correct: 1 }
    ];

    function startTimer() {
        timeLeft = 30;
        timerText.textContent = `Time left: ${timeLeft}s`;
        timer = setInterval(() => {
            timeLeft--;
            timerText.textContent = `Time left: ${timeLeft}s`;

            if (timeLeft === 0) {
                clearInterval(timer);
                nextQuestion(false); // Skip the question if time runs out
            }
        }, 1000);
    }

    function showQuestion() {
        if (currentQuestion < questions.length) {
            questionText.textContent = questions[currentQuestion].question;
            options.forEach((button, index) => {
                button.textContent = questions[currentQuestion].answers[index];
                button.onclick = () => nextQuestion(index === questions[currentQuestion].correct);
            });
            startTimer();
        } else {
            quizScreen.classList.remove("active");
            resultScreen.classList.add("active");
            let percentage = ((score / questions.length) * 100).toFixed(2);
            scoreText.textContent = `Your score: ${score}/${questions.length} (${percentage}%)`;
        }
    }

    function nextQuestion(isCorrect) {
        clearInterval(timer); // Stop timer

        if (isCorrect) {
            score++;
        }
        
        currentQuestion++;
        showQuestion();
    }

    startBtn.addEventListener("click", () => {
        startScreen.classList.remove("active");
        quizScreen.classList.add("active");
        showQuestion();
    });

    restartBtn.addEventListener("click", () => {
        resultScreen.classList.remove("active");
        startScreen.classList.add("active");
        currentQuestion = 0;
        score = 0;
    });
});
