import React, { Component } from 'react';
import { StatusBar, ScrollView, Dimensions, WebView } from 'react-native';
import { Container, View, Icon, Button, Left } from 'native-base';
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
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="ios-close" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );
    return (
      <Container style={{ backgroundColor: Colors.white }}>
        <Navbar left={left} title={`فاکتور ${this.props.id}`} />
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0,
            padding: 20,
            borderBottomWidth: 1
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontSize: 20
            }}
          >{`وضعیت فاکتور: ${this.props.status}`}</Text>
        </View>
        <WebView
          source={{ html: `${this.props.content}` }}
          style={{ marginTop: 20, backgroundColor: Colors.white }}
        />
      </Container>
    );
  }
}

export default SingleFactor;
