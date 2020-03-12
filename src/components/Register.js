import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView,ImageBackground} from "react-native";
import {
    Body, CheckBox,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Title,
    Toast,
} from 'native-base'
import styles from '../../assets/style';
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from "react-navigation";
import Modal from "react-native-modal";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            code                        : i18n.t('codeocun'),
            codeId                      : null,
            isModalCode                 : false,
            nationality                 : i18n.t('naonality'),
            nationalityId               : null,
            isModalNationality          : false,
            country                     : i18n.t('city'),
            countryId                   : null,
            isModalCountry              : false,
            name                        : '',
            email                       : '',
            phone                       : '',
            password                    : '',
            confirmPassword             : '',
        }
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.name.length <= 0) {
            isError = true;
            msg = i18n.t('entername');
        }else if (this.state.email.length <= 0) {
            isError = true;
            msg = i18n.t('entermail');
        }else if (this.state.phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        } else if (this.state.nationalityId === null) {
            isError = true;
            msg = i18n.t('ennaonality');
        } else if (this.state.countryId === null) {
            isError = true;
            msg = i18n.t('choosecity');
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

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){
            this.props.navigation.navigate('Tabs');
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

    toggleModalNationality = () => {
        this.setState({ isModalNationality: !this.state.isModalNationality});
    };

    selectnationalityId(id, name) {
        this.setState({
            nationalityId       : id,
            nationality         : name
        });
        this.setState({ isModalNationality: !this.state.isModalNationality});
    }

    toggleModalCountry = () => {
        this.setState({ isModalCountry: !this.state.isModalCountry});
    };

    selectCountryId(id, name) {
        this.setState({
            countryId      : id,
            country        : name
        });
        this.setState({ isModalCountry: !this.state.isModalCountry});
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
                                { i18n.t('doHaveAcc') }
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

                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <View style={[ styles.position_A, styles.left_20 ]}>
                                            <Icon style={[styles.textSize_16, styles.text_light_gray]} type="FontAwesome5" name='user-alt' />
                                        </View>
                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.translate('userName')}
                                                style={[styles.input, styles.height_50]}
                                                onChangeText={(name) => this.setState({name})}
                                            />
                                        </Item>
                                    </View>

                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <View style={[ styles.position_A, styles.left_20 ]}>
                                            <Icon style={[styles.textSize_16, styles.text_light_gray]} type="Zocial" name='email' />
                                        </View>
                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.translate('email')}
                                                style={[styles.input, styles.height_50]}
                                                onChangeText={(email) => this.setState({email})}
                                            />
                                        </Item>
                                    </View>

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
                                                <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                    {this.state.code}
                                                </Text>
                                                <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='down' />
                                            </TouchableOpacity>
                                        </View>
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

                                    <TouchableOpacity
                                        style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.Width_100, styles.marginVertical_10]}
                                        onPress     = {this.toggleModalNationality}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                            {this.state.nationality}
                                        </Text>
                                        <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='down' />
                                    </TouchableOpacity>
                                    <Modal isVisible={this.state.isModalNationality} onBackdropPress={() => this.toggleModalNationality()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                        <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

                                            <View style={[styles.paddingVertical_15, styles.Border, styles.border_gray]}>
                                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textCenter]}>
                                                    {i18n.t('naonality')}
                                                </Text>
                                            </View>

                                            <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                                <TouchableOpacity
                                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                    onPress             = {() => this.selectnationalityId(1, 'مصري')}
                                                >
                                                    <View style={[styles.overHidden, styles.rowRight]}>
                                                        <CheckBox
                                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                            color               = {styles.text_red}
                                                            selectedColor       = {styles.text_red}
                                                            checked             = {this.state.nationalityId === 1}
                                                        />
                                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                            مصري
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                    onPress             = {() => this.selectnationalityId(2, 'سعودي')}
                                                >
                                                    <View style={[styles.overHidden, styles.rowRight]}>
                                                        <CheckBox
                                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                            color               = {styles.text_red}
                                                            selectedColor       = {styles.text_red}
                                                            checked             = {this.state.nationalityId === 2}
                                                        />
                                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                            سعودي
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                    onPress             = {() => this.selectnationalityId(3, 'اجنبي')}
                                                >
                                                    <View style={[styles.overHidden, styles.rowRight]}>
                                                        <CheckBox
                                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                            color               = {styles.text_red}
                                                            selectedColor       = {styles.text_red}
                                                            checked             = {this.state.nationalityId === 3}
                                                        />
                                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                            اجنبي
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </Modal>


                                    <TouchableOpacity
                                        style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.Width_100, styles.marginVertical_10]}
                                        onPress     = {this.toggleModalCountry}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                            {this.state.country}
                                        </Text>
                                        <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='down' />
                                    </TouchableOpacity>
                                    <Modal isVisible={this.state.isModalCountry} onBackdropPress={() => this.toggleModalCountry()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                        <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

                                            <View style={[styles.paddingVertical_15, styles.Border, styles.border_gray]}>
                                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textCenter]}>
                                                    {i18n.t('choosecity')}
                                                </Text>
                                            </View>

                                            <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                                <TouchableOpacity
                                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                    onPress             = {() => this.selectCountryId(1, 'مصر')}
                                                >
                                                    <View style={[styles.overHidden, styles.rowRight]}>
                                                        <CheckBox
                                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                            color               = {styles.text_red}
                                                            selectedColor       = {styles.text_red}
                                                            checked             = {this.state.countryId === 1}
                                                        />
                                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                            مصر
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                    onPress             = {() => this.selectCountryId(2, 'السعوديه')}
                                                >
                                                    <View style={[styles.overHidden, styles.rowRight]}>
                                                        <CheckBox
                                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                            color               = {styles.text_red}
                                                            selectedColor       = {styles.text_red}
                                                            checked             = {this.state.countryId === 2}
                                                        />
                                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                            السعوديه
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                    onPress             = {() => this.selectCountryId(3, 'جده')}
                                                >
                                                    <View style={[styles.overHidden, styles.rowRight]}>
                                                        <CheckBox
                                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                            color               = {styles.text_red}
                                                            selectedColor       = {styles.text_red}
                                                            checked             = {this.state.countryId === 3}
                                                        />
                                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                            جده
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </Modal>


                                    <TouchableOpacity
                                        style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.Width_100, styles.marginVertical_10]}
                                        onPress     = {this.toggleModalCountry}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                            {i18n.translate('IDphoto')}
                                        </Text>
                                        <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='camera' />
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.Width_100, styles.marginVertical_10]}
                                        onPress     = {this.toggleModalCountry}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                            {i18n.translate('licensephoto')}
                                        </Text>
                                        <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='camera' />
                                    </TouchableOpacity>

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

                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <View style={[ styles.position_A, styles.left_20 ]}>
                                            <Icon style={[styles.textSize_16, styles.text_light_gray]} type="FontAwesome" name='lock' />
                                        </View>
                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.translate('confirmPassword')}
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

export default Register;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         loading     : auth.loading,
//         auth        : auth.user,
//         user        : profile.user,
//         lang        : lang.lang
//     };
// };
// export default connect(mapStateToProps, {  })(Login);
