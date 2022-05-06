import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_QTY,
  RMV_ONE,
} from '../constant';

//add into cart
export const addToCart = payload => {
  // console.log('addToCart', payload);
  return {
    type: 'ADD_TO_CART',
    payload,
  };
};

//remove from card
export const removeFromCart = id => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

// single item remove
export const singleItemRemove = item => {
  return {
    type: RMV_ONE,
    payload: item,
  };
};
