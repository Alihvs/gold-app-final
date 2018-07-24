/**
 * This is the Login Page
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, View, Button, Icon, Item, Input, Toast, Spinner } from 'native-base';
import { AsyncStorage, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
      validating: false,
      username: '',
      password: '',
      hasError: false,
      errorText: ''
    };
  }

  async saveToStorage(userData) {
    if (userData) {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          isLoggedIn: true,
          token: userData.token,
          username: this.state.username,
          email: userData.user_email,
          displayName: userData.user_display_name
        })
      );
      return true;
    }
    return false;
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Container style={{ backgroundColor: Colors.statusBarColor }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 50,
              paddingRight: 50
            }}
          >
            <Item>
              <Input
                placeholder="نام کاربری"
                onChangeText={text => this.setState({ username: text })}
                placeholderTextColor={Colors.grey}
                style={{ textAlign: 'center', color: Colors.gold }}
                blurOnSubmit={false}
              />
            </Item>
            <Item>
              <Input
                placeholder="کلمه عبور"
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry
                placeholderTextColor={Colors.grey}
                ref={input => {
                  this.secondTextInput = input;
                }}
                style={{ textAlign: 'center', color: Colors.gold }}
              />
            </Item>
            {this.state.hasError ? (
              <Text style={{ color: '#c0392b', textAlign: 'center', marginTop: 10 }}>
                {this.state.errorText}
              </Text>
            ) : null}
            <View style={{ alignItems: 'center' }}>
              {!this.state.validating ? (
                <Button
                  onPress={() => {
                    Keyboard.dismiss();
                    this.setState({
                      validating: true
                    });
                    if (this.state.username && this.state.password) {
                      fetch('http://app.idamas.ir/wp-json/jwt-auth/v1/token', {
                        method: 'post',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          username: this.state.username,
                          password: this.state.password
                        })
                      })
                        .then(response => response.json())
                        .then(data => {
                          if (data.token) {
                            this.saveToStorage(data);
                            Actions.home();
                          } else {
                            this.setState({
                              validating: false
                            });
                            Toast.show({
                              text: 'مشخصات وارده شده اشتباه است',
                              position: 'bottom',
                              type: 'danger',
                              buttonText: '',
                              duration: 2000
                            });
                          }
                        });
                    } else {
                      this.setState({
                        validating: false
                      });
                      Toast.show({
                        text: 'لطفاً اطلاعات وارد شده را کنترل کنید',
                        position: 'top',
                        type: 'danger',
                        buttonText: '',
                        duration: 2000
                      });
                    }
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: Colors.gold,
                    marginTop: 50
                  }}
                >
                  <Text style={{ color: Colors.gold, width: 150, textAlign: 'center' }}>ورود</Text>
                </Button>
              ) : (
                <Spinner color={Colors.gold} />
              )}
            </View>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
