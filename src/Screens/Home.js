import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import RootView from '../Components/RootView';
import {colors, fonts, metrics, scaleFont} from '../utils/Theme';
import ListView from '../Components/ListView';
import ImageView from '../Components/ImageView';
import CardComponent from '../Components/CardComponent';
import data from '../data';
import Icon from 'react-native-vector-icons/AntDesign';
import Navigator from '../utils/Navigator';
import SearchBar from '../Components/Search';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: [],
      categories: [],
      items: [],
      selectedIndex: '1',
    };
  }

  componentDidMount() {
    this.setState({
      items: data.products.filter((item) => item.categoryid == '1'),
    });
  }

  onIndexChange = (id) => {
    this.setState({
      selectedIndex: id,
      items: data.products.filter((val) => val.categoryid == id),
    });
  };

  render() {
    console.log(this.state.items);

    return (
      <RootView style={{backgroundColor:colors.lightBackground}}>
        <View
          style={{
            backgroundColor: colors.secondary,
            height: metrics.height * 0.32,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              paddingVertical:metrics.height*0.01
            }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 28,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: metrics.height*0.01,
              }}>
              SheathFull Store
            </Text>
            <SearchBar onPress={()=> Navigator.push('Search')} disabled />
          </View>
          <ListView
          
            data={data.category}
            renderItem={({item}) => {
              const flag = item.id == this.state.selectedIndex;
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.onIndexChange(item.id)}>
                    <View
                      style={{
                        width: metrics.height * 0.09,
                        height: metrics.height * 0.09,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        backgroundColor: flag
                          ? colors.primary
                          : colors.secondary,
                        marginLeft: metrics.defaultMargin,
                        padding: metrics.height*0.005,
                        borderWidth: 2,
                        borderColor: flag ? colors.secondary : '#5e6369',
                      }}>
                      <ImageView
                        source={item.GrayIcon}
                        style={{width: '100%', height: '100%'}}
                        tintColor={flag ? 'white' : '#5e6369'}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      alignSelf: 'center',
                      color: flag ? 'white' : '#474c52',
                      marginLeft:metrics.defaultMargin, 
                      marginTop:5
                    }}>
                    {item.category}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <ListView
        style={{marginTop:20}}
        data={this.state.items}
        renderItem={({item})=><CardComponent item={item}/>} 
        />
      </RootView>
    );
  }
}
