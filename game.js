const question = document.querySelector('#question');
const answers = document.querySelectorAll('.choice-text');
const number = document.querySelectorAll('[data-number]')
let questionCounter = document.querySelector('#questionCounter')
let scoreNumber = document.querySelector('#score')
let theQuestion = {} //object
let acceptAnswers = false;
let score = 0;
let questionNumber = 0;
let availableQuestions = [];

const correctScore = 1;
const maxQuestions = 10;
const url =
	'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
let questions = [];

//questions in url are in an array, format is a bit diferent - is in array, fetch wtih 

fetch(url)
	.then((res) => {
		return res.json();
	})
	.then((apiQuestions) => {
        console.log(apiQuestions.results)
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
    console.log(availableQuestions)//availableQuestions is a copy of the array
    getNewQuestions();
}


function getNewQuestions(){
    if(availableQuestions === 0 || questionNumber >= maxQuestions){
        localStorage.setItem('newScore', score)
        //gets us to the end page once we exceeded our maxQuestions
        return window.location.assign('endScreen.html')
    }
    questionNumber ++;
    questionCounter.innerText = `${questionNumber}/${maxQuestions}`;
    
    const questionArray =Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionArray];
    question.innerText = currentQuestion.question;

    answers.forEach( choice => {
        const number = choice.dataset['number']; //refers to data-number
        choice.innerText = currentQuestion['choice' + number];//set innerText out of current question, get choice property out of this
        
    });

    availableQuestions.splice(questionArray, 1) //gets rid of quesiton we just used.

    acceptAnswers = true; //allows user to answer
};

answers.forEach(choice => {
    choice.addEventListener('click', event => {
        console.log(event.target)//can see what we target - we now target data number
        if(!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer){
            classToApply = 'correct';
        }

        if(classToApply =='correct'){
            scoreCounter(correctScore);
        }


        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( ()=> {
        
        selectedChoice.parentElement.classList.remove(classToApply);

        getNewQuestions()
    }, 1000
    );
    })
})
//startGame() moved after fetch as we need to load that stuff up before we can startGame
function scoreCounter(num) {
    score +=num;
    scoreNumber.innerText = score;
}









//iterating through array, transform into something else
//object with question property, from loaded question (resJson), array of questions in correct format
//need answers in random position - so formattedquestion.answer needs to be between 0-3

//we're just getting stuff from inside the array, first separated, then we need to choose which part of the array we're getting it in.
//iterate through answer choices, put them as answer 1-4, dynamically get property, assign choice


//need to convert to array so we put Array.from in front

//currentQuestion is an object- will accept answers and give a delay


//spread operator - take this array, take each items, and that's what available questions will be
//what question are you on

//take questions out of availaleQuestions array to get a unique question.


//each question an object, question field, go from 1-4, tell which one is hte answer. starts at 1


//CONSTANTS

//without questions, it goes directly to end screen
//want json version of data


//format is incorrect_answers, correct_answer, fetch the API, then we get to them by querying them.
//transforming the value in the array to something else. 
//loadedQuestions.results.map get each loadedquestion, then transform it.
//create formatedquestion, that is an object with a question property, from loadedquestion, loadedQuestion.question, everytime we map thorugh, get original question, format that, return that, get array in right format that we need.

//using spread operator from loadedquestions of the incorrect answers, copy array of 3 answer choices - incorrect answers. need 4 answer choices total, so correct answer and 3 wrong.
    
        //decide which is the correct answer, put it in the array, formattedQuestion.answer -1 since answer choices are not 0 base index, so we need to shift it to 0-3 instead of 1-4., not removing anything so put a 0 at the end
        //we are going to iterate through randomanswers
        
        
        
        
        
        
        
        //so once we run out of questions - or we gave user all the questions we want - (question set of 100, but only give 10), then returns to endscreen
        //increment game to 1 for start
        //don't want to hardcoe an integer as it changes dependent on available questions left. start with 3 questions, use one, have 2 questions left. so want to base it on length of array. assing to variable questionIndex
        //setting innertext to be currentQuestion and its question property
        //want to do that for each of our choices so iterate for all our choices
        //gets dataset number out of it
        //out of current question we want this choice
        //take available questions array, splice out question we just used - use question index, then splice out 1 (which is the one we used)
        //after we loaded question, allow user to answer, set acceptingAnswers to false so they can answer question after loaded

//grabbing choices outside with a forEach, grab each choice, add event listener
//when we click an element, we should see reference to what choice they picked
//so if we're not ready and not accepting answers, then just return them to the page
//after we answered a question, we want to get a new question
//b/c we want a delay don't want them to click immediately
//can set something incorrect by default
//setting it by default allows you to just know its base incorrect
//after doing this - it sets the class of the answer, which changes the color...but changes it for the next question according to if its wrong or right. so we need a delay, then to remove the class
//setTimeout allows me to remove the element after displaying for a certain period of time...this time is
//calling getNewQuestion after finishing, we get a new question...once we don't have any in the array we need an exit so we go back to getNewQuestions
//get new questions is a function made for startGame
