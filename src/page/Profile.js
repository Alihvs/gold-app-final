import React, { Component } from 'react';
import { StyleSheet, Picker, TextInput, StatusBar, AsyncStorage, Image } from 'react-native';
import {
  Container,
  Content,
  View,
  Left,
  Right,
  Icon,
  Button,
  Toast,
  CheckBox,
  Spinner,
  Card,
  CardItem
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Colors from '../Colors';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loaded: false
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('user', (err, res) => {
      if (res) {
        const data = JSON.parse(res);
        fetch(`http://app.idamas.ir/wp-json/wp/v2/users/${data.id}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
            credentials: 'include',
            withCredentials: true,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(newResponse => this.setState({ userData: newResponse, loaded: true }));
      }
    });
  }

  render() {
    const left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name="ios-menu-outline" />
        </Button>
      </Left>
    );
    const right = <Right style={{ flex: 1 }} />;
    return (
      <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
        <Container style={{ backgroundColor: Colors.statusBarColor }}>
          <Navbar left={left} right={right} title="حساب کاربری" />
          <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
          <Content>
            {!this.state.loaded ? (
              <Spinner color={Colors.gold} />
            ) : (
              <View style={{ flex: 1 }}>
                <View
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}
                >
                  <Image
                    resizeMode={'cover'}
                    style={styles.image}
                    source={{ uri: this.state.userData.acf.image.url }}
                  />
                </View>
                <Text style={styles.titleText}>{this.state.userData.name}</Text>
                <View style={styles.infoBox}>
                  <Col size={30}>
                    <Text style={styles.infoText}>شماره ملی</Text>
                  </Col>
                  <Col size={70}>
                    <Text style={styles.infoText}>{this.state.userData.acf.melli}</Text>
                  </Col>
                </View>
                <View style={styles.infoBox}>
                  <Col size={30}>
                    <Text style={styles.infoText}>تلفن</Text>
                  </Col>
                  <Col size={70}>
                    <Text style={styles.infoText}>{this.state.userData.acf.phone}</Text>
                  </Col>
                </View>
                <View style={styles.infoBox}>
                  <Col size={30}>
                    <Text style={styles.infoText}>آدرس</Text>
                  </Col>
                  <Col size={70}>
                    <Text style={styles.infoText}>{this.state.userData.acf.address}</Text>
                  </Col>
                </View>
              </View>
            )}
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    borderRadius: 200,
    height: 150,
    borderWidth: 1,
    borderColor: Colors.gold
  },
  titleText: {
    color: Colors.gold,
    fontSize: 22,
    textAlign: 'center',
    margin: 20,
    marginTop: 5
  },
  infoBox: {
    borderRadius: 5,
    backgroundColor: Colors.grey,
    borderColor: Colors.gold,
    marginHorizontal: 15,
    marginVertical: 7,
    borderWidth: 1,
    flexDirection: 'row-reverse'
  },
  infoText: {
    color: Colors.white,
    textAlign: 'right',
    padding: 10
  }
});
