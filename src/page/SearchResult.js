import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  AsyncStorage,
  FlatList,
  StatusBar
} from 'react-native';
import { Container, Content, View, Left, Right, Button, Icon, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Fab from '../component/Fab';
import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      newItems: []
    };
  }

  componentDidMount() {
    this.setState({ newItems: this.props.data });
  }

  rightButtonPressed() {
    Actions.cart();
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
          <Icon name="paper" />
          <Text style={{ color: Colors.white, paddingLeft: 5 }}>فاکتور</Text>
        </Button>
      </Right>
    );

    return (
      <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
        <Container style={{ backgroundColor: Colors.statusBarColor }}>
          <Navbar left={left} right={right} title="نتایج" />
          <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
          <View
            style={{
              backgroundColor: '#2d2d2d',
              padding: 5,
              paddingRight: 15,
              height: 30
            }}
          >
            <Text style={[styles.mainText, { textAlign: 'right' }]}>
              {`${this.state.newItems.length} کالا`}
            </Text>
          </View>
          <Content padder>
            <FlatList
              data={this.state.newItems}
              renderItem={({ item }) => this.renderIndividualItem(item)}
              ListFooterComponent={<View style={{ height: 50 }} />}
            />
          </Content>
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
