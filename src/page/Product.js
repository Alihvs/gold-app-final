/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import {
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  AsyncStorage,
  StyleSheet,
  StatusBar
} from 'react-native';
import {
  View,
  Container,
  Content,
  Left,
  Right,
  Icon,
  Grid,
  Col,
  Toast,
  Text as NBText,
  Card,
  CardItem,
  Button
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';

import Navbar from '../component/Navbar';
import { default as ProductComponent } from '../component/Product';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      activeSlide: 0,
      wishListAvailability: undefined,
      quantity: 1,
      selectedColor: '',
      selectedSize: '',
      brand: this.props.product.acf.brand,
      hasFactor: false,
      similarItems: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('FACTOR', (err, res) => {
      if (res) {
        this.setState({ hasFactor: true });
      }
    });
  }

  render() {
    const left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name="ios-arrow-back" />
        </Button>
      </Left>
    );
    const right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={this.rightButtonPressed} transparent>
          <Icon name="paper" />
        </Button>
      </Right>
    );
    return (
      <Container style={{ backgroundColor: Colors.statusBarColor }}>
        <Navbar
          left={left}
          right={right}
          title={`${this.props.product.acf.type} ${this.props.product.acf.brand} ${
            this.props.product.acf.ojrat_percent
          }`}
        />
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />

        <Content style={{ backgroundColor: Colors.statusBarColor }}>
          <Carousel
            ref={carousel => {
              this._carousel = carousel;
            }}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            enableSnap
          >
            {this.renderImages()}
          </Carousel>
          <Pagination
            dotsLength={this.props.product.acf.images.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{
              backgroundColor: 'transparent',
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: -15
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: Colors.gold
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />

          <View
            style={{
              backgroundColor: Colors.statusBarColor,
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <Content padder>
              <NBText style={[styles.goldentext, { fontWeight: 'bold' }]}>مشخصات عمومی</NBText>

              <Card transparent style={{ alignItems: 'flex-end' }}>
                {/* Brand */}
                <CardItem style={styles.cardItem}>
                  <Col size={60}>
                    <Text style={styles.goldentext}>{this.props.product.acf.brand}</Text>
                  </Col>
                  <Col size={40}>
                    <Text style={styles.goldentext}>برند</Text>
                  </Col>
                </CardItem>
                {/* Weight */}
                <CardItem bordered style={styles.cardItem}>
                  <Col size={60}>
                    <Text style={styles.goldentext}>{`${this.props.product.acf.weight} گرم`}</Text>
                  </Col>
                  <Col size={40}>
                    <Text style={styles.goldentext}>وزن</Text>
                  </Col>
                </CardItem>
                {/* ojrat_percent */}
                <CardItem bordered style={styles.cardItem}>
                  <Col size={60}>
                    <Text style={styles.goldentext}>
                      {`${this.props.product.acf.ojrat_percent} درصد`}
                    </Text>
                  </Col>
                  <Col size={40}>
                    <Text style={styles.goldentext}>اجرت به درصد</Text>
                  </Col>
                </CardItem>
                {/* ojrat_toman */}
                <CardItem bordered style={styles.cardItem}>
                  <Col size={60}>
                    <Text style={styles.goldentext}>
                      {`${this.props.product.acf.ojrat_toman} تومان`}
                    </Text>
                  </Col>
                  <Col size={40}>
                    <Text style={styles.goldentext}>اجرت به تومان</Text>
                  </Col>
                </CardItem>
                {/* Color */}
                <CardItem bordered style={styles.cardItem}>
                  <Col size={60}>
                    <Text style={styles.goldentext}>{this.props.product.acf.color}</Text>
                  </Col>
                  <Col size={40}>
                    <Text style={styles.goldentext}>رنگ</Text>
                  </Col>
                </CardItem>
                {/* Color */}
                <CardItem bordered style={styles.cardItem}>
                  <Col size={60}>
                    <Text style={styles.goldentext}>{this.props.product.acf.size}</Text>
                  </Col>
                  <Col size={40}>
                    <Text style={styles.goldentext}>سایز</Text>
                  </Col>
                </CardItem>
                {/* Availability */}
              </Card>
              <NBText style={{ paddingTop: 10, color: Colors.gold, fontWeight: 'bold' }}>
                ملحقات کالا
              </NBText>

              {/* Added Attributes */}
              <Card transparent style={styles.cardItem}>
                {this.renderAddedAttrs()}
                <CardItem bordered style={styles.cardItem}>
                  <Col>
                    <Text style={styles.goldentext}>
                      {this.props.product.acf.availability ? (
                        <Text style={{ color: '#00ad4b' }}>این آیتم موجود است</Text>
                      ) : (
                        <Text style={{ color: '#aa204c' }}>این آیتم موجود نیست</Text>
                      )}
                    </Text>
                  </Col>
                </CardItem>
                {/* Sefaresh Mojadad */}
                <CardItem bordered style={styles.cardItem}>
                  <Col>
                    <Text style={{ textAlign: 'right' }}>
                      {this.props.product.acf.canReorder ? (
                        <Text style={{ color: '#00ad4b' }}>قابلیت سفارش مجدد دارد</Text>
                      ) : (
                        <Text style={{ color: '#aa204c' }}>قابلیت سفارش مجدد ندارد</Text>
                      )}
                    </Text>
                  </Col>
                </CardItem>
                {/* Description */}
                {this.props.product.acf.description ? (
                  <View>
                    <NBText style={{ paddingTop: 10, color: Colors.gold, fontWeight: 'bold' }}>
                      توضیحات
                    </NBText>
                    <CardItem bordered style={styles.cardItem}>
                      <Text style={{ textAlign: 'right', color: Colors.white, lineHeight: 30 }}>
                        {this.props.product.acf.description}
                      </Text>
                    </CardItem>
                  </View>
                ) : (
                  <View />
                )}
              </Card>

              <Card padder style={{ backgroundColor: 'transparent' }}>
                <Grid style={{ flexDirection: 'row-reverse' }}>
                  <Col size={27}>
                    <Button
                      onPress={this.addToWishlist.bind(this)}
                      block
                      bordered
                      style={{
                        backgroundColor: 'transparent',
                        padding: 0,
                        margin: 0,
                        // borderLeftWidth: 1,
                        borderColor: 'white'
                      }}
                    >
                      <Icon
                        style={{
                          color: Colors.gold,
                          paddingRight: -1
                        }}
                        name={'ios-heart'}
                      />
                    </Button>
                  </Col>

                  <Col size={77}>
                    <Button
                      style={{ backgroundColor: 'transparent', borderColor: 'white' }}
                      full
                      bordered
                      transparent
                      onPress={this.addToCart.bind(this)}
                    >
                      <Text style={{ color: Colors.gold }}>اضافه کردن به فاکتور</Text>
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
            <Text style={{ marginBottom: 5 }} />
            <View
              style={{
                width: 50,
                height: 1,
                backgroundColor: 'transparent',
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
    const res = [];
    const addedAttrs = this.props.product.acf.added_attributes;
    console.log(addedAttrs);

    if (addedAttrs.length === 0) {
      return <Text style={styles.goldentext}>ندارد</Text>;
    }

    addedAttrs.map((item, i) => {
      res.push(
        <CardItem bordered key={i} style={styles.cardItem}>
          <Col size={60}>
            <Text style={styles.goldentext}> {`${item.value} تومان`}</Text>
          </Col>
          <Col size={40}>
            <Text style={styles.goldentext}>{item.item_name}</Text>
          </Col>
        </CardItem>
      );
    });
    return res;
  }

  renderImages() {
    const images = [];
    // console.log(this.props.product.images);
    this.props.product.acf.images.map((img, i) => {
      images.push(
        <TouchableWithoutFeedback key={i} onPress={() => this.openGallery(i)}>
          <Image
            source={{ uri: img.image.url }}
            style={{ width: Dimensions.get('window').width, height: 350 }}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
      );
    });
    return images;
  }

  renderSimilairs() {
    //A bug, this isn't even required
    return <View />;
  }

  openGallery(pos) {
    const images = this.props.product.acf.images.map(img => img.image.url);
    Actions.imageGallery({
      images,
      position: pos
    });
  }

  addToCart() {
    const product = this.props.product;
    let success = true;

    AsyncStorage.getItem('CART', (err, res) => {
      if (!res) AsyncStorage.setItem('CART', JSON.stringify([product]));
      else {
        const items = JSON.parse(res);
        if (this.search(items, product)) {
          success = false;
        } else {
          items.push(product);
          AsyncStorage.setItem('CART', JSON.stringify(items));
        }
      }
      if (success) {
        Toast.show({
          text: 'محصول به فاکتور اضافه شد',
          position: 'bottom',
          type: 'success',
          buttonText: '',
          textStyle: { textAlign: 'center' },
          duration: 2000
        });
      } else {
        Toast.show({
          text: 'این محصول در فاکتور شما وجود دارد',
          position: 'bottom',
          type: 'danger',
          buttonText: '',
          textStyle: { textAlign: 'center' },
          duration: 3000
        });
      }
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

  addToWishlist() {
    const product = this.props.product;
    let success = true;
    AsyncStorage.getItem('WISHLIST', (err, res) => {
      if (!res) AsyncStorage.setItem('WISHLIST', JSON.stringify([product]));
      else {
        const items = JSON.parse(res);
        if (this.search(items, product)) {
          success = false;
        } else {
          items.push(product);
          AsyncStorage.setItem('WISHLIST', JSON.stringify(items));
        }
      }
      if (success) {
        Toast.show({
          text: 'محصول به قسمت علاقه مندی ها اضافه شد',
          position: 'bottom',
          type: 'success',
          buttonText: '',
          duration: 3000
        });
      } else {
        Toast.show({
          text: 'این محصول در قسمت علاقه مندی ها وجود دارد',
          position: 'bottom',
          type: 'danger',
          buttonText: '',
          duration: 3000
        });
      }
    });
  }

  search(array, object) {
    for (let i = 0; i < array.length; i++) {
      if (JSON.stringify(array[i]) === JSON.stringify(object)) return true;
    }
    return false;
  }
}

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: Colors.statusBarColor
  },
  goldentext: {
    color: Colors.gold,
    textAlign: 'right'
  },
  addToCartButton: {
    backgroundColor: 'transparent'
  }
});
