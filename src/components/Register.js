import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView,
    ImageBackground,
    ScrollView
} from "react-native";
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
import {chooseLang, profile, register, updateProfile} from "../actions";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import CONST from "../consts";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            country                     : i18n.t('city'),
            countryId                   : null,
            isModalCountry              : false,
            imgUser                     : '',
            photoIdUser                 : i18n.translate('IDphoto'),
            photoLicenseUser            : i18n.translate('licensephoto'),
            name                        : '',
            email                       : '',
            phone                       : '',
            nationality                 : '',
            password                    : '',
            confirmPassword             : '',
            cities                      : [],
            userImageBase64             : null,
            idBase64                    : null,
            licImageBase64              : null,
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
            msg = i18n.t('entmail');
        }else if (this.state.phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        } else if (this.state.nationality.length <= 0) {
            isError = true;
            msg = i18n.t('ennaonality');
        } else if (this.state.countryId === null) {
            isError = true;
            msg = i18n.t('choosecity');
        } else if (this.state.idBase64 === null) {
            isError = true;
            msg = i18n.t('enIDphoto');
        } else if (this.state.licImageBase64 === null) {
            isError = true;
            msg = i18n.t('enlicensephoto');
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

    async componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'NewCities',
            method      : 'POST',
            data : {
                lang        : this.props.lang,
            }
        }).then(response => {

            this.setState({
                cities                  : response.data.data,
                spinner                 : false
            });

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        })

    }

    onLoginPressed (){

        this.setState({ spinner: true });

        const err = this.validate();

        if (!err){

            const data = {
                name                : this.state.name,
                email               : this.state.email,
                phone               : this.state.phone,
                nationality         : this.state.nationality,
                city_id             : this.state.countryId,
                password            : this.state.password,
                lang                : this.props.lang,
                id_image            : this.state.idBase64,
                license_image       : this.state.licImageBase64,
                avatar              : this.state.userImageBase64,
            };

            this.props.register(data, this.props);

            this.setState({ spinner: false });

        }else {

            this.setState({ spinner: false });

        }

    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    _pickImage = async (key) => {

        this.askPermissionsAsync();

        let result      = await ImagePicker.launchImageLibraryAsync({
            aspect      : [4, 3],
            base64      : true,
            quality     : 0.5
        });

        if (!result.cancelled) {
            if (key === 'imgUser'){
                this.setState({ imgUser: result.uri ,userImageBase64:result.base64 });
            }else if(key === 'photoIdUser'){
                this.setState({ photoIdUser: result.uri ,idBase64:result.base64 });
            }else if(key === 'photoLicenseUser'){
                this.setState({ photoLicenseUser: result.uri ,licImageBase64:result.base64 });
            }
        }

    };

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
                    <ImageBackground source={require('../../assets/img/bg_header.png')} style={[ styles.Width_100, styles.height_full, styles.paddingTopHeader ]}>
                        <Body style={styles.bodyText}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                                { i18n.t('doHaveAcc') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <ImageBackground source={require('../../assets/img/bg.png')} style={[ styles.bgFullWidth,]}>

                    <Content contentContainerStyle={styles.bgFullWidth}>
                        <View style={[styles.position_R, styles.bgFullWidth, styles.marginVertical_15, styles.flexCenter, styles.Width_100]}>
                            <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_100]}>

                                <View style={[ styles.marginVertical_10 , styles.flexCenter ]}>
                                    <Animatable.View animation="zoomIn" easing="ease-out" delay={300} style={[styles.flexCenter]}>
                                        <View style={[ styles.position_R, styles.width_100, styles.height_100, styles.Radius_50  ]}>
                                            <View style={[ styles.overHidden ]}>
                                                <Image style={[styles.width_100, styles.height_100, styles.Radius_50]} source={{ uri : this.state.imgUser }}/>
                                            </View>
                                            <TouchableOpacity
                                                style       = {[ styles.position_A,styles.width_100, styles.height_100, styles.Radius_50, styles.flexCenter, styles.top_0, styles.right_0, styles.zIndex, styles.overlay_white, styles.Border, styles.border_pink  ]}
                                                onPress     = {() => this._pickImage('imgUser')}>
                                                <Icon style={[styles.text_pink, styles.textSize_22]} type="Entypo" name='camera' />
                                            </TouchableOpacity>
                                        </View>
                                    </Animatable.View>
                                </View>

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
                                    </View>

                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <View style={[ styles.position_A, styles.left_20 ]}>
                                            <Icon style={[styles.textSize_16, styles.text_light_gray]} type="FontAwesome" name='intersex' />
                                        </View>
                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.translate('naonality')}
                                                style={[styles.input, styles.height_50]}
                                                onChangeText={(nationality) => this.setState({nationality})}
                                            />
                                        </Item>
                                    </View>


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

                                            <ScrollView>
                                                <View style={[styles.paddingVertical_15, styles.Border, styles.border_gray]}>
                                                    <Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textCenter]}>
                                                        {i18n.t('choosecity')}
                                                    </Text>
                                                </View>
                                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                                    {
                                                        this.state.cities.map((city, i) => (
                                                            <TouchableOpacity
                                                                style={[styles.rowGroup, styles.marginVertical_10]}
                                                                onPress={() => this.selectCountryId(city.id, city.name)}
                                                            >
                                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                                    <CheckBox
                                                                        style={[styles.checkBox, styles.bg_red, styles.border_red]}
                                                                        color={styles.text_red}
                                                                        selectedColor={styles.text_red}
                                                                        checked={this.state.countryId === city.id}
                                                                    />
                                                                    <Text
                                                                        style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                        { city.name }
                                                                    </Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        ))
                                                    }
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </Modal>

                                    <TouchableOpacity
                                        style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.Width_100, styles.marginVertical_10]}
                                        onPress     = {() => this._pickImage('photoIdUser')}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray, styles.width_150 ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                            {this.state.photoIdUser}
                                        </Text>
                                        <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='camera' />
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.Width_100, styles.marginVertical_10]}
                                        onPress     = {() => this._pickImage('photoLicenseUser')}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray, styles.width_150 ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                            {this.state.photoLicenseUser}
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

const mapStateToProps = ({ lang, register }) => {
    return {
        lang        : lang.lang,
        loading     : register.loader
    };
};
export default connect(mapStateToProps, {register})(Register);
