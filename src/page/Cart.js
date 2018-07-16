/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, { Component } from "react";
import { Alert, AsyncStorage, StyleSheet, ScrollView } from "react-native";
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
  Thumbnail,
  Footer
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Actions } from "react-native-router-flux";

import {
  Table,
  TableWrapper,
  Row as NewRow,
  Rows,
  Col as NewCol,
  Cols,
  Cell
} from "react-native-table-component";

// Our custom files and classes import
import Colors from "../Colors";
import Text from "../component/Text";
import Navbar from "../component/Navbar";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      defaultWidth: 90,
      tableData: [
        ["ردیف", "کالا", "شرح", "وزن", "وزن", "اجرت", "تعداد", "وزن", "مبلغ"],
        [
          "1",
          "انگشتر رینگ ساده 10 %",
          "-",
          "1.581",
          "1.7391",
          "-",
          "100",
          "173.91",
          "-"
        ],
        [
          "2",
          "نیم ست عقیق 12 %",
          "پول سنگ 40 هزار تومان",
          "10.25",
          "11.48",
          "-",
          "2",
          "22.96",
          "80000"
        ],
        [
          "3",
          "دستبند چرم 23 %",
          "پول سنگ 1 هزار تومان - پول چرم 12 هزار تومان",
          "2.016",
          "2.4797",
          "10000",
          "25",
          "61.992",
          "829000"
        ]
      ],
      widthArr: [50],
      heightArr: [50, 50, 50, 50, 50, 50, 50, 50, 50]
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("CART", (err, res) => {
      if (!res) this.setState({ cartItems: [] });
      else {
        this.setState({ cartItems: JSON.parse(res) });
        console.table(this.state.cartItems);
        // let counter = 0;
        // for (let i = 0; i < this.state.cartItems.length; i++) {
        //   let newElement = [
        //     ++counter,
        //     this.state.cartItems[i].brand,
        //     this.state.cartItems[i].brand,
        //     this.state.cartItems[i].brand,
        //     this.state.cartItems[i].brand,
        //     this.state.cartItems[i].brand,
        //     this.state.cartItems[i].brand,
        //     this.state.cartItems[i].brand,
        //     this.state.cartItems[i].brand
        //   ];

        //   this.setState(prevState => ({
        //     tableData: [...prevState.tableData, newElement]
        //   }));
        //   this.setState(prevState => ({
        //     widthArr: [...prevState.widthArr, this.state.defaultWidth]
        //   }));
        // }
      }
    });
  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="ios-close" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );

    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <Navbar left={left} title="فاکتور" />
        {this.state.cartItems.length <= 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Icon
              name="ios-cart"
              size={38}
              style={{ fontSize: 38, color: "#95a5a6", marginBottom: 7 }}
            />
            <Text style={{ color: "#95a5a6" }}>فاکتور شما خالی است</Text>
          </View>
        ) : (
          <Content
            style={{}}
            contentContainerStyle={{ justifyContent: "space-around" }}
          >
            <Button
              onPress={() => {
                this.setState({ cartItems: [] });
                AsyncStorage.setItem("CART", JSON.stringify([]));
              }}
            >
              <Text>Remove All</Text>
            </Button>

            {/* New Table Start, oh god... */}
            <ScrollView>
              <Grid style={{ flexDirection: "row-reverse" }}>
                <Col style={{ width: 70, alignItems: "center" }}>
                  <Row style={myStyles.tableRow}>
                    <Text>1کالا</Text>
                  </Row>
                  <Row style={myStyles.tableRow}>
                    <Text>شرح کالا</Text>
                  </Row>
                  <Row style={myStyles.tableRow}>
                    <Text>وزن</Text>
                  </Row>
                  <Row style={myStyles.tableRow}>
                    <Text>رنگ</Text>
                  </Row>
                  <Row style={myStyles.tableRow}>
                    <Text>وزن</Text>
                  </Row>
                  <Row style={myStyles.tableRow}>
                    <Text>اجرت</Text>
                  </Row>
                  <Row style={myStyles.tableRow}>
                    <Text>تعداد</Text>
                  </Row>
                  <Row style={myStyles.tableRow}>
                    <Text>مبلغ</Text>
                  </Row>
                </Col>
                {this.renderCartItems()}
              </Grid>
            </ScrollView>
            {/* New Table FINISH, oh god... */}

            {/* Table Start */}
            {/* <View style={myStyles.container}>
              <ScrollView horizontal={true}>
                <View>
                  <ScrollView style={myStyles.dataWrapper}>
                    <Table style={{ flexDirection: "row-reverse" }}>
                      <Cols
                        data={this.state.tableData}
                        heightArr={this.state.heightArr}
                        widthArr={this.state.widthArr}
                        textStyle={myStyles.text}
                      />
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>
            </View> */}
            {/* Table End */}

            {/* <List>{this.renderItems()}</List> */}

            {/* <Grid style={{ marginTop: 20, marginBottom: 10 }}>
              <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
                <Button
                  onPress={() => this.removeAllPressed()}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.navbarBackgroundColor
                  }}
                  block
                  iconRight
                  transparent
                >
                  <Text style={{ color: Colors.navbarBackgroundColor }}>
                    پاک کردن فاکتور
                  </Text>
                </Button>
              </Col>
              <Col style={{ paddingLeft: 5, paddingRight: 10 }}>
                <Button
                  onPress={() => this.checkout()}
                  style={{ backgroundColor: Colors.navbarBackgroundColor }}
                  block
                  iconLeft
                >
                  <Text style={{ color: "#fdfdfd" }}>ارسال نهایی فاکتور</Text>
                </Button>
              </Col>
            </Grid> */}
          </Content>
        )}
      </Container>
    );
  }

  // renderItems() {
  //   let items = [];
  //   this.state.cartItems.map((item, i) => {
  //     items.push(
  //       <ListItem
  //         key={i}
  //         last={this.state.cartItems.length === i + 1}
  //         onPress={() => this.itemClicked(item)}
  //       >
  //         <Thumbnail
  //           square
  //           style={{ width: 110, height: 90 }}
  //           source={{ uri: item.image }}
  //         />
  //         <Body style={{ paddingLeft: 10 }}>
  //           <Text style={{ fontSize: 18 }}>
  //             {item.quantity > 1 ? item.quantity + "x " : null}
  //             {item.title}
  //           </Text>
  //           <Text
  //             style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
  //           >
  //             {item.price}
  //           </Text>
  //         </Body>
  //         <Right>
  //           <Button
  //             style={{ marginLeft: -25 }}
  //             transparent
  //             onPress={() => this.removeItemPressed(item)}
  //           >
  //             <Icon
  //               size={30}
  //               style={{ fontSize: 30, color: "#95a5a6" }}
  //               name="ios-remove-circle-outline"
  //             />
  //           </Button>
  //         </Right>
  //       </ListItem>
  //     );
  //   });
  //   return items;
  // }

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

  // removeItem(itemToRemove) {
  //   let items = [];
  //   this.state.cartItems.map(item => {
  //     if (JSON.stringify(item) !== JSON.stringify(itemToRemove))
  //       items.push(item);
  //   });
  //   this.setState({ cartItems: items });
  //   AsyncStorage.setItem("CART", JSON.stringify(items));
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

  // checkout() {
  //   Actions.checkout({ cartItems: this.state.cartItems });
  // }

  // itemClicked(item) {
  //   Actions.product({ product: item });
  // }

  renderCartItems() {
    itemsToRender = [];
    this.state.cartItems.map((item, i) => {
      itemsToRender.push(
        <Col style={{ width: 70, alignItems: "center" }}>
          <Row style={[myStyles.tableRow]}>
            <Text>2کالا</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text>{item.brand}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text>{item.weight}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text>{item.color}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text>{item.weight}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text>{item.ojrat_percent}</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text>تعداد</Text>
          </Row>
          <Row style={myStyles.tableRow}>
            <Text>مبلغ</Text>
          </Row>
        </Col>
      );
    });
    return itemsToRender;
  }
}

const styles = {
  title: {
    fontFamily: "Roboto",
    fontWeight: "100"
  }
};

const items = [
  {
    id: 1,
    quantity: 1,
    title: "Black Hat",
    categoryId: 5,
    categoryTitle: "MEN",
    price: "22$",
    image:
      "http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg",
    description: "Hello there, i'm a cool product with a heart of gold."
  },
  {
    id: 2,
    quantity: 3,
    title: "V Neck T-Shirt",
    categoryId: 2,
    categoryTitle: "WOMEN",
    price: "12$",
    image:
      "http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg",
    description: "Hello there, i'm a cool product with a heart of gold."
  },
  {
    id: 10,
    quantity: 1,
    title: "Black Leather Hat",
    categoryId: 1,
    categoryTitle: "KIDS",
    price: "2$",
    image:
      "http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg",
    description: "Hello there, i'm a cool product with a heart of gold."
  }
];

// Styles

const myStyles = StyleSheet.create({
  tableRow: {
    height: 50,
    backgroundColor: "red"
  }
  // container: {
  //   flex: 1,
  //   flexDirection: "row-reverse",
  //   padding: 0,
  //   paddingTop: 0,
  //   backgroundColor: "#fff"
  // },
  // header: { height: 50, backgroundColor: "#537791" },
  // text: { textAlign: "center", fontWeight: "100" },
  // dataWrapper: { marginTop: -1 },
  // row: {
  //   height: 40,
  //   backgroundColor: "#E7E6E1"
  // }
});
