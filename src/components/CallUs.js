import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Form, Textarea, Icon, Toast,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import CONST from '../consts';
import axios from "axios";
import {NavigationEvents} from "react-navigation";

class CallUs extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : true,
            Error                       : '',
            massage                     : ''
        }
    }

    componentWillMount() {

        this.setState({spinner: false});

    }

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.massage === '') {
            isError     = true;
            msg         = i18n.t('context');
        }

        if (msg !== '') {
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center',
                }
            });
        }

        return isError;
    };

    sentComment(){

        const err = this.validate();

        if (!err){

            this.setState({spinner: true});

            axios({
                url         : CONST.url + 'contactUs',
                method      : 'POST',
                data : {
                    lang            : this.props.lang,
                    message         : this.state.massage,
                    user_id         : this.props.user.id
                }
            }).then(response => {

                this.setState({spinner : false, message : ''});

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

                this.props.navigation.navigate('Home');

            }).catch(err => {
                console.log(err);
                this.setState({spinner : false});
            });
        }

    }

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16, styles.text_White]}>{i18n.translate('support')}</Text>) ,
        drawerIcon      : null
    });

    onFocus() {
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
                                { i18n.t('contact') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                        <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_100]}>

                            <Text style={[ styles.textRegular, styles.text_pink, styles.textSize_14, styles.marginVertical_15, styles.textLeft, styles.Width_100, styles.paddingHorizontal_10 ]}>
                                {i18n.t('whatsay')} :
                            </Text>

                            <View style={[styles.rowGroup, styles.Width_100]}>
                                <View style={[styles.position_R, styles.flex_1, styles.paddingHorizontal_10, styles.height_250]}>
                                    <Textarea
                                        placeholder         = {i18n.t('themessage')}
                                        onChangeText        = {(massage) => this.setState({massage})}
                                        style               = {[styles.textArea, styles.height_250, styles.paddingVertical_10, styles.bg_White, styles.Border, styles.border_gray]}
                                    />
                                </View>
                            </View>

                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_red, styles.textCenter]}>{ this.state.Error }</Text>

                            <TouchableOpacity
                                style={[styles.bg_pink, styles.width_150, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50,]}
                                onPress={() => this.sentComment()}>
                                <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                    {i18n.translate('sent')}
                                </Text>
                            </TouchableOpacity>

                        </Form>

                    </View>

                </Content>

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
export default connect(mapStateToProps, {userLogin, profile, chooseLang})(CallUs);
