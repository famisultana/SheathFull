import {Dimensions, Platform,PixelRatio} from 'react-native';

export const colors = {
  primary: '#ff5216',
  secondary: '#21262b',
  third: '#2c2e33',
  background: 'white',
  button: '#7b4df8',
  darkBackground: '#24292e',
  lightBackground: '#eeeff0',
  grey: '#a3a3a3',
  error: '#A62122',
  yellow: 'rgb(254,239,93)',
  borderColor: 'grey',
  lightGrey: 'rgb(245,245,245)',
  darkGray: 'rgba(234,234,232)',
  rating:'#ffdd65'
};


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const metrics = {
  width: width,
  height: height,
  defaultMargin: Dimensions.get('window').width * 0.05,
  smallMargin: width * 0.03,
  largeMargin: width * 0.08,
};

export const scaleFont = size => size * PixelRatio.getFontScale();

export const fonts = {
  primary: Platform.select({
    android: '',
    ios: 'Avenir-Medium',
  }),
  primaryBold: Platform.select({
    android: '',
    ios: 'MyanmarSangamMN-Bold',
  }),
  secondary: Platform.select({
    android: '',
    ios: 'Avenir-Medium',
  }),
  secondaryBold: Platform.select({
    android: '',
    ios: 'Avenir-Medium',
  }),
};

export const text = {
  largeheading: {
    fontSize: 25,
    fontWeight: '700',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
};
