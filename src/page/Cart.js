import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
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
  Toast,
  Spinner
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      token: '',
      customerName: '',
      sentFactor: false,
      quantities: []
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('QUANTITIES', (err, res) => {
      if (!res) this.setState({ quantities: [] });
      else {
        this.setState({ quantities: JSON.parse(res) });
        console.log(res);
      }
    });

    AsyncStorage.getItem('CART', (err, res) => {
      if (!res) this.setState({ cartItems: [] });
      else {
        this.setState({ cartItems: JSON.parse(res) });
      }

      if (res) {
        for (let i = 0; i < JSON.parse(res).length; i++) {
          this.setState(prevState => ({
            quantities: [...prevState.quantities, 1]
          }));
        }
      }
    });
  }

  componentWillUnmount() {
    AsyncStorage.setItem('QUANTITIES', JSON.stringify(this.state.quantities));
    console.log('UNMOUNTING');
  }

  renderIndivudualCartItems() {
    const itemsToRender = [];
    let counter = 1;
    this.state.cartItems.map((item, i) => {
      itemsToRender.push(
        <ListItem thumbnail key={i}>
          <Left>
            <Thumbnail square small source={{ uri: item.acf.images[0].image.sizes.thumbnail }} />
            <Button
              transparent
              onPress={() => {
                Alert.alert(
                  `پاک کردن ${item.title.rendered}`,
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
            <Text style={{ fontSize: 10 }}>{`کد ${item.title.rendered} - ${item.acf.type} ${
              item.acf.weight
            } گرمی ${item.brand}`}</Text>
            <Text style={{ fontSize: 10 }}>{`رنگ: ${item.acf.color} - سایز: ${
              item.acf.size
            }`}</Text>
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
    item.acf.added_attributes.map((attr, i) => {
      toRender.push(
        <Text style={myStyles.tableText} key={i}>{`${attr.item_name}: ${attr.value}`}</Text>
      );
    });
    toRender.push(
      <Text style={[myStyles.tableText, {}]}>{`مجموع: ${this.sumAddedAttributes(item)}`}</Text>
    );
    return toRender;
  }

  renderCartItems() {
    const itemsToRender = [];
    itemsToRender.push(
      <Col
        style={{
          width: 70,
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
        <Row
          style={{ paddingVertical: 5, alignItems: 'center', borderBottomWidth: 1, flexGrow: 1.5 }}
        >
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
      itemsToRender.push(
        <Col
          style={{
            width: 100,
            alignItems: 'center',
            borderWidth: 0.4
          }}
          key={i}
        >
          <Row style={[myStyles.tableRow, { backgroundColor: '#eee' }]}>
            <Text style={[myStyles.tableText, { fontSize: 14 }]}>{i + 1}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{item.title.rendered}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{`${item.acf.type} ${item.acf.ojrat_percent} ٪`}</Text>
          </Row>
          <Row
            style={{
              paddingVertical: 5,
              alignItems: 'center',
              borderBottomWidth: 1,
              flexGrow: 1.5
            }}
          >
            <View style={{ width: '100%' }}>{this.renderAddedAttributes(item)}</View>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{item.acf.weight}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{this.calcWeightPlusPercernt(item)}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{`${item.acf.ojrat_toman} تومان`}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Grid
              style={{
                alignItems: 'center',
                flexDirection: 'row'
              }}
            >
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
                <Text style={{ fontSize: 14 }}>{this.state.quantities[i]}</Text>
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
              {(this.calcWeightPlusPercernt(item) * this.state.quantities[i]).toFixed(3)}
            </Text>
          </Row>

          <Row style={myStyles.tableRow}>
            <Text style={myStyles.tableText}>{this.calcFinalPrice(item, i).toFixed(0)}</Text>
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
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />

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
            <Text style={{ color: '#95a5a6', marginBottom: 30, fontWeight: 'bold', fontSize: 15 }}>
              فاکتور شما خالی است
            </Text>
            <TouchableOpacity
              style={{ borderWidth: 1, padding: 15, borderRadius: 15 }}
              onPress={() => Actions.factorResult()}
            >
              <Text>پیگیری فاکتور های ارسال شده</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Content
            contentContainerStyle={{
              padding: 5
            }}
          >
            {/* <Text
              style={{
                borderBottomWidth: 1,
                paddingBottom: 15,
                paddingTop: 15
              }}
            >
              شرح کالا
            </Text> */}
            {/* New Table Start, oh god... */}
            <View style={{}}>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  height: 500
                }}
              >
                <Grid
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderBottomWidth: 0
                  }}
                >
                  {this.renderCartItems()}
                </Grid>
              </ScrollView>
              {/* New Table FINISH, oh god... */}
            </View>
            <Grid style={{ flexDirection: 'column', padding: 15 }}>
              <Row style={{ borderWidth: 1 }}>
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
            {!this.state.sentFactor ? (
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
            ) : (
              <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <Text>در حال ارسال فاکتور</Text>
                <Spinner color={Colors.black} />
              </View>
            )}
          </Content>
        )}
      </Container>
    );
  }

  increaseQuantity(item, index) {
    const obj = this.state.quantities;
    obj[index]++;
    this.setState({ quantities: obj });
  }

  decreaseQuantity(item, index) {
    const obj = this.state.quantities;
    if (obj[index] <= 1) {
      Alert.alert('تعداد نمی تواند کمتر از 1 باشد');
      return;
    }
    obj[index]--;
    this.setState({ quantities: obj });
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
    obj.map((item, i) => {
      sum += this.state.quantities[i];
    });
    return `${sum} عدد`;
  }

  sumWeight() {
    const obj = this.state.cartItems;
    let sum = 0;
    obj.map((item, i) => {
      sum += this.calcWeightPlusPercernt(item) * this.state.quantities[i];
    });
    return `${sum.toFixed(3)} گرم`;
  }

  sumPrice() {
    const obj = this.state.cartItems;
    let sum = 0;
    obj.map((item, i) => {
      sum += this.calcFinalPrice(item, i);
    });
    return `${sum.toFixed(0)} تومان`;
  }

  sumAddedAttributes(item) {
    let sum = 0;
    item.acf.added_attributes.map(item => {
      sum += Number(item.value);
    });
    return sum;
  }

  calcWeightPlusPercernt(item) {
    const res = Number(item.acf.weight * item.acf.ojrat_percent) / 100 + Number(item.acf.weight);
    return res.toFixed(3);
  }

  calcFinalPrice(item, i) {
    const res =
      Number(this.sumAddedAttributes(item) * Number(this.state.quantities[i])) +
      Number(
        Number(item.acf.weight) * Number(item.acf.ojrat_toman) * Number(this.state.quantities[i])
      );
    return res;
  }

  constructTable() {
    let res = '';
    let counter = 0;
    const items = this.state.cartItems;
    res += `
    <table style="width:100%; text-align: center; font-size: 1.1rem; margin-top: 30px;" border= "1px" cellpadding="1">
      <tr>
        <th style="height:50px">ردیف</th>
        <th style="height:50px">کد کالا</th>
        <th style="height:50px">شرح کالا</th>
        <th style="height:50px">ملحقات</th>
        <th style="height:50px">وزن</th>
        <th style="height:50px">وزن + درصد</th>
        <th style="height:50px">اجرت</th>
        <th style="height:50px">تعداد</th>
        <th style="height:50px">وزن نهایی</th>
        <th style="height:50px">مبلغ</th>
      </tr>
    `;

    items.map((product, index) => {
      res += `
      <tr>
        <td style="height:60px">${++counter}</td>
        <td style="height:60px">${product.title.rendered}</td>
        <td style="height:60px">${product.acf.type} ${product.acf.ojrat_percent} درصد</td>
        <td style="height:60px">${this.sumAddedAttributes(product)}</td>
        <td style="height:60px">${product.acf.weight}</td>
        <td style="height:60px">${this.calcWeightPlusPercernt(product)}</td>
        <td style="height:60px">${product.acf.ojrat_toman}</td>
        <td style="height:60px">${this.state.quantities[index]}</td>
        <td style="height:60px">${this.calcWeightPlusPercernt(product)}</td>
        <td style="height:60px">${this.calcFinalPrice(product, index)}</td>
      </tr>
      `;
    });
    res += `
    </table>
    <table style="width:100%; text-align: center; font-size: 1.1rem; margin-top: 30px;" border="1px">
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
    this.setState({
      sentFactor: true
    });

    AsyncStorage.getItem('user', (err, res) => {
      const data = JSON.parse(res);
      const customerName = data.displayName;
      const customerPhone = data.username;
      this.setState({
        token: data.token
      });

      //Posting factor to CMS ----------- Start
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
          title: `${customerName} - ${customerPhone}`,
          content: this.constructTable()
        })
      })
        .then(response => response.json())
        .then(resData => {
          if (resData) {
            this.setState(
              {
                sentFactor: true
              },
              () => this.constructTable(resData.id)
            );

            //Set AsyncStorage for the current Factor

            AsyncStorage.setItem(
              'FACTOR',
              JSON.stringify({
                customerName
              })
            );
            Toast.show({
              text:
                'فاکتور شما ارسال شده و در دست بررسی است. در اولین فرصت ممکن با شما تماس گرفته خواهد شد',
              position: 'bottom',
              type: 'success',
              buttonText: '',
              duration: 3000
            });
            AsyncStorage.removeItem('FACTOR');
            AsyncStorage.removeItem('CART');
            AsyncStorage.removeItem('QUANTITIES');
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
      //Posting factor to CMS ----------- Finish
    });
  }
}

// Styles
const myStyles = StyleSheet.create({
  tableRow: {
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1
  },
  tableText: {
    fontSize: 10,
    textAlign: 'center',
    width: '100%'
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
