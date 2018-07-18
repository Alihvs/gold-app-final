/**
 * This is the category component used in the home page
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Colors from '../Colors';

// Our custom files and classes import
import Text from './Text';

export default class CategoryBlock extends Component {
  render() {
    return (
      //Trying my thing
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._onPress.bind(this)} activeOpacity={0.9}>
          <View
            style={{
              height: 170,
              backgroundColor: Colors.statusBarColor
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: '#ecc643',
                margin: 10,
                flex: 1,
                backgroundColor: '#000',
                flexDirection: 'row-reverse'
              }}
            >
              <View
                style={{
                  flexBasis: '50%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ color: '#ecc643', fontSize: 32 }}>{this.props.title}</Text>
              </View>
              <View
                style={{
                  flexBasis: '50%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {this.props.title === 'زنانه' || this.props.title === 'مردانه' ? (
                  <Image
                    style={{
                      width: 55,
                      height: undefined,
                      flex: 1
                    }}
                    resizeMode="contain"
                    source={this.props.image}
                  />
                ) : (
                  <Image
                    style={{ width: 115, height: undefined, flex: 1 }}
                    resizeMode="contain"
                    source={this.props.image}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _onPress() {
    Actions.category({ id: this.props.id, title: this.props.title });
  }
}
