let secretNumber = Math.floor(Math.random() * 200) + 1;
let attempts = 0;

function checkGuess() {
  let guess = parseInt(document.getElementById('guessInput').value);
  attempts++;

  if (isNaN(guess) || guess < 1 || guess > 200) {
    setMessage('Please enter a valid number between 1 and 200.');
    return;
  }

  if (guess === secretNumber) {
    setMessage(`Congratulations! You guessed the number in ${attempts} attempts.`);
  } else if (guess < secretNumber) {
    setMessage('Too low! Try a higher number.');
  } else {
    setMessage('Too high! Try a lower number.');
  }
}

function setMessage(msg) {
  document.getElementById('message').textContent = msg;
}
