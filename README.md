# Ball Game

Basic ball game built in React 18 using TypeScript 4. This is currently being hosted in Azure [here](https://ball-game.azurewebsites.net/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Uses [firebase](https://firebase.google.com/) to store the high scores.

Makes use of the [naughty-words-js](https://github.com/LDNOOBW/naughty-words-js) npm package.

## Game Description

You play as the white ball, your goal is to collect as many green and blue balls as possible, while avoiding the red balls.

In the game, there are three game mode options:

  1. Regular (with 3 lives)
  2. One Life
  3. Endless (no red balls spawn)

You can view the high scores of other players from the Main Menu. This is currently only for the Regular game mode and with none of the game's settings changed.

You can change the game's settings in the Main Menu to alter how the game works, but if you start a Regular game after changing these settings, then your scores will not be saved.

## Development Notes

### TODO

- Username
  - Deletes the username cookie after session ? Likely a https web.config issue
- Main Menu
  - Menu for different game modes:
    - Survival? (play as a blue/green ball and survive a white ball)
  - High score menu
    - Extend the firebase set up so that high-scores can be saved for the base game modes
    - Rank results / users ?
    - Save scores locally / use caching ?
- Remaining TODOs written throughout code
