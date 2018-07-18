/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  View,
  Icon,
  Button,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Thumbnail,
  Toast
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
// import product from '../component/Product';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      token: '',
      customerName: '',
      sentFactor: false
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('CART', (err, res) => {
      if (!res) this.setState({ cartItems: [] });
      else {
        this.setState({ cartItems: JSON.parse(res) });
      }
    });
  }

  renderIndivudualCartItems() {
    const itemsToRender = [];
    let counter = 1;
    this.state.cartItems.map((item, i) => {
      itemsToRender.push(
        <ListItem thumbnail key={i}>
          <Left>
            <Thumbnail square small source={{ uri: item.image }} />
            <Button
              transparent
              onPress={() => {
                Alert.alert(
                  `پاک کردن ${item.title}`,
                  'آیا اطمینان دارید که می خواهید این محصول را از فاکتور خرید حذف کنید؟',
                  [
                    {
                      text: 'خیر',
                      onPress: () => console.log('No Pressed'),
                      style: 'cancel'
                    },
                    { text: 'بله', onPress: () => this.removeItem(item) }
                  ]
                );
              }}
            >
              <Icon style={{ color: 'red' }} name="close" />
            </Button>
          </Left>
          <Body style={{ paddingRight: 20 }}>
            <Text style={{ fontSize: 10 }}>{`کد ${item.title} - ${item.type} ${item.weight} گرمی ${
              item.brand
            }`}</Text>
            <Text style={{ fontSize: 10 }}>{`رنگ: ${item.color} - سایز: ${item.size}`}</Text>
          </Body>
          <Right style={{ borderLeftWidth: 1 }}>
            <Text style={{ paddingLeft: 20 }}>{counter++}</Text>
          </Right>
        </ListItem>
      );
    });
    return itemsToRender;
  }

  renderAddedAttributes(item) {
    const toRender = [];
    item.addedAttributes.map((attr, i) => {
      toRender.push(
        <Text style={myStyles.tableText} key={i}>{`${attr.item_name}: ${attr.value}`}</Text>
      );
    });
    toRender.push(
      <Text
        style={[myStyles.tableText, { borderTopWidth: 0.5 }]}
      >{`مجموع: ${this.sumAddedAttributes(item)}`}</Text>
    );
    return toRender;
  }

  renderCartItems() {
    const itemsToRender = [];
    itemsToRender.push(
      <Col
        style={{
          width: 60,
          alignItems: 'center',
          borderWidth: 0.4,
          backgroundColor: '#eee'
        }}
      >
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>ردیف</Text>
        </Row>
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>کد کالا</Text>
        </Row>
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>کالا</Text>
        </Row>
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>ملحقات کالا (تومان)</Text>
        </Row>
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>وزن کالا (گرم)</Text>
        </Row>
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>وزن کالا + درصد کالا (گرم)</Text>
        </Row>
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>اجرت کالا (تومان)</Text>
        </Row>
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>تعداد</Text>
        </Row>
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>وزن نهایی(گرم)</Text>
        </Row>
        <Row style={myStyles.tableRow}>
          <Text style={myStyles.tableText}>مبلغ کل</Text>
        </Row>
      </Col>
    );
    this.state.cartItems.map((item, i) => {
      // const toRender = [];
      itemsToRender.push(
        <Col
          style={{
            width: 100,
            alignItems: 'center',
            borderWidth: 0.4
          }}
          key={i}
        >
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{i + 1}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{item.title}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{`${item.type} ${item.ojratPercent} ٪`}</Text>
          </Row>
          <Row style={[myStyles.tableRow, { alignSelf: 'flex-end', paddingRight: 5 }]}>
            <View>{this.renderAddedAttributes(item)}</View>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{item.weight}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{this.calcWeightPlusPercernt(item)}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{`${item.ojratToman} تومان`}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Grid
              style={{
                alignItems: 'center',
                flexDirection: 'row'
              }}
            >
              {/* <Col>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => {
                    //Increaase quantity
                    this.increaseQuantity(item, i);
                  }}
                >
                  <Icon name="add" />
                </TouchableOpacity>
              </Col> */}
              <Col>
                <TouchableOpacity
                  style={{ alignItems: 'center', marginRight: -10 }}
                  onPress={() => {
                    //Decreaase quantity
                    this.decreaseQuantity(item, i);
                  }}
                >
                  <Icon name="remove" />
                </TouchableOpacity>
              </Col>
              <Col style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14 }}>{this.state.cartItems[i].quantity}</Text>
              </Col>
              <Col>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => {
                    //Increaase quantity
                    this.increaseQuantity(item, i);
                  }}
                >
                  <Icon name="add" />
                </TouchableOpacity>
              </Col>
            </Grid>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>
              {(this.calcWeightPlusPercernt(item) * item.quantity).toFixed(3)}
            </Text>
          </Row>

          <Row style={myStyles.tableRow}>
            <Text>{this.calcFinalPrice(item)}</Text>
          </Row>
        </Col>
      );
    });
    return itemsToRender;
  }

  render() {
    const left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="ios-close" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );

    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Navbar left={left} title="فاکتور" />
        {this.state.cartItems.length <= 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon
              name="ios-cart"
              size={38}
              style={{ fontSize: 38, color: '#95a5a6', marginBottom: 7 }}
            />
            <Text style={{ color: '#95a5a6' }}>فاکتور شما خالی است</Text>
          </View>
        ) : (
          <Content
            contentContainerStyle={{
              padding: 5
            }}
          >
            <Text
              style={{
                borderBottomWidth: 1,
                paddingBottom: 15,
                paddingTop: 15
              }}
            >
              شرح کالا
            </Text>
            {/* New Table Start, oh god... */}
            <View style={{}}>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  // backgroundColor: "red",
                  height: 500
                }}
              >
                <Grid
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  {this.renderCartItems()}
                </Grid>
              </ScrollView>
              {/* New Table FINISH, oh god... */}
            </View>
            <Grid style={{ flexDirection: 'column', padding: 10 }}>
              <Row style={{}}>
                <Col style={{ backgroundColor: '#eee', alignItems: 'center' }}>
                  <Text>تعداد کل</Text>
                  <Text>{this.sumQuantity()}</Text>
                </Col>
                <Col style={{ backgroundColor: '#eee', alignItems: 'center' }}>
                  <Text>جمع وزن</Text>
                  <Text>{this.sumWeight()}</Text>
                </Col>
                <Col style={{ backgroundColor: '#eee', alignItems: 'center' }}>
                  <Text>جمع مبلغ</Text>
                  <Text>{this.sumPrice()}</Text>
                </Col>
              </Row>
            </Grid>
            <Grid style={{ flexDirection: 'column', padding: 10 }}>
              <Text
                style={{
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                  paddingTop: 15
                }}
              >
                آیتم های موجود در فاکتور
              </Text>
              <List style={{ borderBottomWidth: 1 }}>{this.renderIndivudualCartItems()}</List>
            </Grid>
            <Grid style={{ marginTop: 20, marginBottom: 10 }}>
              <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
                <Button
                  onPress={() => {
                    Alert.alert(
                      'خالی کردن فاکتور',
                      'آیا اطمینان دارید که می خواهید فاکتور خرید خود را خالی کنید؟',
                      [
                        {
                          text: 'خیر',
                          onPress: () => console.log('No Pressed'),
                          style: 'cancel'
                        },
                        {
                          text: 'بله',
                          onPress: () => {
                            this.setState({ cartItems: [] });
                            AsyncStorage.setItem('CART', JSON.stringify([]));
                          }
                        }
                      ]
                    );
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.navbarBackgroundColor
                  }}
                  block
                  iconRight
                  transparent
                >
                  <Text style={{ color: Colors.navbarBackgroundColor }}>پاک کردن فاکتور</Text>
                </Button>
              </Col>
              <Col style={{ paddingLeft: 5, paddingRight: 10 }}>
                <Button
                  onPress={() => this.checkout()}
                  style={{ backgroundColor: Colors.navbarBackgroundColor }}
                  block
                  iconLeft
                >
                  <Text style={{ color: '#fdfdfd' }}>ارسال نهایی فاکتور</Text>
                </Button>
              </Col>
            </Grid>
          </Content>
        )}
      </Container>
    );
  }

  increaseQuantity(item, index) {
    const obj = this.state.cartItems[index];
    obj.quantity = item.quantity + 1;
    this.setState({
      obj
    });
  }

  decreaseQuantity(item, index) {
    const obj = this.state.cartItems[index];
    if (obj.quantity <= 1) {
      Alert.alert('تعداد نمی تواند کمتر از 1 باشد');
      obj.quantity = 1;
      return;
    }
    obj.quantity = item.quantity - 1;
    this.setState({
      obj
    });
  }

  // Functional functions
  removeItem(itemToRemove) {
    const items = [];
    this.state.cartItems.map(item => {
      if (JSON.stringify(item) !== JSON.stringify(itemToRemove)) items.push(item);
    });
    this.setState({ cartItems: items });
    AsyncStorage.setItem('CART', JSON.stringify(items));
  }

  // Math functions
  sumQuantity() {
    const obj = this.state.cartItems;
    let sum = 0;
    obj.map(item => {
      sum += item.quantity;
    });
    return `${sum} عدد`;
  }

  sumWeight() {
    const obj = this.state.cartItems;
    let sum = 0;
    obj.map(item => {
      sum += Number(
        (item.weight * item.ojratPercent) / 100 + Number(item.weight) * Number(item.quantity)
      );
    });
    return `${sum.toFixed(3)} گرم`;
  }

  sumPrice() {
    const obj = this.state.cartItems;
    let sum = 0;
    obj.map(item => {
      sum += this.calcFinalPrice(item);
    });
    return `${sum.toFixed(0)} تومان`;
  }

  sumAddedAttributes(item) {
    let sum = 0;
    item.addedAttributes.map(item => {
      sum += Number(item.value);
    });
    return sum;
  }

  calcWeightPlusPercernt(item) {
    const res = Number(item.weight * item.ojratPercent) / 100 + Number(item.weight);
    return res.toFixed(3);
  }

  calcFinalPrice(item) {
    const res =
      Number(this.sumAddedAttributes(item) * Number(item.quantity)) +
      Number(Number(item.weight) * Number(item.ojratToman) * Number(item.quantity));
    return res;
  }

  constructTable() {
    let res = '';
    const items = this.state.cartItems;

    items.map((product, i) => {
      res += `
      <tr>
        <td>${++i}</td>
        <td>${product.title}</td>
        <td>${product.type} ${product.ojrat_percent}</td>
        <td>${this.sumAddedAttributes(product)}</td>
        <td>${product.weight}</td>
        <td>${product.ojrat_toman}</td>
        <td>${product.quantity}</td>
        <td>${this.calcWeightPlusPercernt(product)}</td>
        <td>${this.calcFinalPrice(product)}</td>
      </tr>
      `;
    });
    res += `
    </table>
    <table style="width:100%; text-align: right;">
      <tr>
        <th>تعداد کل</th>
        <th>جمع وزن</th>
        <th>جمع مبلغ</th>
      </tr>
      <tr>
        <td>${this.sumQuantity()}</td>
        <td>${this.sumWeight()}</td>
        <td>${this.sumPrice()}</td>
      </tr>
    </table>
    `;
    return res;
  }

  checkout() {
    AsyncStorage.getItem('user', (err, res) => {
      const data = JSON.parse(res);
      const factorNumber = Math.floor(Math.random() * 100000);
      const customerName = data.displayName;
      const customerPhone = data.username;
      this.setState({
        token: data.token
      });

      const content = `
      <h2 style="text-align: right;">فاکتور شماره : ${factorNumber}</h2>
      <table style="width:100%; text-align: right;">
        <tr>
          <th>ردیف</th>
          <th>کد کالا</th>
          <th>کالا</th>
          <th>مجموع ملحقات</th>
          <th>وزن</th>
          <th>اجرت</th>
          <th>تعداد</th>
          <th>وزن نهایی</th>
          <th>مبلغ</th>
        </tr>
        ${this.constructTable()}
      
      `;

      fetch('http://app.idamas.ir/wp-json/wp/v2/factors', {
        method: 'post',
        credentials: 'include',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `فاکتور شماره ${factorNumber} - ${customerName} - ${customerPhone}`,
          content
        })
      })
        .then(response => response.json())
        .then(resData => {
          if (resData) {
            Toast.show({
              text: 'فاکتور شما با موفقیت ارسال شد',
              position: 'top',
              type: 'success',
              buttonText: '',
              duration: 2000
            });
            this.setState({
              sentFactor: true
            });
            //Set AsyncStorage for the current Factor

            AsyncStorage.setItem(
              'FACTOR',
              JSON.stringify({
                factorNumber
              })
            );

            Actions.factorResult();
          }
        })
        .catch(() => {
          Toast.show({
            text: 'اتصال خود به شبکه را بررسی کنید',
            position: 'top',
            type: 'danger',
            buttonText: '',
            duration: 3000
          });
          this.setState({
            sentFactor: false
          });
        });
    });
  }
}

// Styles
const myStyles = StyleSheet.create({
  tableRow: {
    height: 50,
    alignItems: 'center'
  },
  tableText: {
    fontSize: 10,
    textAlign: 'center'
  },
  pickerButtons: {
    backgroundColor: '#eee',
    width: 20,
    height: 30
  }
});

// const styles = {
//   title: {
//     fontFamily: "Roboto",
//     fontWeight: "100"
//   }
// };

// removeItemPressed(item) {
//   Alert.alert(
//     "پاک کردن " + item.title,
//     "آیا اطمینان دارید که می خواهید این محصول را از فاکتور خرید حذف کنید؟",
//     [
//       {
//         text: "خیر",
//         onPress: () => console.log("No Pressed"),
//         style: "cancel"
//       },
//       { text: "بله", onPress: () => this.removeItem(item) }
//     ]
//   );
// }

// removeAllPressed() {
//   this.setState({ cartItems: [] });
//   AsyncStorage.setItem("CART", JSON.stringify([]));
// Alert.alert(
//   "خالی کردن فاکتور",
//   "آیا اطمینان دارید که می خواهید فاکتور خرید خود را خالی کنید؟",
//   [
//     {
//       text: "خیر",
//       onPress: () => console.log("No Pressed"),
//       style: "cancel"
//     },
//     {
//       text: "بله",
//       onPress: () => {
//         // this.setState({ cartItems: [] });
//         // AsyncStorage.setItem("CART", JSON.stringify([]));
//         // alert(1);

//       }
//     }
//   ]
// );
// }

// removeAll() {
//   this.setState({ cartItems: [] });
//   AsyncStorage.setItem("CART", JSON.stringify([]));
// }

// itemClicked(item) {
//   Actions.product({ product: item });
// }
