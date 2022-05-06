import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Cart from '../Screens/Cart/Cart';
import Checkout from '../Screens/Cart/checkout/Checkout';
import checkoutNavigator from '../Navigators/CheckoutNavigator';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Cart"
        component={Cart}

        // options={{
        //   headerShown: false,
        //   //   headerShown: false,
        // }}
      />
      <Stack.Screen
        name="CheckOut"
        component={checkoutNavigator}
        // options={{
        //   headerShown: true,
        // }}
      />
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
