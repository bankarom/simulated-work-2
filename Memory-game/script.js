document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'fries', img: 'img/fries.png' },
        { name: 'mole', img: 'img/mole.jpg' },
        { name: 'hotdog', img: 'img/hotdog.png' },
        { name: 'ice-cream', img: 'img/ice-cream.png' },
        { name: 'pizza', img: 'img/pizza.png' },
        { name: 'milkshake', img: 'img/milkshake.png' },
        { name: 'cheeseburger', img: 'img/cheeseburger.png' },
        { name: 'white', img: 'img/white.png' },
        { name: 'fries', img: 'img/fries.png' },
        { name: 'mole', img: 'img/mole.jpg' },
        { name: 'hotdog', img: 'img/hotdog.png' },
        { name: 'ice-cream', img: 'img/ice-cream.png' },
        { name: 'pizza', img: 'img/pizza.png' },
        { name: 'milkshake', img: 'img/milkshake.png' },
        { name: 'cheeseburger', img: 'img/cheeseburger.png' },
        { name: 'white', img: 'img/white.png' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('#grid');
    const resultDisplay = document.querySelector('#result');
    const movesDisplay = document.querySelector('#moves');
    const matchCountDisplay = document.querySelector('#match-count');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let moves = 0;

    function createBoard() {
        cardArray.forEach((_, index) => {
            const card = document.createElement('div');
            card.classList.add('golden-box');
            card.setAttribute('data-id', index);

            const cardImg = document.createElement('img');
            cardImg.setAttribute('src', 'pic/blank.png');
            card.appendChild(cardImg);

            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        const cardImg = this.querySelector('img');

        if (cardsChosenId.includes(cardId) || cardImg.classList.contains('show')) return;

        cardImg.setAttribute('src', cardArray[cardId].img);
        cardImg.classList.add('show');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.golden-box img');
        const [firstCardId, secondCardId] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].classList.add('match');
            cards[secondCardId].classList.add('match');
            cards[firstCardId].parentElement.removeEventListener('click', flipCard);
            cards[secondCardId].parentElement.removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'pic/blank.png');
            cards[secondCardId].setAttribute('src', 'pic/blank.png');
            cards[firstCardId].classList.remove('show');
            cards[secondCardId].classList.remove('show');
        }

        cardsChosen = [];
        cardsChosenId = [];
        moves++;
        movesDisplay.textContent = `Moves: ${moves}`;
        matchCountDisplay.textContent = `Matches: ${cardsWon.length}/8`;
        resultDisplay.textContent = `Score: ${cardsWon.length * 2}`;

        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You found them all!';
        }
    }

    createBoard();
});
