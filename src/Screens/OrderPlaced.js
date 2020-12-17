import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import Navigator from '../utils/Navigator';
import {colors, metrics} from '../utils/Theme';
import {emptyCart} from '../Redux/actions/'
import RootView from '../Components/RootView';
import Button from '../Components/Button'

class OrderPlaced extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  onPress=()=>{
      Navigator.navigateAndReset('Home')
      this.props.emptyCart()
  }

  render() {
    return (
      <RootView
        style={{justifyContent: 'center', padding: metrics.largeMargin}}>
        <View
          style={{
            width: metrics.width * 0.35,
            height: metrics.width * 0.35,
            backgroundColor: colors.secondary,
            borderRadius: metrics.width * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom:20
          }}>
          <Icon name="check" color="white" size={58} />
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 20,
          }}>
          Thank you for placing order.
        </Text>

        <Button
          text="Return to Home page"
          showIcon={false}
          style={{marginVertical: 20}}
          onPress={this.onPress}
        />
      </RootView>
    );
  }
}

export default connect(null,{emptyCart})(OrderPlaced)