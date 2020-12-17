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

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    const {id, image, description, productName, price} = item;

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
        <ImageView cover source={image} style={{width: 100, height: '100%'}} />
        <View style={{flex: 1, padding: 10, marginRight: 30}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              textTransform: 'capitalize',
            }}>
            {productName}
          </Text>
          <Text numberOfLines={2}>{description}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>${price}</Text>
        </View>
        <View style={styles.quantityView}>
          {quantity ? (
            <>
              <Icon
                name="minus"
                color={'white'}
                size={20}
                onPress={() => this.props.deleteItem(item)}
              />
              <Text style={{color: 'white', marginVertical: 10}}>
                {quantity}
              </Text>
            </>
          ) : null}
          <Icon
            name="plus"
            color={'white'}
            size={20}
            onPress={() => this.props.addItem(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <RootView>
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
                <Text style={styles.title}>Total Price</Text>
                <Text style={styles.text}>${this.props.cart.totalPrice}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.title}>Payment Mode</Text>
                <Text style={styles.text}>Cash on Delivery</Text>
              </View>
            </KeyboardAwareScrollView>
            <View style={{marginHorizontal: metrics.defaultMargin}}>
              <Button
                dark
                style={{marginVertical: 20}}
                loading={this.state.loading}
                onPress={() => Navigator.navigate('Checkout')}
                text="Continue"
              />
            </View>
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 36,
                fontWeight: 'bold',
                textAlign: 'center',
                marginHorizontal: 20,
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
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
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
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: 'center',
    borderTopStartRadius: 20,
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
