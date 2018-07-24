import React, { Component } from 'react';
import { Container, View, Icon, Fab } from 'native-base';

import { Actions } from 'react-native-router-flux';
import Colors from '../Colors';

export default class FAB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true'
    };
  }
  render() {
    return (
      <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: Colors.gold }}
        position="bottomLeft"
        onPress={() => Actions.search({ pageTitle: this.props.pageTitle })}
      >
        <Icon name="search" style={{ color: Colors.black }} />
      </Fab>
    );
  }
}
