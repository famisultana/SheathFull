import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../Components/Header';
import Button from '../Components/Button';
import RootView from '../Components/RootView';
import SearchBar from '../Components/Search';
import CardComponent from '../Components/CardComponent';
import data from '../data/index';
import {metrics} from '../utils/Theme';

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
      <FlatList
        bounces={false}
        data={list}
        keyExtractor={() => Math.random().toString()}
        renderItem={({item}) => (
          <CardComponent item={item} containerStyle={styles.containerStyle} />
        )}
      />
    </RootView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: metrics.width * 0.9,
    height: metrics.height * 0.35,
    marginVertical: '2%',
  },
});
