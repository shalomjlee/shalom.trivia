const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
//need to convert to array so we put Array.from in front
const url = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
let currentQuestion = {}
let acceptingAnswers = false;
//currentQuestion is an object- will accept answers and give a delay
let score = 0
let questionCounter = 0; //what question are you on
let availableQuestions = [];
//take questions out of availaleQuestions array to get a unique question.


//each question an object, question field, go from 1-4, tell which one is hte answer. starts at 1
let questions = [];

//CONSTANTS
const correctPoints = 1;
const maxQuestions = 10;
//without questions, it goes directly to end screen
//want json version of data
fetch(url)
.then( res => {
    return res.json();
})

//format is incorrect_answers, correct_answer, fetch the API, then we get to them by querying them.
//transforming the value in the array to something else. 
//loadedQuestions.results.map get each loadedquestion, then transform it.
//create formatedquestion, that is an object with a question property, from loadedquestion, loadedQuestion.question, everytime we map thorugh, get original question, format that, return that, get array in right format that we need.
.then(loadedQuestion => {
    console.log(loadedQuestion.results)
    loadedQuestion.results.map(loadedQuestion =>{
        const formattedQuestion = {
            question: loadedQuestion.questions
        }
//using spread operator from loadedquestions of the incorrect answers, copy array of 3 answer choices - incorrect answers. need 4 answer choices total, so correct answer and 3 wrong.
        const answerChoices = [...loadedQuestion.incorrect_answers]
        formattedQuestion.answer = Math.floor(Math.random()*3) +1;
        answerChoices.splice(formattedQuestion.answer - 1, 0)
        loadedQuestion.correct_answer;
        //decide which is the correct answer, put it in the array, formattedQuestion.answer -1 since answer choices are not 0 base index, so we need to shift it to 0-3 instead of 1-4., not removing anything so put a 0 at the end
        //we are going to iterate through randomanswers

        answerChoices.forEach(choice, index => {
            formattedQuestion['choice' + (index+1)] = choice
        })
        return formattedQuestion;
    })
    startGame();
})
        .catch( err => {
            console.log(err);
        })





startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestions();
    //spread operator - take this array, take each items, and that's what available questions will be
}


getNewQuestions = () => {
//so once we run out of questions - or we gave user all the questions we want - (question set of 100, but only give 10), then returns to endscreen

    if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
        return window.location.assign('/endScreen.html')
    }

    questionCounter ++ ;//increment game to 1 for start
    const questionIndex = Math.floor(Math.random() * availableQuestions.length); //don't want to hardcoe an integer as it changes dependent on available questions left. start with 3 questions, use one, have 2 questions left. so want to base it on length of array. assing to variable questionIndex
    currentQuestion = availableQuestions[questionIndex];
    //setting innertext to be currentQuestion and its question property
    question.innerText = currentQuestion.question;
    //want to do that for each of our choices so iterate for all our choices

choices.forEach(choice => {
    const number = choice.dataset['number']; //gets dataset number out of it
    //out of current question we want this choice
    choice.innerText = currentQuestion["choice" + number];
});

availableQuestions.splice(questionIndex, 1);
//take available questions array, splice out question we just used - use question index, then splice out 1 (which is the one we used)

acceptingAnswers = true; //after we loaded question, allow user to answer, set acceptingAnswers to false so they can answer question after loaded

}

//grabbing choices outside with a forEach, grab each choice, add event listener
//when we click an element, we should see reference to what choice they picked
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        console.log(e.target);
        if(!acceptingAnswers) return; //so if we're not ready and not accepting answers, then just return them to the page

        acceptingAnswers = false; //b/c we want a delay don't want them to click immediately
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        //after we answered a question, we want to get a new question



        let classToApply = 'incorrect' //can set something incorrect by default
        if (selectedAnswer == currentQuestion.answer){
            classToApply = 'correct'
        }
        //setting it by default allows you to just know its base incorrect

        console.log(classToApply)
        



selectedChoice.parentElement.classList.add(classToApply);
//after doing this - it sets the class of the answer, which changes the color...but changes it for the next question according to if its wrong or right. so we need a delay, then to remove the class

        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000) //setTimeout allows me to remove the element after displaying for a certain period of time...this time is
    })
})
//calling getNewQuestion after finishing, we get a new question...once we don't have any in the array we need an exit so we go back to getNewQuestions
//get new questions is a function made for startGame
