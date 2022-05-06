import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import CartItem from './CartItem';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {removeFromCart} from '../../Redux/action/CartAction';
var {height, width} = Dimensions.get('window');
const Cart = props => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => state.cartItems.carts);
  // console.log('carrr', cartItem);

  const cartReomvehandler = id => {
    // console.log('id', id);
    dispatch(removeFromCart(id));
  };

  return (
    <>
      {cartItem.length ? (
        <ScrollView style={{position: 'relative'}}>
          <SwipeListView
            data={cartItem}
            renderItem={data => {
              return <CartItem item={data} />;
            }}
            renderHiddenItem={data => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => cartReomvehandler(data.item.id)}>
                  <Icon name="trash" color={'white'} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={100}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />

          <View
            style={{
              backgroundColor: 'yellow',
              // position: 'absolute',
              // bottom: 0,
              // right: 0,
              // left: 0,
              // top: 10,
              zIndex: 1,
              // marginTop: 100,
            }}>
            <View
              style={{
                backgroundColor: 'pink',
                // flexDirection: 'row',
                // display: 'flex',
                // justifyContent: 'flex-end',
              }}>
              <Text>subtotal:300 </Text>
              <Text>Shipping: 0</Text>
              <Text>Bag Total:300</Text>
            </View>

            <View
              style={{
                padding: 10,
                justifyContent: 'center',

                display: 'flex',
                alignItems: 'center',
              }}>
              <Text onPress={() => props.navigation.navigate('CheckOut')}>
                Proceed to checkout
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Text>Look like your cart is emppty</Text>
          <Text>Add product to your cart </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    // height: 70,
    width: '20%',
  },
});

export default Cart;
