import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Body,
    Title,
    Icon,
    Item,
    Input,
    CheckBox,
    Form,
    Left, Toast
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang, profile, updateProfile} from "../actions";
import {NavigationEvents} from "react-navigation";
import Tabs from "./Tabs";
import Modal from "react-native-modal";
import * as Animatable from "react-native-animatable";
import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios";
import CONST from "../consts";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            imgUser                     : this.props.user.avatar,
            nameUser                    : this.props.user.name,
            emailUser                   : this.props.user.email,
            phoneUser                   : this.props.user.phone,
            nationUser                  : this.props.user.nationality,
            countryUser                 : this.props.user.city,
            photoIdUser                 : this.props.user.id_image,
            photoLicenseUser            : this.props.user.license_image,
            completed_orders            : this.props.user.completed_orders,
            refused_orders              : this.props.user.refused_orders,
            nationality                 : this.props.user.nationality,
            code                        : i18n.t('codeocun'),
            codeId                      : null,
            isModalCode                 : false,
            // nationality                 : i18n.t('naonality'),
            // nationalityId               : null,
            // isModalNationality          : false,
            country                     : this.props.user.city,
            countryId                   : this.props.user.city_id,
            isModalCountry              : false,
            cities                      : [],
            userImageBase64             : null,
            idBase64                    : null,
            licImageBase64              : null,
        }
    }

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
        } else if (this.state.idBase64 === null) {
            isError = true;
            msg = i18n.t('passreq');
        } else if ( this.state.licImageBase64 === null ) {
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

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    _pickImage = async (key) => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3],
            base64:true,
            quality: 0.5
        });

        if (!result.cancelled) {
            if (key === 'userImage'){
                this.setState({ imgUser: result.uri ,idBase64:result.base64 });
            }else if(key === 'idImage'){
                this.setState({ photoIdUser: result.uri ,idBase64:result.base64 });
            }else if(key === 'licImage'){
                this.setState({ photoLicenseUser: result.uri ,licImageBase64:result.base64 });
            }
        }

    };

    onUpdateProfile (){

        this.setState({ spinner: true });

        const err = this.validate();

        if (!err){

            const data = {
                name            : this.state.name,
                phone           : this.state.phone,
                image           : this.state.base64,
                email           : this.state.email,
                national_id     : this.state.national_id,
                device_id       : null,
                lang            : this.props.lang,
                token           : this.props.user.token
            };

            this.props.updateProfile(data);

            setTimeout(()=> {
                this.setState({spinner : false});
                this.props.navigation.navigate('Profile');
            } , 2000);

        }else {

            this.setState({ spinner: false });

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
                                { i18n.t('editAcc') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                        <View style={[ styles.marginVertical_10 , styles.flexCenter ]}>
                            <Animatable.View animation="zoomIn" easing="ease-out" delay={300} style={[styles.flexCenter]}>
                                <View style={[ styles.position_R, styles.width_100, styles.height_100, styles.Radius_50  ]}>
                                    {this.state.imgUser != null ?
                                        <View style={[ styles.overHidden ]}>
                                            <Image style={[styles.width_100, styles.height_100, styles.Radius_50]} source={{ uri : this.state.imgUser }}/>
                                        </View>
                                        :
                                        <View style={[ styles.overHidden ]}>
                                            <Image style={[styles.icoImage]} source={require('../../assets/img/girl.png')}/>
                                        </View>
                                    }
                                    <TouchableOpacity
                                        style       = {[ styles.position_A,styles.width_100, styles.height_100, styles.Radius_50, styles.flexCenter, styles.top_0, styles.right_0, styles.zIndex, styles.overlay_white  ]}
                                        onPress     = {this._pickImage('userImage')}>
                                        <Icon style={[styles.text_pink, styles.textSize_22]} type="Entypo" name='camera' />
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </View>

                        <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                            <View style={[ styles.position_A, styles.left_20 ]}>
                                <Icon style={[styles.textSize_16, styles.text_light_gray]} type="FontAwesome5" name='user-alt' />
                            </View>
                            <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                <Input
                                    placeholder={i18n.translate('userName')}
                                    style={[styles.input, styles.height_50]}
                                    onChangeText={(name) => this.setState({name})}
                                    value = { this.state.nameUser }
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
                                    value = { this.state.emailUser }
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
                                        value = { this.state.phoneUser }
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
                                    value = { this.state.nationality }
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
                            onPress     = {this._pickImage('idImage')}
                        >
                            <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray, styles.width_150 ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                { this.state.photoIdUser }
                            </Text>
                            <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='camera' />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.Width_100, styles.marginVertical_10]}
                            onPress     = {this._pickImage('licImage')}
                        >
                            <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray, styles.width_150 ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                { this.state.photoLicenseUser }
                            </Text>
                            <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='camera' />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.bg_pink, styles.width_120, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50, styles.Width_100]}
                            onPress={() => this.onUpdateProfile()}>
                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                {i18n.translate('save')}
                            </Text>
                        </TouchableOpacity>

                    </Form>

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
export default connect(mapStateToProps, {updateProfile, profile, chooseLang})(EditProfile);
