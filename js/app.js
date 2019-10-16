var score, roundScore, activePlayer, gamePlaying;
init();

dice = Math.floor(Math.random() * 6) + 1;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('.dice').style.display = 'none';


document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		if (dice !== 1) {
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		} else {
			//next player
			nextPlayer();
		}
	}

});
document.querySelector('.btn-hold').addEventListener('click', function () {
	//add current score of activePlayer to global score
	if (gamePlaying) {
		score[activePlayer] += roundScore;

		// display the scores to UI
		document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
		var winningScore;
		var input = document.querySelector('.final-score').value;

		//undefined,0,null and "" are coerced to false
		// anything else will be coerced to true
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}


		//check if player won the game
		if (score[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = '!Winner';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//next player
			nextPlayer();
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}
document.querySelector('.btn-new').addEventListener('click', function () {
	init();
});
function init() {
	score = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player-1';
	document.getElementById('name-1').textContent = 'Player-2';
}

