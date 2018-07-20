import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text Style={styles.title}>Splash Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  }
});
