/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, { Component } from "react";
import { Image, TouchableOpacity, TouchableHighlight } from "react-native";
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
  Grid,
  Col,
  Spinner
} from "native-base";
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
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name="ios-cart" />
        </Button>
      </Right>
    );

    return (
      <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
        <Container style={{ backgroundColor: "#fdfdfd" }}>
          <Navbar left={left} right={right} title="نتایح جستجو" />

          <Content padder>
            {this.state.isLoaded ? (
              this.renderProducts()
            ) : (
              <Spinner color="black" />
            )}
          </Content>
          <Fab pageTitle="نتایج" />
        </Container>
      </SideMenuDrawer>
    );
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
        <Card key={stateItems[i].id}>
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
            <CardItem style={{ backgroundColor: "#eee" }}>
              <Left style={{ flexBasis: "30%" }}>
                <Image
                  source={{
                    uri: prevImage
                  }}
                  style={{ height: 70, width: 70 }}
                />
              </Left>
              <Right style={{ flexBasis: "70%" }}>
                <Body>
                  <Text style={{ fontSize: 19 }}>{`${stateItems[i].acf.type} ${
                    stateItems[i].acf.brand
                  } ${stateItems[i].acf.weight} گرمی`}</Text>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      paddingTop: 10
                    }}
                  >{`شناسه: ${stateItems[i].id}`}</Text>
                </Body>
              </Right>
            </CardItem>
          </TouchableHighlight>
        </Card>
      );
    }

    return items;
  }
}
