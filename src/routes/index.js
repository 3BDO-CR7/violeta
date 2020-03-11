import React from "react";
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions, I18nManager} from "react-native";

import Home                     from "../components/Home";
import Login                    from "../components/Login";
import Register                 from "../components/Register";
import Setting                  from "../components/Setting";
import InitScreen               from "../components/InitScreen";
import ForgetPassword           from "../components/ForgetPassword";
import ActivationCode           from "../components/ActivationCode";
import NewPassword              from "../components/NewPassword";
import CallUs                   from "../components/CallUs";
import Notification             from "../components/Notification";
import Profile                  from "../components/Profile";
import ManageRequests           from "../components/ManageRequests";
import Accounts                 from "../components/Accounts";
import Tabs                     from "../components/Tabs";
import DrawerCustomization      from "./DrawerCustomization";

const width = Dimensions.get('window').width;
const drawerCust = (props) => (<DrawerCustomization {...props} />);

const drawerNavigator = createDrawerNavigator({
    Home                : Home,
    Setting             : Setting,
    CallUs              : CallUs,
    Notification        : Notification,
},
    {
    initialRouteName    : 'Home',
    drawerPosition      : I18nManager.isRTL ?'right' : 'left',
    drawerOpenRoute     : 'DrawerOpen',
    drawerCloseRoute    : 'DrawerClose',
    gesturesEnabled     : false,
    drawerToggleRoute   : 'DrawerToggle',
    drawerWidth         : '80%',
    contentComponent    : drawerCust
});

const AppNavigator = createStackNavigator({
    InitScreen : {
        screen : InitScreen,
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
    Profile : {
        screen : Profile,
        navigationOptions: {
            header: null
        }
    },
    Accounts : {
        screen : Accounts,
        navigationOptions: {
            header: null
        }
    },
    ManageRequests : {
        screen : ManageRequests,
        navigationOptions: {
            header: null
        }
    },
    Notification : {
        screen : Notification,
        navigationOptions: {
            header: null
        }
    },
    CallUs : {
        screen : CallUs,
        navigationOptions: {
            header: null
        }
    },
    Tabs : {
        screen : Tabs,
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
    ForgetPassword : {
        screen : ForgetPassword,
        navigationOptions: {
            header: null
        }
    },
    ActivationCode : {
        screen : ActivationCode,
        navigationOptions: {
            header: null
        }
    },
    NewPassword : {
        screen : NewPassword,
        navigationOptions: {
            header: null
        }
    },
    Register : {
        screen : Register,
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
