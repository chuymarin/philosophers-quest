import React, { Component } from 'react';

class GameScene extends Component {
  
  render() {
    return (
      <div className="GameScene">
        <div className="BossArea">
          <div className="BossRiddleArea">
            {this.props.state.game.philosopherDialog.map(function(dialog, index){
            return <p className="BossRiddleText" key={index}>{dialog}.</p>
            })}
          </div>
          <div className="BossImageArea">
            <img className="BossImage" src={"./assets/" + this.props.state.philosopher.image} alt={this.props.state.philosopher.name} />
          </div>
        </div>
        <div className="PlayerArea">
          <div className="PlayerImageArea">
            <img className="PlayerImage" src="./assets/frodo.png" alt="Frodo" />
          </div>
          <div className="PlayerAnswerArea">
            <ul className="PlayerAnswerList">
              {this.props.state.game.randomPhilosophersList.map(function(philosopher, index){
              return <li className="PlayerAnswerOption" key={index}>{philosopher.answer}.</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    ); //convertir en lista de inputs radio
  }
}
  
export default GameScene;
