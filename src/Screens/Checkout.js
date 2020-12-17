import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

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

class Checkout extends Component {
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
            appname: 'MaestroSweets',
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

  render() {
    return (
      <RootView>
        <Header title="Personal Info" />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={{
            flex: 1,
            paddingHorizontal: metrics.defaultMargin,
          }}>
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
            <Button
              dark
              style={{marginTop: 20}}
              loading={this.state.loading}
              onPress={this.onButtonPress}
              text="Confirm Order"
            />
          </View>
        </KeyboardAwareScrollView>
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
    padding: 10,
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
});

const mapStateToProps = (state) => {
  return {cart: state.cartReducer};
};

export default connect(mapStateToProps)(Checkout);
