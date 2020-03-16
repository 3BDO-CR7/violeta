import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView,ImageBackground} from "react-native";
import {
    Body,
    Button, CheckBox,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Left,
    Right,
    Title,
    Toast,
} from 'native-base'
import styles from '../../assets/style';
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from "react-navigation";
import Modal from "react-native-modal";
import axios from "axios";
import CONST from "../consts";
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";

class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            oldPassword                 : '',
            password                    : '',
            confirmPassword             : '',
        }
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.oldPassword === '') {
            isError = true;
            msg = i18n.t('curtpass');
        } else if (this.state.password.length < 6) {
            isError = true;
            msg = i18n.t('passreq');
        } else if ( this.state.password.length !== this.state.confirmPassword.length ) {
            isError = true;
            msg = i18n.t('notmatch');
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

        const err = this.validate();

        if (!err){

            this.setState({spinner: true});

            axios({
                url         : CONST.url + 'changePassword',
                method      : 'POST',
                data : {
                    lang            : this.props.lang,
                    user_id         : this.props.auth.data.id,
                    oldPassword     : this.state.oldPassword,
                    newPassword     : this.state.password,
                }
            }).then(response => {

                this.setState({spinner : false});

                Toast.show({
                    text        : response.data.message,
                    type        : response.data.status == 1 ? "success" : "danger",
                    duration    : 3000,
                    textStyle     : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center',
                    }
                });

                if (response.data.status == 1){
                    this.props.navigation.navigate('Profile');
                }


            }).catch(err => {
                console.log(err);
                this.setState({spinner : false});
            })

        }else {
            this.setState({spinner: false});
        }

    }

    render() {

        return (

            <Container>

                <Spinner
                    visible     = {this.state.spinner}
                    textStyle   = {styles.text_White}
                />

                <Header style={styles.headerView}>
                    <ImageBackground source={require('../../assets/img/bg_header.png')} style={[ styles.Width_100, styles.height_full, styles.paddingTopHeader ]}>
                        <Body style={styles.bodyText}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                                { i18n.t('newpass') }
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

                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <View style={[ styles.position_A, styles.left_20 ]}>
                                            <Icon style={[styles.textSize_16, styles.text_light_gray]} type="FontAwesome" name='lock' />
                                        </View>
                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.translate('currentpass')}
                                                style={[styles.input, styles.height_50]}
                                                onChangeText={(oldPassword) => this.setState({oldPassword})}
                                                secureTextEntry
                                            />
                                        </Item>
                                    </View>

                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <View style={[ styles.position_A, styles.left_20 ]}>
                                            <Icon style={[styles.textSize_16, styles.text_light_gray]} type="FontAwesome" name='lock' />
                                        </View>
                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.translate('newpass')}
                                                style={[styles.input, styles.height_50]}
                                                onChangeText={(password) => this.setState({password})}
                                                secureTextEntry
                                            />
                                        </Item>
                                    </View>

                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <View style={[ styles.position_A, styles.left_20 ]}>
                                            <Icon style={[styles.textSize_16, styles.text_light_gray]} type="FontAwesome" name='lock' />
                                        </View>
                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.translate('confirmpass')}
                                                style={[styles.input, styles.height_50]}
                                                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                                                secureTextEntry
                                            />
                                        </Item>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.bg_pink, styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50, styles.Width_100]}
                                        onPress={() => this.onLoginPressed()}>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                            {i18n.translate('confirm')}
                                        </Text>
                                    </TouchableOpacity>

                                </Form>
                            </KeyboardAvoidingView>
                            <Modal isVisible={this.state.isModalCode} onBackdropPress={() => this.toggleModalCode()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

                                    <View style={[styles.paddingVertical_15, styles.Border, styles.border_gray]}>
                                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textCenter]}>
                                            {i18n.t('codeocun')}
                                        </Text>
                                    </View>

                                    <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                        <TouchableOpacity
                                            style               = {[styles.rowGroup, styles.marginVertical_10]}
                                            onPress             = {() => this.selectCodeId(1, '+666')}
                                        >
                                            <View style={[styles.overHidden, styles.rowRight]}>
                                                <CheckBox
                                                    style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                    color               = {styles.text_red}
                                                    selectedColor       = {styles.text_red}
                                                    checked             = {this.state.codeId === 1}
                                                />
                                                <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                    +666
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style               = {[styles.rowGroup, styles.marginVertical_10]}
                                            onPress             = {() => this.selectCodeId(2, '+777')}
                                        >
                                            <View style={[styles.overHidden, styles.rowRight]}>
                                                <CheckBox
                                                    style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                    color               = {styles.text_red}
                                                    selectedColor       = {styles.text_red}
                                                    checked             = {this.state.codeId === 2}
                                                />
                                                <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                    +777
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style               = {[styles.rowGroup, styles.marginVertical_10]}
                                            onPress             = {() => this.selectCodeId(3, '+888')}
                                        >
                                            <View style={[styles.overHidden, styles.rowRight]}>
                                                <CheckBox
                                                    style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                    color               = {styles.text_red}
                                                    selectedColor       = {styles.text_red}
                                                    checked             = {this.state.codeId === 3}
                                                />
                                                <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                    +777
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style               = {[styles.rowGroup, styles.marginVertical_10]}
                                            onPress             = {() => this.selectCodeId(4, '+1000')}
                                        >
                                            <View style={[styles.overHidden, styles.rowRight]}>
                                                <CheckBox
                                                    style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                    color               = {styles.text_red}
                                                    selectedColor       = {styles.text_red}
                                                    checked             = {this.state.codeId === 4}
                                                />
                                                <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                    +777
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </Modal>
                        </View>
                    </Content>

                </ImageBackground>

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
export default connect(mapStateToProps, {  })(ChangePassword);
