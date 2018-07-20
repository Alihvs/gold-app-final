import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import logo from '../assets/logo.png';

export default class Login extends Component {
  render() {
    return (
      // <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar barStyle="light-content" />
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.title}>B2B Jewelry Trade</Text>
              </View>
              <View style={styles.infoContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="نام کاربری"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  returnKeyType="next"
                  autoCorrect={false}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32, 53, 70)',
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
  title: {
    color: '#f7c744',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
    // backgroundColor: 'red'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#FFF',
    paddingHorizontal: 10
  }
});
