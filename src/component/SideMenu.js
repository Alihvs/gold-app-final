/**
 * This is the SideMenu component used in the navbar
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, LayoutAnimation, UIManager, Linking, AsyncStorage } from 'react-native';
import { View, List, ListItem, Body, Left, Right, Icon, Grid, Col, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import SideMenuSecondLevel from './SideMenuSecondLevel';
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
          <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 30 }} />
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
          <View style={{ paddingRight: 15, paddingTop: 10 }}>
            <List>{this.renderSecondaryList()}</List>
          </View>

          <View style={styles.line} />
          <View style={{ paddingRight: 15, paddingLeft: 15 }}>
            <Text style={{ marginBottom: 25 }}>ما را دنبال کنید</Text>
            <Grid>
              <Col style={{ alignItems: 'center' }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-facebook"
                  onPress={() =>
                    Linking.openURL('http://www.facebook.com/').catch(err =>
                      console.error('An error occurred', err)
                    )
                  }
                />
              </Col>
              <Col style={{ alignItems: 'center' }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-instagram"
                  onPress={() =>
                    Linking.openURL('http://www.instagram.com/').catch(err =>
                      console.error('An error occurred', err)
                    )
                  }
                />
              </Col>
              <Col style={{ alignItems: 'center' }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-twitter"
                  onPress={() =>
                    Linking.openURL('http://www.twitter.com/').catch(err =>
                      console.error('An error occurred', err)
                    )
                  }
                />
              </Col>
              <Col style={{ alignItems: 'center' }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-youtube"
                  onPress={() =>
                    Linking.openURL('http://www.youtube.com/').catch(err =>
                      console.error('An error occurred', err)
                    )
                  }
                />
              </Col>
              <Col style={{ alignItems: 'center' }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-snapchat"
                  onPress={() =>
                    Linking.openURL('http://www.snapchat.com/').catch(err =>
                      console.error('An error occurred', err)
                    )
                  }
                />
              </Col>
            </Grid>
          </View>
        </View>
      );
    }
    return (
      <SideMenuSecondLevel
        back={this.back.bind(this)}
        title={this.state.clickedItem}
        menu={this.state.subMenuItems}
      />
    );
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
      </View>
    );

    // let secondaryItems = [];
    // menusSecondaryItems.map((item, i) => {
    //   secondaryItems.push(
    //     <ListItem
    //       last
    //       icon
    //       key={item.id}
    //       button={true}
    //       onPress={Actions[item.key]}
    //     >
    //       <Left>
    //         <Icon style={{ fontSize: 18 }} name={item.icon} />
    //       </Left>
    //       <Body style={{ marginLeft: -15 }}>
    //         <Text style={{ fontSize: 16 }}>{item.title}</Text>
    //       </Body>
    //     </ListItem>
    //   );
    // });
    // return secondaryItems;
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

// const menusSecondaryItems = [
//   {
//     id: 19,
//     title: "علاقه مندی ها",
//     icon: "heart",
//     key: "wishlist"
//   },
//   {
//     id: 190,
//     title: "خروج",
//     icon: "ios-person",
//     key: "logout",
//     click: this.logOut
//   }
// ];
