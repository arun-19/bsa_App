import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./Component/Home";
import LoginScreen from "./Component/Login";
import UserAndRoles from "./Component/User&roles";
import { setUser } from "./redux/Slices/authSlice";
import tabs from "./Component/tabIndex";
import { useGetRolesOnPageQuery } from "./redux/service/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const [tempUser, setTempUser] = useState("")




  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('userName');
      setTempUser(storedUser); // Set the username in state
    };
    fetchUser();
  }, []);

  const { data: rolesOnPage } = useGetRolesOnPageQuery({ params: { userName: tempUser } });

  console.log(rolesOnPage, "rolesOnPage")
  console.log(tempUser, "tempUser")

  const roles = rolesOnPage?.data || []


  if (roles.length > 0) {
    pages = roles.map(role => role.Pages);
  } else {
    pages = tabs.map(item =>
      item.name
    )
  }


  console.log(pages, 'pages 48');




  // Dynamically filter the tabs based on user pages
  const filteredTabs = pages.length
    ? tabs.filter(tab => pages.some(p => p === tab.key))
    : [{ name: "LOGIN", component: LoginScreen }]; // Default to login if no pages
  console.log(filteredTabs, 'filteredTabs');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LOGIN">
        {filteredTabs.map((item) => (
          <Stack.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{ headerShown: false }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Wrap App inside Provider to make Redux store accessible
export default function RootComponent() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
