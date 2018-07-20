/**
 * This is the Search file
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import {
  Image,
  Slider,
  TouchableOpacity,
  StyleSheet,
  Picker,
  TextInput
  // CheckBox
} from 'react-native';
import {
  Container,
  Content,
  View,
  Left,
  Right,
  Icon,
  Button,
  Toast,
  Card,
  CardItem,
  cardBody,
  Form,
  Item,
  Input,
  // CheckBox,
  ListItem,
  Body,
  Radio,
  Switch
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
// import Slider from "react-native-slider";

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';
import Colors from '../Colors';

//Newley added libraries

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // mainCatagory: 'woman',
      // ---------Woman Catagories --------
      womanCatagory: 'all',
      manCatagory: 'all',
      accCatagories: 'all',
      // --------Alangoo------------------
      alangoo: 'all',
      alangooCNC: 'all',
      alangooRikhtegi: 'all',
      // --------Zanjir------------------
      zanjir: 'all',
      // ---------Brand--------------------
      brand: 'all',
      // ---------Weight ------------
      weightFrom: undefined,
      weightTo: undefined,
      // ---------Ojrat Percent ------------
      ojratPercentFrom: undefined,
      ojratPercentTo: undefined,
      // ---------Ojrat Toamn ------------
      ojratTomanFrom: undefined,
      ojratTomanTo: undefined,
      // ---------availability ------------
      available: 'all',
      // ---------color ------------
      color: 'all',
      // ---------color ------------
      neginDar: 'all',
      // ---------color ------------
      sangDeducted: 'all',
      //------------Big Search State -------------
      finalSearchItems: []
    };
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
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name="ios-cart" />
        </Button>
      </Right>
    );

    // -------- picker components for each main catagory ---------
    // Here I will contruct each picker for each section
    const WomanCatagories = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ womanCatagory: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.womanCatagory}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ womanCatagory: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="سرویس" value="سرویس" />
              <Picker.Item label="نیم ست" value="نیم ست" />
              <Picker.Item label="دستبند" value="دستبند" />
              <Picker.Item label="زنجیر" value="زنجیر" />
              <Picker.Item label="النگو" value="النگو" />
              <Picker.Item label="آویز تک" value="آویز تک" />
              <Picker.Item label="انگشتر" value="انگشتر" />
              <Picker.Item label="گوشواره تک" value="گوشواره تک" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>دسته بندی</Text>
          </Col>
        </Grid>
      </View>
    );
    const ManCatagories = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ manCatagory: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.manCatagory}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ manCatagory: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="انگشتر" value="انگشتر" />
              <Picker.Item label="زنجیر" value="زنجیر" />
              <Picker.Item label="دستبند" value="دستبند" />
              <Picker.Item label="آویز طلا" value="آویز طلا" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>دسته بندی</Text>
          </Col>
        </Grid>
      </View>
    );
    const AccCatagories = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ accCatagories: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.accCatagories}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ accCatagories: itemValue })}
            >
              <Picker.Item label="" value="all" />
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
          </Col>
          <Col>
            <Text style={styles.text}>دسته بندی</Text>
          </Col>
        </Grid>
      </View>
    );
    // ==========================================================================================
    // ========Alangoo Subcatagories ======================================
    const Alangoo = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ alangoo: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.alangoo}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ alangoo: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="سی ان سی" value="سی ان سی" />
              <Picker.Item label="ریختگی" value="ریختگی" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>نوع النگو</Text>
          </Col>
        </Grid>
      </View>
    );
    const AlangooCNC = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ alangooCNC: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.alangooCNC}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ alangooCNC: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="تک پوش" value="تک پوش" />
              <Picker.Item label="دامله" value="دامله" />
              <Picker.Item label="گوی" value="گوی" />
              <Picker.Item label="مفتولی" value="مفتولی" />
              <Picker.Item label="پروفیل" value="پروفیل" />
              <Picker.Item label="تخت" value="تخت" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>نوع سی ان سی</Text>
          </Col>
        </Grid>
      </View>
    );
    const AlangooRikhtegi = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ alangooRikhtegi: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.alangooRikhtegi}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ alangooRikhtegi: itemValue })
              }
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="رنگی" value="رنگی" />
              <Picker.Item label="میناکاری" value="میناکاری" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>نوع ریختگی</Text>
          </Col>
        </Grid>
      </View>
    );
    // =============Alangoo FINISH=========================================
    // =============Zanjir sub catagories==================================
    const Zanjir = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ zanjir: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.zanjir}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ zanjir: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="ابریشمی" value="ابریشمی" />
              <Picker.Item label="متوسط" value="متوسط" />
              <Picker.Item label="سنگین" value="سنگین" />
              <Picker.Item label="سایر" value="سایر" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>نوع زنجیر</Text>
          </Col>
        </Grid>
      </View>
    );

    // ========Brand ======================================
    const Brand = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ brand: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.brand}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ brand: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="فلامنگو" value="فلامنگو" />
              <Picker.Item label="ونزو" value="ونزو" />
              <Picker.Item label="ونیزی" value="ونیزی" />
              <Picker.Item label="کارتیه" value="کارتیه" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>برند</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== Weight================================
    const Weight = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col size={0.6}>
            <Button
              transparent
              onPress={() => this.setState({ weightFrom: undefined, weightTo: undefined })}
            >
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={1.5} style={{ marginRight: -44, flexDirection: 'row' }}>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>گرم</Text>
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                keyboardType="numeric"
                onChangeText={text => this.setState({ weightTo: text })}
                value={this.state.weightTo}
                maxLength={3}
                style={styles.textInput}
              />
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>تا</Text>
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                keyboardType="numeric"
                onChangeText={text => this.setState({ weightFrom: text })}
                value={this.state.weightFrom}
                maxLength={3}
                style={styles.textInput}
              />
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>از</Text>
            </Col>
          </Col>
          <Col>
            <Text style={styles.text}>وزن</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== Ojrat Percent================================
    const OjratPercent = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col size={0.6}>
            <Button
              transparent
              onPress={() =>
                this.setState({ ojratPercentFrom: undefined, ojratPercentTo: undefined })
              }
            >
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={1.5} style={{ marginRight: -44, flexDirection: 'row' }}>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>درصد</Text>
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                keyboardType="numeric"
                onChangeText={text => this.setState({ ojratPercentTo: text })}
                value={this.state.ojratPercentTo}
                maxLength={2}
                style={styles.textInput}
              />
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>تا</Text>
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                keyboardType="numeric"
                onChangeText={text => this.setState({ ojratPercentFrom: text })}
                value={this.state.ojratPercentFrom}
                maxLength={2}
                style={styles.textInput}
              />
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>از</Text>
            </Col>
          </Col>
          <Col>
            <Text style={styles.text}>اجرت</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== Ojrat Toman================================
    const OjratToman = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col size={0.6}>
            <Button
              transparent
              onPress={() => this.setState({ ojratTomanFrom: undefined, ojratTomanTo: undefined })}
            >
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={1.5} style={{ marginRight: -44, flexDirection: 'row' }}>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>تومان</Text>
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                keyboardType="numeric"
                onChangeText={text => this.setState({ ojratTomanTo: text })}
                value={this.state.ojratTomanTo}
                maxLength={5}
                style={styles.textInput}
              />
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>تا</Text>
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                keyboardType="numeric"
                onChangeText={text => this.setState({ ojratTomanFrom: text })}
                value={this.state.ojratTomanFrom}
                maxLength={5}
                style={styles.textInput}
              />
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>از</Text>
            </Col>
          </Col>
          <Col>
            <Text style={styles.text}>اجرت</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== Avaialable products================================
    const Available = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ available: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.available}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ available: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="موجود" value="موجود" />
              <Picker.Item label="ناموجود" value="ناموجود" />
              <Picker.Item label="ناموجود اما قابل سفارش" value="ناموجود اما قابل سفارش" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>موجود در انبار</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== Avaialable products================================
    const Color = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ color: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.color}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ color: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="زرد" value="زرد" />
              <Picker.Item label="سفید" value="سفید" />
              <Picker.Item label="رزگلد" value="رزگلد" />
              <Picker.Item label="دورنگ" value="دورنگ" />
              <Picker.Item label="سه رنگ" value="سه رنگ" />
              <Picker.Item label="سایر رنگها" value="سایر رنگها" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>رنگ</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== Negir Dar ================================
    const NeginDar = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ neginDar: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.neginDar}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ neginDar: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="نگین دارد" value="نگین دارد" />
              <Picker.Item label="نگین ندارد" value="نگین ندارد" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>نگین</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== Negir Dar ================================
    const SangDeducted = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ sangDeducted: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button>
          </Col>
          <Col size={2}>
            <Picker
              selectedValue={this.state.sangDeducted}
              style={{ height: 30 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ sangDeducted: itemValue })}
            >
              <Picker.Item label="" value="all" />
              <Picker.Item label="کم شده باشد" value="کم شده باشد" />
              <Picker.Item label="کم نشده باشد" value="کم نشده باشد" />
            </Picker>
          </Col>
          <Col>
            <Text style={styles.text}>وزن نگین</Text>
          </Col>
        </Grid>
      </View>
    );

    return (
      <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
        <Container style={{ backgroundColor: Colors.statusBarColor }}>
          <Navbar left={left} right={right} title={this.props.pageTitle} />
          <Content>
            <View style={styles.container}>
              {/* Rendering Catagories based on main catagory */}
              {this.props.pageTitle === 'زنانه' ? WomanCatagories : <View />}
              {this.props.pageTitle === 'مردانه' ? ManCatagories : <View />}
              {this.props.pageTitle === 'بچه گانه' ? WomanCatagories : <View />}
              {this.props.pageTitle === 'اکسسوری' ? AccCatagories : <View />}
              {/* النگو */}
              {this.state.womanCatagory === 'النگو' ? Alangoo : <View />}
              {this.state.alangoo === 'سی ان سی' && this.state.womanCatagory === 'النگو' ? (
                AlangooCNC
              ) : (
                <View />
              )}
              {this.state.alangoo === 'ریختگی' && this.state.womanCatagory === 'النگو' ? (
                AlangooRikhtegi
              ) : (
                <View />
              )}
              {/* زنجیر */}
              {this.state.womanCatagory === 'زنجیر' ? Zanjir : <View />}
            </View>
            <View style={styles.container}>
              {Brand}
              {Weight}
              {OjratPercent}
              {OjratToman}
              {Available}
              {Color}
              {NeginDar}
              {this.state.neginDar === 'نگین دارد' ? SangDeducted : <View />}
            </View>
            <Button
              full
              primary
              onPress={() => {
                let itemsToPass = this.props.data;

                if (this.state.womanCatagory !== 'all') {
                  itemsToPass = itemsToPass.filter(
                    item => item.acf.type === this.state.womanCatagory
                  );
                }

                if (this.state.brand !== 'all') {
                  itemsToPass = itemsToPass.filter(item => item.acf.brand === this.state.brand);
                }

                this.showToast('علی');

                console.log(itemsToPass);
                // Actions.searchResult({ data: itemsToPass, title: this.props.pageTitle });
              }}
            >
              <Text style={{ color: '#fff' }}>جستجو</Text>
            </Button>
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }

  showToast(text) {
    Toast.show({
      text,
      position: 'top',
      type: 'danger',
      buttonText: '',
      duration: 2000
    });
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.gold,
    fontWeight: 'bold',
    fontSize: 14
  },
  container: {
    borderWidth: 1,
    backgroundColor: Colors.grey,
    margin: 10,
    borderRadius: 6
  },
  searchItem: {
    borderBottomWidth: 1,
    borderColor: Colors.black,
    margin: 10,
    height: 40
  },
  picker: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  textInput: {
    textAlign: 'center',
    width: 50
  }
});
