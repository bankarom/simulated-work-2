const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');

let result = 0;
let hitPosition;
let currentTime = 30;
let timerId = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
        const img = square.querySelector('img');
        if (img) img.style.display = 'none';
    });

    const randomIndex = Math.floor(Math.random() * squares.length);
    const randomSquare = squares[randomIndex];

    randomSquare.classList.add('mole');
    let moleImg = randomSquare.querySelector('img');
    if (!moleImg) {
        moleImg = document.createElement('img');
        moleImg.src = './img/mole.jpg';
        randomSquare.appendChild(moleImg);
    }
    moleImg.style.display = 'block';

    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            result += 20;
            scoreDisplay.textContent = result;
            hitPosition = null;
        }
    });
});

function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

function countdown() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        clearInterval(countdownTimerId);
        alert(`Game Over! Your final score is ${result}`);
    }
}

moveMole();
const countdownTimerId = setInterval(countdown, 1000);
