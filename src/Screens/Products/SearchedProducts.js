import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

const SearchedProducts = props => {
  const {productsFiltered} = props;
  return (
    <View>
      {productsFiltered.length > 0 ? (
        productsFiltered.map(item => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Product Detail', {item: item});
            }}
            // key={item.}
            style={{flexDirection: 'row', margin: 3}}>
            <Image
              style={{height: 50, width: 60}}
              resizeMode="contain"
              source={{
                uri: item.image
                  ? item.image
                  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }}
            />
            <View style={{marginLeft: 30}}>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
            <View style={{marginLeft: 'auto'}}>
              <Button title="ADD" color="green" />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{alignSelf: 'center'}}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default SearchedProducts;
