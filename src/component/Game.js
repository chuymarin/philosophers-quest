import React, { Component } from 'react';
import BossStats from './BossStats';
import PlayerStats from './PlayerStats';
import GameScene from './GameScene';
import philosophersData from  './data/philosophersData.json'
import dialogsData from  './data/dialogsData.json'
import './Game.css';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: {
        gameStarted: false,
        gameOver: false,
        philosophersList: philosophersData,
        dialogsList: dialogsData,
        philosopherDialog: [],
        philosopherDefeated: false,
        defeatedPhilosophers: [],
        randomPhilosophersList: []
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
    this.startGame = this.startGame.bind(this);
    this.getRandomPhilosophersList = this.getRandomPhilosophersList.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.continue = this.continue.bind(this);
  }

  setPlayerName = (evt) => {
    this.setState((state, props) => ({
      player: {
        ...state.player,
        name: evt.target.value
      }
    }));
  }

  setGameDifficulty = (evt) => {
    let newLifePoints = 30;

    switch(evt.target.value) {
      case "facil":
        newLifePoints = 30;
        break;
      case "normal":
        newLifePoints = 20;
        break;
      case "dificil":
        newLifePoints = 10;
        break;
      default:
        newLifePoints = 30;
    }

    this.setState((state, props) => ({
      player: {
        ...state.player,
        lifePoints: newLifePoints
      }
    }));
  }

  getRandomPhilosophersList = () => {
    let sortedList = philosophersData.sort();
    let randomPhilosophersList = [];
    randomPhilosophersList.push(sortedList[0]);
    randomPhilosophersList.push(sortedList[1]);
    randomPhilosophersList.push(sortedList[2]);
    return randomPhilosophersList.sort();
  }

  startGame = () => {
    let newPhilosopher = this.state.game.philosophersList[Math.floor(Math.random() * this.state.game.philosophersList.length)];
    let newPhilosopherDialog = this.state.game.philosopherDialog;
    let initDialog = "Hola yo soy " + newPhilosopher.name + " Para dejarte pasar, tienes que decir cual es mi " + newPhilosopher.type;
    newPhilosopherDialog.push(initDialog);
    let randomPhilosophersList = this.getRandomPhilosophersList();
    // randomPhilosophersList.push(newPhilosopher);
    this.setState((state, props) => ({
      game: {
        ...state.game,
        gameStarted: true,
        randomPhilosophersList: randomPhilosophersList,
        philosopherDialog: newPhilosopherDialog
      },
      philosopher: newPhilosopher,
    }));
  }

  restartGame = () => {
    this.setState((state, props) => ({
      game: {
        ...state.game,
        gameStarted: false,
        gameOver: false
      }
    }));
  }

  checkAnswer = (evt) => {
    if (evt.target.value === this.state.philosopher.id) {
      this.setState((state, props) => ({
        game: {
          ...state.game,
          philosopherDefeated: true
        },
        player: {
          ...state.player,
          battlePoints: state.player.battlePoints ++,
        }
      }));
    } else {
      let newPhilosopherDialog = this.state.game.philosopherDialog;
      let newRandomDialog = this.state.game.dialogsList.sort()
      newPhilosopherDialog.push(newRandomDialog[0]);
      this.setState((state, props) => ({
        game: {
          ...state.game,
          philosopherDialog: newPhilosopherDialog
        },
        player: {
          ...state.player,
          lifePoints: state.player.lifePoints --,
        }
      }));
    }

    if (this.state.player.lifePoints <= 0) {
      this.setState((state, props) => ({
        game: {
          ...state.game,
          gameOver: true
        }
      }));
    }
  }

  continue = () => {
    // add defeatedPhilosopher to defeatedPhilosophers
    // remove defeatedPhilosopher from philosophersList
    let defeatedPhilosopher = this.state.philosopher;
    let newDefeatedPhilosophers = this.state.game.defeatedPhilosophers.push(defeatedPhilosopher);
    let newPhilosophersList = this.state.game.philosophersList.splice(this.state.game.philosophersList.findIndex(philosopher => philosopher.name === defeatedPhilosopher.name), 1)
    this.setState((state, props) => ({
      game: {
        ...state.game,
        defeatedPhilosophers: newDefeatedPhilosophers,
        philosophersList: newPhilosophersList,
        philosopherDialog: []
      }
    }));
    // set new philosopher
    let newPhilosopher = this.state.game.philosophersList[Math.floor(Math.random() * this.state.game.philosophersList.length)];
    this.setState((state, props) => ({
      ...state.philosopher,
      philosopher: newPhilosopher,
    }));
    // get new randomPhilosophersList
    let newRandomPhilosophersList = this.getRandomPhilosophersList();
    this.setState((state, props) => ({
      game: {
        ...state.game,
        randomPhilosophersList: newRandomPhilosophersList,
        philosopherDefeated: false
      }
    }));
  }

  render() {
    console.log(this.state);
    if (this.state.game.gameStarted === false && this.state.game.gameOver === false) {
     return (
       <div className="Intro">
          <h1>Philosopher's Quest Game</h1>
          <div className="PlayerName">
            <p>Escribe tu nombre</p>
            <input type="text" value={this.state.player.name} onChange={evt => this.setPlayerName(evt)} /> 
          </div>
          <div>
            <p>Selecciona la dificultad</p>
            <input type="radio" name="difficulty" value="facil" onChange={evt => this.setGameDifficulty(evt)} /> Facil
            <input type="radio" name="difficulty" value="normal" onChange={evt => this.setGameDifficulty(evt)} /> Normal
            <input type="radio" name="difficulty" value="dificil" onChange={evt => this.setGameDifficulty(evt)} /> Dificil
          </div>
          <div>
            <button onClick={this.startGame}>Iniciar Juego</button>
          </div>
       </div>
      )
    } else if (this.state.game.gameStarted === true && this.state.game.gameOver === true) {
      return (
        <div className="GameOver">
          <h1>Game Over</h1>
          <button onClick={this.restartGame}>Reiniciar Juego</button>
       </div>
       )
    } else if (this.state.game.gameStarted === true && this.state.game.gameOver === false) {
      return (
        <div className="Game">
          <div className="GameHeader">
            <BossStats state={this.state}/>
          </div>
          <div className="GameBody">
            <GameScene state={this.state} />
          </div>
          <div className="GameFooter">
            <PlayerStats state={this.state}/>
          </div>
        </div>
      );
    }
  }
}

export default Game;
