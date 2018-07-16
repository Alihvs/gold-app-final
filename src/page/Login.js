/**
 * This is the Login Page
 **/

// React native and others libraries imports
import React, { Component } from "react";
import {
  Container,
  View,
  Left,
  Right,
  Button,
  Icon,
  Item,
  Input
} from "native-base";
import { Content, Form, Label } from "react-native";
import { Actions } from "react-native-router-flux";

// Our custom files and classes import
import Colors from "../Colors";
import Text from "../component/Text";
import Navbar from "../component/Navbar";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validating: false,
      username: "",
      password: "",
      email: "",
      hasError: false,
      errorText: ""
    };
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
        <Navbar left={left} right={right} title="ورود" />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 50,
            paddingRight: 50
          }}
        >
          <View style={{ marginBottom: 35, width: "100%" }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "right",
                width: "100%",
                marginBottom: 20,
                color: Colors.navbarBackgroundColor
              }}
            >
              خوش آمدید{" "}
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "right",
                width: "100%",
                color: "#687373"
              }}
            >
              برای ادامه استفاده از برنامه، باید ابتدا وارد شوید{" "}
            </Text>
          </View>
          <Item>
            <Icon active name="ios-person" style={{ color: "#687373" }} />
            <Input
              placeholder="ایمیل"
              onChangeText={text => this.setState({ email: text })}
              placeholderTextColor="#687373"
            />
          </Item>
          <Item>
            <Icon active name="ios-lock" style={{ color: "#687373" }} />
            <Input
              placeholder="کلمه عبور"
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry={true}
              placeholderTextColor="#687373"
            />
          </Item>
          {this.state.hasError ? (
            <Text
              style={{ color: "#c0392b", textAlign: "center", marginTop: 10 }}
            >
              {this.state.errorText}
            </Text>
          ) : null}
          <View style={{ alignItems: "center" }}>
            <Button
              onPress={() => {
                if (this.state.email && this.state.password) {
                  this.validate();
                }
              }}
              style={{
                backgroundColor: Colors.navbarBackgroundColor,
                marginTop: 20
              }}
            >
              <Text
                style={{ color: "#fdfdfd", width: 150, textAlign: "center" }}
              >
                ورود
              </Text>
            </Button>
          </View>
        </View>
        {/* Started my login thing here */}
        {/* <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={text => this.setState({ email: text })} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
            <Button
              block
              success
              style={{ marginTop: 50 }}
              onPress={() => {
                if (this.state.email && this.state.password) {
                  this.validate();
                }
              }}
            >
              <Text>Authenticate</Text>
            </Button>
          </Form>
        </Content> */}
        {/* Finished my login thing here */}
      </Container>
    );
  }

  login() {
    /*
      Remove this code and replace it with your service
      Username: this.state.username
      Password: this.state.password
    */
    this.setState({
      hasError: true,
      errorText: "Invalid username or password !"
    });
  }

  validate() {
    this.setState({ validating: true });
    let formData = new FormData();
    formData.append("type", "login");
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);

    return fetch("http://goldapp.mypressonline.com/authentication.php", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        let data = responseJson.data;

        if (this.saveToStorage(data)) {
          this.setState({
            validating: false
          });

          /* Redirect to accounts page */
          Actions.search();
        } else {
          console.log("Failed to store auth");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  async saveToStorage(userData) {
    if (userData) {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          isLoggedIn: true,
          authToken: userData.auth_token,
          id: userData.user_id,
          name: userData.user_login
        })
      );
      return true;
    }

    return false;
  }
}
