import React, { Component } from 'react';

class BossStats extends Component {
  render() {
    return (
      <p className="Boss-stats">Philosopher: {this.props.state.philosopher.name}</p>
    );
  }
}

export default BossStats;
