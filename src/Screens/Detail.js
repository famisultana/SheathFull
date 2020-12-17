import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ImageView from '../Components/ImageView';
import {colors, metrics} from '../utils/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
// import data from '../data';
import Header from '../Components/Header';
import RootView from '../Components/RootView';
import Navigator from '../utils/Navigator';
import {connect} from 'react-redux';
import {addItem, deleteItem} from '../Redux/actions';

class Detail extends Component {
  addItem = () => {
    this.props.addItem(this.props.route.params.item);
  };

  deleteItem = () => {
    this.props.deleteItem(this.props.route.params.item);
  };

  onBuyNowPress = () => {
    Navigator.navigate('OrderDetail')
  };

  _renderButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this.onBuyNowPress();
        }}
        style={{
          backgroundColor: colors.secondary,
          marginLeft: 10,
          height: 150,
          borderRadius: 30,
          borderBottomEndRadius: 0,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            transform: [{rotate: '-90deg'}],
            color: 'white',
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Checkout
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      productName,
      price,
      description,
      rating,
      image,
      id,
    } = this.props.route.params.item;

    const flag = this.props.cart?.items.filter((val) => val.id == id);
    const quantity = flag.length !== 0 ? flag[0].quantity : 0;

    return (
      <RootView style={{flex: 10}} top={0}>
        <Icon
          name="arrow-back-circle"
          style={styles.backIcon}
          onPress={() => Navigator.goBack()}
        />
        <View style={{flex: 4, marginBottom: 20}}>
          <ImageView cover style={{flex: 1}} source={image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.spacebetween}>
            <Text style={{...styles.heading,textTransform:'capitalize'}}>{productName}</Text>
            <Text style={[styles.heading, {fontSize: 20}]}>
              <Icon
                color={'#FDCC0D'}
                name={'star-sharp'}
                size={20}
                style={{fontWeight: 'bold'}}
              />
              {" "}{rating}
            </Text>
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.desc}>{description}</Text>
          </View>
          <Text
            style={[
              styles.heading,
              {marginLeft: metrics.defaultMargin, fontSize: 18},
            ]}>
            Quantity
          </Text>

          <View style={styles.quantityView}>
            <TouchableOpacity onPress={this.deleteItem} style={styles.iconView}>
              <Icon name="remove" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={this.addItem} style={styles.iconView}>
              <Icon name="add" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              flex: 2,
              paddingLeft: metrics.defaultMargin,
            }}>
            <View
              style={[
                styles.keyDetailsContainer,
                {flex: 1, marginRight: '5%'},
              ]}>
              <Text style={[styles.desc, {fontWeight: 'bold'}]}>
                Delivery Time
              </Text>
              <Text style={styles.subheading}>
                <Icon
                  name={'time-outline'}
                  size={20}
                  style={{fontWeight: 'bold'}}
                />
                45 Mins
              </Text>
            </View>
            <View style={[styles.keyDetailsContainer]}>
              <Text style={[styles.desc, {fontWeight: 'bold'}]}>
                Total Price
              </Text>
              <Text style={styles.subheading}>${price}.00</Text>
            </View>
            {this.props.cart.items.length !== 0 && this._renderButton()}
          </View>
        </View>
      </RootView>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 4,
  },
  spacebetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.defaultMargin,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  descriptionView: {
    paddingVertical: metrics.smallMargin,
    paddingHorizontal: metrics.defaultMargin,
  },
  desc: {
    color: colors.grey,
    textAlign: 'left',
    fontSize: 16,
  },
  keyDetailsContainer: {
    padding: '4%',
    paddingVertical: '8%',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: '8%',
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: metrics.defaultMargin,
    marginTop: 10,
  },
  iconView: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  backIcon: {
    color: 'black',
    position: 'absolute',
    zIndex: 2,
    top: 50,
    left: 10,
    fontSize: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, {addItem, deleteItem})(Detail);
