/**
 * This is the Search file
 **/

// React native and others libraries imports
import React, { Component } from "react";
import { Image, Slider, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  View,
  Button,
  Left,
  Right,
  Icon,
  Card,
  CardItem,
  cardBody,
  Form,
  Item,
  Picker,
  Input,
  CheckBox,
  ListItem,
  Body,
  Radio
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Actions } from "react-native-router-flux";
// import Slider from "react-native-slider";

// Our custom files and classes import
import Text from "../component/Text";
import Navbar from "../component/Navbar";
import SideMenu from "../component/SideMenu";
import SideMenuDrawer from "../component/SideMenuDrawer";
import CategoryBlock from "../component/CategoryBlock";
import Colors from "../Colors";

//Newley added libraries

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: undefined,
      selected2: undefined,
      currentCatagory: null,
      weight: 1,
      neginDar: false,
      selectedSubCat: undefined,
      alangoo_SubCat: undefined,
      alangoo_SubCatTwo: undefined,
      alangoo_CNCCat: undefined,
      alangoo_RikhtegiCat: undefined
    };
  }

  onWomanCatValueChanged(value) {
    this.setState({
      selectedSubCat: value
    });
  }

  onAlangooSubCatValueChanged(value) {
    this.setState({
      alangoo_SubCat: value
    });
  }

  onAlangooCNCValueChanged(value) {
    this.setState({
      alangoo_CNCCat: value
    });
  }

  onAlangooRikhtegiValueChanged(value) {
    this.setState({
      alangoo_RikhtegiCat: value
    });
  }

  onAlangooSubCatTwoValueChanged(value) {
    this.setState({
      alangoo_SubCatTwo: value
    });
  }

  onBrandValueChanged(value) {
    this.setState({
      brand: value
    });
  }

  getVal(value) {
    this.setState({
      weight: value
    });
  }

  render() {
    const VaznNegin = (
      <View>
        <Item style={{ height: 50 }}>
          <Grid style={{ alignItems: "center" }}>
            <Col size={25} style={{ alignItems: "flex-end" }}>
              <CheckBox
                checked={this.state.neginDar}
                onPress={() =>
                  this.setState({ neginDar: !this.state.neginDar })
                }
              />
            </Col>
            <Col size={75}>
              <Text>وزن سنگ کم شده باشد</Text>
            </Col>
          </Grid>
        </Item>
        <Item style={{ height: 50 }}>
          <Grid style={{ alignItems: "center" }}>
            <Col size={25} style={{ alignItems: "flex-end" }}>
              <CheckBox
                checked={this.state.neginDar}
                onPress={() =>
                  this.setState({ neginDar: !this.state.neginDar })
                }
              />
            </Col>
            <Col size={75}>
              <Text>پول نگین دارد</Text>
            </Col>
          </Grid>
        </Item>
      </View>
    );

    //Component for each catagory
    const WomanCatagories = (
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          placeholder="دسته مورد نظر"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={this.state.selectedSubCat}
          onValueChange={this.onWomanCatValueChanged.bind(this)}
        >
          <Picker.Item label="سرویس" value="سرویس" />
          <Picker.Item label="نیم ست" value="نیم ست" />
          <Picker.Item label="دستبند" value="دستبند" />
          <Picker.Item label="زنجیر" value="زنجیر" />
          <Picker.Item label="النگو" value="النگو" />
          <Picker.Item label="آویز تک" value="آویز تک" />
          <Picker.Item label="انگشتر" value="انگشتر" />
          <Picker.Item label="گوشواره تک" value="گوشواره تک" />
        </Picker>
        <Text style={{ paddingLeft: 20 }}>دسته بندی</Text>
      </Item>
    );

    const KidCatagories = (
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          placeholder="دسته مورد نظر"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={this.state.selectedSubCat}
          onValueChange={this.onWomanCatValueChanged.bind(this)}
        >
          <Picker.Item label="سرویس" value="سرویس" />
          <Picker.Item label="نیم ست" value="نیم ست" />
          <Picker.Item label="دستبند" value="دستبند" />
          <Picker.Item label="زنجیر" value="زنجیر" />
          <Picker.Item label="النگو" value="النگو" />
          <Picker.Item label="آویز تک" value="آویز تک" />
          <Picker.Item label="انگشتر" value="انگشتر" />
          <Picker.Item label="گوشواره تک" value="گوشواره تک" />
        </Picker>
        <Text style={{ paddingLeft: 20 }}>دسته بندی</Text>
      </Item>
    );

    const MenCatagories = (
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          placeholder="دسته مورد نظر"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={this.state.selectedSubCat}
          onValueChange={this.onWomanCatValueChanged.bind(this)}
        >
          <Picker.Item label="انگشتر" value="انگشتر" />
          <Picker.Item label="زنجیر" value="زنجیر" />
          <Picker.Item label="دستبند" value="دستبند" />
          <Picker.Item label="آویز طلا" value="آویز طلا" />
        </Picker>
        <Text style={{ paddingLeft: 20 }}>دسته بندی</Text>
      </Item>
    );

    const AccCatagories = (
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          placeholder="دسته مورد نظر"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={this.state.selectedSubCat}
          onValueChange={this.onWomanCatValueChanged.bind(this)}
        >
          <Picker.Item label="پابند" value="پابند" />
          <Picker.Item label="تاج" value="تاج" />
          <Picker.Item label="بازو بند" value="بازو بند" />
          <Picker.Item label="رولباسی" value="رولباسی" />
          <Picker.Item label="پیرسینگ" value="پیرسینگ" />
          <Picker.Item label="ساعت زنانه" value="ساعت زنانه" />
          <Picker.Item label="ساعت مردانه" value="ساعت مردانه" />
          <Picker.Item label="آویز طلای مردانه" value="آویز طلای مردانه" />
          <Picker.Item label="دکمه سردست" value="دکمه سردست" />
          <Picker.Item label="گیره کراوات" value="گیره کراوات" />
        </Picker>
        <Text style={{ paddingLeft: 20 }}>دسته بندی</Text>
      </Item>
    );

    const AlangooSubCatagory = (
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          placeholder="نوع النگو"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={this.state.alangoo_SubCat}
          onValueChange={this.onAlangooSubCatValueChanged.bind(this)}
        >
          <Picker.Item label="همه موارد" value="همه موارد" />
          <Picker.Item
            style={{ textAlign: "right" }}
            label="سی ان سی"
            value="سی ان سی"
          />
          <Picker.Item label="ریختگی" value="ریختگی" />
        </Picker>
        <Text style={{ paddingLeft: 20 }}>نوع النگو</Text>
      </Item>
    );

    const AlangooCNC = (
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          placeholder="دسته بندی سی ان سی"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={this.state.alangoo_CNCCat}
          onValueChange={this.onAlangooCNCValueChanged.bind(this)}
        >
          <Picker.Item label="همه موارد" value="همه موارد" />
          <Picker.Item label="تک پوش" value="تک پوش" />
          <Picker.Item label="دامله" value="دامله" />
          <Picker.Item label="گوی" value="گوی" />
          <Picker.Item label="مفتولی" value="مفتولی" />
          <Picker.Item label="پروفیل" value="پروفیل" />
          <Picker.Item label="تخت" value="تخت" />
        </Picker>
        <Text style={{ paddingLeft: 20 }}>دسته بندی سی ان سی</Text>
      </Item>
    );

    const AlangooRikhtegi = (
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          placeholder="دسته بندی ریختگی"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={this.state.alangoo_RikhtegiCat}
          onValueChange={this.onAlangooRikhtegiValueChanged.bind(this)}
        >
          <Picker.Item label="همه موارد" value="همه موارد" />
          <Picker.Item label="رنگی" value="رنگی" />
          <Picker.Item label="میناکاری" value="میناکاری" />
        </Picker>
        <Text style={{ paddingLeft: 20 }}>دسته بندی ریختگی</Text>
      </Item>
    );

    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name="ios-menu-outline" />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name="ios-cart" />
        </Button>
      </Right>
    );
    return (
      <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
        <Container style={{ backgroundColor: Colors.statusBarColor }}>
          <Navbar left={left} right={right} title={this.props.pageTitle} />
          <Content>
            <Form style={{ padding: 5 }}>
              {/* Catagories */}
              {this.props.pageTitle === "زنانه" ? WomanCatagories : <Text />}
              {this.props.pageTitle === "مردانه" ? MenCatagories : <Text />}
              {this.props.pageTitle === "بچه گانه" ? KidCatagories : <Text />}
              {this.props.pageTitle === "اکسسوری" ? AccCatagories : <Text />}

              {/* Second subcatagorie */}
              {this.state.selectedSubCat === "النگو" ? (
                AlangooSubCatagory
              ) : (
                <Text />
              )}

              {/* Third subcatagorie */}
              {this.state.alangoo_SubCat === "سی ان سی" ? AlangooCNC : <Text />}
              {this.state.alangoo_SubCat === "ریختگی" ? (
                AlangooRikhtegi
              ) : (
                <Text />
              )}

              {/* Brand */}
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  placeholder="برند را انتخاب کنید"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.brand}
                  onValueChange={this.onBrandValueChanged.bind(this)}
                >
                  <Picker.Item label="همه موارد" value="همه موارد" />
                  <Picker.Item label="فلامنگو" value="فلامنگو" />
                  <Picker.Item label="ونزو" value="ونزو" />
                  <Picker.Item label="ونیزی" value="ونیزی" />
                  <Picker.Item label="کارتیه" value="کارتیه" />
                </Picker>
                <Text style={{ paddingLeft: 20 }}>برند</Text>
              </Item>

              {/* Brand */}
              <Item style={{ height: 50 }}>
                <Grid style={{ alignItems: "center" }}>
                  <Col style={{ width: 50 }}>
                    <Text style={{ padding: 5 }}>گرم</Text>
                  </Col>

                  <Col>
                    <Item>
                      <Input style={{ textAlign: "center" }} />
                    </Item>
                  </Col>
                  <Col style={{ width: 50 }}>
                    <Text style={{ padding: 5 }}>الی</Text>
                  </Col>

                  <Col>
                    <Item>
                      <Input style={{ textAlign: "center" }} />
                    </Item>
                  </Col>
                  <Col style={{ width: 30 }}>
                    <Text style={{ padding: 5 }}>از</Text>
                  </Col>
                </Grid>

                <Text style={{ width: 60, paddingLeft: 20 }}>وزن</Text>
              </Item>

              {/* Ojrat Darsad*/}
              <Item style={{ height: 50 }}>
                <Grid style={{ alignItems: "center" }}>
                  <Col style={{ width: 50 }}>
                    <Text style={{ padding: 5 }}>درصد</Text>
                  </Col>

                  <Col>
                    <Item>
                      <Input style={{ textAlign: "center" }} />
                    </Item>
                  </Col>
                  <Col style={{ width: 50 }}>
                    <Text style={{ padding: 5 }}>الی</Text>
                  </Col>

                  <Col>
                    <Item>
                      <Input style={{ textAlign: "center" }} />
                    </Item>
                  </Col>
                  <Col style={{ width: 30 }}>
                    <Text style={{ padding: 5 }}>از</Text>
                  </Col>
                </Grid>

                <Text style={{ width: 60, paddingLeft: 20 }}>اجرت</Text>
              </Item>

              {/* Ojrat Toman*/}
              <Item style={{ height: 50 }}>
                <Grid style={{ alignItems: "center" }}>
                  <Col style={{ width: 50 }}>
                    <Text style={{ padding: 5 }}>تومان</Text>
                  </Col>

                  <Col>
                    <Item>
                      <Input style={{ textAlign: "center" }} />
                    </Item>
                  </Col>
                  <Col style={{ width: 50 }}>
                    <Text style={{ padding: 5 }}>تا</Text>
                  </Col>

                  <Col>
                    <Item>
                      <Input style={{ textAlign: "center" }} />
                    </Item>
                  </Col>
                  <Col style={{ width: 30 }}>
                    <Text style={{ padding: 5 }}>از</Text>
                  </Col>
                </Grid>

                <Text style={{ width: 60, paddingLeft: 20 }}>اجرت</Text>
              </Item>

              {/* Available Products */}

              <Item picker style={{ justifyContent: "space-between" }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onWomanCatValueChanged.bind(this)}
                >
                  <Picker.Item label="کالاهای موجود" value="key0" />
                  <Picker.Item
                    label="کالاهای ناموجود اما قابل سفارش"
                    value="key1"
                  />
                  <Picker.Item label="تمامی کالا ها" value="key2" />
                </Picker>
                <Text style={{ paddingLeft: 9 }}>نمایش</Text>
              </Item>

              {/* Colors */}
              <Item>
                <Content>
                  <Grid>
                    <Col
                      style={{
                        // backgroundColor: "#635DB7",
                        height: 100,
                        marginRight: 50
                      }}
                      size={40}
                    >
                      <Row
                        style={{
                          justifyContent: "space-between",
                          marginTop: 7
                        }}
                      >
                        <CheckBox checked={true} />
                        <Text>دو رنگ</Text>
                      </Row>
                      <Row style={{ justifyContent: "space-between" }}>
                        <CheckBox checked={true} />
                        <Text>سه رنگ</Text>
                      </Row>
                      <Row style={{ justifyContent: "space-between" }}>
                        <CheckBox checked={true} />
                        <Text>سایر رنگ ها</Text>
                      </Row>
                    </Col>
                    <Col
                      style={{
                        // backgroundColor: "#00CE9F",
                        height: 100
                      }}
                      size={40}
                    >
                      <Row
                        style={{
                          justifyContent: "space-between",
                          marginTop: 7
                        }}
                      >
                        <CheckBox checked={true} />
                        <Text>رزگلد</Text>
                      </Row>
                      <Row style={{ justifyContent: "space-between" }}>
                        <CheckBox checked={true} />
                        <Text>سفید</Text>
                      </Row>
                      <Row style={{ justifyContent: "space-between" }}>
                        <CheckBox checked={true} />
                        <Text>زرد</Text>
                      </Row>
                    </Col>
                    <Col size={20}>
                      <Text style={{ marginTop: 10 }}>رنگ</Text>
                    </Col>
                  </Grid>
                </Content>
              </Item>

              {/* Negin */}

              <Item style={{ height: 50 }}>
                <Grid style={{ alignItems: "center" }}>
                  <Col size={25} style={{ alignItems: "flex-end" }}>
                    <CheckBox
                      checked={this.state.neginDar}
                      onPress={() =>
                        this.setState({ neginDar: !this.state.neginDar })
                      }
                    />
                  </Col>
                  <Col size={75}>
                    <Text>نگین دار</Text>
                  </Col>
                </Grid>
              </Item>

              {this.state.neginDar ? VaznNegin : <Text />}

              <Button
                full
                primary
                onPress={() => Actions.category({ id: "12", title: "زنانه" })}
              >
                <Text style={{ color: "#fff" }}>جستجو</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }
}
