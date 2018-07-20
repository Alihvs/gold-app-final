/**
 * This is the Home page
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, AsyncStorage, BackHandler, BackAndroid, Alert, Platform } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
// import Text from '../component/Text';
import Navbar from '../component/Navbar';
// import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';
import Colors from '../Colors';
import newLogo from '../assets/logo.png';
import womanLogo from '../assets/woman.png';
import manLogo from '../assets/man.png';
import kidLogo from '../assets/kid.png';
import accLogo from '../assets/pin.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'second',
      hasFactor: false
    };
  }

  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
    // BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
    // console.log(this.props);
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid());
    // this.backHandler.remove();
    AsyncStorage.getItem('FACTOR', (err, res) => {
      if (res) {
        this.setState({
          hasFactor: true
        });
      }
    });
  }

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
        <Container>
          <Navbar left={left} right={right} title="صفحه اصلی" />
          <View style={{ backgroundColor: Colors.statusBarColor, width: '100%' }}>
            <Image
              resizeMode="contain"
              style={{
                height: 100,
                // backgroundColor: "rgba(24, 24, 25, 0.9)",
                width: '100%',
                margin: 5
              }}
              source={newLogo}
            />
          </View>
          <Content>{this.renderCategories()}</Content>
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
    const cat = [];
    for (let i = 0; i < categories.length; i++) {
      cat.push(
        <CategoryBlock
          key={categories[i].id}
          id={categories[i].id}
          image={categories[i].image}
          title={categories[i].title}
        />
      );
    }
    return cat;
  }
}

const categories = [
  {
    id: 1,
    title: 'زنانه',
    image: womanLogo
  },
  {
    id: 2,
    title: 'مردانه',
    image: manLogo
  },
  {
    id: 3,
    title: 'بچه گانه',
    image: kidLogo
  },
  {
    id: 4,
    title: 'اکسسوری',
    image: accLogo
  }
];
