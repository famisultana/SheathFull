import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {colors, fonts} from '../../utils/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {hidePassword: this.props.type === 'password' ? true : false};
  }

  static defaultProps = {
    value: null,
    placeholderColor: colors.placeholder,
    keyboardType: 'default',
  };

  render() {
    return (
      <View>
        {this.props.label ? (
          <Text style={[styles.text, this.props.textStyle]}>
            {this.props.label}
          </Text>
        ) : (
          <View></View>
        )}
        <View style={[styles.container, this.props.style]}>
          <TextInput
            ref={(component) => (this._textInput = component)}
            style={{
              ...styles.input,
              width: this.props.type === 'password' ? '90%' : '100%',
            }}
            value={this.props.value}
            placeholder={this.props.placeholder}
            secureTextEntry={this.state.hidePassword}
            placeholderTextColor={this.props.placeholderColor}
            onChangeText={this.props.onChangeText}
            keyboardType={this.props.keyboardType}
            blurOnSubmit={true}
            multiline={this.props.multiline}
            textAlignVertical="center"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom:20
  },

  input: {
    paddingLeft: 15,
    paddingRight: 15,
    color: colors.primary,
    paddingVertical: 10,
    textTransform: 'lowercase',
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary,
    color: colors.primary, 
    fontWeight:'bold',
    marginBottom:5
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 8,
    right: 10,
  },
});

export default InputBox;
