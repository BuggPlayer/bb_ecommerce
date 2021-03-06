import React from 'react';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import ProductCard from './ProductCard';
var {width} = Dimensions.get('window');

const ProductList = props => {
  const {item} = props;
  return (
    <View
      style={{}}
      // onPress={() => props.navigation.navigate('Product Detail', {item: item})}
    >
      <View style={{width: width / 2, backgroundColor: 'gainsboro'}}>
        <ProductCard
          onpress={() =>
            props.navigation.navigate('Product Detail', {item: item})
          }
          {...item}
        />
      </View>
    </View>
  );
};

export default ProductList;
