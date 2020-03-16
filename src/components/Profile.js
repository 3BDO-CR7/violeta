import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Body, Title, Icon,Right} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang, profile, logout, tempAuth} from "../actions";
import * as Animatable from 'react-native-animatable';
import Tabs from "./Tabs";
import { NavigationEvents } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "react-native-modal";


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                                     : true,
            modelImageID                                : false,
            modelImageLicense                           : false,
        }
    }

    logOut(){
        this.props.navigation.navigate('Login');
        this.props.logout(this.props.auth.data.id);
        this.props.tempAuth();
    }

    async componentWillMount() {

        this.setState({ spinner: false });

        this.props.profile  ({user_id  : this.props.auth.data.id, lang : this.props.lang });

    }

    openImageId(img) {
        if(img === 'imgID'){
            this.setState({ modelImageID: !this.state.modelImageID});
        }else if (img === 'imgLicense') {
            this.setState({ modelImageLicense: !this.state.modelImageLicense});
        }
    }


    static navigationOptions = () => ({
        drawerLabel : () => null,
    });

    onFocus() {
        this.componentWillMount();
    }

    render() {

        const { avatar , name, email, phone, nationality, city, id_image , license_image } = this.props.user;

        return (

            <Container>

                <Spinner
                    visible     = {this.state.spinner}
                    textStyle   = {styles.text_White}
                />
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
                            <Animatable.View animation="zoomIn" easing="ease-out" delay={300} style={[styles.flexCenter]}>
                                <View style={[ styles.overHidden , styles.marginVertical_10 ]}>
                                    <Image style={[styles.width_100, styles.height_100, styles.Radius_50]} source={{ uri : avatar }}/>
                                </View>
                            </Animatable.View>
                            <Text style={[ styles.textRegular, styles.text_pink, styles.textSize_18 ]}> { name } </Text>
                            <Text style={[ styles.textRegular, styles.text_black, styles.textSize_14 ]}> { email } </Text>
                        </View>

                        <View style={[ styles.border_gray, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10, styles.marginVertical_20, styles.Width_100 ]}>
                            <View style={[ styles.position_R, styles.overHidden ]}>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100 ]}>{ i18n.t('phone') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}> { phone } </Text>
                                </View>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100 ]}>{ i18n.t('naonality') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}> { nationality } </Text>
                                </View>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100, styles.textLeft ]}>{ i18n.t('city') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}> { city } </Text>
                                </View>
                            </View>
                            <View style={[ styles.rowGroup, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10, styles.Width_100 ]}>
                                <View style={[ styles.overHidden ]}>
                                    <Text style={[styles.textSize_13, styles.text_black, styles.textRegular, styles.textCenter, styles.marginVertical_5]}>{ i18n.t('PhotoLicense') }</Text>
                                    <Animatable.View animation="zoomIn" easing="ease-out" delay={300} style={[styles.flexCenter]}>
                                        <TouchableOpacity
                                            style={[ styles.position_R, styles.overHidden, styles.Radius_5 ]}
                                            onPress  = {() => this.openImageId('imgID')}
                                        >
                                            <View style={[ styles.position_A, styles.top_0, styles.right_0, styles.Width_100, styles.height_full, styles.overlay_black, styles.flexCenter, styles.zIndex ]}>
                                                <Icon style={[styles.textSize_16, styles.text_White]} type="FontAwesome" name='search-plus' />
                                            </View>
                                            <Image style={[styles.width_120, styles.height_80]}  source={{ uri : id_image }}/>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>
                                <View style={[ styles.overHidden ]}>
                                    <Text style={[styles.textSize_13, styles.text_black, styles.textRegular, styles.textCenter, styles.marginVertical_5]}>{ i18n.t('PhotoID') }</Text>
                                    <Animatable.View animation="zoomIn" easing="ease-out" delay={300} style={[styles.flexCenter]}>
                                        <TouchableOpacity
                                            style    = {[ styles.position_R, styles.overHidden, styles.Radius_5 ]}
                                            onPress  = {() => this.openImageId('imgLicense')}
                                        >
                                            <View style={[ styles.position_A, styles.top_0, styles.right_0, styles.Width_100, styles.height_full, styles.overlay_black, styles.flexCenter, styles.zIndex ]}>
                                                <Icon style={[styles.textSize_16, styles.text_White]} type="FontAwesome" name='search-plus' />
                                            </View>
                                            <Image style={[styles.width_120, styles.height_80]}  source={{ uri : license_image }}/>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>
                            </View>
                        </View>

                        <Modal isVisible={this.state.modelImageID} onBackdropPress={() => this.openImageId('imgID')} style={[ styles.flexCenter, styles.Width_100, styles.height_full ]}>
                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.Height_90, styles.paddingVertical_10, styles.position_R]}>
                                <Image style={[styles.Width_90, styles.height_full, styles.flexCenter]}  source={{ uri : id_image }}/>
                                <TouchableOpacity
                                    style       = {[ styles.top_0, styles.position_A, styles.width_40, styles.height_40, styles.flexCenter, styles.right_10, styles.bg_pink, styles.Radius_50 ]}
                                    onPress     = {() => this.openImageId('imgID')}
                                >
                                    <Icon style={[styles.text_White, styles.textSize_22]} type="AntDesign" name='close' />
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <Modal isVisible={this.state.modelImageLicense} onBackdropPress={() => this.openImageId('imgLicense')} style={[ styles.flexCenter, styles.Width_100, styles.height_full ]}>
                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.Height_90, styles.paddingVertical_10, styles.position_R]}>
                                <Image style={[styles.Width_90, styles.height_full, styles.flexCenter]}  source={{ uri : license_image }}/>
                                <TouchableOpacity
                                    style       = {[ styles.top_0, styles.position_A, styles.width_40, styles.height_40, styles.flexCenter, styles.right_10, styles.bg_pink, styles.Radius_50 ]}
                                    onPress     = {() => this.openImageId('imgLicense')}
                                >
                                    <Icon style={[styles.text_White, styles.textSize_22]} type="AntDesign" name='close' />
                                </TouchableOpacity>
                            </View>
                        </Modal>

                        <View style={[ styles.border_gray, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10, styles.marginVertical_20, styles.Width_100 ]}>
                            <View style={[ styles.position_R, styles.overHidden ]}>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_13, styles.text_black]}>{ i18n.t('numorederdo') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_13, styles.text_black, styles.marginHorizontal_10 ]}> { this.props.user.completed_orders } </Text>
                                </View>
                                <View style={[ styles.rowRight, styles.marginVertical_5 ]}>
                                    <Text style={[ styles.textRegular, styles.textSize_13, styles.text_black]}>{ i18n.t('numorederfi') } : </Text>
                                    <Text style={[ styles.textRegular, styles.textSize_13, styles.text_black, styles.marginHorizontal_10 ]}> { this.props.user.refused_orders } </Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[ styles.border_gray, styles.Border, styles.paddingVertical_10, styles.marginVertical_5, styles.Width_100, styles.flexCenter ]}
                            onPress = {() => this.props.navigation.navigate('ChangePassword')}>
                            <Text style={[ styles.textRegular, styles.text_red, styles.textSize_14 ]}> { i18n.t('changepass') } </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style       = {[  styles.border_gray, styles.Border, styles.paddingVertical_10, styles.marginVertical_5, styles.Width_100, styles.flexCenter ]}
                            onPress     = {() => this.logOut()}
                        >
                            <Text style={[ styles.textRegular, styles.text_red, styles.textSize_14 ]}> { i18n.t('logout') } </Text>
                        </TouchableOpacity>

                    </View>

                </Content>

                <Tabs routeName="Profile" navigation={this.props.navigation}/>

            </Container>

        );
    }
}


const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth        : auth.user,
        user        : profile.user,
        lang        : lang.lang
    };
};
export default connect(mapStateToProps, {profile, chooseLang, logout, tempAuth})(Profile);
