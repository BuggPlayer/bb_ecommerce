import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';

import ProductList from './ProductList';
import SearchedProducts from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import baseURL from '../../Assets/common/baseUrl';
import axios from 'axios';
import Searchbox from '../../components/Searchbox';

var {height} = Dimensions.get('window');
const ProductContainer = props => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [focus, setFocus] = useState();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseURL}products`)
        .then(res => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res?.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch(error => {
          console.log('Api call error');
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then(res => {
          setCategories(res.data);
        })
        .catch(error => {
          console.log('Api call error');
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, []),
  );

  // Product Methods
  const searchProduct = text => {
    setProductsFiltered(
      products.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = ctg => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter(i => i?.category?._id === ctg ?? []),
              setActive(true),
            ),
          ];
    }
  };

  return (
    <>
      {loading === false ? (
        <View>
          <Searchbox
            onFocus={openList}
            onChangeText={text => searchProduct(text)}
            focus={focus}
          />

          {focus === true ? (
            <SearchedProducts
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <Banner />
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />

              {productsCtg?.length > 0 ? (
                <View style={styles.listContainer}>
                  {productsCtg.map(item => {
                    return (
                      <ProductList
                        navigation={props.navigation}
                        key={item.name}
                        item={item}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={[styles.center, {height: height / 2}]}>
                  <Text>No products found</Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      ) : (
        // Loading
        <View
          style={[styles.center, {backgroundColor: '#f2f2f2', marginTop: 150}]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    // height: height,
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProductContainer;
