import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {metrics, colors, text} from '../../utils/Theme';

import Icon from 'react-native-vector-icons/AntDesign';

const height = metrics.height * 0.05;

export default function SearchBar(props) {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {!props.disabled ? (
        <TextInput
        autoFocus={true}
          placeholder={'Search'}
          placeholderTextColor={colors.grey}
          style={{...styles.textInput}}
          {...props}
        />
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            if (props.disabled && props.onPress) {
              props.onPress();
            }
          }}>
          <View style={{...styles.textInput, justifyContent: 'center'}}>
            <Text style={{color:colors.grey,fontSize:16}}>Search</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <View style={styles.iconView}>
        <Icon name="search1" size={height / 2} color={'white'}></Icon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: metrics.defaultMargin,
    marginVertical: metrics.smallMargin,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: height,
  },

  iconView: {
    height: height+10,
    width:height+10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor:colors.primary,
    position: 'absolute',
    right:-5,
    top:-5
  },
  textInput: {
    flex: 7,
    height: height,
    backgroundColor: colors.lightBackground,
    fontSize: 16,
    paddingHorizontal: 15,
    borderRadius:20
  },
});