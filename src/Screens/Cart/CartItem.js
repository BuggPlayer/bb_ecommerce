import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const CartItem = props => {
  const data = props.item;
  // console.log('data', data.item);

  return (
    <View style={styles.listItem} key={Math.random()}>
      <View
        style={{
          backgroundColor: 'gray',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          margin: 5,
          height: 80,
          borderRadius: 10,
        }}>
        <View
          style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
          <Image
            style={{height: 60, width: 60}}
            source={{
              uri: data.item.image
                ? data.item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
          />
          <View style={{marginLeft: 25}}>
            <Text>{data.item.name}</Text>
            <Text>$ {data.item.price}</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'gray',
            flexDirection: 'row',
            marginRight: 20,
          }}>
          <Text>+</Text>
          <Text>0</Text>
          <Text>-</Text>
          {/* <Text>$ {data.item.price}</Text> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    backgroundColor: 'white',
    // justifyContent: 'space-around',
  },
});

export default CartItem;
