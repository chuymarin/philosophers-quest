import React, { Component } from 'react';

class PlayerStats extends Component {
  render() {
    return (
      <p className="PlayerStats">Player Name: {this.props.state.player.name} | Life Points: {this.props.state.player.lifePoints} | Battle Points: {this.props.state.player.battlePoints}</p>
    );
  }
}

export default PlayerStats;
