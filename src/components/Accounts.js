import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Switch, ImageBackground} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Form, Textarea, Icon, CheckBox, Item, Input,Toast
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {NavigationEvents} from "react-navigation";
import Tabs from "./Tabs";

class Accounts extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            bank                        : i18n.t('namebank'),
            bankId                      : null,
            isModalBank                 : false,
            eventImg                    : i18n.translate('receipt'),
            base64                      : '',
            photo                       : '',
            nameUser                    : '',
            numAcc                      : '',
            money                       : '',
        }
    }

    componentWillMount() {


    }

    validate = () => {
        let isError     = false;
        let msg         = '';

        if (this.state.bankId === null) {
            isError     = true;
            msg         = i18n.t('enterbank');
        } else if (this.state.nameUser === '') {
            isError     = true;
            msg         = i18n.t('enterowner');
        } else if (this.state.numAcc === '') {
            isError     = true;
            msg         = i18n.t('enternumber');
        } else if (this.state.money === '') {
            isError     = true;
            msg         = i18n.t('enteramount');
        } else if (this.state.base64 === '') {
            isError     = true;
            msg         = i18n.t('enterpicture');
        }
        if (msg !== '') {
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle       : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center',
                }
            });
        }
        return isError;
    };

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    _pickImage = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        if (!result.cancelled) {
            this.setState({ eventImg: result.uri ,base64:result.base64});
        }
    };

    onSent() {

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){
            this.props.navigation.navigate('BankAccounts');
        }

    }

    toggleModalBank = () => {
        this.setState({ isModalBank: !this.state.isModalBank});
    };

    selectBankId(id, name) {
        this.setState({
            bankId       : id,
            bank         : name
        });
        this.setState({ isModalBank: !this.state.isModalBank});
    }

    onFocus(){
        this.componentWillMount();
    }

    static navigationOptions = () => ({
        drawerLabel : () => null,
    });

    render() {

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <ImageBackground source={require('../../assets/img/bg_header.png')} style={[ styles.Width_100, styles.height_full, styles.paddingTopHeader, styles.rowGroup ]}>
                        <Left style={[ styles.leftIcon ]}>
                            <Button style={styles.Button} transparent onPress={() => { this.props.navigation.openDrawer()} }>
                                <Icon style={[styles.text_White, styles.textSize_22]} type="SimpleLineIcons" name='menu' />
                            </Button>
                        </Left>
                        <Body style={[ styles.bodyText ]}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, { paddingLeft : 0, paddingRight : 0 }]}>
                                { i18n.t('accounts') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={[ { backgroundColor : '#f4f4f4'}]}>

                    <View style={[ styles.overHidden, styles.paddingVertical_20, styles.Width_90, styles.flexCenter ]}>
                        <View style={[ styles.bg_pink, styles.paddingVertical_10, styles.Width_100 , styles.Radius_10, styles.flexCenter ]}>
                            <Text style={[ styles.text_White, styles.textRegular, styles.textSize_14]}>
                                { i18n.t('amount') } : 344 ريال
                            </Text>
                        </View>

                        <View style={[ styles.bg_gray, styles.Radius_10, styles.marginVertical_10, styles.paddingVertical_10, styles.paddingHorizontal_10, styles.Width_100 ]}>
                            <View style={[ styles.rowRight ]}>
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100 ]}>{ i18n.t('Numacc') } : </Text>
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}>شعوذه</Text>
                            </View>
                            <View style={[ styles.rowRight ]}>
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100 ]}>{ i18n.t('namebank') } : </Text>
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}>CIB</Text>
                            </View>
                            <View style={[ styles.rowRight ]}>
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100 ]}>{ i18n.t('acountnumber') } : </Text>
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}>01032131231232</Text>
                            </View>
                            <View style={[ styles.rowRight ]}>
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.width_100, styles.textLeft ]}> : IBAN</Text>
                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_black, styles.marginHorizontal_10 ]}>3213213</Text>
                            </View>
                        </View>

                        <View style={[ styles.Width_100 ]}>
                            <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <TouchableOpacity
                                    style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.Width_100, styles.marginVertical_10]}
                                    onPress     = {this.toggleModalBank}
                                >
                                    <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                        {this.state.bank}
                                    </Text>
                                    <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='down' />
                                </TouchableOpacity>

                                <Modal isVisible={this.state.isModalBank} onBackdropPress={() => this.toggleModalBank()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                    <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

                                        <View style={[styles.paddingVertical_15, styles.Border, styles.border_gray]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textCenter]}>
                                                {i18n.t('namebank')}
                                            </Text>
                                        </View>

                                        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                            <TouchableOpacity
                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                onPress             = {() => this.selectBankId(1, 'مصري')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.bankId === 1}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        مصري
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                onPress             = {() => this.selectBankId(2, 'سعودي')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.bankId === 2}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        سعودي
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </Modal>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <View style={[ styles.position_A, styles.left_20 ]}>
                                        <Icon style={[styles.textSize_14, styles.text_light_gray]} type="FontAwesome5" name='user-alt' />
                                    </View>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('Holder')}
                                            style={[styles.input, styles.height_50]}
                                            onChangeText={(nameUser) => this.setState({nameUser})}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <View style={[ styles.position_A, styles.left_20 ]}>
                                        <Icon style={[styles.textSize_14, styles.text_light_gray]} type="FontAwesome" name='bank' />
                                    </View>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('acountnumber')}
                                            style={[styles.input, styles.height_50]}
                                            onChangeText={(numAcc) => this.setState({numAcc})}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <View style={[ styles.position_A, styles.left_20 ]}>
                                        <Icon style={[styles.textSize_14, styles.text_light_gray]} type="MaterialIcons" name='attach-money' />
                                    </View>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('bepaid')}
                                            style={[styles.input, styles.height_50]}
                                            onChangeText={(money) => this.setState({money})}
                                        />
                                    </Item>
                                </View>

                                <TouchableOpacity
                                    style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Radius_60, styles.Width_100, styles.marginVertical_10]}
                                    onPress     = {this._pickImage}
                                >
                                    <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray, styles.width_150 ]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                        {this.state.eventImg}
                                    </Text>
                                    <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='camera' />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.bg_pink, styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50]}
                                    onPress={() => this.onSent()}>
                                    <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                        {i18n.translate('sent')}
                                    </Text>
                                </TouchableOpacity>

                            </Form>
                        </View>

                    </View>

                </Content>

                <Tabs routeName="Accounts" navigation={this.props.navigation}/>

            </Container>

        );
    }
}

// export default Setting;

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        // auth: auth.user,
        // user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, { chooseLang })(Accounts);
