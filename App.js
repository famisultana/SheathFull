import React, {Component} from 'react';
import SplashScreen from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/Redux/reducers';
import {RootSiblingParent} from 'react-native-root-siblings';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/utils/Navigator';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

//Screens imports
import Home from './src/Screens/Home';
import Detail from './src/Screens/Detail';
import Intro from './src/Screens/Intro';
import List from './src/Screens/List';
import Checkout from './src/Screens/Checkout';
import OrderDetail from './src/Screens/OrderDetail';
import OrderPlaced from './src/Screens/OrderPlaced';

const Stack = createStackNavigator();
const store = createStore(reducers, {});

export default class App extends Component {
  componentDidMount() {
    LogBox.ignoreAllLogs();
    SplashScreen.hide(500);
  }

  render() {
    return (
      <RootSiblingParent>
        <Provider store={store}>
          <NavigationContainer
            ref={(navigatorRef) => {
              Navigator.setTopLevelNavigator(navigatorRef);
            }}>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="List" component={List} />
              <Stack.Screen name="Detail" component={Detail} />
              <Stack.Screen name="Intro" component={Intro} />
              <Stack.Screen name="OrderDetail" component={OrderDetail} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name='OrderPlaced' component={OrderPlaced} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </RootSiblingParent>
    );
  }
}
