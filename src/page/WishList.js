/**
 * This is the Search file
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, TouchableHighlight, Image } from 'react-native';
import {
  Container,
  Content,
  View,
  Header,
  Icon,
  Button,
  Left,
  Right,
  Body,
  Title,
  List,
  ListItem,
  Thumbnail
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Fab from '../component/Fab';
import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';

export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItems: []
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('WISHLIST', (err, res) => {
      // if (!res) this.setState({ newItems: [] });
      // else this.setState({ newItems: JSON.parse(res) });
      this.setState({ newItems: JSON.parse(res) });
      // console.log(JSON.parse(res));
    });
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

  renderIndiAddedAttributes(attribs) {
    const res = [];
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

  renderProducts() {
    const items = [];
    const stateItems = this.state.newItems;

    // items.push(
    //   <View
    //     style={{
    //       backgroundColor: '#2d2d2d',
    //       padding: 5,
    //       paddingRight: 15,
    //       height: 30
    //     }}
    //   >
    //     <Text style={[styles.mainText, { textAlign: 'right' }]}>
    //       {`${this.state.newItems.length} کالا در دسته ${this.props.title} `}
    //     </Text>
    //   </View>
    // );

    for (let i = 0; i < stateItems.length; i++) {
      // Variables to pass
      // const brand = stateItems[i].acf.brand;
      // const type = stateItems[i].acf.type;
      // const weight = stateItems[i].acf.weight;
      // const ojratPercent = stateItems[i].acf.ojrat_percent;
      // const ojratToman = stateItems[i].acf.ojrat_toman;
      // const color = stateItems[i].acf.color;
      // const size = stateItems[i].acf.size;
      // const availability = stateItems[i].acf.availability;
      // const canReorder = stateItems[i].acf.canReorder;
      // const negindar = stateItems[i].acf.negindar;
      // const addedAttributes = stateItems[i].acf.added_attributes;
      // const title = stateItems[i].title.rendered;
      // const image = stateItems[i].acf.images[0].image.url;
      // const images = stateItems[i].acf.images;

      const brand = stateItems[i].brand;
      const type = stateItems[i].type;
      const weight = stateItems[i].weight;
      const ojratPercent = stateItems[i].ojrat_percent;
      const ojratToman = stateItems[i].ojrat_toman;
      const color = stateItems[i].color;
      const size = stateItems[i].size;
      const availability = stateItems[i].availability;
      const canReorder = stateItems[i].canReorder;
      const negindar = stateItems[i].negindar;
      const addedAttributes = stateItems[i].added_attributes;
      const title = stateItems[i].title.rendered;
      // const image = stateItems[i].images[0].image.url;
      const images = stateItems[i].images;

      // const prevImage = image;

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
                  brand,
                  type,
                  weight,
                  ojratPercent,
                  ojratToman,
                  color,
                  size,
                  availability,
                  negindar,
                  addedAttributes,
                  image,
                  images,
                  title,
                  canReorder
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
                  <Grid style={{}}>{this.renderIndiAddedAttributes(addedAttributes)}</Grid>
                </Col>
                <Col size={1.5} style={{ paddingRight: 25 }}>
                  <Text style={styles.mainText}>{`${type} ${brand} ${ojratPercent} %`}</Text>
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
                      height: '100%',
                      width: '100%',

                      alignSelf: 'flex-end'
                    }}
                  />
                </Col>
              </Grid>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
    return items;
  }

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
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Navbar left={left} title="علاقه مندی ها" />
        <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
          <Container style={{ backgroundColor: Colors.statusBarColor }}>
            <Content padder>{this.renderProducts()}</Content>
            <Fab pageTitle={this.props.title} data={this.state.newItems} />
          </Container>
        </SideMenuDrawer>
      </Container>
    );
  }

  // itemClicked(item) {
  //   Actions.product({ product: item });
  // }

  removeItemPressed(item) {
    Alert.alert(`Remove ${item.title}`, 'Are you sure you want this item from your wishlist ?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => this.removeItem(item) }
    ]);
  }

  removeItem(itemToRemove) {
    const items = [];
    this.state.newItems.map(item => {
      if (JSON.stringify(item) !== JSON.stringify(itemToRemove)) items.push(item);
    });
    this.setState({ items });
    AsyncStorage.setItem('WISHLIST', JSON.stringify(items));
  }
}

const styles = StyleSheet.create({
  mainText: {
    // paddingBottom: 5,
    color: Colors.white,
    fontSize: 13,
    paddingBottom: 15
  },
  subText: {
    color: Colors.grey,
    fontSize: 11
  }
});
