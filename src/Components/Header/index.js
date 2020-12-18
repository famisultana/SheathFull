import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../utils/Navigator';
import {colors, metrics} from '../../utils/Theme';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {isBack = true} = this.props;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => Navigator.goBack()}
            activeOpacity={0.9}
            style={styles.backView}>
            <Icon name="arrow-left" style={styles.icon} />
          </TouchableOpacity>
          <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: metrics.defaultMargin,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
    color: 'white',
  },
  backView: {
    width: 44,
    height: 44,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginRight:20
  },
  text: {
    fontWeight: 'bold',
  },
});
