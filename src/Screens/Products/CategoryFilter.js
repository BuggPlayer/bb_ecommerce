import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from 'react-native';

const CategoryFilter = props => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{backgroundColor: '#f2f2f2', padding: 10}}>
      <View
        style={{
          // backgroundColor: 'red',
          margin: 0,
          padding: 0,
          borderRadius: 0,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter('all'), props.setActive(-1);
          }}>
          <View
            style={[
              styles.center,

              {margin: 5, borderRadius: 25, paddingHorizontal: 20},
              props.active == -1 ? styles.active : styles.inactive,
            ]}>
            <Text style={{color: 'white', padding: 10, color: 'black'}}>
              All
            </Text>
          </View>
        </TouchableOpacity>
        {props.categories.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                props.categoryFilter(item.id),
                  props.setActive(props.categories.indexOf(item));
              }}>
              <View
                style={[
                  styles.center,
                  {margin: 5, borderRadius: 24, paddingHorizontal: 20},
                  props.active == props.categories.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}>
                <Text style={{color: 'white', padding: 10, color: 'black'}}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#c7f6b6',
  },
  inactive: {
    backgroundColor: '#bebebe',
  },
});

export default CategoryFilter;
