import React, {Component} from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import RootView from '../Components/RootView';
import Header from '../Components/Header';
import ListView from '../Components/ListView';
import ImageView from '../Components/ImageView';
import {colors, metrics} from '../utils/Theme';
import data from '../data';
import Navigator from '../utils/Navigator';
import Button from '../Components/Button'

export default class List extends Component {
  renderItem = ({item}) => {
    console.log(item);
    const {id, image, description, productName, price} = item;
    return (
      <TouchableOpacity 
      onPress={()=>Navigator.navigate('Detail',{item:item})}
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
        <View style={{flex: 1, padding: 10}}>
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
      </TouchableOpacity>
    );
  };

  render() {
    const item = this.props.route.params.category;
    const category = data.category.filter((val) => val.id == item)[0].category;
    return (
      <RootView>
        <Header title={category} />
        <ListView
          horizontal={false}
          data={this.props.route.params.data}
          renderItem={this.renderItem}
        />
        <View style={{margin:metrics.defaultMargin}}>
        <Button text='Go to Cart' onPress={()=>Navigator.navigate('OrderDetail')}/>
        </View>
      </RootView>
    );
  }
}
