import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SingleProduct';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        // options={{headerTransparent: true}}
        name="Home"
        component={ProductContainer}
      />
      <Stack.Screen name="Product Detail" component={SingleProduct} />
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
