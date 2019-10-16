(function () {
	let score, roundScore, activePlayer, gamePlaying;
	resetGame();

	// Listeners
	$('.btn-new').on('click', resetGame.bind(this));
	$('.btn-roll').on('click', rollDice.bind(this));
	$('.btn-hold').on('click', holdGame.bind(this));

	function rollDice() {
		if (gamePlaying) {
			// Random number
			let dice1 = Math.floor(Math.random() * 6) + 1;
			let dice2 = Math.floor(Math.random() * 6) + 1;
			// Display the result
			$('#dice-1').css("display", "block");
			$('#dice-2').css("display", "block");

			$('#dice-1').attr("src", 'image/dice-' + dice1 + '.png');
			$('#dice-2').attr("src", 'image/dice-' + dice2 + '.png');

			// Update the roundScore if the rolled dice was not 1
			if ((dice1 === 6 && dice2 === 6) || (dice1 === 1 && dice2 === 1)) {
				nextPlayer();
			} else {
				roundScore += dice1;
				roundScore += dice2;
				$('#current-' + activePlayer).html(roundScore);
			}
		}

	}

	function holdGame() {
		//add current score of activePlayer to global score
		if (gamePlaying) {
			score[activePlayer] += roundScore;

			// display the scores to UI
			$('#score-' + activePlayer).html(score[activePlayer]);
			let input = $('.final-score').val();
			let winningScore;
			//undefined,0,null and "" are coerced to false
			// anything else will be coerced to true
			if (input) {
				winningScore = input;
			} else {
				winningScore = 50;
			}

			//check if player won the game
			if (score[activePlayer] >= winningScore) {
				$('#name-' + activePlayer).html('!Winner');
				$('#dice-1').css("display", "none");
				$('#dice-2').css("display", "block");

				$('.player-' + activePlayer + '-panel').addClass('winner');
				$('.player-' + activePlayer + '-panel').removeClass('active');
				gamePlaying = false;
			} else {
				//next player
				nextPlayer();
			}
		}
	}

	function nextPlayer() {
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		$('#current-0').html('0');
		$('#current-1').html('0');
		$('.player-0-panel').toggleClass('active');
		$('.player-1-panel').toggleClass('active');
	}

	function resetGame() {
		score = [0, 0];
		activePlayer = 0;
		roundScore = 0;
		gamePlaying = true;
		$('#score-0').html('0');
		$('#score-1').html('0');
		$('#current-0').html('0');
		$('#current-1').html('0');
		$('#name-0').html('Player-1');
		$('#name-1').html('Player-2');
	}
}());