import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigator from '../../utils/Navigator';
import {colors, metrics, fonts} from '../../utils/Theme';
import ImageView from '../ImageView';

export default class CardComponent extends Component {
  render() {
    const {
      id,
      description,
      image,
      price,
      productname,
      rating,
      color,
 
    } = this.props.item;
    const height = metrics.height * 0.45;
    console.log(color, id);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Navigator.navigate('Detail', {item: this.props.item})}>
        <View
          style={[
            {
              backgroundColor: 'white',
              borderRadius: 30,
              shadowColor: colors.third,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              width: metrics.width * 0.7,
              marginLeft: metrics.defaultMargin,
              height: height,
            },
            this.props.containerStyle,
          ]}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              position: 'absolute',
              right: -10,
              top: -10,
              zIndex: 3,
            }}>
            <Icon name="heart" size={20} color={colors.primary} />
          </View>
          <View
            style={{
              position: 'absolute',
              backgroundColor: color,
              right: 10,
              top: 10,
              left: 10,
              height: height / 2.5,
              borderRadius: 20,
            }}
          />
          <View style={{flex: 1, marginTop: 5}}>
            <ImageView
              source={image}
              style={{
                width: '100%',
                height: '100%',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            />
          </View>
          <View
            style={{
              paddingVertical: metrics.height * 0.02,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  flex: 1,
                  marginRight: 10,
                  color: colors.primary,
                }}>
                {productname}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="star" color={colors.rating} size={20} />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: fonts.primary,
                    marginLeft: 5,
                  }}>
                  {rating}
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>${price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
