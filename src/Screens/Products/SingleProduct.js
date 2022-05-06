import React, {useState} from 'react';
import {Image, View, StyleSheet, Text, ScrollView, Button} from 'react-native';
const SingleProduct = props => {
  const [item, setItem] = useState(props.route.params.item);
  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 80, padding: 5}}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          {/* <View style={styles.availability}>
            <Text style={{marginRight: 10}}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View> */}
          <Text>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        {/* <Right>
          <EasyButton
            primary
            medium
            onPress={() => {
              props.addItemToCart(item.id),
                Toast.show({
                  topOffset: 60,
                  type: 'success',
                  text1: `${item.name} added to Cart`,
                  text2: 'Go to your cart to complete order',
                });
            }}>
            <Text style={{color: 'white'}}>Add</Text>
          </EasyButton>
        </Right> */}
        <Text style={{color: 'white'}}>Add</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: 'red',
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
export default SingleProduct;
