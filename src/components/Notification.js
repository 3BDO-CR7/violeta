import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Switch, ImageBackground} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Form, Textarea, Icon, CheckBox,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";

class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

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

                    <View style={[ styles.overHidden, ]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={300}>
                            <TouchableOpacity style={[ styles.bg_White, styles.paddingHorizontal_10 , styles.Width_95, styles.SelfCenter , styles.Radius_5, styles.marginVertical_5]}>
                                <View style={[ styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                    <Text style={[ styles.textBold, styles.text_black, styles.textSize_12 ]}>{ i18n.t('Noti') } : </Text>
                                    <Text style={[ styles.textRegular, styles.text_black_gray, styles.textSize_12, styles.marginVertical_10 ]}>تم إرسال طلب جديد لك</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>

                    <View style={[ styles.overHidden, ]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                            <TouchableOpacity style={[ styles.bg_White, styles.paddingHorizontal_10 , styles.Width_95, styles.SelfCenter , styles.Radius_5, styles.marginVertical_5]}>
                                <View style={[ styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                    <Text style={[ styles.textBold, styles.text_black, styles.textSize_12 ]}>{ i18n.t('Noti') } : </Text>
                                    <Text style={[ styles.textRegular, styles.text_black_gray, styles.textSize_12, styles.marginVertical_10 ]}>تم إرسال طلب جديد لك</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>

                    <View style={[ styles.overHidden, ]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={700}>
                            <TouchableOpacity style={[ styles.bg_White, styles.paddingHorizontal_10 , styles.Width_95, styles.SelfCenter , styles.Radius_5, styles.marginVertical_5]}>
                                <View style={[ styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                    <Text style={[ styles.textBold, styles.text_black, styles.textSize_12 ]}>{ i18n.t('Noti') } : </Text>
                                    <Text style={[ styles.textRegular, styles.text_black_gray, styles.textSize_12, styles.marginVertical_10 ]}>تم إرسال طلب جديد لك</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>

                </Content>

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
export default connect(mapStateToProps, { chooseLang })(Notification);
