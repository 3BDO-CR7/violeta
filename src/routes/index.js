import React from "react";
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions, I18nManager} from "react-native";

import Home                     from "../components/Home";
import Login                    from "../components/Login";
import Register                 from "../components/Register";
import Terms                    from "../components/Terms";
import Setting                  from "../components/Setting";
import InitScreen               from "../components/InitScreen";
import DrawerCustomization      from "./DrawerCustomization";

const width = Dimensions.get('window').width;
const drawerCust = (props) => (<DrawerCustomization {...props} />);

const drawerNavigator = createDrawerNavigator({
    Home                : Home,
    Terms               : Terms,
},
    {
    initialRouteName    : 'Home',
    drawerPosition      : I18nManager.isRTL ?'right' : 'left',
    drawerOpenRoute     : 'DrawerOpen',
    drawerCloseRoute    : 'DrawerClose',
    gesturesEnabled     : false,
    drawerToggleRoute   : 'DrawerToggle',
    drawerWidth         : '50%',
    contentComponent    : drawerCust
});

const AppNavigator = createStackNavigator({
    Register : {
        screen : Register,
        navigationOptions: {
            header: null
        }
    },
    Login : {
        screen : Login,
        navigationOptions: {
            header: null
        }
    },
    drawerNavigator: {
        screen: drawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    InitScreen : {
        screen : InitScreen,
        navigationOptions: {
            header: null
        }
    },
    Setting : {
        screen : Setting,
        navigationOptions: {
            header: null
        }
    },

});

export default createAppContainer(AppNavigator);
