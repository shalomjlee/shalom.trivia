const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choiceText'));
const maxQuestions = 10;
const questionNumber = document.querySelector('#questionNumber')

let currentQuestion = {};
let acceptAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
let url ='https://opentdb.com/api.php?amount=10&category=9&type=multiple'


fetch(url)
.then((res) =>{
    return res.json();
})
.then((apiQuestions =>{
    console.log(apiQuestions.results)
    questions = apiQuestions.results.map((apiQuestions) =>{
        const questionLocation = {
          //return this
        question: apiQuestions.question
            
        }
        
        const allChoices = [...apiQuestions.incorrect_answers];
        questionLocation.answer = Math.floor(Math.random() * 4) + 1;

        allChoices.splice(
            apiQuestions.answer - 1, 0,
            //-1 is to get it to base 0, and 0 is for not removing any loaded elements
            apiQuestions.correct_answer
        );

        allChoices.forEach((choice, index) =>{
            questionLocation['choice' + (index + 1)] = choice;
        })


        return questionLocation;

    })
    startGame();
}))
.catch((err) => {
    console.log(error);
})


//startGame is a function

startGame = () =>{
    questionCount = 0;
    score = 0;
    availableQuestions = [...questions];
    queryNewQuestion();
}

queryNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCount >= maxQuestions){
        return window.location.assign('endScreen.html')
    }
    questionCounter++;
    questionNumber.innerText = `Question ${questionCounter}/${maxQuestions}`;
    // console.log(questionNumber.innerText)


    const questionIndex=Math.floor(Math.random() *availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptAnswer = true;
}


choices.forEach((choice) => {
    choice.addEventListener('click', (e) =>{
        if (!acceptAnswer)
        return;
        acceptAnswer = false;
        const choiceSelect = e.target;
        const answerSelect = choiceSelect.dataset['number'];

        const correctIncorrect = (answerSelect == currentQuestion.answer ? 'correct' : 'incorrect');

        if (correctIncorrect == 'correct') {
            incrementScore++;
        }
        choiceSelect.parentElement.classList.add(correctIncorrect);

        setTimeout(() => {
            choiceSelect.parentElement.classList.remove(correctIncorrect);
            queryNewQuestion()
        }, 1000);
    })
})

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
}

//currently my color inputs are incorrect...incorrect answers are getting green while correct answers are getting red
