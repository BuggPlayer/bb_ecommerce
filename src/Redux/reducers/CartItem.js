import {
  ADD_TO_CART,
  ADD_QTY,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SUBTRACT_QTY,
  RMV_ONE,
} from '../constant';

const INIT_STATE = {
  carts: [],
};
const cartItems = (state = INIT_STATE, action) => {
  // console.log('action.pyal;oad', action?.payload ?? 'hello');
  switch (action.type) {
    case 'ADD_TO_CART':
      const IteamIndex = state.carts.findIndex(
        iteam => iteam.id === action.payload.id,
      );

      if (IteamIndex >= 0) {
        state.carts[IteamIndex].qnty += 1;
        return {
          ...state,
          carts: [...state.carts],
        };
      } else {
        const temp = {...action.payload, qnty: 1};
        return {
          ...state,
          carts: [...state.carts, temp],
        };
      }

    case 'REMOVE_FROM_CART':
      const data = state.carts.filter(el => el.id !== action.payload);
      // console.log(data);

      return {
        ...state,
        carts: data,
      };

    case 'RMV_ONE':
      const IteamIndex_dec = state.carts.findIndex(
        iteam => iteam.id === action.payload.id,
      );

      if (state.carts[IteamIndex_dec].qnty >= 1) {
        const dltiteams = (state.carts[IteamIndex_dec].qnty -= 1);
        console.log([...state.carts, dltiteams]);

        return {
          ...state,
          carts: [...state.carts],
        };
      } else if (state.carts[IteamIndex_dec].qnty === 1) {
        const data = state.carts.filter(el => el.id !== action.payload);

        return {
          ...state,
          carts: data,
        };
      }

    default:
      return state;
  }
};

export default cartItems;
