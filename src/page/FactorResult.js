/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  BackHandler,
  StatusBar,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Container, View, Icon, Button, Left, Toast, Spinner, Switch } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factors: [],
      working: true,
      loaded: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid());
  }

  backAndroid() {
    Actions.home();
    return true;
  }

  componentWillMount() {
    AsyncStorage.getItem('user', (err, res) => {
      if (res) {
        const data = JSON.parse(res);
        fetch(`http://app.idamas.ir/wp-json/wp/v2/factors?status=any&author=${data.id}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
            credentials: 'include',
            withCredentials: true,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(newResponse => {
            this.setState({ factors: newResponse, loaded: true });
            console.log(newResponse);
          });
      }
    });

    // START FETCH
    // fetch('http://app.idamas.ir/wp-json/wp/v2/factors', {
    //   method: 'get',
    //   credentials: 'include',
    //   withCredentials: true,
    //   headers: {
    //     Authorization: `Bearer ${this.props.token}`,
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(resData => {
    //     if (resData) {
    //       this.setState({
    //         factors: resData
    //       });
    //       console.log(resData);
    //     }
    //   })
    //   .catch(() => {
    //     Toast.show({
    //       text: 'اتصال خود به شبکه را بررسی کنید',
    //       position: 'top',
    //       type: 'danger',
    //       buttonText: '',
    //       duration: 3000
    //     });
    //   });
    // FINISH FETCH
  }

  render() {
    const left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => Actions.home()}>
          <Icon name="ios-close" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );

    const renderFactors = () => {
      if (this.state.factors.length <= 0) {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexBasis: '75%'
            }}
          >
            <Text>شما هیچ فاکتوری ارسال نکرده اید</Text>
          </View>
        );
      }
      const itemsToReturn = [];
      // Headers
      itemsToReturn.push(
        <View style={styles.factorsContainer}>
          <Grid style={styles.singleFactor}>
            <Col size={1}>
              <Text style={styles.singleFactorTextHeader}>ردیف</Text>
            </Col>
            <Col size={3}>
              <Text style={styles.singleFactorTextHeader}>شماره فاکتور</Text>
            </Col>
            <Col size={4}>
              <Text style={styles.singleFactorTextHeader}>زمان ارسال</Text>
            </Col>
            <Col size={3}>
              <Text style={styles.singleFactorTextHeader}>وضعیت</Text>
            </Col>
          </Grid>
        </View>
      );

      this.state.factors.map((item, i) => {
        let statusColor = '#FA0404';
        if (item.acf.status === 'در حال ارسال کالا') {
          statusColor = '#049afa';
        } else if (item.acf.status === 'پایان یافته') {
          statusColor = '#64FA04';
        }

        const time = item.date.split('T');
        itemsToReturn.push(
          <TouchableHighlight
            onPress={() => Actions.singleFactor({ content: item.content.rendered })}
          >
            <View style={styles.factorsContainer}>
              <Grid style={styles.singleFactor}>
                <Col size={1}>
                  <Text style={styles.singleFactorText}>{++i}</Text>
                </Col>
                <Col size={3}>
                  <Text style={styles.singleFactorText}>{item.id}</Text>
                </Col>
                <Col size={4}>
                  <Text style={styles.singleFactorText}>{`ارسال شده در ${time[0]} ساعت ${
                    time[1]
                  }`}</Text>
                </Col>
                <Col size={3}>
                  <Text style={[styles.singleFactorText, { color: statusColor }]}>
                    {item.acf.status === null ? 'در دست بررسی' : item.acf.status}
                  </Text>
                </Col>
              </Grid>
            </View>
          </TouchableHighlight>
        );
      });
      return itemsToReturn;
    };

    return (
      <Container style={{ backgroundColor: Colors.statusBarColor }}>
        <Navbar left={left} title="پیگیری فاکتور" />
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
        {!this.state.loaded ? <Spinner color={Colors.gold} /> : renderFactors()}
      </Container>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  factorsContainer: {
    borderWidth: 1,
    borderColor: Colors.gold,
    margin: 10,
    padding: 10,
    height: 60
  },
  singleFactor: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center'
  },
  singleFactorText: {
    textAlign: 'center',
    color: Colors.white
  },
  singleFactorTextHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white
  }
});
