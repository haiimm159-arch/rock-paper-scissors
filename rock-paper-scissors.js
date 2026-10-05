const autoPlayElm = document.querySelector('.auto-play-button')
const resetElm = document.querySelector('.reset-button');
const rockElm  = document.querySelector('.rock-button');
const paperElm = document.querySelector('.paper-button');
const scissorsElm = document.querySelector('.scissors-button');
const messageElm = document.querySelector('.message');

const score = JSON.parse(localStorage.getItem('score')) ||  {
    wins: 0,
    losses: 0,
    ties: 0
    };  

function saveScore () {
    localStorage.setItem('score', JSON.stringify(score));
}

renderScore();

function playGame (playerMove) {
    const computerMove = pickComputerMove();
    const result = getResults(playerMove, computerMove);

    function pickComputerMove() {
        const randomNumber = Math.random();
        if (randomNumber >= 2/3) {
            return 'Scissors';
        } else if (randomNumber <= 1/3) {
            return  'Rock';
        } else {
            return 'Paper'; 
        } 
    }

    function getResults (playerMove, computerMove) {
        if (playerMove === computerMove) {return 'its a tie'};

        const winAgainst = {
            Rock: 'Scissors',
            Paper: 'Rock',
            Scissors: 'Paper'
        }; 
        return winAgainst[playerMove] === computerMove
        ? 'You win'
        : 'You lose';
    }

    if (result ==="You win") {
        score.wins +=1;
    } else if (result ==="You lose") {
        score.losses +=1;
    } else {
        score.ties +=1;
    }

    saveScore();
    renderScore();

}

let isPlaying = false;
let intervalId;

function autoPlay () {
    if (!isPlaying) {
        intervalId = setInterval(() => {
            const moves = ['Rock', 'Paper', 'Scissors']
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            playGame(randomMove)
        }, 1000);
        isPlaying = true;
        autoPlayElm.innerHTML = `Stop Auto-play`
    } else {
        clearInterval(intervalId)
        isPlaying = false;
        autoPlayElm.innerHTML = `Start Auto-Play`
    }
}

function showMessage (text) {
    messageElm.textContent = text;
    setTimeout(() => {
        messageElm.textContent = '';
    }, 1000)
    renderScore();
}

function resetScore () {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    saveScore();
    renderScore();
}
    
function renderScore () {
    const scoreCount = document.querySelector('.scoreEl');
    scoreCount.innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}



autoPlayElm.addEventListener('click', autoPlay);
resetElm.addEventListener('click', resetScore)
rockElm.addEventListener('click', () => {
    playGame('Rock')   
} );
paperElm.addEventListener('click', () => {
    playGame('Paper') 
} );
scissorsElm.addEventListener('click', () => {
    playGame('Scissors')   
} );
resetElm.addEventListener('click', () => {
    showMessage('Score has been reset');
})

renderScore();