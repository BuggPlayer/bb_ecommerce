import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

const methods = [
  {name: 'Cash on Delivery', value: 1},
  {name: 'Bank Transfer', value: 2},
  {name: 'Card Payment', value: 3},
];

const paymentCards = [
  {name: 'Wallet', value: 1},
  {name: 'Visa', value: 2},
  {name: 'MasterCard', value: 3},
  {name: 'Other', value: 4},
];

const Payment = props => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  return (
    <View>
      <Text>Choose your payment method</Text>

      <>
        {methods.map((item, index) => {
          return (
            <View key={item.name} onPress={() => setSelected(item.value)}>
              <Text>{item.name}</Text>

              {/* <Radio selected={selected == item.value} /> */}
            </View>
          );
        })}
        {/* {selected == 3 ? (
          <Picker
            mode="dropdown"
            iosIcon={<Icon name={'arrow-down'} />}
            headerStyle={{backgroundColor: 'orange'}}
            headerBackButtonTextStyle={{color: '#fff'}}
            headerTitleStyle={{color: '#fff'}}
            selectedValue={card}
            onValueChange={x => setCard(x)}>
            {paymentCards.map((c, index) => {
              return <Picker.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Picker>
        ) : null} */}
        <View style={{marginTop: 60, alignSelf: 'center'}}>
          <Button
            title={'Confirm'}
            onPress={() => props.navigation.navigate('Confirm', {order})}
          />
        </View>
      </>
    </View>
  );
};

export default Payment;
