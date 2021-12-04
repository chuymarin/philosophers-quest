import React, { Component } from 'react';
import BossStats from './BossStats';
import PlayerStats from './PlayerStats';
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
        gameCompleted: false,
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
        lifePoints: 30,
        battlePoints: 0
      }
    };
    this.setPlayerName = this.setPlayerName.bind(this);
    this.setGameDifficulty = this.setGameDifficulty.bind(this);
    this.startGame = this.startGame.bind(this);
    this.getRandomPhilosophersList = this.getRandomPhilosophersList.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.philosopherDefeated = this.philosopherDefeated.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.continue = this.continue.bind(this);
    this.gameCompleted = this.gameCompleted.bind(this);
    this.continueBattle = this.continueBattle.bind(this);
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
    randomPhilosophersList.push(newPhilosopher);
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

  checkAnswer = (e) => {
    if (parseInt(e.target.dataset.id) === this.state.philosopher.id) {
      this.philosopherDefeated();
    } else {
      this.wrongAnswer();
    }
  }

  philosopherDefeated = () => {
    // add defeatedPhilosopher to defeatedPhilosophers
    // remove defeatedPhilosopher from philosophersList
    let defeatedPhilosopher = this.state.philosopher;
    let newDefeatedPhilosophers = this.state.game.defeatedPhilosophers;
    newDefeatedPhilosophers.push(defeatedPhilosopher);
    let newPhilosophersList = this.state.game.philosophersList;
    newPhilosophersList = newPhilosophersList.filter(philosopher => philosopher.id != this.state.philosopher.id);
    let newPhilosopherDialog = this.state.game.philosopherDialog;
    newPhilosopherDialog.push("Has acertado, te dejare pasar");
    this.setState((state, props) => ({
      game: {
        ...state.game,
        philosopherDefeated: true,
        defeatedPhilosophers: newDefeatedPhilosophers,
        philosophersList: newPhilosophersList,
        philosopherDialog: newPhilosopherDialog
      },
      player: {
        ...state.player,
        battlePoints: state.player.battlePoints +1,
      }
    }));
  }

  wrongAnswer = () => {
    let newPhilosopherDialog = this.state.game.philosopherDialog;
    let newRandomDialog = this.state.game.dialogsList[Math.floor(Math.random() * this.state.game.dialogsList.length)];
    let newLifePoints = this.state.player.lifePoints -1;
    if (newLifePoints <= 0) {
      newPhilosopherDialog.push("Has perdido esta batalla");
    } else {
      newPhilosopherDialog.push(newRandomDialog);
    }
    this.setState((state, props) => ({
      game: {
        ...state.game,
        philosopherDialog: newPhilosopherDialog
      },
      player: {
        ...state.player,
        lifePoints: newLifePoints,
      }
    }));
  }

  continue = () => {
    if (this.state.game.philosophersList.length === 0){
      this.gameCompleted();
    } else if (this.state.player.lifePoints <= 0){ 
      this.gameOver();
    } else {
      this.continueBattle();
    }
  }

  continueBattle = () => {
    // set new philosopher
    let newPhilosopher = this.state.game.philosophersList[Math.floor(Math.random() * this.state.game.philosophersList.length)];
    // set philosopher dialog
    let newPhilosopherDialog = [];
    let initDialog = "Hola yo soy " + newPhilosopher.name + " Para dejarte pasar, tienes que decir cual es mi " + newPhilosopher.type;
    newPhilosopherDialog.push(initDialog);
    // get new randomPhilosophersList
    let newRandomPhilosophersList = this.getRandomPhilosophersList();
    newRandomPhilosophersList.push(newPhilosopher);
    // set state
    this.setState((state, props) => ({
      philosopher: newPhilosopher,
      game: {
        ...state.game,
        philosopherDialog: newPhilosopherDialog,
        randomPhilosophersList: newRandomPhilosophersList,
        philosopherDefeated: false
      }
    }));
  }

  gameCompleted = () => {
    this.setState((state, props) => ({
      game: {
        ...state.game,
        gameCompleted: true
      }
    }));
  }

  gameOver = () => {
    // agregar texto de que el juego fallo
    // al estar en game over tarda un click mas en en salir game over
    this.setState((state, props) => ({
      game: {
        ...state.game,
        gameOver: true
      }
    }));
  }

  restartGame = () => {
    // falta reiniciar valores al darle continuar
    this.setState((state, props) => ({
      game: {
        gameStarted: false,
        gameOver: false,
        gameCompleted: false,
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
    }));
  }

  render() {
    console.log(this.state);
    if (this.state.game.gameStarted === false && this.state.game.gameOver === false) {
     return (
       <div className="Intro">
          <h1 className="title">Philosopher's Quest Game</h1>
          <div className="column">
            <p className="label">Escribe tu nombre</p>
            <p className="label">Selecciona la dificultad</p>
            <button className="button" onClick={this.startGame}>Iniciar Juego</button>
          </div>
          <div className="column">
            <input className="input" type="text" value={this.state.player.name} onChange={evt => this.setPlayerName(evt)} />
            <select className="select" name="difficulty" id="difficulty" onChange={evt => this.setGameDifficulty(evt)}>
              <option value="facil">Facil</option>
              <option value="normal">Normal</option>
              <option value="dificil">Dificil</option>
            </select>
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
    } else if (this.state.game.gameStarted === true && this.state.game.gameOver === false && this.state.game.gameCompleted === true) {
      return (
        <div className="GameCompleted">
          <h1>Felicidades, has terminado el juego</h1>
          <button onClick={this.restartGame}>Reiniciar Juego</button>
       </div>
       )
    } else if (this.state.game.gameStarted === true && this.state.game.gameOver === false && this.state.game.gameCompleted === false) {
      return (
        <div className="Game">
          <div className="GameHeader">
            <BossStats state={this.state}/>
          </div>
          <div className="GameBody">
            <div className="GameScene">
              <div className="BossArea">
                <div className="BossRiddleArea">
                {this.state.game.philosopherDialog.map(dialog => (
                  <p className="BossRiddleText">{dialog}.</p>
                ))}
                <p className="BossRiddleText">
                {this.state.game.philosopherDefeated &&
                  <button onClick={this.continue}>Continuar</button>
                }
                {this.state.game.gameCompleted &&
                  <button onClick={this.continue}>Continuar</button>
                }
                {this.state.player.lifePoints <= 0 &&
                  <button onClick={this.continue}>Continuar</button>
                }
                </p>
                </div>
                <div className="BossImageArea">
                  <img className="BossImage" src={"http://philosophers-quest-game.s3-website-us-east-1.amazonaws.com/assets/" + this.state.philosopher.image} alt={this.state.philosopher.name} />
                </div>
              </div>
              <div className="PlayerArea">
                <div className="PlayerImageArea">
                  <img className="PlayerImage" src="./assets/Dumbledore.png" alt="Dumbledore" />
                </div>
                <div className="PlayerAnswerArea">
                  <ul className="PlayerAnswerList">
                  {this.state.game.randomPhilosophersList.map(philosopher => (
                    <li className="PlayerAnswerOption" onClick={this.checkAnswer.bind(this)} data-id={philosopher.id}>- {philosopher.answer}.</li>
                  ))}
                  </ul>
                </div>
              </div>
            </div>
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
