const question = document.querySelector('#question');
const answers = document.querySelectorAll('.answer-text');
const number = document.querySelectorAll('[data-number]');
let questionCounter = document.querySelector('#questionCounter');
let scoreNumber = document.querySelector('#score');
let theQuestion = {}; //object
let acceptAnswers = false;
let score = 0;
let questionNumber = 0;
let availableQuestions = [];

const correctScore = 1;
const maxQuestions = 10;
const url =
	'https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple';
let questions = [];

//questions in url are in an array, format is a bit diferent - is in array, fetch wtih

fetch(url)
	.then((res) => {
		return res.json();
	})
	.then((apiQuestions) => {
		questions = apiQuestions.results.map((apiQuestion) => {
			const formQuestion = {
				question: apiQuestion.question,
			};

			const answerChoices = [...apiQuestion.incorrect_answers];
			formQuestion.answer = Math.floor(Math.random() * 3) + 1;
			answerChoices.splice(
				formQuestion.answer - 1,
				0,
				apiQuestion.correct_answer
			);

			answerChoices.forEach((choice, index) => {
				formQuestion['choice' + (index + 1)] = choice;
			});

			return formQuestion;
		});
		startGame();
	})
	.catch((err) => {
		console.error(err);
	});

function startGame() {
	questionNumber = 0;
	score = 0;
	availableQuestions = [...questions];
	//availableQuestions is a copy of the array
	getNewQuestions();
}

function getNewQuestions() {
	if (availableQuestions === 0 || questionNumber >= maxQuestions) {
		localStorage.setItem('newScore', score);
		//gets us to the end page once we exceeded our maxQuestions
		return window.location.assign('endScreen.html');
	}
	questionNumber++;
	questionCounter.innerText = `${questionNumber}/${maxQuestions}`;

	const questionArray = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionArray];
	question.innerText = currentQuestion.question;

	answers.forEach((choice) => {
		const number = choice.dataset['number']; //refers to data-number
		choice.innerText = currentQuestion['choice' + number]; //set innerText out of current question, get choice property out of this
	});

	availableQuestions.splice(questionArray, 1); //gets rid of quesiton we just used.

	acceptAnswers = true; //allows user to answer
}

answers.forEach((choice) => {
	choice.addEventListener('click', (event) => {
		if (!acceptAnswers) return;

		acceptAnswers = false;
		const selectedChoice = event.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		let classToApply = 'incorrect';
		if (selectedAnswer == currentQuestion.answer) {
			classToApply = 'correct';
		}

		if (classToApply == 'correct') {
			scoreCounter(correctScore);
		}

		selectedChoice.parentElement.classList.add(classToApply);
		selectedChoice.parentElement.classList.remove('choice-selected');

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);

			getNewQuestions();
		}, 500);
	});
});
//startGame() moved after fetch as we need to load that stuff up before we can startGame
function scoreCounter(num) {
	score += num;
	scoreNumber.innerText = score;
}
