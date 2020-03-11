import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView,ImageBackground} from "react-native";
import {Body, CheckBox, Container, Content, Form, Header, Icon, Input, Item, Title, Toast,} from 'native-base'
import styles from '../../assets/style';
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from "react-navigation";
import {connect} from "react-redux";
import { userLogin, profile } from '../actions';
import Modal from "react-native-modal";
import * as Permissions from "expo-permissions";
import { Notifications } from 'expo';
import Spinner from "react-native-loading-spinner-overlay";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            code                        : i18n.t('codeocun'),
            isModalCode                 : false,
            spinner                     : false,
            phone                       : '',
            password                    : '',
            deviceId                    : '',
            userId                      : null,
            codeId                      : null,
        }
    }

    async componentWillMount() {

        this.setState({spinner: false});

        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        const deviceId = await Notifications.getExpoPushTokenAsync();

        this.setState({ deviceId, userId: deviceId });
        AsyncStorage.setItem('deviceID', deviceId);

    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        } else if (this.state.password.length <= 0) {
            isError = true;
            msg = i18n.t('pass');
        }
        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'cairo',
                    textAlign: 'center',
                }
            });
        }
        return isError;
    };

    onLoginPressed() {

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){
            this.setState({spinner: false});
            const {phone, password, deviceId, type} = this.state;
            this.props.userLogin({ phone, password, deviceId, type }, this.props.lang);
        }else {
            this.setState({spinner: false});
        }

    }

    // toggleModalCode = () => {
    //     this.setState({ isModalCode: !this.state.isModalCode});
    // };
    //
    // selectCodeId(id, name) {
    //     this.setState({
    //         codeId      : id,
    //         code        : name
    //     });
    //     this.setState({ isModalCode: !this.state.isModalCode});
    // }

    componentWillReceiveProps(newProps){

        this.setState({spinner: true});

        if (newProps.auth !== null && newProps.auth.status === '1'){

            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
            }else {
                this.props.profile( newProps.auth.data.id , this.props.lang );
                this.props.navigation.navigate('drawerNavigator');
            }

        }

        if (newProps.auth !== null) {
            this.setState({spinner: false});
            Toast.show({
                text        : newProps.auth.msg,
                type        : newProps.auth.status === '1' ? "success" : "danger",
                duration    : 3000,
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (

            <Container>

                <Spinner
                    visible           = { this.state.spinner }
                />

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <ImageBackground source={require('../../assets/img/bg_header.png')} style={[ styles.Width_100, styles.height_full, styles.paddingTopHeader ]}>
                        <Body style={styles.bodyText}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                                { i18n.t('login') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                    <ImageBackground source={require('../../assets/img/bg.png')} style={[ styles.bgFullWidth,]}>

                        <Content contentContainerStyle={styles.bgFullWidth}>
                            <View style={[styles.position_R, styles.bgFullWidth, styles.marginVertical_15, styles.flexCenter, styles.Width_100]}>
                                <View style={[styles.overHidden, styles.marginVertical_15]}>
                                    <Animatable.View animation="bounceIn" easing="ease-out" delay={500} style={[styles.flexCenter]}>
                                            <Image style={[styles.icoImage]} source={require('../../assets/img/icon.png')}/>
                                    </Animatable.View>
                                </View>
                                <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_100]}>
                                    <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                        <View style={[styles.position_R, styles.rowGroup]}>
                                            <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter, styles.flex_1]}>
                                                <View style={[ styles.position_A, styles.left_20 ]}>
                                                    <Icon style={[styles.textSize_16, styles.text_light_gray]} type="Ionicons" name='ios-phone-portrait' />
                                                </View>
                                                <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                                    <Input
                                                        placeholder={i18n.translate('phone')}
                                                        style={[styles.input, styles.height_50,]}
                                                        onChangeText={(phone) => this.setState({phone})}
                                                        keyboardType={'number-pad'}
                                                    />
                                                </Item>
                                            </View>
                                            {/*<View style={[styles.position_R, styles.marginHorizontal_5]}>*/}
                                            {/*    <TouchableOpacity*/}
                                            {/*        style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_5, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.width_90]}*/}
                                            {/*        onPress     = {this.toggleModalCode}*/}
                                            {/*    >*/}
                                            {/*        <Text style={[styles.textRegular, styles.textSize_12, styles.text_light_gray ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">*/}
                                            {/*            {this.state.code}*/}
                                            {/*        </Text>*/}
                                            {/*        <Icon style={[styles.textSize_12, styles.text_light_gray]} type="AntDesign" name='down' />*/}
                                            {/*    </TouchableOpacity>*/}
                                            {/*</View>*/}
                                        </View>

                                        <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                            <View style={[ styles.position_A, styles.left_20 ]}>
                                                <Icon style={[styles.textSize_16, styles.text_light_gray]} type="FontAwesome" name='lock' />
                                            </View>
                                            <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                                <Input
                                                    placeholder={i18n.translate('password')}
                                                    style={[styles.input, styles.height_50]}
                                                    onChangeText={(password) => this.setState({password})}
                                                    secureTextEntry
                                                />
                                            </Item>
                                        </View>

                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')} style={[styles.marginVertical_20, styles.flexCenter]}>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.marginVertical_5, styles.light_gray]}>
                                                {i18n.translate('forgetPassword')}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.bg_pink, styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50, styles.Width_100]}
                                            onPress={() => this.onLoginPressed()}>
                                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                                {i18n.translate('confirm')}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress         = {() => this.props.navigation.navigate('Register')}
                                            style           = {[styles.marginVertical_10, styles.flexCenter, styles.zIndex, styles.Border, styles.border_pink, styles.Width_100, styles.Radius_50, styles.height_45]}>
                                            <Text style     = {[styles.textRegular, styles.textSize_14, styles.text_pink]}>
                                                {i18n.translate('doHaveAcc')}
                                            </Text>
                                        </TouchableOpacity>

                                    </Form>
                                </KeyboardAvoidingView>
                                {/*<Modal isVisible={this.state.isModalCode} onBackdropPress={() => this.toggleModalCode()} style={[ styles.bottomCenter, styles.Width_100 ]}>*/}
                                {/*    <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>*/}

                                {/*        <View style={[styles.paddingVertical_15, styles.Border, styles.border_gray]}>*/}
                                {/*            <Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textCenter]}>*/}
                                {/*                {i18n.t('codeocun')}*/}
                                {/*            </Text>*/}
                                {/*        </View>*/}

                                {/*        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>*/}
                                {/*            <TouchableOpacity*/}
                                {/*                style               = {[styles.rowGroup, styles.marginVertical_10]}*/}
                                {/*                onPress             = {() => this.selectCodeId(1, '+666')}*/}
                                {/*            >*/}
                                {/*                <View style={[styles.overHidden, styles.rowRight]}>*/}
                                {/*                    <CheckBox*/}
                                {/*                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}*/}
                                {/*                        color               = {styles.text_red}*/}
                                {/*                        selectedColor       = {styles.text_red}*/}
                                {/*                        checked             = {this.state.codeId === 1}*/}
                                {/*                    />*/}
                                {/*                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>*/}
                                {/*                        +666*/}
                                {/*                    </Text>*/}
                                {/*                </View>*/}
                                {/*            </TouchableOpacity>*/}
                                {/*            <TouchableOpacity*/}
                                {/*                style               = {[styles.rowGroup, styles.marginVertical_10]}*/}
                                {/*                onPress             = {() => this.selectCodeId(2, '+777')}*/}
                                {/*            >*/}
                                {/*                <View style={[styles.overHidden, styles.rowRight]}>*/}
                                {/*                    <CheckBox*/}
                                {/*                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}*/}
                                {/*                        color               = {styles.text_red}*/}
                                {/*                        selectedColor       = {styles.text_red}*/}
                                {/*                        checked             = {this.state.codeId === 2}*/}
                                {/*                    />*/}
                                {/*                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>*/}
                                {/*                        +777*/}
                                {/*                    </Text>*/}
                                {/*                </View>*/}
                                {/*            </TouchableOpacity>*/}
                                {/*            <TouchableOpacity*/}
                                {/*                style               = {[styles.rowGroup, styles.marginVertical_10]}*/}
                                {/*                onPress             = {() => this.selectCodeId(3, '+888')}*/}
                                {/*            >*/}
                                {/*                <View style={[styles.overHidden, styles.rowRight]}>*/}
                                {/*                    <CheckBox*/}
                                {/*                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}*/}
                                {/*                        color               = {styles.text_red}*/}
                                {/*                        selectedColor       = {styles.text_red}*/}
                                {/*                        checked             = {this.state.codeId === 3}*/}
                                {/*                    />*/}
                                {/*                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>*/}
                                {/*                        +777*/}
                                {/*                    </Text>*/}
                                {/*                </View>*/}
                                {/*            </TouchableOpacity>*/}
                                {/*            <TouchableOpacity*/}
                                {/*                style               = {[styles.rowGroup, styles.marginVertical_10]}*/}
                                {/*                onPress             = {() => this.selectCodeId(4, '+1000')}*/}
                                {/*            >*/}
                                {/*                <View style={[styles.overHidden, styles.rowRight]}>*/}
                                {/*                    <CheckBox*/}
                                {/*                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}*/}
                                {/*                        color               = {styles.text_red}*/}
                                {/*                        selectedColor       = {styles.text_red}*/}
                                {/*                        checked             = {this.state.codeId === 4}*/}
                                {/*                    />*/}
                                {/*                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>*/}
                                {/*                        +777*/}
                                {/*                    </Text>*/}
                                {/*                </View>*/}
                                {/*            </TouchableOpacity>*/}
                                {/*        </View>*/}

                                {/*    </View>*/}
                                {/*</Modal>*/}
                            </View>
                        </Content>

                    </ImageBackground>

            </Container>

        );
    }
}

// export default Login;

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        loading     : auth.loading,
        auth        : auth.user,
        user        : profile.user,
        lang        : lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile })(Login);
