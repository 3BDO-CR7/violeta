import React, { Component } from "react";
import {View, Text, TouchableOpacity, ImageBackground, Image} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Icon,} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from "react-navigation";
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";

class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            allNoty                     : []
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'notifications',
            method      : 'POST',
            data : {
                lang                        : this.props.lang,
                user_id                     : this.props.auth.data.id,
            }
        }).then(response => {

            this.setState({
                allNoty                 : response.data.data,
                spinner                 : false
            });

            console.log('response.data.data', response.data.data)

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        })

    }


    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16, styles.text_White]}>{i18n.translate('Notifications')}</Text>) ,
        drawerIcon      : null
    });

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
                                { i18n.t('Notifications') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={[ { backgroundColor : '#f4f4f4', paddingVertical : 20 }]}>

                    {
                        (this.state.allNoty.length !== 0) ?
                            this.state.allNoty.map((noty, i) => (
                                <View style={[ styles.overHidden, ]}>
                                    <Animatable.View animation="fadeInUp" easing="ease-out" delay={300}>
                                        <TouchableOpacity style={[ styles.bg_White, styles.paddingHorizontal_10 , styles.Width_95, styles.SelfCenter , styles.Radius_5, styles.marginVertical_5]}>
                                            <View style={[ styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                <Text style={[ styles.textBold, styles.text_black, styles.textSize_12 ]}>{ i18n.t('Noti') } : </Text>
                                                <Text style={[ styles.textRegular, styles.text_black_gray, styles.textSize_12, styles.marginVertical_10 ]}>{ noty.message }</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>
                            ))
                            :
                            <View style={[ styles.overHidden ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={300} style={[styles.flexCenter, styles.Width_90]}>
                                    <View style={[ styles.Width_100, styles.flexCenter, styles.height_full ]}>
                                        <Image style={[styles.icoImage]} source={require('../../assets/img/no_data.png')}/>
                                    </View>
                                </Animatable.View>
                            </View>
                    }

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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(Notification);
