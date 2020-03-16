import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, KeyboardAvoidingView,ImageBackground} from "react-native";
import {
    Body,
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
import axios from "axios";
import CONST from "../consts";

class NewPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmPassword             : '',
            password                    : '',
        }
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.password.length < 6) {
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

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){

            axios({
                url         : CONST.url + 'updateForgetPassword',
                method      : 'POST',
                data : {
                    lang        : this.props.lang,
                    password    : this.state.password,
                    user_id     : this.props.navigation.state.params.user_id,
                }
            }).then(response => {

                if(response.data.status == 1){
                    this.props.navigation.navigate('Login');
                }

                this.setState({spinner : false});

                Toast.show({
                    text        : response.data.message,
                    type        : response.data.status === '1' ? "success" : "danger",
                    duration    : 3000,
                    textStyle     : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center',
                    }
                });

            }).catch(err => {
                console.log(err);
                this.setState({spinner : false});
            })

        }else {

            this.setState({spinner: false});

        }

    }

    async componentWillMount() {


    }

    render() {

        return (

            <Container>

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
                        </View>
                    </Content>

                </ImageBackground>

            </Container>

        );
    }
}

export default NewPassword;

