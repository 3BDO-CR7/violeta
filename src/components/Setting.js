import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Switch, ImageBackground} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Form, Textarea, Icon, CheckBox, Toast,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import axios from "axios";
import CONST from "../consts";

class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            checked                     : '',
            lang                        : '',
            langId                      : null,
            isModalLang                 : false,
            checkNoty                   : false,
        }
    }

    componentWillMount() {

        const lang  = this.props.lang;

        this.setState({spinner: true});

        if(lang === 'ar'){
            this.setState({ lang : ' عربي '});
            this.state.langId = 1;
        }else if (lang === 'en'){
            this.setState({ lang : 'English' });
            this.state.langId = 2;
        }

        axios({
            url         : CONST.url + 'notiStatus',
            method      : 'POST',
            data : {
                lang        : this.props.lang,
                user_id     : this.props.auth.data.id,
            }
        }).then(response => {

            this.setState({
                checkNoty               : response.data.data.noti,
                spinner                 : false,
            });

            console.log('response.data.noti', response.data.data.noti)
            console.log('checkNoty', this.state.checkNoty)

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        })


    }

    toggleModalLang = () => {
        this.setState({ isModalLang: !this.state.isModalLang });
    };

    selectLangId(id, name, lang) {
        this.setState({
            langId      : id,
            lang        : name
        });
        this.setState({ isModalLang: !this.state.isModalLang});
        this.props.chooseLang(lang);
        this.props.navigation.navigate('Setting');
    }

    selectNoty() {

        this.setState({spinner : true});

        axios({
            url         : CONST.url + 'changeNotiStatus',
            method      : 'POST',
            data : {
                lang        : this.props.lang,
                user_id     : this.props.auth.data.id,
                noti        : this.state.checkNoty
            }
        }).then(response => {

            Toast.show({
                text        : response.data.msg,
                type        : response.data.status === '1' ? "success" : "danger",
                duration    : 3000,
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });

            this.setState({ checkNoty : !this.state.checkNoty });

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        })

    }

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16, styles.text_White]}>{i18n.translate('setting')}</Text>) ,
        drawerIcon      : null
    });

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (
            <Container>

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
                                { i18n.t('setting') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.paddingHorizontal_15, styles.overHidden, styles.marginVertical_10 ]}>
                        <Text style={[styles.textSize_12, styles.text_pink, styles.textRegular]}>
                            {i18n.t('language')} :
                        </Text>
                        <TouchableOpacity
                            style       = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Border, styles.border_gray, styles.Width_100, styles.marginVertical_10]}
                            onPress     = {this.toggleModalLang}
                        >
                            <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray ]}>
                                {this.state.lang}
                            </Text>
                            <Icon style={[styles.textSize_12, styles.text_black_gray]} type="AntDesign" name='down' />
                        </TouchableOpacity>
                    </View>

                    <Modal isVisible={this.state.isModalLang} onBackdropPress={() => this.toggleModalLang()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                        <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

                            <View style={[styles.paddingVertical_15, styles.Border, styles.border_gray]}>
                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textCenter]}>
                                    {i18n.t('language')}
                                </Text>
                            </View>

                            <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                <TouchableOpacity
                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                    onPress             = {() => this.selectLangId(1, 'عربي', 'ar')}
                                >
                                    <View style={[styles.overHidden, styles.rowRight]}>
                                        <CheckBox
                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                            color               = {styles.text_red}
                                            selectedColor       = {styles.text_red}
                                            checked             = {this.state.LangId === 1}
                                        />
                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                            عربي
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                    onPress             = {() => this.selectLangId(2, 'English', 'en')}
                                >
                                    <View style={[styles.overHidden, styles.rowRight]}>
                                        <CheckBox
                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                            color               = {styles.text_red}
                                            selectedColor       = {styles.text_red}
                                            checked             = {this.state.LangId === 2}
                                        />
                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                            English
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>

                    <View style={[ styles.paddingHorizontal_15, styles.overHidden, styles.marginVertical_10 ]}>
                        <Text style={[styles.textSize_12, styles.text_pink, styles.textRegular]}>
                            {i18n.t('setting')} :
                        </Text>
                        <View style = {[ styles.paddingVertical_10, styles.paddingHorizontal_15, styles.rowGroup, styles.Width_100, styles.marginVertical_10]}>
                            <Text style={[styles.textRegular, styles.textSize_12, styles.text_black_gray ]}>
                                {i18n.t('Notify')}
                            </Text>
                            <CheckBox
                                style           = {[styles.checkBox, styles.bg_pink , styles.Border, styles.border_pink]}
                                color           = {styles.text_White}
                                selectedColor   = {styles.text_White}
                                onPress         = {() => this.selectNoty()}
                                checked         = {this.state.checkNoty}
                                value           = {this.state.checkNoty}
                            />
                        </View>
                    </View>

                </Content>

            </Container>

        );
    }
}

// export default Setting;

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(Setting);
