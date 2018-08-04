import React, { Component } from 'react';
import { StyleSheet, View, Image, StatusBar, AsyncStorage } from 'react-native';
import { Spinner, Button, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import logo from '../assets/logo.png';
import Colors from '../Colors';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: []
    };
  }

  componentDidMount() {
    this.loadUserData();
  }

  async loadUserData() {
    await AsyncStorage.getItem('user', (err, res) => {
      if (res) {
        this.setState(
          {
            isLoggedIn: true
          },
          this.login(JSON.parse(res))
        );
      }
    });
  }

  login(data) {
    fetch('http://app.idamas.ir/wp-json/jwt-auth/v1/token', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    })
      .then(response => response.json())
      .then(recivedData => {
        if (recivedData.token) {
          Actions.home();
        } else {
          Toast.show({
            text: 'اطلاعات حساب کاربری شما اشتباه است',
            position: 'bottom',
            type: 'warning',
            textStyle: { textAlign: 'center' },
            duration: 2000
          });
          Actions.login();
        }
      })
      .catch(() => {
        Toast.show({
          text: 'اتصال خود به شبکه را بررسی کنید',
          position: 'bottom',
          type: 'warning',
          textStyle: { textAlign: 'center' },
          duration: 3000
        });
        this.setState({ isLoggedIn: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={styles.itemsContainer}>
          {this.state.isLoggedIn ? (
            <Spinner color={Colors.gold} />
          ) : (
            <Button full bordered transparent style={styles.button} onPress={() => Actions.login()}>
              <Text style={{ color: Colors.gold }}>شروع</Text>
            </Button>
          )}
        </View>
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
  itemsContainer: {
    paddingBottom: '35%'
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 7,
    marginHorizontal: '30%'
  }
});
