import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Navigator from '../../utils/Navigator';
import {colors, metrics} from '../../utils/Theme';
import ImageView from '../ImageView';

export default class CardComponent extends Component {
  render() {
    const {id, description, image, price, productName} = this.props.item;
    const {left} = this.props;
;
    const height = left ? metrics.height*0.3 : metrics.height*0.25
    
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={()=>Navigator.navigate('Detail',{item:this.props.item})}>
        <View
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          shadowColor: colors.third,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          width: metrics.width * 0.43,
          marginBottom: metrics.smallMargin,
          marginRight: metrics.smallMargin,
          height:height,
        }}>
        <View style={{flex:1}}>
        <ImageView
          cover
          source={image}
          style={{
            width: '100%',
            height: '100%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        />
        </View>
        <View style={{paddingVertical: metrics.height*0.01, paddingHorizontal: 10}}>
          <Text
          numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}>
            {productName}
          </Text>
          <Text
            style={{color: colors.grey, marginVertical: 5}}
            numberOfLines={1}>
            {description}
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>${price}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}
