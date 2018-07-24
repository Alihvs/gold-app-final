import React, { Component } from 'react';
import { Image, TouchableHighlight, StyleSheet, AsyncStorage, FlatList } from 'react-native';
import { Container, Content, View, Left, Right, Button, Icon, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Fab from '../component/Fab';
import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';

const BASE_REQUEST_URL = 'http://app.idamas.ir/wp-json/wp/v2/';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      newItems: []
    };
  }

  componentDidMount() {
    let requestCatagory = null;
    // Constructing the url
    switch (this.props.title) {
      case 'زنانه': {
        requestCatagory = 'women';
        break;
      }
      case 'مردانه': {
        requestCatagory = 'men';
        break;
      }
      case 'بچه گانه': {
        requestCatagory = 'kid';
        break;
      }
      case 'اکسسوری': {
        requestCatagory = 'acc';
        break;
      }
      default: {
        requestCatagory = 'women';
      }
    }
    const REQUEST_URL = BASE_REQUEST_URL + requestCatagory;
    fetch(REQUEST_URL, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then(response => response.json())
      .then(data => {
        data.map(recivedData => {
          this.setState(prevState => ({
            newItems: [...prevState.newItems, recivedData],
            isLoaded: true
          }));
        });
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

  renderIndividualItem(item) {
    return (
      <View
        key={item.id}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.gold,
          padding: 10
        }}
      >
        <TouchableHighlight onPress={() => Actions.product({ product: item })}>
          <View>
            <Grid style={{}}>
              <Col
                size={1}
                style={{
                  // backgroundColor: "green",
                  paddingTop: 31
                }}
              >
                <Grid style={{}}>{this.renderIndiAddedAttributes(item.acf.added_attributes)}</Grid>
              </Col>
              <Col size={1.5} style={{ paddingRight: 25 }}>
                <Text style={styles.mainText}>{`${item.acf.type} ${item.acf.brand} ${
                  item.acf.ojrat_percent
                } %`}</Text>
                <Text style={styles.subText}>{`کد کالا: ${item.title.rendered}`}</Text>
                <Text style={styles.subText}>{`وزن: ${item.acf.weight} گرم`}</Text>
                <Text style={styles.subText}>{`رنگ: ${item.acf.color}`}</Text>
                <Text style={styles.subText}>{`سایز: ${item.acf.size}`}</Text>
              </Col>
              <Col size={1}>
                <Image
                  source={{
                    uri: item.acf.images[0].image.sizes.thumbnail
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
        <Container style={{ backgroundColor: Colors.statusBarColor }}>
          <Navbar left={left} right={right} title={this.props.title} />
          {this.state.isLoaded ? (
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
          ) : (
            <View />
          )}
          <Content padder>
            {this.state.isLoaded ? (
              <FlatList
                data={this.state.newItems}
                renderItem={({ item }) => this.renderIndividualItem(item)}
                ListFooterComponent={<View style={{ height: 50 }} />}
              />
            ) : (
              <Spinner color={Colors.gold} />
            )}
          </Content>
          <Fab pageTitle={this.props.title} />
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
