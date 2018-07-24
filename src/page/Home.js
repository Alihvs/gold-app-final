/**
 * This is the Home page
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import {
  Image,
  AsyncStorage,
  BackHandler,
  BackAndroid,
  Alert,
  Platform,
  TouchableOpacity,
  Text
} from 'react-native';
import { Container, View, Button, Left, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
// import Text from '../component/Text';
import Navbar from '../component/Navbar';
// import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Colors from '../Colors';
import newLogo from '../assets/logo.png';
import { Row, Grid } from 'react-native-easy-grid';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'second',
      hasFactor: false
    };
  }

  // componentDidMount() {
  //   this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  //   BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  //   console.log(this.props);
  // }

  // componentWillMount = () => {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     Alert.alert('', 'خروج از برنامه؟', [
  //       {
  //         text: 'خیر',
  //         onPress: () => console.log('No Pressed'),
  //         style: 'cancel'
  //       },
  //       { text: 'بله', onPress: () => BackAndroid.exitApp() }
  //     ]);
  //     return true;
  //   });
  // };

  // backAndroid() {
  //   if (this.props.name === 'home') {
  //     Alert.alert('', 'خروج از برنامه؟', [
  //       {
  //         text: 'خیر',
  //         onPress: () => console.log('No Pressed'),
  //         style: 'cancel'
  //       },
  //       { text: 'بله', onPress: () => BackAndroid.exitApp() }
  //     ]);
  //     return true;
  //   }
  // }

  render() {
    const left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name="ios-menu-outline" />
        </Button>
      </Left>
    );
    const right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={this.rightButtonPressed} transparent>
          <Icon name="ios-cart" />
        </Button>
      </Right>
    );

    return (
      <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
        <Container style={{ backgroundColor: 'red' }}>
          <Navbar left={left} right={right} title="صفحه اصلی" />
          <View
            style={{
              backgroundColor: Colors.black,
              width: '100%',
              paddingBottom: 10,
              borderBottomWidth: 0.5,
              borderColor: Colors.gold
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 100,
                width: '100%',
                margin: 5
              }}
              source={newLogo}
            />
          </View>
          <Grid style={{ backgroundColor: Colors.statusBarColor }}>{this.renderCategories()}</Grid>
        </Container>
      </SideMenuDrawer>
    );
  }

  rightButtonPressed() {
    AsyncStorage.getItem('FACTOR', (err, res) => {
      if (res) {
        Actions.factorResult();
      } else {
        Actions.cart();
      }
    });
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
                borderColor: '#ecc643',
                flex: 1,
                margin: 10,
                backgroundColor: '#000',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  color: Colors.gold,
                  fontSize: 32
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
