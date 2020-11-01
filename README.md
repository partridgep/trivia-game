# Trivia Game

A fun React trivia game! 10 questions per round, get one wrong and you lose. Compete with other players by submitting your score on an online leaderboard.

## Getting Started

To view the deployed project, visit [this link](https://trivia-tandem.herokuapp.com/) (please allow 20-30 seconds for Heroku to load.)

Alernatively, if you wish to run this app locally, open a terminal, navigate to the project's folder and download the app's dependencies by running `npm i`.

You may then run `npm start`. This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
You may need to run a build for everything to work correctly (see below.)\
You will also not be able to connect to the leaderboard database, as that information is always stored in a local `.env` file, never on GitHub. If you do connect to your own database, run `nodemon server` in another terminal window at the same time to connect.

`npm test` launches the test runner in the interactive watch mode.

`npm run build` builds the app for production to the `build` folder.

## List of Technologies

* React
* HTML5
* CSS3
* JavaScript
* Express
* Mongoose/MongoDB
* JSON

## Screenshots

*Landing Page:*

![Landing Page](https://i.imgur.com/VHOyrGV.jpg)


*Game Page:*

![Game Page](https://i.imgur.com/0bxet1O.jpg)


*After answering (incorrectly):*

![Incorrect Answer](https://i.imgur.com/7wQCPS1.png)


*Leaderboard:*

![Leaderboard](https://i.imgur.com/yI1FJh4.png)

## Features

* Randomization of questions
* Randomization of answer order
* No question repeat in a game
* Only 1 possible answer selection
* Correct answer revealed after player selects an answer
* 30-second countdown timer for each question
* Timer for player's overall time 
* Score leaderboard in online database
* Leaderboard is ordered by # of questions answered, then overall time

## Functioning

Within the file structure, you will find `src`, which contains `App.js`. That file routes the three different pages, which have their dedicated folder in the `pages` folder:

1. LandingPage
2. GamePage
3. Leaderboard

### LandingPage

`LandingPage` is the most straightforward of the three, containing simply the app's title and links to the two other pages.

### GamePage

`GamePage` is where the fun begins.\
As a React class component, it contains both state and methods in order for the game to function. Initially, `state` does not contain much, but get expanded upon on game initialization.

It imports all trivia data from the JSON files from within the `assets` file.

Upon loading the page, the `componentDidMount` method does two things: first, it initializes the game via `resetGame`, and two, it sets an interval every second to call upon the timer methods.

`resetGame` initializes many properties in `state` for the game to function, such as the following:

* `lost`: boolean, whether the player has lost the game or not. Set to `false` initially.
* `won`: boolean, conversely whether the player has won the game or not. Set to `false` initially.
* `triviaQandA`: object, containing the game's question, correct answer, and array of incorrect answers. Empty initially.
* `askedQuestions`: array, containing all the questions that have already been asked during the round. Empty initially.
* `count`: integer, keeping track of # of questions asked during the round. Set to `0` initially.
* `showNextButton`: boolean, whether or not to show the "Next Question" button to the player. Set to `false` initially.
* `questionTimer`: integer, number of seconds remaining for the player to answer the question. Set to `30` initially.
* `isQuestionTiming`: boolean, whether or not the question timer is running. Set to `true` initially.
* `gameTimer`: integer, number of seconds elapsed since the player has started the game. Set to `0` initially.
* `isGameTiming`: boolean, whetheer or not the game timer is running. Set to `true` initially.
* `correctlyAnswered`: integer, number of correctly answered questions during the game. Set to `0` initially.

After setting these values in state, `resetGame` then calls the `GetNewQuestion` method.\
This method will get a random question from the `triviaData` array (as long as it doesn't already exist within the `askedQuestions` array), grab its data, and set it to state as `triviaQandA`. It randomly orders the answers, jumbling the correct answer among the incorrect answers, and sets that array to state as `randomlyOrderedAnswers`.\
It adds that question to the `askedQuestions` array, increments the question `count` by 1, and finally, resets the `QuestionTimer` to 30 and the `isQuestionTimer` to `true`.

When a user selects an user, the `checkIfCorrect` method is called. It compares the answer selected by the user to the data in `currentQandA`. \
If the answer matches `currentQandA.correct`, it sets its internal `correct` boolean to `true`, clearing the way to display the "Next Question" button. \
In any case, the game will display the correct answer, as it keeps track of what question the user has chosen through `chosenAnswer` in state. \
If it does not match the correct answer, it is highlighted in red, and the `lost` boolean is set to true.

At the end of the game, whether the player has lost or won, they are able to play again, with a button calling on the `resetGame` method.

If they have answered at least one question correctly, they will be able to add their score to the online leaderboard, with each score containing the user's name (obtained by user input), their final tally of correctly answered questions, and their overall time.


## Mobile Optimization

Media Queries in the CSS files allow for mobile optimization:

![Mobile Optimization](https://i.imgur.com/9UXh6jv.png)




