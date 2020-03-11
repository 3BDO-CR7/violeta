import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Body, Title, Icon,Right} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import Lightbox from 'react-native-lightbox';
import Tabs from "./Tabs";

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            imgUser                     : '../../assets/img/girl.png',
            nameUser                    : 'sh3wza',
            emailUser                   : 'sh3wzaaait@gmail.com',
            phoneUser                   : '01001846667',
            nationUser                  : 'egyption',
            countryUser                 : 'egypt',
            photoIdUser                 : '../../assets/img/girl.png',
            photoLicenseUser            : '../../assets/img/girl.png',
        }
    }



    componentWillMount() {


    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <ImageBackground source={require('../../assets/img/bg_header.png')} style={[ styles.Width_100, styles.height_full, styles.paddingTopHeader, styles.rowGroup ]}>
                        <Body style={[ styles.bodyText ]}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, { paddingLeft : 0, paddingRight : 0 }]}>
                                { i18n.t('myAcc') }
                            </Title>
                        </Body>
                        <Right style={[ styles.rightIcon ]}>
                            <Button style={styles.Button} transparent onPress = {() => this.props.navigation.navigate('EditProfile')}>
                                <Icon style={[styles.text_White, styles.textSize_22]} type="Feather" name='edit' />
                            </Button>
                        </Right>
                    </ImageBackground>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.overHidden , styles.paddingVertical_10, styles.Width_90, styles.rowCenter ]}>

                        <View style={[ styles.marginVertical_10 , styles.flexCenter ]}>
                            <View style={[ styles.overHidden , styles.marginVertical_10 ]}>
                                <Image style={[styles.width_100, styles.height_100, styles.Radius_50]} source={require('../../assets/img/girl.png')}/>
                            </View>
                            <Text style={[ styles.textRegular, styles.text_pink, styles.textSize_18 ]}> { this.state.nameUser } </Text>
                            <Text style={[ styles.textRegular, styles.text_black, styles.textSize_14 ]}> { this.state.emailUser } </Text>
                        </View>

                        <View style={[ styles.border_gray, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10, styles.marginVertical_20, styles.Width_100 ]}>
                            <View style={[ styles.position_R, styles.overHidden ]}>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100 ]}>{ i18n.t('phone') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}> { this.state.phoneUser } </Text>
                                </View>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100 ]}>{ i18n.t('naonality') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}> { this.state.nationUser } </Text>
                                </View>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100, styles.textLeft ]}>{ i18n.t('city') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}> { this.state.countryUser } </Text>
                                </View>
                            </View>
                            <View style={[ styles.rowGroup, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10, styles.Width_100 ]}>
                                <View style={[ styles.overHidden ]}>
                                    <Text style={[styles.textSize_13, styles.text_black, styles.textRegular, styles.textCenter, styles.marginVertical_5]}>{ i18n.t('PhotoLicense') }</Text>
                                    <TouchableOpacity style={[ styles.position_R, styles.overHidden, styles.Radius_5 ]}>
                                        <View style={[ styles.position_A, styles.top_0, styles.right_0, styles.Width_100, styles.height_full, styles.overlay_black, styles.flexCenter, styles.zIndex ]}>
                                            <Icon style={[styles.textSize_16, styles.text_White]} type="FontAwesome" name='search-plus' />
                                        </View>
                                        <Image style={[styles.width_120, styles.height_80]} source={require('../../assets/img/girl.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={[ styles.overHidden ]}>
                                    <Text style={[styles.textSize_13, styles.text_black, styles.textRegular, styles.textCenter, styles.marginVertical_5]}>{ i18n.t('PhotoID') }</Text>
                                    <TouchableOpacity style={[ styles.position_R, styles.overHidden, styles.Radius_5 ]}>
                                        <View style={[ styles.position_A, styles.top_0, styles.right_0, styles.Width_100, styles.height_full, styles.overlay_black, styles.flexCenter, styles.zIndex ]}>
                                            <Icon style={[styles.textSize_16, styles.text_White]} type="FontAwesome" name='search-plus' />
                                        </View>
                                        <Image style={[styles.width_120, styles.height_80]} source={require('../../assets/img/girl.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={[ styles.border_gray, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10, styles.marginVertical_20, styles.Width_100 ]}>
                            <View style={[ styles.position_R, styles.overHidden ]}>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_13, styles.text_black]}>{ i18n.t('numorederdo') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_13, styles.text_black, styles.marginHorizontal_10 ]}> 33 </Text>
                                </View>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_13, styles.text_black]}>{ i18n.t('numorederfi') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_13, styles.text_black, styles.marginHorizontal_10 ]}> 44 </Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={[ styles.border_gray, styles.Border, styles.paddingVertical_10, styles.marginVertical_5, styles.Width_100, styles.flexCenter ]}>
                            <Text style={[ styles.textRegular, styles.text_red, styles.textSize_14 ]}> { i18n.t('changepass') } </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[  styles.border_gray, styles.Border, styles.paddingVertical_10, styles.marginVertical_5, styles.Width_100, styles.flexCenter ]}>
                            <Text style={[ styles.textRegular, styles.text_red, styles.textSize_14 ]}> { i18n.t('logout') } </Text>
                        </TouchableOpacity>

                    </View>

                </Content>

                <Tabs routeName="Profile" navigation={this.props.navigation}/>

            </Container>

        );
    }
}

// export default Setting;

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        // auth: auth.user,
        // user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, { chooseLang })(Profile);
