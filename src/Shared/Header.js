import React from 'react';
import {StyleSheet, Image, SafeAreaView, View} from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require('../Assets/images/Logo.png')}
        resizeMode="contain"
        style={{height: 50}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 80,
  },
});
export default Header;
