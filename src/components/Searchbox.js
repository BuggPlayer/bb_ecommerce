import React from 'react';
import {TextInput, View, Text} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const Searchbox = ({onFocus, onChangeText, focus}) => {
  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          borderRadius: 15,
          paddingVertical: hp('.3%'),

          width: '90%',
          margin: hp('1.5%'),
        }}>
        <Icon
          name="ios-search"
          size={20}
          color="#000"
          style={{alignSelf: 'center', marginLeft: hp('2%')}}
        />
        <TextInput
          placeholder="Type here..."
          placeholderTextColor="black"
          style={{fontSize: 18, padding: hp('1.3%'), width: '80%'}}
          onFocus={onFocus}
          onChangeText={onChangeText}
        />
        {focus === true ? (
          <View style={{display: 'flex', justifyContent: 'center'}}>
            <Icon
              name="ios-cancel"
              size={20}
              color="#000"
              style={{alignSelf: 'center', marginRight: hp('5%')}}
            />
          </View>
        ) : (
          <View style={{display: 'flex', justifyContent: 'center'}}>
            <Icon
              name="filter"
              size={20}
              color="#000"
              style={{alignSelf: 'center', marginRight: hp('5%')}}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default Searchbox;
