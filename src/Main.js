/**
 * This is the Main file
 * This file contains the routes of all the pages
 **/

// React native and others libraries imports
import React, { Component } from "react";
import { BackHandler } from "react-native";
import { Root } from "native-base";
import { Scene, Router, Actions } from "react-native-router-flux";

// Our custom files and classes import
import Home from "./page/Home";
import Search from "./page/Search";
import Cart from "./page/Cart";
import WishList from "./page/WishList";
import Newsletter from "./page/Newsletter";
import Contact from "./page/Contact";
import Category from "./page/Category";
import Product from "./page/Product";
import ImageGallery from "./page/ImageGallery";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Checkout from "./page/Checkout";

// ===CONTEXT API STARTS=========
//first create a new context
// const MyContext = React.createContext();

// class MyProvider extends Component {
//   state = {
//     name: "Wes",
//     age: 100,
//     cool: true
//   };
//   render() {
//     return (
//       <MyContext.Provider value="I'm the value">
//         {this.props.children}
//       </MyContext.Provider>
//     );
//   }
//}
// ===CONTEXT API ENDS=========

export default class Main extends Component {
  componentWillMount = () => {
    BackHandler.addEventListener("hardwareBackPress", () => Actions.pop());
  };

  render() {
    return (
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="home" component={Home} hideNavBar />
            <Scene key="search" component={Search} modal hideNavBar />
            <Scene key="cart" component={Cart} modal hideNavBar />
            <Scene key="wishlist" component={WishList} modal hideNavBar />
            <Scene key="contact" component={Contact} modal hideNavBar />
            <Scene key="newsletter" component={Newsletter} modal hideNavBar />
            <Scene key="category" component={Category} hideNavBar />
            <Scene key="product" component={Product} hideNavBar />
            <Scene
              key="imageGallery"
              component={ImageGallery}
              modal
              hideNavBar
            />
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="signup" component={Signup} hideNavBar />
            <Scene key="checkout" component={Checkout} hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }
}
