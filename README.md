##TRIVIA PROJECT

//SHOUTOUT TO JAMESQUICK AND HIS TRIVIA GUIDE - 
https://www.youtube.com/watch?v=3aKOQn2NPFs&ab_channel=JamesQQuick
FOR FETCHING THE API TO LOAD QUESTIONS 

ALSO 10 CSS LAYOUTS 
https://www.youtube.com/watch?v=qm0IfG1GyZU&t=136s&ab_channel=GoogleChromeDevelopers
GOOGLE CHROME DEVELOPERS 

##USER STORIES
As a player, I want to see how many questions I've answered, and how many I got right, to keep track of my progress.
As a player, I want there to be categories to select from, so I can be answered trivia questions from the same genre.
As a player, I want there to be multiple choices to select from so I can choose an answer from choices.
As a player, I want to be notified when I am either right or wrong, and for there to be an indicator on which was the correct answer.
As a player, I want to know how many questions I got out of a total number of questions, to see what my correct percentage is.
As a player, I want to be able to play this game multiple times, and refresh the game with the click of a button to do so.

##MVP
Introduction screen picking a category which will start the game
10 trivia-API loaded questions along with the multiple choice answers to them.
An indicator for whether the player is right or wrong.
A way to navigate to the next question.
An end screen once the 10 questions are answered showing how many I got right out of total questions.
A play again button that will redirect me to the first page with multiple categories.

##BRONZE
UI indicator for when a question is right or wrong - green for correct, red for wrong. Right answer should show up after an answer is inputted - even if incorrect.
Difficulty can be adjusted from normal to hard


##SILVER
Score can be adjusted based on difficulty of question
Timer option for people who want to feel the pressure!
Multiplier based on how fast they answered the question.

##GOLD
Can get random question where they can bet with the points they have to get double the points they enter.
Trivia music


//make a div using script JS - populate with question and answer 
make 3 divs only 

/* Watching some videos and tutorials on how this would be done helped alot - shout out to james Q Quick for his videos. Very interesting way to go about it! */


/*  
MVP
What I first need to do is to create an initial page which introduces the user that this is trivia. this page will have a button which allows the user to access the trivia with random questions.

On this second page will be random questions from the trivia API. I will have 10 questions from a selected category. These 10 questions will have multiple answer choices. If it is picked right and submitted - you will get a notifcation saying you are right. If you did not select the right answer, it will tell you which one is the right answer. This should happen 10 times.
After the 10th question, there will be a score screen. On this score screen will have the #/10 questions you got right. There will also be a button that should take you to the first screen. After taking you to the first screen, the 10 questions should refresh into a random new category with random questions. 
*/


//trivia

/*. What progress have you made? 
I made my framework for my HTML
    2. What will you do today to meet your goals? 	
    Write out my functions 
    
    3. Are there any blockers in your way?
    transition pages have been a bit difficult, unsure how to implement my API 
*/

 //lose start button keep title or lose both, event listener on button take start button and set display to none. add Eventlistener display none then display block for the restart button.
        //array of data - automatically generate what shows up - 
        //create array of objects with questions and answers 
        //question needs to appear, place to answer, next button

        //when you're looking up 

        ![Image of trivia working]
      <img width="496" alt="Screen Shot 2020-10-13 at 18 58 17" src="https://user-images.githubusercontent.com/70102485/96010900-ef764e80-0e07-11eb-9601-6ba17b21164c.png">

    
    Technologies used is Javascript, CSS, and HTML
    used API, JSON, DOM, grid and flex layouts

    My users are people who want a serviceable trivia making application that gets random questions from the trivia API

WIREFRAME
(https://user-images.githubusercontent.com/70102485/96010905-f0a77b80-0e07-11eb-91a1-727f9a19726a.jpg)


//DESCRIPTIONS OF UNSOLVED PROBLEMS - MAJOR HURDLES 
I was never able to get things in a box.
Also the container itself isn't able to be clicked - only the p tag which means that there is white space that isn't necessarily able to be clicked.
I also wished I can click on my answer-prefixes, but wasn't able to do so. I believe alot of this is CSS so I really wnat to get good at it! until then, here's an ugly product made with a lot of love :)



//LINK TO HOSTED PROJECT 
https://shalomjlee.github.io/shalom.trivia/index.html