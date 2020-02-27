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

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){
            this.props.navigation.navigate('ActivationCode');
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

    componentWillReceiveProps(newProps){


    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (

            <Container>

                <Header style={styles.headerView}>
                    <ImageBackground source={require('../../assets/img/bg_header.png')} style={[ styles.Width_100, styles.height_full, styles.paddingTopHeader ]}>
                        <Body style={styles.bodyText}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
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
                                        <View style={[styles.position_R, styles.marginHorizontal_5]}>
                                            <TouchableOpacity
                                                style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_5, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.width_90]}
                                                onPress     = {this.toggleModalCode}
                                            >
                                                <Text style={[styles.textRegular, styles.textSize_12, styles.text_light_gray ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                    {this.state.code}
                                                </Text>
                                                <Icon style={[styles.textSize_12, styles.text_light_gray]} type="AntDesign" name='down' />
                                            </TouchableOpacity>
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
