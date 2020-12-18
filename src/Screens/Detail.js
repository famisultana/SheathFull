import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ImageView from '../Components/ImageView';
import {colors, metrics, text} from '../utils/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
// import data from '../data';
import Header from '../Components/Header';
import Button from '../Components/Button';
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
    Navigator.navigate('OrderDetail');
  };

  _renderButton = () => {
    return (
      <View style={{width: '100%'}}>
        <Button
          dark
          style={{marginVertical: 20}}
          // loading={this.state.loading}
          onPress={() => this.onBuyNowPress()}
          text="Checkout"
        />
      </View>
    );
  };

  render() {
    const {
      productname,
      price,
      description,
      rating,
      image,
      id,
    } = this.props.route.params.item;

    const flag = this.props.cart?.items.filter((val) => val.id == id);
    const quantity = flag.length !== 0 ? flag[0].quantity : 0;

    return (
      <RootView style={{}} top={0}>
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
            <Text
              style={{
                ...styles.heading,
                textTransform: 'capitalize',
                width: '80%',
              }}>
              {productname}
            </Text>
            <Text style={[styles.heading, {fontSize: 20, color: colors.grey}]}>
              <Icon
                color={'#FDCC0D'}
                name={'star-sharp'}
                size={20}
                style={{fontWeight: 'bold'}}
              />{' '}
              {rating}
            </Text>
          </View>

          <View style={{marginHorizontal: metrics.defaultMargin}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 26,
                marginVertical: metrics.smallMargin,
              }}>
              ${price}
            </Text>
          </View>

          <View style={styles.quantityView}>
            <TouchableOpacity
              onPress={this.deleteItem}
              style={{
                ...styles.iconView,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: colors.grey,
              }}>
              <Icon name="remove" style={{...styles.icon, color: 'black'}} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={this.addItem} style={styles.iconView}>
              <Icon name="add" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionView}>
            <Text style={styles.desc}>{description}</Text>
          </View>

          <View
            style={{
              paddingHorizontal: metrics.defaultMargin,
            }}>
            {this._renderButton()}
          </View>
        </View>
      </RootView>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer: {},
  spacebetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: metrics.defaultMargin,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
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
    color: colors.primary,
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
