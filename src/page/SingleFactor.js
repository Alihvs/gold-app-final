import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  BackHandler,
  StatusBar,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Container, View, Icon, Button, Left, Toast, Spinner, Switch } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

class SingleFactor extends Component {
  render() {
    const left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => Actions.home()}>
          <Icon name="ios-close" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );
    return (
      <Container style={{ backgroundColor: Colors.statusBarColor }}>
        <Navbar left={left} title="پیگیری فاکتور" />
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
        <Text>{this.props.content}</Text>
      </Container>
    );
  }
}

export default SingleFactor;
