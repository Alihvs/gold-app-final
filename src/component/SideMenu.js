/**
 * This is the SideMenu component used in the navbar
 **/

// React native and others libraries imports
import React, { Component } from "react";
import {
  ScrollView,
  LayoutAnimation,
  UIManager,
  Linking,
  AsyncStorage
} from "react-native";
import {
  View,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Icon,
  Grid,
  Col,
  Toast
} from "native-base";
import { Actions } from "react-native-router-flux";

// Our custom files and classes import
import SideMenuSecondLevel from "./SideMenuSecondLevel";
import Text from "./Text";
// import Login from "../page/Login";

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchError: false,
      subMenu: false,
      subMenuItems: [],
      clickedItem: ""
    };

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  render() {
    return (
      <ScrollView style={styles.container}>{this.renderMenu()}</ScrollView>
    );
  }

  renderMenu() {
    if (!this.state.subMenu) {
      return (
        <View>
          <View style={{ paddingLeft: 15, paddingRight: 15 }} />
          <View style={{ paddingRight: 15 }}>
            <List>
              <ListItem
                icon
                key={0}
                button={true}
                onPress={() => Actions.home()}
              >
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
          <View style={styles.line} />
          <View style={{ paddingRight: 15, paddingLeft: 15 }}>
            <Text style={{ marginBottom: 7 }}>ما را دنبال کنید</Text>
            <Grid>
              <Col style={{ alignItems: "center" }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-facebook"
                  onPress={() =>
                    Linking.openURL("http://www.facebook.com/").catch(err =>
                      console.error("An error occurred", err)
                    )
                  }
                />
              </Col>
              <Col style={{ alignItems: "center" }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-instagram"
                  onPress={() =>
                    Linking.openURL("http://www.instagram.com/").catch(err =>
                      console.error("An error occurred", err)
                    )
                  }
                />
              </Col>
              <Col style={{ alignItems: "center" }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-twitter"
                  onPress={() =>
                    Linking.openURL("http://www.twitter.com/").catch(err =>
                      console.error("An error occurred", err)
                    )
                  }
                />
              </Col>
              <Col style={{ alignItems: "center" }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-youtube"
                  onPress={() =>
                    Linking.openURL("http://www.youtube.com/").catch(err =>
                      console.error("An error occurred", err)
                    )
                  }
                />
              </Col>
              <Col style={{ alignItems: "center" }}>
                <Icon
                  style={{ fontSize: 18 }}
                  name="logo-snapchat"
                  onPress={() =>
                    Linking.openURL("http://www.snapchat.com/").catch(err =>
                      console.error("An error occurred", err)
                    )
                  }
                />
              </Col>
            </Grid>
          </View>
        </View>
      );
    } else {
      return (
        <SideMenuSecondLevel
          back={this.back.bind(this)}
          title={this.state.clickedItem}
          menu={this.state.subMenuItems}
        />
      );
    }
  }

  renderMenuItems() {
    let items = [];
    menuItems.map((item, i) => {
      items.push(
        <ListItem
          last={menuItems.length === i + 1}
          icon
          key={item.id}
          button={true}
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
    var animationConfig = {
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
    var animationConfig = {
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
    this.setState({ subMenu: false, subMenuItems: [], clickedItem: "" });
  }

  search(text) {
    if (this.state.search.length <= 2)
      this.setState({ searchError: true, search: "" });
    else Actions.search({ searchText: this.state.search });
  }

  logOut() {
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("FACTOR");
    AsyncStorage.removeItem("CART");

    Toast.show({
      text: "از حساب کاربری خود خارج شدید",
      position: "top",
      type: "success",
      buttonText: "بستن",
      duration: 3000
    });
    Actions.login();
  }

  renderSecondaryList() {
    return (
      <View>
        <ListItem
          last
          icon
          button={true}
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
        <ListItem last icon button={true} onPress={this.logOut}>
          <Left>
            <Icon style={{ fontSize: 18 }} name="ios-person" />
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
    backgroundColor: "#fdfdfd"
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(189, 195, 199, 0.6)",
    marginTop: 10,
    marginBottom: 10
  }
};

var menuItems = [
  {
    id: 1,
    title: "زنانه",
    subMenu: [
      {
        id: 5,
        title: "سرویس"
      },
      {
        id: 6,
        title: "نیم ست"
      },
      {
        id: 7,
        title: "دستبند"
      },
      {
        id: 8,
        title: "رنجیر"
      },
      {
        id: 9,
        title: "النگو"
      },
      {
        id: 10,
        title: "آویز تک"
      },
      {
        id: 11,
        title: "انگشتر"
      },
      {
        id: 5555,
        title: "گوشواره تک"
      }
    ]
  },
  {
    id: 2,
    title: "مردانه",
    subMenu: [
      {
        id: 12,
        title: "انگشتر"
      },
      {
        id: 13,
        title: "زنجیر"
      },
      {
        id: 14,
        title: "دستبند"
      },
      {
        id: 15,
        title: "آویز طلا"
      }
    ]
  },
  {
    id: 3,
    title: "بچه گانه",
    subMenu: [
      {
        id: 601,
        title: "سرویس"
      },
      {
        id: 602,
        title: "نیم ست"
      },
      {
        id: 603,
        title: "دستبند"
      },
      {
        id: 604,
        title: "زنجیر"
      },
      {
        id: 605,
        title: "النگو"
      },
      {
        id: 606,
        title: "آویز تک"
      },
      {
        id: 607,
        title: "انگشتر"
      },
      {
        id: 608,
        title: "گوشواره تک"
      }
    ]
  },
  {
    id: 4,
    title: "اکسسوری",
    subMenu: [
      {
        id: 701,
        title: "پابند"
      },
      {
        id: 702,
        title: "تاج"
      },
      {
        id: 703,
        title: "بازو بند"
      },
      {
        id: 704,
        title: "رو لباسی"
      },
      {
        id: 705,
        title: "پیرسینگ"
      },
      {
        id: 706,
        title: "ساعت زنانه"
      },
      {
        id: 707,
        title: "ساعت مردانه"
      },
      {
        id: 708,
        title: "آویز طلای مردانه"
      },
      {
        id: 709,
        title: "دکمه سردست"
      },
      {
        id: 710,
        title: "گیره کراوات"
      }
    ]
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
