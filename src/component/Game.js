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
        gameStarted: false,
        gameOver: false,
        philosophersList: data,
        philosopherDefeated: false,
        defeatedPhilosophers: [],
      },
      philosopher: {},
      player: {
        name: "Player",
        lifePoints: 10,
        battlePoints: 0
      }
    };
    this.setPlayerName = this.setPlayerName.bind(this);
    this.setGameDifficulty = this.setGameDifficulty.bind(this);
    this.startGame = this.startGame().bind(this);
    this.restartGame = this.restartGame().bind(this);
    this.checkAnswer = this.checkAnswer().bind(this);
    this.continue = this.continue().bind(this);
  }

  setPlayerName = (playerName) => {
    this.setState((state, props) => ({
      player: {
        name: playerName
      }
    }));
  }

  setGameDifficulty = (difficulty) => {
    let newLifePoints = 10;

    switch(difficulty) {
      case "easy":
        newLifePoints = 30;
        break;
      case "medium":
        newLifePoints = 20;
        break;
      case "hard":
        newLifePoints = 10;
        break;
      default:
        newLifePoints = 30;
    }

    this.setState((state, props) => ({
      player: {
        lifePoints: newLifePoints
      }
    }));
  }

  startGame = () => {
    this.setState((state, props) => ({
      game: {
        gameStarted: true
      },
      philosopher: this.state.game.philosophersList[Math.floor(Math.random() * this.state.game.philosophersList.length)]
    }));
  }

  restartGame = () => {
    this.setState((state, props) => ({
      game: {
        gameStarted: true,
        gameOver: false
      },
      philosopher: state.game.philosophersList[Math.floor(Math.random() * state.game.philosophersList.length)]
    }));
  }

  checkAnswer(answerId) {
    if (answerId === this.state.philosopher.id) {
      this.setState((state, props) => ({
        game: {
          philosopherDefeated: true
        },
        player: {
          battlePoints: state.player.battlePoints ++,
        }
      }));
    } else {
      this.setState((state, props) => ({
        player: {
          lifePoints: state.player.lifePoints --,
        }
      }));
    }

    if (this.state.player.lifePoints <= 0) {
      this.setState((state, props) => ({
        game: {
          gameOver: true
        }
      }));
    }
  }

  continue() {
    // add philosopher to defeatedPhilosophers[]
    // remove philosopher from philosophersList[]
    this.setState((state, props) => ({
      game: {
        philosopherDefeated: false
      },
      philosopher: state.game.philosophersList[Math.floor(Math.random() * state.game.philosophersList.length)]
    }));
  }

  render() {
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
