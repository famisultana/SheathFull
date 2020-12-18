import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Header from '../Components/Header';
import RootView from '../Components/RootView';
import Input from '../Components/Input';
import {colors, metrics, fonts} from '../utils/Theme';
import Navigator from '../utils/Navigator';
import Validation from '../utils/Validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from '../utils/Toast';
import {connect} from 'react-redux';
import Button from '../Components/Button';
import ImageView from '../Components/ImageView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addItem, deleteItem} from '../Redux/actions';
import image from '../resources/images/cart.png';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.inputs = {};
  }

  onChange(name, val) {
    this.setState({[name]: val});
  }

  apiCall = async () => {
    console.log('API CALL START');
    this.setState({loading: true});
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: this.state.fname,
            lastname: this.state.lname,
            phonenumber: this.state.phoneNumber,
            address: this.state.address,
            email: this.state.email,
            appname: 'SheathFull Store',
          }),
        },
      );

      const response = await res.json();
      console.log(response);
      this.setState({loading: false});
      if (response.status) Navigator.navigateAndReset('OrderPlaced');
      else Toast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  onButtonPress = () => {
    if (!Validation.isValidField(this.state.fname || '')) {
      return Toast('Please Enter Your First Name');
    }
    if (!Validation.isValidField(this.state.lname || '')) {
      return Toast('Please Enter Your Last Name');
    }
    if (!Validation.isValidField(this.state.email || '')) {
      return Toast('Please Enter Email');
    }
    if (!Validation.isValidField(this.state.phoneNumber || '')) {
      return Toast('Please Enter Valid Phone Number');
    }
    if (!Validation.isValidField(this.state.address || '')) {
      return Toast('Please Enter your Address');
    }
    this.apiCall();
  };

  onAdd = (id) => {
    this.setState({quantity: this.state.quantity + 1});
  };

  onMinus = (id) => {
    if (this.state.quantity > 1)
      this.setState({quantity: this.state.quantity - 1});
    else Navigator.goBack();
  };

  renderItem = (item) => {
    console.log(item);
    const {id, image, description, productname, price, color} = item;

    const flag = this.props.cart?.items.filter((val) => val.id == id);
    const quantity = flag.length !== 0 ? flag[0].quantity : 0;

    return (
      <TouchableOpacity
        onPress={() => Navigator.navigate('Detail', {item: item})}
        activeOpacity={0.8}
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          marginBottom: 20,
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 100,
        }}>
        <ImageView
          source={image}
          style={{
            width: 100,
            height: '100%',
            backgroundColor: color,
            borderRadius: 20,
          }}
        />
        <View style={{flex: 1, padding: 10, marginRight: 30}}>
          <Text
            style={{
              fontSize: 16,
              textTransform: 'capitalize',
              marginBottom: 10,
            }}>
            {productname}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>${price}</Text>
        </View>
        <View style={styles.quantityView}>
          <Icon
            name="plus"
            color={colors.secondary}
            size={20}
            onPress={() => this.props.addItem(item)}
          />

          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 30,
              width: 30,
              height: 30,
              marginVertical: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>{quantity}</Text>
          </View>

          <Icon
            name="minus"
            color={colors.secondary}
            size={20}
            onPress={() => this.props.deleteItem(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <RootView bottom={0}>
        <Header title="Order Detail" />
        {this.props.cart.items.length !== 0 ? (
          <>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={{
                flex: 1,
                paddingHorizontal: metrics.defaultMargin,
              }}>
              {this.props.cart.items.map((item) => this.renderItem(item))}

              <View style={styles.info}>
                <Text style={styles.title}>Payment Mode</Text>
                <Text style={styles.text}>Cash on Delivery</Text>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  padding: metrics.defaultMargin,
                  borderRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 20,
                    marginBottom: 20,
                  }}>
                  Personal Info
                </Text>
                <Input
                  placeholder="First Name"
                  label="First name"
                  value={this.state.fname}
                  onChangeText={(text) => {
                    this.onChange('fname', text);
                  }}
                />
                <Input
                  placeholder="Last Name"
                  label="Last name"
                  value={this.state.lname}
                  onChangeText={(text) => {
                    this.onChange('lname', text);
                  }}
                />

                <Input
                  placeholder="Email"
                  label="Email"
                  keyboardType={'email-address'}
                  value={this.state.email}
                  onChangeText={(text) => {
                    this.onChange('email', text);
                  }}
                />
                <Input
                  placeholder="Mobile Number"
                  label="Mobile No."
                  value={this.state.phoneNumber}
                  onChangeText={(text) => {
                    this.onChange('phoneNumber', text);
                  }}
                  keyboardType={'phone-pad'}
                />
                <Input
                  placeholder="Complete address"
                  label="Complete Address"
                  value={this.state.address}
                  onChangeText={(text) => {
                    this.onChange('address', text);
                  }}
                  multiline={true}
                  style={{height: 100}}
                />
              </View>
            </KeyboardAwareScrollView>

            <View
              style={{
                padding: metrics.defaultMargin,
                shadowColor: colors.darkBackground,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                backgroundColor: 'white',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <View style={styles.info}>
                <Text style={styles.title}>Total Price</Text>
                <Text style={styles.text}>
                  ${this.props.cart.totalPrice.toFixed(2)}
                </Text>
              </View>
              <Button
                dark
                style={{marginVertical: 20}}
                loading={this.state.loading}
                onPress={this.onButtonPress}
                text="Confirm Order"
              />
            </View>
          </>
        ) : (
          <View style={{flex: 1, marginTop: '45%', alignItems: 'center'}}>
            <ImageView source={image} />
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                textAlign: 'center',
                margin: 20,
              }}>
              Oops! You don't have any items in your cart!
            </Text>
          </View>
        )}
      </RootView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.primaryBold,
    fontSize: 28,
    marginVertical: metrics.defaultMargin,
  },

  iconView: {
    backgroundColor: 'rgb(255,255,255)',
    width: 50,
    marginRight: '5%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 34,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: 18,
  },
  text: {
    fontFamily: fonts.secondary,
    fontSize: 16,
  },

  quantityView: {
    backgroundColor: colors.lightBackground,
    padding: 10,
    alignItems: 'center',
    borderRadius: 40,
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40,
  },
  icon: {
    fontSize: 28,
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
    color: colors.secondary,
  },
});

const mapStateToProps = (state) => {
  return {cart: state.cartReducer};
};

export default connect(mapStateToProps, {addItem, deleteItem})(OrderDetail);
