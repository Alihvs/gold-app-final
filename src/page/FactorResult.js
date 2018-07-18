/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { Container, View, Icon, Button, Left, Toast } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      working: true,
      factorNumber: undefined
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('FACTOR', (err, res) => {
      if (res) {
        // let date = JSON.parse(res);
        this.setState({
          factorNumber: JSON.parse(res).factorNumber
        });
      }
    });
  }

  render() {
    const left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => Actions.home()}>
          <Icon name="ios-close" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );

    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Navbar left={left} title="پیگیری فاکتور" />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '75%'
          }}
        >
          <Text>{`فاکتور شما به شماره ${
            this.state.factorNumber
          } ارسال شده و در دست بررسی است`}</Text>
          <Text>در اولین فرصت ممکن با شما تماس گرفته خواهد شد</Text>
        </View>

        <Grid
          style={{
            marginTop: 20,
            marginBottom: 10,
            flexBasis: '25%'
          }}
        >
          <Col style={{ paddingLeft: 5, paddingRight: 10 }}>
            <Button
              onPress={() => {
                Alert.alert('کنسل کردن فاکتور ارسال شده', 'فاکتور ارسال شده شما حذف شود؟', [
                  {
                    text: 'خیر',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel'
                  },
                  {
                    text: 'بله',
                    onPress: () => {
                      AsyncStorage.removeItem('FACTOR');
                      AsyncStorage.removeItem('CART');
                      Toast.show({
                        text: 'فاکتور شما پاک شد',
                        position: 'bottom',
                        type: 'success',
                        buttonText: '',
                        duration: 2000
                      });
                      Actions.home();
                    }
                  }
                ]);
              }}
              style={{ backgroundColor: Colors.navbarBackgroundColor }}
              block
              iconLeft
            >
              <Text style={{ color: '#fdfdfd' }}>کنسل کردن فاکتور ارسال شده</Text>
            </Button>
          </Col>
        </Grid>
      </Container>
    );
  }
}

// Styles
// const myStyles = StyleSheet.create({
//   tableRow: {
//     height: 50,
//     alignItems: "center"
//   },
//   tableText: {
//     fontSize: 10,
//     textAlign: "center"
//   },
//   pickerButtons: {
//     backgroundColor: "#eee",
//     width: 20,
//     height: 30
//   }
// });
