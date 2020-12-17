import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {metrics} from '../../utils/Theme';

export default class HorizontalList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data, renderItem, style, containerStyle,horizontal=true, ...rest} = this.props;
    return (
      <View style={{flex:1}}>
        <FlatList
          bounces={false}
          data={data}
          horizontal={horizontal}
          style={[{flex:1,},containerStyle]}
          contentContainerStyle={{
            paddingRight:metrics.defaultMargin,
            paddingVertical: horizontal ? '2%' : 0,
            paddingLeft:horizontal ? 0 :metrics.defaultMargin,
            ...style,
          }}
          keyExtractor={() => Math.random().toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          {...rest}
        />
      </View>
    );
  }
}
