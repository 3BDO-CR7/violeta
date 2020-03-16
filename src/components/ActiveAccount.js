import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, KeyboardAvoidingView,ImageBackground} from "react-native";
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
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import Spinner from 'react-native-loading-spinner-overlay';

class ActiveAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            code                       : '',
        }
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.code.length <= 0) {
            isError = true;
            msg     = i18n.t('codeN');
        }else if(this.state.code !== this.props.navigation.state.params.code){
            isError = true;
            msg     = i18n.t('codeNotCorrect');
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
                url         : CONST.url + 'activateAccount',
                method      : 'POST',
                data : {
                    lang        : this.props.lang,
                    user_id     : this.props.navigation.state.params.user_id,
                }
            }).then(response => {

                this.setState({spinner : false});

                Toast.show({
                    text            : response.data.message,
                    type            : "success",
                    duration        : 3000,
                    textStyle       : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center',
                    }
                });

                this.props.navigation.navigate('drawerNavigator');

                const { password, phone, deviceId } = this.props.navigation.state.params;
                const type = 'user';

                this.props.userLogin({ phone, password, deviceId , type}, this.props.lang);

            }).catch(err => {
                console.log(err);
                this.setState({spinner : false});
            });

        }else {

            this.setState({spinner: false});

        }

    }

    async componentWillMount() {

        alert(this.props.navigation.state.params.code)

        console.log('code', this.props.navigation.state.params.code)

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (

            <Container>


                <Spinner
                    visible     = {this.state.spinner}
                    textStyle   = {styles.text_White}
                />
                <NavigationEvents onWillFocus={() => this.onFocus()} />


                <Header style={styles.headerView}>
                    <ImageBackground source={require('../../assets/img/bg_header.png')} style={[ styles.Width_100, styles.height_full, styles.paddingTopHeader, styles.rowGroup ]}>
                        <Left style={[ styles.leftIcon ]}>
                            <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon style={[styles.text_White, styles.textSize_22]} type="AntDesign" name='right' />
                            </Button>
                        </Left>
                        <Body style={[ styles.bodyText ]}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, { paddingLeft : 0, paddingRight : 0 }]}>
                                { i18n.t('actcode') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

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

                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter, styles.flex_1]}>
                                        <View style={[ styles.position_A, styles.left_20 ]}>
                                            <Icon style={[styles.textSize_16, styles.text_light_gray]} type="Ionicons" name='ios-phone-portrait' />
                                        </View>
                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.translate('code')}
                                                style={[styles.input, styles.height_50,]}
                                                onChangeText={(code) => this.setState({code})}
                                                keyboardType={'number-pad'}
                                            />
                                        </Item>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.bg_pink, styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50, styles.Width_100]}
                                        onPress={() => this.onLoginPressed()}>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                            {i18n.translate('sent')}
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

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth        : auth.user,
        user        : profile.user,
        lang        : lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(ActiveAccount);
