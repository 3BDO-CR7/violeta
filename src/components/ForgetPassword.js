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

class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            code                        : i18n.t('codeocun'),
            codeId                      : null,
            isModalCode                 : false,
            phone                       : '',
        }
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
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

        this.setState({spinner: true});

        if (!err){

            axios({
                url         : CONST.url + 'getActivationCode',
                method      : 'POST',
                data : {
                    lang        : this.props.lang,
                    phone       : this.state.phone,
                }
            }).then(response => {

                if(response.data.status == 1){

                    let code        = response.data.data.code;
                    let user_id     = response.data.data.user_id;

                    this.props.navigation.navigate('ActivationCode', { code : code, user_id : user_id });

                }

                this.setState({spinner : false});

                Toast.show({
                    text        : response.data.msg,
                    type        : response.data.status == 1 ? "success" : "danger",
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

    toggleModalCode = () => {
        this.setState({ isModalCode: !this.state.isModalCode});
    };

    selectCodeId(id, name) {
        this.setState({
            codeId      : id,
            code        : name
        });
        this.setState({ isModalCode: !this.state.isModalCode});
    }

    async componentWillMount() {


    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (

            <Container>

                <Header style={styles.headerView}>
                    <ImageBackground source={require('../../assets/img/bg_header.png')} style={[ styles.Width_100, styles.height_full, styles.paddingTopHeader, styles.rowGroup ]}>
                        <Left style={[ styles.leftIcon ]}>
                            <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon style={[styles.text_White, styles.textSize_22]} type="AntDesign" name='right' />
                            </Button>
                        </Left>
                        <Body style={[ styles.bodyText ]}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, { paddingLeft : 0, paddingRight : 0 }]}>
                                { i18n.t('forgetPassword') }
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

export default ForgetPassword;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         loading     : auth.loading,
//         auth        : auth.user,
//         user        : profile.user,
//         lang        : lang.lang
//     };
// };
// export default connect(mapStateToProps, {  })(Login);
