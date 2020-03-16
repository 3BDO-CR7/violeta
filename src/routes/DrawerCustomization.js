import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, ImageBackground} from "react-native";
import {Button, Container, Content, Header, Icon} from 'native-base';
import { DrawerItems } from 'react-navigation-drawer';

import styles from "../../assets/style";
import COLORS from '../../src/consts/colors'
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {logout, tempAuth} from "../actions";

class DrawerCustomization extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    filterItems(item){
        // if (this.props.user == null)
        //     return item.routeName !== 'profile' && item.routeName !== 'Offers' && item.routeName !== 'MyOrders' && item.routeName !== 'Favorite';
        // else if(this.props.user.type === 'delegate' || this.props.user.type === 'provider' )
        //     return  item.routeName !== 'Offers' && item.routeName !== 'Favorite' ;
        // else if(this.props.user.type === 'user' )
            return  item ;
    }

    returnItems(){
        return this.props.items.filter((item) =>  this.filterItems(item) )
    }

    logout(){
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('Login');
        this.props.logout(this.props.auth.data.id);
        this.props.tempAuth();
    }

    render() {

        return (
            <Container>
                <Content contentContainerStyle={styles.bgFullWidth}>
                    <ImageBackground source={require('../../assets/img/bgmenu.png')} style={[ styles.Width_100, styles.height_full ]}>

                    {/*<TouchableOpacity*/}
                    {/*    style       = {[styles.width_40 , styles.height_40 , styles.bg_light_red, styles.position_A, styles.centerContext, styles.top_30, styles.SelfRight]}*/}
                    {/*    onPress     = {() => { this.props.navigation.closeDrawer()} }*/}
                    {/*>*/}
                    {/*    <Icon style={[styles.text_red, styles.textSize_22]} type="AntDesign" name='close' />*/}
                    {/*</TouchableOpacity>*/}

                    <View style={[styles.marginVertical_30]}>

                        <Image style={[styles.flexCenter , styles.width_100, styles.height_100, styles.marginVertical_15]} source={require('../../assets/img/logo_wight.png')} resizeMode={'contain'}/>

                    </View>

                    <View style={[styles.marginVertical_25]}>
                        <DrawerItems {...this.props}
                             onItemPress={
                                 (route) => {
                                     if (route.route.key === 'logout') {
                                         this.logout()
                                     }else {
                                         this.props.navigation.navigate(route.route.key);
                                     }
                                 }
                             }

                             items                          = {this.returnItems()}
                             activeBackgroundColor          = {styles.overlay_white}
                             inactiveBackgroundColor        = 'transparent'
                             activeLabelStyle               = {styles.text_White}
                             labelStyle                     = {styles.drawerLabel}
                             iconContainerStyle             = {styles.drawerIcon}
                             itemStyle                      = {[styles.drawerItemStyle]}
                             itemsContainerStyle            = {styles.marginVertical_10}
                        />
                    </View>
                    </ImageBackground>
                </Content>

                {
                    (this.props.auth == null || this.props.user == null) ?

                        <TouchableOpacity style={[styles.position_A, styles.bottom_20, styles.right_20, styles.flexCenter ]} onPress={() => this.props.navigation.navigate('Login')}>
                            <Icon style={[styles.text_yallow, styles.textSize_20]} type="Entypo" name='login' />
                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_White,styles.paddingVertical_5, styles.textCenter,]}>{i18n.translate('login')}</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={[styles.position_A, styles.bottom_20, styles.right_20, styles.flexCenter]} onPress={() => this.logout()}>
                            <Icon style={[styles.text_yallow, styles.textSize_20]} type="MaterialCommunityIcons" name='logout' />
                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_White,styles.paddingVertical_5, styles.textCenter,]}>{i18n.translate('logout')}</Text>
                        </TouchableOpacity>

                }

            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth    : auth.user,
        user    : profile.user
    };
};

export default connect(mapStateToProps, { logout, tempAuth })(DrawerCustomization);
