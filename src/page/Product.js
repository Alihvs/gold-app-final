/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, { Component } from "react";
import {
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  AsyncStorage
} from "react-native";
import {
  View,
  Container,
  Content,
  Button,
  Left,
  Right,
  Icon,
  Picker,
  Item,
  Grid,
  Col,
  Toast,
  Text as NBText,
  Card,
  CardItem,
  Body
} from "native-base";
import { Actions } from "react-native-router-flux";
import Carousel, { Pagination } from "react-native-snap-carousel";

// Our custom files and classes import
import Colors from "../Colors";
import Text from "../component/Text";

import Navbar from "../component/Navbar";
import { default as ProductComponent } from "../component/Product";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      activeSlide: 0,
      wishListAvailability: undefined,
      quantity: 1,
      selectedColor: "",
      selectedSize: "",
      brand: this.props.product.brand
    };
  }

  componentWillMount() {
    //get the product with id of this.props.product.id from your server
    // this.setState({ product: dummyProduct });
    //Setting the state for current product - Effectiley mapping the feaking thing
    this.setState({
      currentProduct: {
        id: this.props.product.id,
        brand: this.props.product.brand,
        color: this.props.product.color,
        size: this.props.product.size,
        ojrat_percent: this.props.product.ojrat_percent,
        ojrat_toman: this.props.product.ojrat_toman,
        type: this.props.product.type,
        weight: this.props.product.weight,
        added_attributes: this.props.product.added_attributes,
        image:
          "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380232/gold-app/woman_ndqhui.jpg",
        images: [
          "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380232/gold-app/woman_ndqhui.jpg",
          "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380232/gold-app/woman_ndqhui.jpg",
          "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380232/gold-app/woman_ndqhui.jpg",
          "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380232/gold-app/woman_ndqhui.jpg"
        ],
        similarItems: []
      }
    });
  }

  componentDidMount() {
    /* Select the default color and size (first ones) */
    // let defColor = this.state.product.colors[0];
    // let defSize = this.state.product.sizes[0];
    // this.setState({
    //   selectedColor: defColor,
    //   selectedSize: defSize
    // });
  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name="ios-arrow-back" />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.search()} transparent>
          <Icon name="ios-search-outline" />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name="ios-cart" />
        </Button>
      </Right>
    );
    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <Navbar
          left={left}
          right={right}
          title={`${this.props.product.type} ${this.props.product.brand}`}
        />
        <Content>
          <Carousel
            ref={carousel => {
              this._carousel = carousel;
            }}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            enableSnap={true}
          >
            {this.renderImages()}
          </Carousel>
          <Pagination
            dotsLength={this.state.currentProduct.images.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{
              backgroundColor: "transparent",
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: -15
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: "rgba(255, 255, 255, 0.92)"
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />

          <View
            style={{
              backgroundColor: "#fdfdfd",
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <Content padder>
              <NBText>مشخصات عمومی</NBText>

              <Card style={{ alignItems: "flex-end" }}>
                {/* Brand */}
                <CardItem bordered>
                  <Col size={60}>
                    <Text style={{ textAlign: "right" }}>
                      {this.props.product.brand}
                    </Text>
                  </Col>
                  <Col size={40}>
                    <Text style={{ textAlign: "right" }}>برند</Text>
                  </Col>
                </CardItem>
                {/* Weight */}
                <CardItem bordered>
                  <Col size={60}>
                    <Text style={{ textAlign: "right" }}>
                      {`${this.props.product.weight} گرم`}
                    </Text>
                  </Col>
                  <Col size={40}>
                    <Text style={{ textAlign: "right" }}>وزن</Text>
                  </Col>
                </CardItem>
                {/* ojrat_percent */}
                <CardItem bordered>
                  <Col size={60}>
                    <Text style={{ textAlign: "right" }}>
                      {`${this.props.product.ojrat_percent} درصد`}
                    </Text>
                  </Col>
                  <Col size={40}>
                    <Text style={{ textAlign: "right" }}>اجرت به درصد</Text>
                  </Col>
                </CardItem>
                {/* ojrat_toman */}
                <CardItem bordered>
                  <Col size={60}>
                    <Text style={{ textAlign: "right" }}>
                      {`${this.props.product.ojrat_toman} تومان`}
                    </Text>
                  </Col>
                  <Col size={40}>
                    <Text style={{ textAlign: "right" }}>اجرت به تومان</Text>
                  </Col>
                </CardItem>
                {/* Color */}
                <CardItem bordered>
                  <Col size={60}>
                    <Text style={{ textAlign: "right" }}>
                      {this.props.product.color}
                    </Text>
                  </Col>
                  <Col size={40}>
                    <Text style={{ textAlign: "right" }}>رنگ</Text>
                  </Col>
                </CardItem>
                {/* Color */}
                <CardItem bordered>
                  <Col size={60}>
                    <Text style={{ textAlign: "right" }}>
                      {this.props.product.size}
                    </Text>
                  </Col>
                  <Col size={40}>
                    <Text style={{ textAlign: "right" }}>سایز</Text>
                  </Col>
                </CardItem>
                {/* availability */}
                <CardItem bordered>
                  <Col>
                    <Text style={{ textAlign: "right" }}>
                      {this.props.product.availability ? (
                        <Text style={{ color: "#00ad4b" }}>
                          این آیتم موجود است
                        </Text>
                      ) : (
                        <Text style={{ color: "#aa204c" }}>
                          این آیتم موجود نیست
                        </Text>
                      )}
                    </Text>
                  </Col>
                </CardItem>
                {/* negindar */}
                <CardItem bordered>
                  <Col>
                    <Text style={{ textAlign: "right" }}>
                      {this.props.product.negindar ? (
                        <Text style={{ color: "#00ad4b" }}>
                          قابلیت سفارش مجدد دارد
                        </Text>
                      ) : (
                        <Text style={{ color: "#aa204c" }}>
                          قابلیت سفارش مجدد ندارد
                        </Text>
                      )}
                    </Text>
                  </Col>
                </CardItem>
              </Card>
              <NBText style={{ paddingTop: 10 }}>مشخصات اختصاصی</NBText>

              {/* Added Attributes */}
              <Card bordered>{this.renderAddedAttrs()}</Card>

              <Card>
                <Grid style={{ flexDirection: "row-reverse" }}>
                  <Col size={15}>
                    <Button
                      onPress={this.addToWishlist.bind(this)}
                      block
                      // icon
                      // iconLeft
                      // transparent
                      style={{
                        backgroundColor: "#fdfdfd",
                        padding: 0,
                        margin: 0
                      }}
                    >
                      <Icon
                        style={{
                          color: Colors.navbarBackgroundColor,
                          paddingRight: -1
                        }}
                        name={"ios-heart"}
                      />
                    </Button>
                  </Col>

                  <Col size={78}>
                    <Button full success onPress={this.addToCart.bind(this)}>
                      <Text style={{ color: "#fff" }}>
                        اضافه کردن به فاکتور
                      </Text>
                    </Button>
                  </Col>
                </Grid>
              </Card>
            </Content>
          </View>

          <View
            style={{
              marginTop: 15,
              paddingLeft: 12,
              paddingRight: 12
            }}
          >
            <Text style={{ marginBottom: 5 }}> </Text>
            <View
              style={{
                width: 50,
                height: 1,
                backgroundColor: "transparent",
                marginLeft: 7,
                marginBottom: 10
              }}
            />
            {this.renderSimilairs()}
          </View>
        </Content>
      </Container>
    );
  }

  renderAddedAttrs() {
    let res = [];
    let addedAttrs = this.props.product.added_attributes;

    if (addedAttrs.length === 0) {
      return <Text>ندارد</Text>;
    }

    addedAttrs.map((item, i) => {
      res.push(
        <CardItem bordered key={i}>
          <Col size={60}>
            <Text style={{ textAlign: "right" }}> {`${item.value} تومان`}</Text>
          </Col>
          <Col size={40}>
            <Text style={{ textAlign: "right" }}>{item.item_name}</Text>
          </Col>
        </CardItem>
      );
    });
    return res;
  }

  renderImages() {
    let images = [];
    this.state.currentProduct.images.map((img, i) => {
      images.push(
        <TouchableWithoutFeedback key={i} onPress={() => this.openGallery(i)}>
          <Image
            source={{ uri: img }}
            style={{ width: Dimensions.get("window").width, height: 350 }}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
      );
    });
    return images;
  }

  // renderColors() {
  //   let colors = [];
  //   this.state.product.colors.map((color, i) => {
  //     colors.push(<Item key={i} label={color} value={color} />);
  //   });
  //   return colors;
  // }

  renderSize() {
    let size = [];
    this.state.product.sizes.map((s, i) => {
      size.push(<Item key={i} label={s} value={s} />);
    });
    return size;
  }

  renderSimilairs() {
    let items = [];
    let stateItems = this.state.currentProduct.similarItems;
    for (var i = 0; i < stateItems.length; i += 2) {
      if (stateItems[i + 1]) {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <ProductComponent
              key={stateItems[i + 1].id}
              product={stateItems[i + 1]}
              isRight
            />
          </Grid>
        );
      } else {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i + 1} />
          </Grid>
        );
      }
    }
    return items;
  }

  openGallery(pos) {
    Actions.imageGallery({
      images: this.state.currentProduct.images,
      position: pos
    });
  }

  addToCart() {
    // console.table(this.state.currentProduct);

    var product = this.state.currentProduct;
    // product["color"] = "تک رنگ";
    // product["size"] = "متوسط";
    // product["quantity"] = "12";
    // product["color"] = this.state.selectedColor;
    // product["size"] = this.state.selectedSize;
    // product["quantity"] = this.state.quantity;
    AsyncStorage.getItem("CART", (err, res) => {
      if (!res) AsyncStorage.setItem("CART", JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        items.push(product);
        AsyncStorage.setItem("CART", JSON.stringify(items));
      }
      Toast.show({
        text: "محصول به فاکتور شما اضافه شد",
        position: "bottom",
        type: "success",
        buttonText: "بستن",
        duration: 3000
      });
    });
  }

  addToWishlist() {
    var product = this.state.product;
    var success = true;
    AsyncStorage.getItem("WISHLIST", (err, res) => {
      if (!res) AsyncStorage.setItem("WISHLIST", JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        if (this.search(items, product)) {
          success = false;
        } else {
          items.push(product);
          AsyncStorage.setItem("WISHLIST", JSON.stringify(items));
        }
      }
      if (success) {
        Toast.show({
          text: "محصول به قسمت علاقه مندی ها اضافه شد",
          position: "bottom",
          type: "success",
          buttonText: "بستن",
          duration: 3000
        });
      } else {
        Toast.show({
          text: "این محصول در قسمت علاقه مندی ها وجود دارد",
          position: "bottom",
          type: "danger",
          buttonText: "بستن",
          duration: 3000
        });
      }
    });
  }

  search(array, object) {
    for (var i = 0; i < array.length; i++)
      if (JSON.stringify(array[i]) === JSON.stringify(object)) return true;
    return false;
  }
}

const dummyProduct = {
  id: 2,
  title: "دستبند خیلی باحال",
  description:
    "تاریخ استفاده از زیورها و سنگ‌های گران‌بها به اندازه تاریخ پیدایش بشر است و پیشینه‌ای هفت هزار ساله دارد. در زمان‌های دیرین و بسیار پیش از آنکه بشر وسائلی آماده کند یا مهارتی به دست آورد که بتواند سنگ‌های سخت را تراش داده و حک کند، سنگ‌های گرانمایه افزون بر ارزش مادی بیشتر جنبه سحر و جادو داشته و به عنوان طلسم برای دارندگان شان به‌شمار می‌رفته و به علت برخی باورها و اندیشه‌های راز آلود که نسبت به تأثیرات نهفته سنگ‌های رنگین داشتند، آن‌ها را ستایش کرده و به کار می‌بردند.",
  image:
    "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380232/gold-app/woman_ndqhui.jpg",
  images: [
    "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380231/gold-app/bracelet_x00lpq.jpg",
    "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380232/gold-app/jewel_dh8dft.jpg",
    "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380231/gold-app/man_uz95u5.jpg",
    "http://res.cloudinary.com/dsk8e6dhk/image/upload/f_auto,q_auto/v1530380231/gold-app/alangoo_kjqh6z.jpg"
  ],
  price: "تومان 25000",
  colors: ["سفید", "زرد", "زر گلد"],
  sizes: ["کوچک", "متوسط", "بزرگ", "خیلی بزرگ", "بسیار بزرگ"],
  category: "MAN",
  similarItems: []
};
