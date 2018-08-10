import React from 'react';
import { Image, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import { View, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Col, Grid } from 'react-native-easy-grid';
import Colors from '../Colors';
import Text from './Text';

export function SingleItemRender(item, index) {
  const itemPercentString = item.acf.ojrat_percent === '0' ? '' : `- ${item.acf.ojrat_percent} %`;
  const itemTitle = `${item.acf.type} ${item.acf.brand} ${itemPercentString}`;
  return (
    <View
      key={item.id}
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.gold,
        padding: 10
      }}
    >
      <TouchableHighlight onPress={() => Actions.product({ product: item })}>
        <View>
          <View
            style={{
              position: 'absolute',
              top: 0,
              // width: 45,
              backgroundColor: Colors.gold,
              borderRadius: 50
            }}
          >
            <Text
              style={{
                color: Colors.black,
                textAlign: 'center',
                // paddingVertical: 1,
                paddingHorizontal: 5
              }}
            >
              {++index}
            </Text>
          </View>
          <Grid>
            {item.acf.availability ? (
              <View
                style={{
                  borderColor: Colors.gold,
                  borderWidth: 0.3,
                  position: 'absolute',
                  bottom: 0
                }}
              >
                <Text style={{ color: Colors.gold, padding: 6 }}>موجود</Text>
              </View>
            ) : (
              <View />
            )}
            <Col size={1.5} style={{ paddingRight: 25 }}>
              <Text style={styles.mainText}>{itemTitle}</Text>
              {item.title.rendered ? (
                <Text style={styles.subText}>{`کد : ${item.title.rendered}`}</Text>
              ) : (
                <View />
              )}

              <Text style={styles.subText}>{`وزن: ${item.acf.weight} گرم`}</Text>
              <Text style={styles.subText}>{`رنگ: ${item.acf.color}`}</Text>
              <Text style={styles.subText}>{`سایز: ${item.acf.size}`}</Text>
            </Col>
            <Col size={1}>
              <Image
                source={{
                  uri: item.acf.images[0].image.sizes.thumbnail
                }}
                style={{
                  height: '100%',
                  width: '100%',
                  borderWidth: 0.3,
                  borderColor: Colors.gold,
                  alignSelf: 'flex-end'
                }}
              />
            </Col>
          </Grid>
        </View>
      </TouchableHighlight>
    </View>
  );
}

export function AddToWhishList(item) {
  const product = item;
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

const styles = StyleSheet.create({
  mainText: {
    color: Colors.white,
    fontSize: 13,
    paddingBottom: 15
  },
  subText: {
    color: Colors.grey,
    fontSize: 11
  }
});
