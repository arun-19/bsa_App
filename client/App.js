import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Text as RNText } from 'react-native';
import { useCustomFonts } from "./Component/CustomHooks/useFonts";
import { useGetRolesOnPageQuery } from "./redux/service/user";
import { NavRef } from "./Component/Utils/NavigationRef";

import NavBar from "./Component/Navbar";
import CustomDrawer from "./Component/SideBar";
import tabs from "./Component/tabIndex";
import LoginScreen from "./Component/Login";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const [tempUser, setTempUser] = useState("");
  const { fontsLoaded } = useCustomFonts();
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("LOGIN");

  // Apply global font
  RNText.defaultProps = RNText.defaultProps || {};
  RNText.defaultProps.style = { fontFamily: "Dosis-Regular" };

  const oldRender = RNText.render;
  RNText.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: "Dosis-Regular" }, origin.props.style],
    });
  };

  // Load stored user
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("userName");
      setTempUser(storedUser);
    };
    fetchUser();
  }, []);

  const { data: rolesOnPage } = useGetRolesOnPageQuery({
    params: { userName: tempUser },
  });

  const roles = rolesOnPage?.data || [];
  const pages = roles.length > 0
    ? roles.map(role => role.Pages)
    : tabs.map(tab => tab.name);

  const filteredTabs = pages.length
    ? tabs.filter(tab => pages.includes(tab.key))
    : [{ name: "LOGIN", component: LoginScreen }];

  return (
    <NavigationContainer
      ref={NavRef}
      onStateChange={(state) => {
        const current = state?.routes[state.index]?.name;
        setCurrentRoute(current);
      }}
    >

      {currentRoute !== "LOGIN" && (
        <>
          <NavBar openSidebar={SidebarOpen} setopenSidebar={setSidebarOpen} />
          <CustomDrawer activeRoute={currentRoute} tabs={[{name:"Home",icon: <MaterialIcons name="home" size={24}  />,path:"HOME"},{name:"User Control",icon: <MaterialIcons name="manage-accounts" size={24}  />,path:"USERANDROLES"},{name:"DashBoard",icon: <FontAwesome name="dashboard" size={24} color="black" />,path:"DashBoard"},{name:"Change Password",icon: <MaterialIcons name="password" size={24} color="black" />,path:"ChangePass"}]} openSidebar={SidebarOpen} setopenSidebar={setSidebarOpen} />
        </>
      )}

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

// App with Provider
export default function RootComponent() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  );
}
