import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  // TouchableWithoutFeedback,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import logo from '../assets/logo.png';
import Colors from '../Colors';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (err, res) => {
      if (res) {
        // Actions.home();
        this.setState({
          isLoggedIn: true
        });
      }
    });

    setTimeout(() => {
      if (this.state.isLoggedIn) {
        Actions.home();
      } else {
        Actions.login();
      }
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <Spinner color={Colors.gold} style={styles.spinner} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.statusBarColor,
    flexDirection: 'column'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    width: 250,
    height: 70
  },
  spinner: {
    paddingBottom: '35%'
  }
});
