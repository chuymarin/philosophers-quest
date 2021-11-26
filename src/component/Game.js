import React, { Component } from 'react';
import BossStats from './BossStats';
import PlayerStats from './PlayerStats';
import GameScene from './GameScene';
import data from  './data/data.json'
import './Game.css';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: {
        setGameDifficulty: this.setGameDifficulty(),
        startGame: this.startGame(),
        gameStarted: true,
        restartGame: this.restartGame(),
        gameOver: false,
        checkAnswer: this.checkAnswer(),
        philosophersList: data,
        philosopherDefeated: false,
        defeatedPhilosophers: [],
        continue: this.continue()
      },
      philosopher: {},
      player: {
        setName: this.setPlayerName(),
        name: "Chuy",
        lifePoints: 10,
        battlePoints: 0
      }
    }
  }

  setPlayername(playerName) {
    this.state.player.name = playerName
  }

  setGameDifficulty(difficulty) {
    const newState = this.state;
    switch(difficulty) {
      case "easy":
        newState.player.lifePoints = 30;
        this.setState({state: newState});
        break;
      case "medium":
        newState.player.lifePoints = 20;
        this.setState({state: newState});
        break;
      case "hard":
        newState.player.lifePoints = 10;
        this.setState({state: newState});
        break;
      default:
        newState.player.lifePoints = 30;
        this.setState({state: newState});
    }
  }

  startGame() {
    this.state.game.gameStarted = true;
    this.state.philosopher = this.state.game.philosophersList[Math.floor(Math.random() * this.state.game.philosophersList.length)];
  }

  restartGame() {
    this.state.game.gameStarted = true
    this.state.game.gameOver = false
  }

  checkAnswer(answerId) {
    if (answerId === this.state.philosopher.id) {
      this.state.game.philosopherDefeated = true;
      this.state.player.battlePoints = this.state.player.battlePoints + 1
    } else {
      this.state.player.lifePoints = this.state.player.lifePoints -1
    }

    if (this.state.player.lifePoints <= 0) {
      this.state.gameOver = true
    }
  }

  continue() {
    // add philosopher to defeatedPhilosophers[]
    // remove philosopher from philosophersList[]
    this.state.philosopher = this.state.game.philosophersList[Math.floor(Math.random() * this.state.game.philosophersList.length)]
    this.state.game.philosopherDefeated = false;
  }

  render() {
    console.log(data);
    console.log(this.state.game.philosophersList);
    if (this.state.game.gameStarted === false && this.state.game.gameOver === false) {
     return (
       <div>intro</div>
      )
    } else if (this.state.game.gameStarted === true && this.state.game.gameOver === true) {
      return (
        <div>game over</div>
       )
    } else if (this.state.game.gameStarted === true && this.state.game.gameOver === false) {
      return (
        <div className="Game">
          <div className="Game-header">
            <BossStats state={this.state}/>
          </div>
          <div className="Game-body">
            <GameScene state={this.state} />
          </div>
          <div className="Game-footer">
            <PlayerStats state={this.state}/>
          </div>
        </div>
      );
    }
  }
}

export default Game;
