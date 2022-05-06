import React from 'react';
import {StyleSheet, View, Dimensions, Image, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
var {width} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {addToCart, singleItemRemove} from '../../Redux/action/CartAction';
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/styledcomponent/EasyButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CartButton from '../../Assets/common/CartButton';

const ProductCard = props => {
  // const [quantity, setQuantity] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [isViable, setisViable] = React.useState(false);
  const dispatch = useDispatch();

  const addtocartHandler = item => {
    console.log('item', item);
    dispatch(addToCart(item));
    // setQuantity(item.qnty);
  };
  console.log('quantity', quantity);
  const removecartHandler = item => {
    // console.log('item', item);
    dispatch(singleItemRemove(item));
  };

  const Qty = useSelector(state => state.cartItems.carts);
  // const qnty = cardata.map(item => item.qnty);
  console.log('Qty', Qty);
  // setQuantity(Qty.qnty);
  const {name, price, image, countInStock} = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        // source={{
        //   uri: image
        //     ? image
        //     : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        // }}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />
      <View style={styles.card} />
      <View>
        <Text style={styles.title}>
          {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
        </Text>
        <Text style={{textDecorationStyle: 'dashed'}}>MRP:200</Text>
        <Text style={styles.price}>${price}</Text>

        <Text style={{textDecorationStyle: 'dashed'}}> 4 Kg</Text>
      </View>

      {countInStock > 0 ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            // backgroundColor: 'red',
          }}>
          <Text>ADD</Text>
        </View>
      ) : (
        <Text style={{marginTop: 20}}>Currently Unavailable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    // height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    // alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: width / 2 - 40 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  card: {
    // marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'orange',
    marginTop: 10,
  },
});
export default ProductCard;
