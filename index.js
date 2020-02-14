const QUESTIONS = [
    {
        question: "Who is the best Wukong player in NA?",
        choices: [
            'I am Weasel',
            'King Wukong',
            'Harambe',
            'whats a wukong'
        ],
        correctAnswer: 0,
        explanation: 'I am Weasel achieved Masters rank last season playing only Wukong jungle. However, he got demoted to D1 before the season ended.'
    },
    {
        question: "Who is the number one Pantheon player in THE WORLD?",
        choices: [
            'Aeigiz',
            'KGB DADDY 2',
            'Keegun',
            'fox solo'
        ],
        correctAnswer: 2,
        explanation: 'Keegun has achieved Challenger rank on all of his accounts playing mostly Pantheon.'
    },
    {
        question: "When you win a game, what do you say in /all chat?",
        choices: [
            'gg',
            'good game',
            'ggez',
            'yawn ggez'
        ],
        correctAnswer: 3,
        explanation: '"yawn ggez" is what toxic high elo players say to one another.'
    },
    {
        question: "When your team is losing and the score is 0 to 8 at the 7 minute mark, what do you say to your team?",
        choices: [
            'Winnable',
            'Open mid',
            'You all suck',
            'gg, ff @15'
        ],
        correctAnswer: 1,
        explanation: "High elo players know that there are bad games so moving onto the next one wastes less time."
    },
    {
        question: "When the enemy team has a Morgana, Blitzcrank, or Thresh, what can you expect?",
        choices: [
            'An early game invade',
            'Easy laning phase',
            'A bunch of miss skill shots',
            'ggez'
        ],
        correctAnswer: 0,
        explanation: 'Players that play those champions like to do early invades to try to get a kill or two before laning phase.'
    }
]

let qNumber = 0;
let score = 0;

function generateQuestion() {
    $('.questions-page').html(
        `<div>
            <form class="questionForm" method="post">
                <fieldset>
                    <legend>${QUESTIONS[qNumber].question}</legend>
                    <label>
                        <input type="radio" name="options" value=0 required>
                        ${QUESTIONS[qNumber].choices[0]}
                    </label>
                    <label>
                        <input type="radio" name="options" value=1>
                        ${QUESTIONS[qNumber].choices[1]}
                    </label>
                    <label>
                        <input type="radio" name="options" value=2>
                        ${QUESTIONS[qNumber].choices[2]}
                    </label>
                    <label>
                        <input type="radio" name="options" value=3>
                        ${QUESTIONS[qNumber].choices[3]}
                    </label>
                </fieldset>
                <button type="submit" class="submit-answer">Submit Answer</button>
            </form>
        </div>`
    );
    formSubmit();
}

function formSubmit() {
    $('.questionForm').submit(function (event) {
        event.preventDefault();
        const userAnswer = parseInt($('input[name="options"]:checked').val());
        const rightAnswer = QUESTIONS[qNumber].correctAnswer;

        if (userAnswer === rightAnswer) {
            choseRightAnswer();
        } else {
            choseWrongAnswer();
        }
    });
}

function choseRightAnswer() {
    let explanation = QUESTIONS[qNumber].explanation;
    $('.questions-page').html(
        `<div>
            <strong>Correct!<strong>
            <img src="indeedsir.jpg" class="indeed" alt="Indeed">
            <p>${explanation}</p>
            <button class="next-button">Next Question</button>
        </div>`
    );
    score++;
    $('.scoreNumber').html(`${score}`);
    nextQuestion();
}

function choseWrongAnswer() {
    let explanation = QUESTIONS[qNumber].explanation;
    $('.questions-page').html(
        `<div>
            <strong>Wrong!<strong>
            <img src="wrong.jpg" class="wrong" alt="Wrong">
            <p>${explanation}</p>
            <button class="next-button">Next Question</button>
        </div>`
    );
    nextQuestion();
}

function nextQuestion() {
    $('.next-button').on('click', function () {
        qNumber++;
        if (qNumber <= 4) {
            $('.questionNumber').html(`${qNumber + 1}`);
            generateQuestion();
        } else {
            showResults();
        }
    });
}

function showResults() {
    $('.questions-page').html(`
        <p>You got ${score} correct out of 5!</p>
        <button class="restart-quiz">Restart Quiz</button>
    `);
    restartQuiz();
}

function restartQuiz() {
    $('.restart-quiz').on('click', function () {
        qNumber = 0;
        score = 0;
        $('.questionNumber').html(`${qNumber + 1}`);
        $('.scoreNumber').html(`${score}`);
        generateQuestion();
    });
}

function generateQuiz() {
    $('.start-button').on('click', function () {
        $('.questionNumber').html(`${qNumber + 1}`);
        $('.start-page').remove();
        $('.start-button').remove();
        $('.questions-page').css('display', 'block');
        generateQuestion();
    });
}

function startQuiz() {
    generateQuiz();
}

$(startQuiz);