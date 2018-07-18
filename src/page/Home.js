/**
 * This is the Home page
 **/

// React native and others libraries imports
import React, { Component } from "react";
import { Image, Dimensions, StyleSheet, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  View,
  Button,
  Left,
  Right,
  Icon,
  Card,
  CardItem,
  cardBody
} from "native-base";
import { Actions } from "react-native-router-flux";

// Our custom files and classes import
import Text from "../component/Text";
import Navbar from "../component/Navbar";
import SideMenu from "../component/SideMenu";
import SideMenuDrawer from "../component/SideMenuDrawer";
import CategoryBlock from "../component/CategoryBlock";
import Colors from "../Colors";
import newLogo from "../assets/logo.png";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "second",
      hasFactor: false
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("FACTOR", (err, res) => {
      if (res) {
        this.setState({
          hasFactor: true
        });
      }
    });
  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name="ios-menu-outline" />
        </Button>
      </Left>
    );
    var right = (
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
          <View
            style={{ backgroundColor: Colors.statusBarColor, width: "100%" }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 100,
                // backgroundColor: "rgba(24, 24, 25, 0.9)",
                width: "100%",
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
    AsyncStorage.getItem("FACTOR", (err, res) => {
      if (res) {
        Actions.factorResult();
      } else {
        Actions.cart();
      }
    });
  }

  renderCategories() {
    let cat = [];
    for (var i = 0; i < categories.length; i++) {
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

var categories = [
  {
    id: 1,
    title: "زنانه",
    image:
      "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1531628438/gold-app/woman02.png"
  },
  {
    id: 2,
    title: "مردانه",
    image:
      "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1531628438/gold-app/man02.png"
  },
  {
    id: 3,
    title: "بچه گانه",
    image:
      "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1531628438/gold-app/BABY02.png"
  },
  {
    id: 4,
    title: "اکسسوری",
    image:
      "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1531628438/gold-app/pin02.png"
  }
];
