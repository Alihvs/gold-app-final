import React, { Component } from 'react';
import { BackHandler, I18nManager } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Home from './page/Home';
import Search from './page/Search';
import Cart from './page/Cart';
import WishList from './page/WishList';
import Category from './page/Category';
import Product from './page/Product';
import ImageGallery from './page/ImageGallery';
import Login from './page/Login';
import SearchResult from './page/SearchResult';
import Splash from './page/Splash';
import FactorResult from './page/FactorResult';
import Profile from './page/Profile';
import SingleFactor from './page/SingleFactor';

export default class Main extends Component {
  constructor(props) {
    super(props);
    I18nManager.allowRTL(false);
  }
  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return (
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="splash" component={Splash} hideNavBar />
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="home" component={Home} hideNavBar />
            <Scene key="search" component={Search} hideNavBar />
            <Scene key="cart" component={Cart} hideNavBar />
            <Scene key="wishlist" component={WishList} hideNavBar />
            <Scene key="searchResult" component={SearchResult} hideNavBar />
            <Scene key="category" component={Category} hideNavBar />
            <Scene key="product" component={Product} hideNavBar />
            <Scene key="imageGallery" component={ImageGallery} modal hideNavBar />
            <Scene key="factorResult" component={FactorResult} hideNavBar />
            <Scene key="profile" component={Profile} hideNavBar />
            <Scene key="singleFactor" component={SingleFactor} hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }
}
