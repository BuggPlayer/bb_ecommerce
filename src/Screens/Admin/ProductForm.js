import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
// import {Item, Picker} from 'native-base';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import EasyButton from '../../Shared/styledcomponent/EasyButton';
import Error from '../../Shared/Error';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../Assets/common/baseUrl';
import axios from 'axios';
import mime from 'mime';

import {launchImageLibrary} from 'react-native-image-picker';

import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductForm = props => {
  const [filePath, setFilePath] = useState({});
  // const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  console.log('setCategory', category);
  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category._id);
      setCountInStock(props.route.params.item.countInStock.toString());
    }

    AsyncStorage.getItem('jwt')
      .then(res => {
        console.log('res', res);
        setToken(res);
      })
      .catch(error => console.log(error));

    // Categories
    axios
      .get(`${baseURL}categories`)
      .then(res => setCategories(res.data))
      .catch(error => alert('Error to load categories'));

    return () => {
      setCategories([]);
    };
  }, []);

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath(response);
    });
  };
  const addProduct = () => {
    if (
      name == '' ||
      brand == '' ||
      price == '' ||
      description == '' ||
      category == '' ||
      countInStock == ''
    ) {
      setError('Please fill in the form correctly');
    }

    let formData = new FormData();
    // console.log('filepath', filePath);
    // formData.append('image', {
    //   uri: filePath.assets[0].uri,
    //   type: filePath.assets[0].type,
    //   name: filePath.assets[0].fileName,

    //   // uri: filePath.uri,
    //   // type: mime.getType(filePath),
    //   // name: newImageUri.split('/').pop(),
    // });
    // formData.append('image', filePath);
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('richDescription', richDescription);
    formData.append('rating', rating);
    formData.append('numReviews', numReviews);
    formData.append('isFeatured', isFeatured);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${baseURL}products/${item.id}`, formData, config)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Product successfuly updated',
              text2: '',
            });
            setTimeout(() => {
              props.navigation.navigate('Products');
            }, 500);
          }
        })
        .catch(error => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    } else {
      console.log('token', token);
      console.log('formdata', formData);
      const dataBody = {
        image: filePath.uri,
        name: name,
        brand: brand,
        price: price,
        description: description,
        category: category,
        countInStock: countInStock,
        richDescription: richDescription,
        rating: rating,
        numReviews: numReviews,
        isFeatured: isFeatured,
      };
      // console.log('sdaf', dataBody);
      axios({
        method: 'post',
        url: `${baseURL}products`,
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data: dataBody,
      })
        .then(res => {
          console.log('res', res);
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'New Product added',
              text2: '',
            });
            setTimeout(() => {
              props.navigation.navigate('Products');
            }, 500);
          }
        })
        .catch(error => {
          console.log('errr', error);
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    }
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const categoriesData = categories?.map(c => {
    // console.log('c', c);
    return {
      lable: c.name,
      value: c.id,
    };
  });
  // console.log('data ', categoriesData);
  // console.log('value ', value);

  return (
    <FormContainer title="Add Product">
      <View style={styles.imageContainer}>
        {/* <Image style={styles.image} source={{uri: filePath?.assets[0]?.uri}} /> */}
        <TouchableOpacity
          onPress={() => chooseFile('photo')}
          style={styles.imagePicker}>
          <Icon style={{color: 'white'}} name="camera" />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Brand</Text>
      </View>
      <Input
        placeholder="Brand"
        name="brand"
        id="brand"
        value={brand}
        onChangeText={text => setBrand(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Name</Text>
      </View>
      <Input
        placeholder="Name"
        name="name"
        id="name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Price</Text>
      </View>
      <Input
        placeholder="Price"
        name="price"
        id="price"
        value={price}
        keyboardType={'numeric'}
        onChangeText={text => setPrice(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Count in Stock</Text>
      </View>
      <Input
        placeholder="Stock"
        name="stock"
        id="stock"
        value={countInStock}
        keyboardType={'numeric'}
        onChangeText={text => setCountInStock(text)}
      />
      <View style={styles.label}>
        <Text style={{textDecorationLine: 'underline'}}>Description</Text>
      </View>
      <Input
        placeholder="Description"
        name="description"
        id="description"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <>
        {/* {renderLabel()} */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={categoriesData}
          search
          maxHeight={300}
          labelField="lable"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setCategory(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        />
      </>

      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <EasyButton large primary onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  // label: {
  //   width: '80%',
  //   marginTop: 10,
  // },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },

  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  // label: {
  //   position: 'absolute',
  //   backgroundColor: 'white',
  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ProductForm;
