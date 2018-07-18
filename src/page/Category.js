/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  AsyncStorage
} from "react-native";
import {
  Container,
  Content,
  View,
  Body,
  Left,
  Right,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Spinner
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import { Actions } from "react-native-router-flux";

// Our custom files and classes import
import Colors from "../Colors";
import Text from "../component/Text";
import Fab from "../component/Fab";
import Navbar from "../component/Navbar";
import SideMenu from "../component/SideMenu";
import SideMenuDrawer from "../component/SideMenuDrawer";
import Product from "../component/Product";

const BASE_REQUEST_URL = "http://app.idamas.ir/wp-json/wp/v2/";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      newItems: []
    };
  }

  componentDidMount() {
    let request_catagory = null;
    // Constructing the url
    switch (this.props.title) {
      case "زنانه": {
        request_catagory = "women";
        break;
      }
      case "مردانه": {
        request_catagory = "men";
        break;
      }
      case "بچه گانه": {
        request_catagory = "kid";
        break;
      }
      case "اکسسوری": {
        request_catagory = "acc";
        break;
      }
    }
    const REQUEST_URL = BASE_REQUEST_URL + request_catagory;
    fetch(REQUEST_URL, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
        "Access-Control-Allow-Credentials": "true"
      }
    })
      .then(response => response.json())
      .then(data => {
        data.map(data => {
          this.setState(prevState => ({
            newItems: [...prevState.newItems, data],
            isLoaded: true
          }));
        });
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
        <Container style={{ backgroundColor: Colors.statusBarColor }}>
          <Navbar left={left} right={right} title={this.props.title} />
          <View
            style={{
              backgroundColor: "#2d2d2d",
              padding: 5,
              paddingRight: 15,
              height: 30
            }}
          >
            <Text style={[styles.mainText, { textAlign: "right" }]}>
              {`${this.state.newItems.length} کالا در دسته ${
                this.props.title
              } یافت شد`}
            </Text>
          </View>
          <Content padder>
            {this.state.isLoaded ? (
              this.renderProducts()
            ) : (
              <Spinner color="black" />
            )}
          </Content>
          <Fab pageTitle={this.props.title} />
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

  renderProducts() {
    let items = [];
    let stateItems = this.state.newItems;

    for (var i = 0; i < stateItems.length; i++) {
      // Variables to pass
      let brand = stateItems[i].acf.brand;
      let type = stateItems[i].acf.type;
      let weight = stateItems[i].acf.weight;
      let ojrat_percent = stateItems[i].acf.ojrat_percent;
      let ojrat_toman = stateItems[i].acf.ojrat_toman;
      let color = stateItems[i].acf.color;
      let size = stateItems[i].acf.size;
      let availability = stateItems[i].acf.availability;
      let negindar = stateItems[i].acf.negindar;
      let added_attributes = stateItems[i].acf.added_attributes;
      let title = stateItems[i].title.rendered;
      let image = stateItems[i].acf.images[0].image.url;
      let images = stateItems[i].acf.images;

      let prevImage = image;

      items.push(
        <View
          key={stateItems[i].id}
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.gold,
            padding: 10
          }}
        >
          <TouchableHighlight
            onPress={() =>
              Actions.product({
                product: {
                  brand: brand,
                  type: type,
                  weight: weight,
                  ojrat_percent: ojrat_percent,
                  ojrat_toman: ojrat_toman,
                  color: color,
                  size: size,
                  availability: availability,
                  negindar: negindar,
                  added_attributes: added_attributes,
                  image: image,
                  images: images,
                  title: title
                }
              })
            }
          >
            <View>
              <Grid style={{}}>
                <Col
                  size={1}
                  style={{
                    // backgroundColor: "green",
                    paddingTop: 31
                  }}
                >
                  <Grid style={{}}>
                    {this.renderIndiAddedAttributes(added_attributes)}
                  </Grid>
                </Col>
                <Col size={1.5} style={{ paddingRight: 25 }}>
                  <Text
                    style={styles.mainText}
                  >{`${type} ${brand} ${ojrat_percent} %`}</Text>
                  <Text style={styles.subText}>{`کد کالا: ${title}`}</Text>
                  <Text style={styles.subText}>{`وزن: ${weight} گرم`}</Text>
                  <Text style={styles.subText}>{`رنگ: ${color}`}</Text>
                  <Text style={styles.subText}>{`سایز: ${size}`}</Text>
                </Col>
                <Col size={1}>
                  <Image
                    source={{
                      uri: prevImage
                    }}
                    style={{
                      height: "100%",
                      width: "100%",

                      alignSelf: "flex-end"
                    }}
                  />
                </Col>
              </Grid>
            </View>
          </TouchableHighlight>
        </View>
        // <Card transparent key={stateItems[i].id}>
        //   <TouchableHighlight
        //     onPress={() =>
        //       Actions.product({
        //         product: {
        //           brand: brand,
        //           type: type,
        //           weight: weight,
        //           ojrat_percent: ojrat_percent,
        //           ojrat_toman: ojrat_toman,
        //           color: color,
        //           size: size,
        //           availability: availability,
        //           negindar: negindar,
        //           added_attributes: added_attributes,
        //           image: image,
        //           images: images,
        //           title: title
        //         }
        //       })
        //     }
        //   >
        //     <CardItem
        //       style={{
        //         backgroundColor: Colors.statusBarColor,
        //         height: 110
        //       }}
        //     >
        //       <Left style={{ flexBasis: "60%" }}>
        //         <Body>
        //           <Text style={{ fontSize: 12, color: Colors.white }}>{`${
        //             stateItems[i].acf.type
        //           } ${stateItems[i].acf.brand} ${
        //             stateItems[i].acf.weight
        //           } گرمی`}</Text>
        //           <Text
        //             style={{
        //               alignSelf: "flex-end",
        //               paddingTop: 10
        //             }}
        //           >{`شناسه: ${stateItems[i].id}`}</Text>
        //         </Body>
        //       </Left>
        //       <Right style={{ flexBasis: "40%" }}>
        //         <Image
        //           source={{
        //             uri: prevImage
        //           }}
        //           style={{ height: 110, width: 160, marginRight: -17 }}
        //         />
        //       </Right>
        //     </CardItem>
        //   </TouchableHighlight>
        // </Card>
      );
    }

    return items;
  }
  renderIndiAddedAttributes(attribs) {
    res = [];
    attribs.map((attr, i) => {
      res.push(
        <Row key={i} style={{ height: 16 }}>
          <Col>
            <Text style={styles.subText}>{attr.value}</Text>
          </Col>
          <Col>
            <Text style={styles.subText}>{attr.item_name}</Text>
          </Col>
        </Row>
      );
    });
    return res;
  }
}

const styles = StyleSheet.create({
  mainText: {
    paddingBottom: 5,
    color: Colors.white,
    fontSize: 13,
    paddingBottom: 15
  },
  subText: {
    color: Colors.grey,
    fontSize: 11
  }
});
