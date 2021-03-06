/**
 * This is the SideMenu component used in the navbar
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, LayoutAnimation, UIManager, AsyncStorage, BackAndroid } from 'react-native';
import { View, List, ListItem, Body, Left, Right, Icon, Grid, Col, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import call from 'react-native-phone-call';

// Our custom files and classes import
// import SideMenuSecondLevel from './SideMenuSecondLevel';
import Text from './Text';
// import Login from "../page/Login";

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      token: '',
      searchError: false,
      subMenu: false,
      subMenuItems: [],
      clickedItem: ''
    };

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount() {
    AsyncStorage.getItem('user', (err, res) => {
      const data = JSON.parse(res);
      this.setState({
        token: data.token
      });
    });
  }

  render() {
    return <ScrollView style={styles.container}>{this.renderMenu()}</ScrollView>;
  }

  renderMenu() {
    if (!this.state.subMenu) {
      return (
        <View>
          <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10 }} />
          <View style={{ paddingRight: 15 }}>
            <List>
              <ListItem icon key={0} button onPress={() => Actions.home()}>
                <Body>
                  <Text>صفحه اصلی</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward" />
                </Right>
              </ListItem>
              {this.renderMenuItems()}
            </List>
          </View>
          <View style={styles.line} />
          <View style={{ paddingRight: 15 }}>
            <List>{this.renderSecondaryList()}</List>
          </View>
        </View>
      );
    }
  }

  renderMenuItems() {
    const items = [];
    menuItems.map((item, i) => {
      items.push(
        <ListItem
          last={menuItems.length === i + 1}
          icon
          key={item.id}
          button
          onPress={() => this.itemClicked(item)}
        >
          <Body>
            <Text>{item.title}</Text>
          </Body>
          <Right>
            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  itemClicked(item) {
    if (!item.subMenu || item.subMenu.length <= 0) {
      Actions.category({ id: item.id, title: item.title });
      return;
    }
    const animationConfig = {
      duration: 150,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      }
    };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({
      subMenu: true,
      subMenuItems: item.subMenu,
      clickedItem: item.title
    });
  }

  back() {
    const animationConfig = {
      duration: 150,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      }
    };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({ subMenu: false, subMenuItems: [], clickedItem: '' });
  }

  search(text) {
    if (this.state.search.length <= 2) this.setState({ searchError: true, search: '' });
    else Actions.search({ searchText: this.state.search });
  }

  logOut() {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('FACTOR');
    AsyncStorage.removeItem('CART');
    AsyncStorage.removeItem('QUANTITIES');
    AsyncStorage.removeItem('SEARCHPARAMS');

    Toast.show({
      text: 'از حساب کاربری خود خارج شدید',
      position: 'top',
      type: 'warning',
      textStyle: { textAlign: 'center' },
      buttonText: '',
      duration: 3000
    });
    Actions.login();
  }

  renderSecondaryList() {
    const args = {
      number: '02155620995', // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    return (
      <View>
        <ListItem last icon button onPress={() => Actions.cart()}>
          <Left>
            <Icon style={{ fontSize: 18 }} name="paper" />
          </Left>
          <Body style={{ marginLeft: -15 }}>
            <Text style={{ fontSize: 16 }}>فاکتور فعال</Text>
          </Body>
        </ListItem>
        <ListItem
          last
          icon
          button
          onPress={() => Actions.factorResult({ token: this.state.token })}
        >
          <Left>
            <Icon style={{ fontSize: 18 }} name="copy" />
          </Left>
          <Body style={{ marginLeft: -15 }}>
            <Text style={{ fontSize: 16 }}>فاکتور های ارسال شده</Text>
          </Body>
        </ListItem>
        <ListItem
          last
          icon
          button
          onPress={() => {
            Actions.wishlist();
          }}
        >
          <Left>
            <Icon style={{ fontSize: 18 }} name="heart" />
          </Left>
          <Body style={{ marginLeft: -15 }}>
            <Text style={{ fontSize: 16 }}>علاقه مندی ها</Text>
          </Body>
        </ListItem>
        <ListItem last icon button onPress={() => call(args).catch(console.error)}>
          <Left>
            <Icon style={{ fontSize: 18 }} name="call" />
          </Left>
          <Body style={{ marginLeft: -15 }}>
            <Text style={{ fontSize: 16 }}>تماس با ما</Text>
          </Body>
        </ListItem>
        <ListItem last icon button onPress={() => Actions.profile()}>
          <Left>
            <Icon style={{ fontSize: 18 }} name="contact" />
          </Left>
          <Body style={{ marginLeft: -15 }}>
            <Text style={{ fontSize: 16 }}>حساب کاربری</Text>
          </Body>
        </ListItem>
        <ListItem last icon button onPress={this.logOut}>
          <Left>
            <Icon style={{ fontSize: 18 }} name="log-out" />
          </Left>
          <Body style={{ marginLeft: -15 }}>
            <Text style={{ fontSize: 16 }}>خروج از حساب کاربری</Text>
          </Body>
        </ListItem>
        <ListItem last icon button onPress={() => BackAndroid.exitApp()}>
          <Left>
            <Icon style={{ fontSize: 18 }} name="exit" />
          </Left>
          <Body style={{ marginLeft: -15 }}>
            <Text style={{ fontSize: 16 }}>خروج از برنامه</Text>
          </Body>
        </ListItem>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  }
};

var menuItems = [
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
