/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, View, Left, Right, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Fab from '../component/Fab';
import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';

// const BASE_REQUEST_URL = 'http://app.idamas.ir/wp-json/wp/v2/';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItems: []
    };
  }

  componentDidMount() {
    this.setState({
      newItems: this.props.data
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

    items.push(
      <View
        style={{
          backgroundColor: '#2d2d2d',
          padding: 5,
          paddingRight: 15,
          height: 30
        }}
      >
        <Text style={[styles.mainText, { textAlign: 'right' }]}>
          {`${this.state.newItems.length} کالا در دسته ${this.props.title} `}
        </Text>
      </View>
    );

    for (let i = 0; i < stateItems.length; i++) {
      // Variables to pass
      const brand = stateItems[i].acf.brand;
      const type = stateItems[i].acf.type;
      const weight = stateItems[i].acf.weight;
      const ojratPercent = stateItems[i].acf.ojrat_percent;
      const ojratToman = stateItems[i].acf.ojrat_toman;
      const color = stateItems[i].acf.color;
      const size = stateItems[i].acf.size;
      const availability = stateItems[i].acf.availability;
      const canReorder = stateItems[i].acf.canReorder;
      const negindar = stateItems[i].acf.negindar;
      const addedAttributes = stateItems[i].acf.added_attributes;
      const title = stateItems[i].title.rendered;
      const image = stateItems[i].acf.images[0].image.url;
      const images = stateItems[i].acf.images;

      const prevImage = image;

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
          <Text style={{ color: Colors.white, paddingLeft: 5 }}>فاکتور</Text>
        </Button>
      </Right>
    );

    return (
      <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
        <Container style={{ backgroundColor: Colors.statusBarColor }}>
          <Navbar left={left} right={right} title="نتایج جستجو" />
          <Content padder>{this.renderProducts()}</Content>
          <Fab pageTitle={this.props.title} data={this.state.newItems} />
        </Container>
      </SideMenuDrawer>
    );
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
