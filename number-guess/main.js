let secretNumber, maxNumber, attempts, startTime, timerInterval;
const difficulties = {
    easy: 50,
    medium: 100,
    hard: 200
};

function startNewGame() {
    const difficulty = document.getElementById('difficulty').value;
    maxNumber = difficulties[difficulty];
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    startTime = Date.now();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    document.getElementById('rangeInfo').textContent = `I'm thinking of a number between 1 and ${maxNumber}.`;
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'feedback';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').max = maxNumber;
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `Time: ${elapsedTime}s`;
}

function checkGuess() {
    let guess = parseInt(document.getElementById('guessInput').value);
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > maxNumber) {
        setMessage(`Please enter a valid number between 1 and ${maxNumber}.`, 'incorrect');
        return;
    }

    if (guess === secretNumber) {
        clearInterval(timerInterval);
        const time = Math.floor((Date.now() - startTime) / 1000);
        setMessage(`Congratulations! You guessed the number in ${attempts} attempts and ${time} seconds.`, 'correct');
        updateHighScores(time);
    } else if (guess < secretNumber) {
        setMessage('Too low! Try a higher number.', 'incorrect');
    } else {
        setMessage('Too high! Try a lower number.', 'incorrect');
    }
}

function setMessage(msg, className) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.className = `feedback ${className}`;
}

function updateHighScores(time) {
    const difficulty = document.getElementById('difficulty').value;
    let highScores = JSON.parse(localStorage.getItem('highScores')) || {};
    if (!highScores[difficulty] || time < highScores[difficulty]) {
        highScores[difficulty] = time;
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }
    displayHighScores();
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || {};
    let highScoresHTML = '<h3>High Scores</h3>';
    for (const [difficulty, time] of Object.entries(highScores)) {
        highScoresHTML += `<p>${difficulty}: ${time}s</p>`;
    }
    document.getElementById('highScores').innerHTML = highScoresHTML;
}

startNewGame();
displayHighScores();