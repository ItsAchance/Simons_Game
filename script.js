let userClickedPattern = []; // Stores buttons clicked by user to compare against gamePattern
let gamePattern = []; // The buttons that 'Simon' has pressed, to be checked by player inputs
let buttonColours = ['red', 'green', 'blue', 'yellow'];
let gameStarted = false;
let level = 0;
let actualLevel = 1;

function colorPicker() {
    let randNum = Math.round(Math.random() * 3);
    let randomChosenColour = buttonColours[randNum];
    return randomChosenColour;
}

function nextSequence() {
    let color = colorPicker();
    gamePattern.push(color);
}

function playGame() {
    document.addEventListener('keydown', function() {
        if (gameStarted === false) {
            nextSequence();
            playAnimation();
        }
        gameStarted = true;
        gameLevel();
    });
}

function clickedButton() {
    for (let i = 0; i < document.querySelectorAll('.btn').length; i++) {
        document.querySelectorAll('.btn')[i].addEventListener('click', function() {
            userClickedPattern.push(this.id);
            checkAnswer(userClickedPattern.length - 1)
            gameLevel();

            // Play the sound and they blink animation, needs to be after
            // the nextSequence to work since playAnimation needs level and gamepattern
            // to increase

            playSound(this.id);
            document.querySelectorAll('.btn')[i].classList.add('pressed');
            setTimeout(function() {
                document.querySelectorAll('.btn')[i].classList.remove('pressed');
            }, 100);
        })
    };
}

function playAnimation() {
    document.querySelector('.' + document.querySelector('#' + gamePattern[level]).id).classList.add('blink');
    playSound(document.querySelector('#' + gamePattern[level]).id);
    setTimeout(function() {
        document.querySelector('.' + document.querySelector('#' + gamePattern[level]).id).classList.remove('blink');
    }, 150);
}

function playSound(button) {
    soundURL = 'sounds/' + button + '.mp3'; // -> sounds/red.mp3
    buttonSound = new Audio(soundURL);
    buttonSound.play();
}

function gameLevel() {
    // Displays the current game level

    if (gameStarted === true) {
        document.querySelector('#level-title').innerHTML = 'Level ' + actualLevel;
    }
}
function checkAnswer(currentLevel) {
    // This is the condition when the game should continue
    if (currentLevel === gamePattern.length - 1) {
        if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
            userClickedPattern = [];
            actualLevel++;
            level++;
            nextSequence();
            setTimeout(function() {
                playAnimation();
            }, 1000);
            return 1;
        } else {
            document.body.classList.add('class', 'game-over');
            setTimeout(function() {
                document.body.classList.remove('game-over');
                document.querySelector('#level-title').innerHTML = 'Game Over, Press Any Key to Restart';
                gameOverSound = new Audio('sounds/wrong.mp3');
                gameOverSound.play();
            }, 200)
            restartGame();
            return 0;
        }
    } else {
        if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
            return 0;
        }
    }
}

function restartGame() {
    userClickedPattern = [];
    gamePattern = [];
    gameStarted = false;
    level = 0;
    actualLevel = 0;
}

playGame();
clickedButton();








