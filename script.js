const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// list of words for game

const words = [
	'sigh',
	'tense',
	'airplane',
	'ball',
	'pies',
	'juice',
	'warlike',
	'bad',
	'north',
	'dependent',
	'steer',
	'silver',
	'highfalutin',
	'superficial',
	'quince',
	'eight',
	'feeble',
	'admit',
	'drag',
	'loving',
];

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 10;

//init difficulty

// set difficulty ____> if there's something there I want to set the variable to that data. Otherwise set it to medium
let difficulty =
	localStorage.getItem('difficulty') !== null
		? localStorage.getItem('difficulty')
		: 'medium';

//set difficulty select value

difficultySelect.value =
	localStorage.getItem('difficulty') !== null
		? localStorage.getItem('difficulty')
		: 'medium';

//? ///////////////////////////////
//? focus on text on start

text.focus();

//start counting down

const timeInterval = setInterval(updateTime, 1000);

//!functions

//generate random word from array

function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

//update score

function updateScore() {
	score++;
	scoreEl.innerHTML = score;
}

// console.log(getRandomWord());

//update time
function updateTime() {
	// console.log(1);
	time--;
	timeEl.innerHTML = time + 's';

	if (time === 0) {
		clearInterval(timeInterval);
		//end game
		gameOver();
	}
}
//Game Over, show end screen

function gameOver() {
	endgameEl.innerHTML = `

<h1>Time ran out</h1>
<p>Your final score is ${score}</p>
<button onclick="location.reload()">Reload</button>`;
	// in the css we had display none
	endgameEl.style.display = 'flex';
}

//Add word to Dom
function addWordToDOM() {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
}
addWordToDOM();

//!Event Listeners

//text typed in placewholder
text.addEventListener('input', (e) => {
	const insertedText = e.target.value;
	// 	// console.log(insertedText);

	if (insertedText === randomWord) {
		//creates a new word
		addWordToDOM();
		updateScore();

		//clear
		e.target.value = '';

		// append time depending on difficulty
		if (difficulty === 'hard') {
			time += 2;
		} else if (difficulty === 'medium') {
			time += 3;
		} else {
			time += 5;
		}
		updateTime();
	}
});

//Settings btn click- we used translate prop in css

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Settings select

settingsForm.addEventListener('change', (e) => {
	difficulty = e.target.value;

	localStorage.setItem('difficulty', difficulty);

	// console.log(difficulty);
});
