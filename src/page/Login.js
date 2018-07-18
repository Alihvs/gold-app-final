/**
 * This is the Login Page
 **/

// React native and others libraries imports
import React, { Component } from "react";
import {
  Container,
  View,
  Button,
  Icon,
  Item,
  Input,
  Toast,
  Spinner
} from "native-base";
import {
  StyleSheet,
  AsyncStorage,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { Actions } from "react-native-router-flux";

// Our custom files and classes import
import Colors from "../Colors";
import Text from "../component/Text";
import Navbar from "../component/Navbar";
import Home from "./Home";

// Loading indicator

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: "",

      validating: false,
      username: "",
      password: "",
      hasError: false,
      errorText: ""
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("user", (err, res) => {
      if (res) {
        Actions.home();
      }
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Container style={{ backgroundColor: "#fdfdfd" }}>
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
                برای ادامه استفاده از برنامه، باید وارد شوید{" "}
              </Text>
            </View>
            <Item>
              <Icon active name="ios-person" style={{ color: "#687373" }} />
              <Input
                placeholder="نام کاربری"
                onChangeText={text => this.setState({ username: text })}
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
                  Keyboard.dismiss();
                  if (this.state.username && this.state.password) {
                    fetch("http://app.idamas.ir/wp-json/jwt-auth/v1/token", {
                      method: "post",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password
                      })
                    })
                      .then(response => response.json())
                      .then(data => {
                        if (data.token) {
                          this.saveToStorage(data);
                          Actions.home();
                        } else {
                          Toast.show({
                            text: "مشخصات وارده شده اشتباه است",
                            position: "bottom",
                            type: "danger",
                            buttonText: "",
                            duration: 2000
                          });
                        }
                      });
                  } else {
                    Toast.show({
                      text: "لطفاً اطلاعات وارد شده را کنترل کنید",
                      position: "top",
                      type: "danger",
                      buttonText: "",
                      duration: 2000
                    });
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
        </Container>
      </TouchableWithoutFeedback>
    );
  }

  // checkUserSignedIn() {
  //   if (!AsyncStorage.getItem("user")) return false;
  //   else return true;
  // }

  async saveToStorage(userData) {
    if (userData) {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          isLoggedIn: true,
          token: userData.token,
          username: this.state.username,
          email: userData.user_email,
          displayName: userData.user_display_name
        })
      );
      return true;
    }
    return false;
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: -1,
    marginTop: 12,
    marginBottom: 12
  }
});
