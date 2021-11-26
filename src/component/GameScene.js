import React, { Component } from 'react';

// obtener 3 objectos de philosopher que no sean iguales a this.props.philosopher.id
// cada objeto de philospher debe de ser diferente
// obtener state de Player de parent Game
// function answer, si contesta bien actualiza state.question.answered = true, 
// si contesta mal, state.player.points -1
// si state.player.points -= 0 state.gameover = true

class GameScene extends Component {
  
  render() {
    return (
      <div className="GameScene">
        <div className="BossArea">
          <div className="BossRiddleArea">
            <p className="BossRiddleText">Hola yo soy {this.props.state.philosopher.name} Para dejarte pasar, tienes que decir cual es mi {this.props.state.philosopher.type}.</p>
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
              <li className="PlayerAnswerOption">Para que quiere saber eso jaja, saludos.</li>
              <li className="PlayerAnswerOption">No lo se, dime tu.</li>
              <li className="PlayerAnswerOption">El valor instrinseco e inter-subjetivo que le adjudicamos a nuestra perspectiva.</li>
              <li className="PlayerAnswerOption">{this.props.state.philosopher.answer}.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
  
export default GameScene;
