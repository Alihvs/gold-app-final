/**
 * This is the Search file
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { StyleSheet, Picker, TextInput, StatusBar } from 'react-native';
import {
  Container,
  Content,
  View,
  Left,
  Right,
  Icon,
  Button,
  Toast,
  CheckBox,
  Spinner
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
// import Slider from "react-native-slider";

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Colors from '../Colors';

const BASE_REQUEST_URL = 'http://app.idamas.ir/wp-json/wp/v2/';

//Newley added libraries

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      newItems: [],
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
      onlyAvailable: false,
      // ---------CanReorder-----------
      canReorder: false,
      // ---------color ------------
      color: 'all',
      // ---------Negindar ------------
      neginDar: false,
      sangDeducted: false,
      //------------Big Search State -------------
      finalSearchItems: []
    };
  }

  componentDidMount() {
    let requestCatagory = null;
    this.setState({ isLoading: true });
    // Constructing the url
    switch (this.props.pageTitle) {
      case 'زنانه': {
        requestCatagory = 'women';
        break;
      }
      case 'مردانه': {
        requestCatagory = 'men';
        break;
      }
      case 'بچه گانه': {
        requestCatagory = 'kid';
        break;
      }
      case 'اکسسوری': {
        requestCatagory = 'acc';
        break;
      }
      default: {
        requestCatagory = 'women';
      }
    }
    const REQUEST_URL = BASE_REQUEST_URL + requestCatagory;
    fetch(REQUEST_URL, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then(response => response.json())
      .then(data => {
        data.map(recivedData => {
          this.setState(prevState => ({
            newItems: [...prevState.newItems, recivedData],
            isLoading: false
          }));
        });
      });
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
        <Button onPress={this.refreshData.bind(this)} transparent>
          {this.state.isLoading ? <Spinner color="white" /> : <Icon name="refresh" />}
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
              <Icon style={{ color: Colors.white }} name="close" />
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
            {/* <Button transparent onPress={() => this.setState({ available: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button> */}
          </Col>
          <Col size={2}>
            <CheckBox
              checked={this.state.onlyAvailable}
              color={Colors.white}
              onPress={() => this.setState({ onlyAvailable: !this.state.onlyAvailable })}
            />
          </Col>
          <Col>
            <Text style={styles.text}>فقط موجود</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== Can Reorder================================
    const CanReorder = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            {/* <Button transparent onPress={() => this.setState({ available: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button> */}
          </Col>
          <Col size={2}>
            <CheckBox
              checked={this.state.canReorder}
              color={Colors.white}
              onPress={() => this.setState({ canReorder: !this.state.canReorder })}
            />
          </Col>
          <Col>
            <Text style={styles.text}>قابل سفارش مجدد</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== Colors ================================
    const Color = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            <Button transparent onPress={() => this.setState({ color: 'all' })}>
              <Icon style={{ color: Colors.white }} name="close" />
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
            {/* <Button transparent onPress={() => this.setState({ available: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button> */}
          </Col>
          <Col size={2}>
            <CheckBox
              checked={this.state.neginDar}
              color={Colors.white}
              onPress={() => this.setState({ neginDar: !this.state.neginDar })}
            />
          </Col>
          <Col>
            <Text style={styles.text}>نگین دار</Text>
          </Col>
        </Grid>
      </View>
    );
    // ======== SangDeducted ================================
    const SangDeducted = (
      <View style={styles.searchItem}>
        <Grid style={{ alignItems: 'center' }}>
          <Col>
            {/* <Button transparent onPress={() => this.setState({ available: 'all' })}>
              <Icon style={{ color: Colors.Gold }} name="close" />
            </Button> */}
          </Col>
          <Col size={2}>
            <CheckBox
              checked={this.state.sangDeducted}
              color={Colors.white}
              onPress={() => this.setState({ sangDeducted: !this.state.sangDeducted })}
            />
          </Col>
          <Col>
            <Text style={styles.text}>وزن نگین کم شده باشد</Text>
          </Col>
        </Grid>
      </View>
    );

    return (
      <SideMenuDrawer ref={ref => (this._sideMenuDrawer = ref)}>
        <Container style={{ backgroundColor: Colors.statusBarColor }}>
          <Navbar
            left={left}
            right={right}
            title={`${this.props.pageTitle} (${this.state.newItems.length} کالا)`}
          />
          <StatusBar backgroundColor={Colors.black} barStyle="light-content" />

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
              {Color}
              {Available}
              {CanReorder}
              {NeginDar}
              {this.state.neginDar ? SangDeducted : <View />}
            </View>
            {this.state.isLoading ? (
              <View />
            ) : (
              <Button
                full
                transparent
                bordered
                style={{
                  borderColor: Colors.gold,
                  marginHorizontal: 10,
                  marginBottom: 5,
                  width: '93%',
                  alignSelf: 'center',
                  borderRadius: 8
                }}
                onPress={() => {
                  let itemsToPass = this.state.newItems;
                  //Helper Variables for numbers
                  //========Weight===========================
                  let weightFrom = this.state.weightFrom;
                  let weightTo = this.state.weightTo;
                  if (!this.state.weightFrom) weightFrom = 0;
                  if (!this.state.weightTo) weightTo = 999;
                  //========ojrat percent====================
                  let ojratPercentFrom = this.state.ojratPercentFrom;
                  let ojratPercentTo = this.state.ojratPercentTo;
                  if (!this.state.ojratPercentFrom) ojratPercentFrom = 0;
                  if (!this.state.ojratPercentTo) ojratPercentTo = 99;
                  //========ojrat percent====================
                  let ojratTomanFrom = this.state.ojratTomanFrom;
                  let ojratTomanTo = this.state.ojratTomanTo;
                  if (!this.state.ojratTomanFrom) ojratTomanFrom = 0;
                  if (!this.state.ojratTomanTo) ojratTomanTo = 999999;
                  //=============================================
                  //======================Validations======================================
                  if (Number(this.state.weightTo) <= Number(this.state.weightFrom)) {
                    this.showToast('وزن اولیه نمی تواند از وزن نهایی بیشتر باشد');
                    return;
                  }
                  if (Number(this.state.ojratPercentTo) <= Number(this.state.ojratPercentFrom)) {
                    this.showToast('اجرت اولیه نمی تواند از اجرت نهایی بیشتر باشد');
                    return;
                  }
                  if (Number(this.state.ojratTomanTo) <= Number(this.state.ojratTomanFrom)) {
                    this.showToast('اجرت اولیه نمی تواند از اجرت نهایی بیشتر باشد');
                    return;
                  }
                  // ======================================================================

                  if (this.state.womanCatagory !== 'all') {
                    itemsToPass = itemsToPass.filter(
                      item => item.acf.type === this.state.womanCatagory
                    );
                  }

                  if (this.state.brand !== 'all') {
                    itemsToPass = itemsToPass.filter(item => item.acf.brand === this.state.brand);
                  }

                  itemsToPass = itemsToPass.filter(item =>
                    this.inRange(item.acf.weight, weightFrom, weightTo)
                  );

                  itemsToPass = itemsToPass.filter(item =>
                    this.inRange(item.acf.ojrat_percent, ojratPercentFrom, ojratPercentTo)
                  );

                  itemsToPass = itemsToPass.filter(item =>
                    this.inRange(item.acf.ojrat_toman, ojratTomanFrom, ojratTomanTo)
                  );

                  if (this.state.color !== 'all') {
                    itemsToPass = itemsToPass.filter(item => item.acf.color === this.state.color);
                  }

                  if (this.state.onlyAvailable) {
                    itemsToPass = itemsToPass.filter(
                      item => item.acf.availability === this.state.onlyAvailable
                    );
                  }

                  if (this.state.canReorder) {
                    itemsToPass = itemsToPass.filter(
                      item => item.acf.canReorder === this.state.canReorder
                    );
                  }

                  if (this.state.neginDar) {
                    itemsToPass = itemsToPass.filter(
                      item => item.acf.negindar === this.state.neginDar
                    );
                  }

                  if (this.state.sangDeducted) {
                    itemsToPass = itemsToPass.filter(
                      item => item.acf.hasNeginMoney === this.state.sangDeducted
                    );
                  }

                  // console.log(itemsToPass);
                  Actions.searchResult({ data: itemsToPass, title: this.props.pageTitle });
                }}
              >
                <Text style={{ color: '#fff' }}>جستجو</Text>
              </Button>
            )}
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }

  refreshData() {
    this.setState({ newItems: [] });
    if (!this.state.isLoading) {
      let requestCatagory = null;
      this.setState({ isLoading: true });
      // Constructing the url
      switch (this.props.title) {
        case 'زنانه': {
          requestCatagory = 'women';
          break;
        }
        case 'مردانه': {
          requestCatagory = 'men';
          break;
        }
        case 'بچه گانه': {
          requestCatagory = 'kid';
          break;
        }
        case 'اکسسوری': {
          requestCatagory = 'acc';
          break;
        }
        default: {
          requestCatagory = 'women';
        }
      }
      const REQUEST_URL = BASE_REQUEST_URL + requestCatagory;
      fetch(REQUEST_URL, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Credentials': 'true'
        }
      })
        .then(response => response.json())
        .then(data => {
          data.map(recivedData => {
            this.setState(prevState => ({
              newItems: [...prevState.newItems, recivedData],
              isLoading: false
            }));
          });
        });
    }
  }

  inRange(x, min, max) {
    return (x - min) * (x - max) <= 0;
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
    color: Colors.white,
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
    width: 60
  }
});
