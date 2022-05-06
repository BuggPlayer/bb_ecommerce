import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// Redux
import {Provider} from 'react-redux';
import store from './src/Redux/store';

// Context API
import Auth from './src/Context/store/Auth';

///navigators
import Main from './src/Navigators/Main';

//screens
import ProductContainer from './src/Screens/Products/ProductContainer';
import Header from './src/Shared/Header';

const App = () => {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          {/* <Header /> */}
          <Main />
          {/* <Toast ref={ref => Toast.setRef(ref)} /> */}
        </NavigationContainer>
      </Provider>
    </Auth>
  );
};

export default App;
