import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import { Container, View, Button, Left, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Row, Grid } from 'react-native-easy-grid';

import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Colors from '../Colors';
import newLogo from '../assets/logo.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'second',
      hasFactor: false
    };
  }

  render() {
    const left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Text style={{ color: Colors.white, paddingRight: 5 }}>منو</Text>
          <Icon name="ios-menu-outline" />
        </Button>
      </Left>
    );
    const right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={this.rightButtonPressed} transparent>
          <Icon name="paper" />
          <Text style={{ color: Colors.white, paddingLeft: 5 }}>فاکتور</Text>
        </Button>
      </Right>
    );

    return (
      <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
        <Container>
          <Navbar left={left} right={right} title="صفحه اصلی" />
          <StatusBar backgroundColor={Colors.black} />
          <TouchableWithoutFeedback onPress={() => this._sideMenuDrawer.open()}>
            <View
              style={{
                backgroundColor: Colors.black,
                paddingBottom: 10
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  height: (Dimensions.get('window').height * 16) / 100,
                  width: (Dimensions.get('window').width * 90) / 100,
                  margin: 5,
                  alignSelf: 'center'
                }}
                source={newLogo}
              />
            </View>
          </TouchableWithoutFeedback>
          <Grid
            style={{
              backgroundColor: Colors.statusBarColor
            }}
          >
            {this.renderCategories()}
          </Grid>
        </Container>
      </SideMenuDrawer>
    );
  }

  rightButtonPressed() {
    Actions.cart();
  }

  renderCategories() {
    const res = [];
    categories.map(item => {
      res.push(
        <Row key={item.id}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.3}
            onPress={() => Actions.category({ id: item.id, title: item.title })}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.gold,
                flex: 1,
                backgroundColor: Colors.black,
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  color: Colors.gold,
                  fontSize: Math.floor(Dimensions.get('window').width / 12)
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        </Row>
      );
    });
    return res;
  }
}

const categories = [
  {
    id: 1,
    title: 'زنانه'
  },
  {
    id: 2,
    title: 'مردانه'
  },
  {
    id: 3,
    title: 'بچه گانه'
  },
  {
    id: 4,
    title: 'اکسسوری'
  }
];
