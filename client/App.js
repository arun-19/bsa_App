import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import LoginScreen from './Component/Login';
import Home from './Component/Home';
import CardDetails from './Component/CardDeatails';
import { store } from './redux/store';
import UserAndRoles from './Component/User&roles';
import tabs from './Component/tabIndex';
const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LOGIN">
          {tabs.map((item) => (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={{ headerShown: false }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  landscapeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 20,
  },
  landscapeText: {
    fontSize: 24, // Larger text for landscape mode
  },
});
