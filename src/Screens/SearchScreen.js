import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../Components/Header';
import Button from '../Components/Button';
import RootView from '../Components/RootView';
import SearchBar from '../Components/Search';
import CardComponent from '../Components/CardComponent';
import data from '../data/index';
import {colors, metrics, text} from '../utils/Theme';

export default function SearchScreen() {
  const [list, setlist] = useState(data.products);
  const [searchQueryText, setsearchQueryText] = useState('');

  useEffect(() => {
    var updated_list = data.products.filter((val) =>
      val.productname.toLowerCase().includes(searchQueryText.toLowerCase()),
    );

    setlist(updated_list);
  }, [searchQueryText]);

  return (
    <RootView>
      <Header title={'Search'}></Header>
      <SearchBar
        onChangeText={(value) => setsearchQueryText(value)}></SearchBar>
      <View style={{margin: metrics.defaultMargin}}>
        <Text style={text.heading}>
          <Text style={{fontWeight: '400'}}>Found </Text>
          {list.length} Results
        </Text>
      </View>
      <FlatList
        numColumns={2}
        bounces={false}
        data={list}
        keyExtractor={() => Math.random().toString()}
        renderItem={({item}) => (
          <CardComponent 
          height={metrics.height*0.3}
          squeez 
          ratingStyle={styles.rating} 
          priceStyle={styles.price} 
          item={item} 
          titleStyle={styles.title} 
          containerStyle={styles.containerStyle} 
          />
        )}
      />
    </RootView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: metrics.width * 0.52 - metrics.defaultMargin * 2,
    marginBottom: '10%',
  },
  title:{
      fontSize:16,
      color:colors.grey
  },
  price:{
      fontSize:14
  },
  rating:{
      fontSize:14
  }
});
