# Trivia Game

A fun React trivia game! 21 questions total (10 questions in each round, plus a bonus question.)

## Getting Started

To view the deployed project, visit [this link](https://trivia-tandem.herokuapp.com/) (please allow 20-30 seconds for Heroku to load.)

Alernatively, if you wish to run this app locally, open a terminal, navigate to the project's folder and run:

### `npm start`

This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
\You may need to run a build for everything to work correctly (see below.)
\You will also not be able to connect to the leaderboard database, as that information is always stored in a local `.env` file, never on GitHub. If you do connect to your own database, run `nodemon server` in another terminal window at the same time to connect.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\

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

![Game Page](https://i.imgur.com/dUKcaiU.jpg)


*After answering (incorrectly):*

![Incorrect Answer](https://i.imgur.com/dXS3t62.png)


*Leaderboard:*

![Leaderboard](https://i.imgur.com/nf0hUOU.png)

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

Section coming soon...

## Upcoming Features

* Mobile Optimization


