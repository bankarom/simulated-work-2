class RockPaperScissors {
    constructor() {
        this.scores = {
            player: 0,
            computer: 0
        };
        this.choices = ['rock', 'paper', 'scissors'];
        this.initializeGame();
    }

    initializeGame() {
      
        document.querySelectorAll('.choice-btn').forEach(button => {
            button.addEventListener('click', () => {
                const choice = button.dataset.choice;
                this.play(choice);
            });
        });
    }

    getComputerChoice() {
        return this.choices[Math.floor(Math.random() * this.choices.length)];
    }

    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) return 'draw';
        if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    }

    updateScore(result) {
        if (result === 'win') this.scores.player++;
        else if (result === 'lose') this.scores.computer++;
        
        document.getElementById('playerScore').textContent = this.scores.player;
        document.getElementById('computerScore').textContent = this.scores.computer;
    }

    getResultEmoji(result) {
        switch (result) {
            case 'win': return '🎉';
            case 'lose': return '😔';
            default: return '🤝';
        }
    }

    play(playerChoice) {
        const computerChoice = this.getComputerChoice();
        const result = this.determineWinner(playerChoice, computerChoice);
        
        
        document.getElementById('choices').textContent = 
            `You chose ${playerChoice} • Computer chose ${computerChoice}`;
        
        
        const roundResult = document.getElementById('roundResult');
        roundResult.style.opacity = '0';
        
        setTimeout(() => {
            let resultText = '';
            let resultColor = '';
            
            switch (result) {
                case 'win':
                    resultText = `You win! ${this.getResultEmoji(result)}`;
                    resultColor = '#48bb78';
                    break;
                case 'lose':
                    resultText = `Computer wins! ${this.getResultEmoji(result)}`;
                    resultColor = '#f56565';
                    break;
                default:
                    resultText = `It's a draw! ${this.getResultEmoji(result)}`;
                    resultColor = '#ecc94b';
            }
            
            roundResult.textContent = resultText;
            roundResult.style.color = resultColor;
            roundResult.style.opacity = '1';
        }, 200);
        
        this.updateScore(result);
    }
}

window.onload = () => new RockPaperScissors();
