import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
        {isBack ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Icon
                name="arrow-back-circle"
                style={styles.backIcon}
                onPress={() => Navigator.goBack()}
              />
            </View>
            <View>
              <Text style={{fontSize: 22, fontWeight: '600', marginLeft: 10}}>
                {this.props.title}
              </Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>
        ) : (
          <Icon name="menu" style={styles.icon} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: metrics.defaultMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
  },
  backView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  backIcon: {
    color: colors.primary,
    fontSize: 50,
  },
});
