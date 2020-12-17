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
      items: data.products.filter((item) => item.category == '1'),
    });
  }

  onIndexChange = (id) => {
    this.setState({
      selectedIndex: id,
      items: data.products.filter((val) => val.category == id),
    });
  };

  render() {
    console.log(this.state.items);

    return (
      <RootView>
        {/* <View style={{margin: metrics.defaultMargin}}>
          <Text style={{fontSize: scaleFont(30), fontWeight: '900'}}>
            Fresh Taste of
          </Text>
          <Text style={{fontSize: scaleFont(30)}}>Maestro Sweets</Text>
        </View> */}
        <View style={{
          backgroundColor:colors.secondary,
          height: metrics.height * 0.15,
          borderBottomRightRadius:20,
          borderBottomLeftRadius:20
          }}>
        <ListView
          data={data.category}
          renderItem={({item}) => {
            const flag = item.id == this.state.selectedIndex;
            return (
              <View style={{alignItems: 'center',justifyContent: 'center',alignSelf: 'center'}}>
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
                    backgroundColor:
                      flag
                        ? colors.primary
                        : colors.secondary,
                    marginLeft: metrics.defaultMargin,
                    padding: 5,
                    borderWidth:2,
                    borderColor:flag ? colors.secondary:'#5e6369'
                  }}>
                  <ImageView
                    source={item.GrayIcon}
                    style={{width: '100%', height: '100%'}}
                    tintColor={
                      flag ? 'white' :'#5e6369'
                    }
                  />
                </View>
              </TouchableOpacity>
                  <Text style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    color:flag ? 'white' : '#474c52'
                    
                  }}>{item.category}</Text>
              </View>
            )
          }}
        />
        </View>
        {this.state.items.length > 4 && (
          <View
            style={{
              flexDirection: 'row',
              marginLeft: metrics.defaultMargin,
              marginTop: metrics.largeMargin,
            }}>
            <View>
              <CardComponent item={this.state.items[0]} left={true} />
              <CardComponent item={this.state.items[1]} left={true} />
            </View>
            <View>
              <CardComponent item={this.state.items[2]} right={true} />
              <CardComponent item={this.state.items[3]} right={true} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  Navigator.navigate('List', {data: this.state.items,category:this.state.selectedIndex})
                }
                style={{
                  backgroundColor: colors.primary,
                  flex: 1,
                  margin: metrics.smallMargin,
                  borderRadius: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 20,
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  View More
                </Text>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    marginRight: 10,
                  }}>
                  <Icon
                    name="arrowright"
                    style={{color: colors.primary, fontSize: 20}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </RootView>
    );
  }
}
