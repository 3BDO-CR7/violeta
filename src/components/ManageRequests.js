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
import Tabs from "./Tabs";

class ManageRequests extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            active                      : 1,
        }
    }

    componentWillMount() {


    }

    onActive ( id ){
        this.setState({spinner: true, active : id });
    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <ImageBackground source={require('../../assets/img/bg_header.png')} style={[ styles.Width_100, styles.height_150, styles.rowGroup, { paddingTop : 55 } ]}>
                        <Left style={[ styles.leftIcon ]}>
                            <Button style={styles.Button} transparent onPress={() => { this.props.navigation.openDrawer()} }>
                                <Icon style={[styles.text_White, styles.textSize_22]} type="SimpleLineIcons" name='menu' />
                            </Button>
                        </Left>
                        <Body style={[ styles.bodyText ]}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, { paddingLeft : 0, paddingRight : 0 }]}>
                                { i18n.t('marequests') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={[ { backgroundColor : '#f4f4f4'}]}>

                    <View style={[ styles.position_R, styles.Width_100, styles.bg_pink]}>
                        <View style={[ styles.rowGroup,styles.Width_95, styles.paddingHorizontal_5]}>
                            <TouchableOpacity
                                style           = {[ styles.paddingHorizontal_5, styles.paddingVertical_10, styles.width_90 , styles.flexCenter ,( this.state.active === 1  ? styles.border_bottom : '' ) ]}
                                onPress         = {() => this.onActive(1)}
                            >
                                <Text style={[ styles.textRegular, styles.textSize_14, ( this.state.active === 1 ? styles.text_White : styles.text_Opacity )]}>
                                    { i18n.t('news') }
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style           = {[ styles.paddingHorizontal_5, styles.paddingVertical_10, styles.width_90 , styles.flexCenter , ( this.state.active === 2  ? styles.border_bottom : '' ) ]}
                                onPress         = {() => this.onActive(2)}
                            >
                                <Text style={[ styles.textRegular, styles.textSize_14, ( this.state.active === 2 ? styles.text_White : styles.text_Opacity )]}>
                                    { i18n.t('Underway') }
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style           = {[ styles.paddingHorizontal_5, styles.paddingVertical_10, styles.width_90 , styles.flexCenter , ( this.state.active === 3  ? styles.border_bottom : '' ) ]}
                                onPress         = {() => this.onActive(3)}
                            >
                                <Text style={[ styles.textRegular, styles.textSize_14, ( this.state.active === 3 ? styles.text_White : styles.text_Opacity )]}>
                                    { i18n.t('Finished') }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[ styles.marginVertical_10]}>
                        <View style={[ styles.overHidden ]}>
                            <Animatable.View animation="zoomIn" easing="ease-out" delay={300} style={[styles.flexCenter]}>
                                <TouchableOpacity style={[ styles.bg_White, styles.paddingVertical_10, styles.paddingHorizontal_10 , styles.rowGroup , styles.Width_90, styles.flexCenter, styles.Radius_5, styles.marginVertical_5]}>
                                    <View style={[ styles.flex_30, styles.height_90, styles.Radius_5 ]}>
                                        <Image style={[styles.flexCenter , styles.Width_100, styles.height_full, styles.Radius_5]} source={require('../../assets/img/2.png')} resizeMode={'cover'}/>
                                    </View>
                                    <View style={[ styles.flex_70, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                        <Text style={[ styles.textRegular, styles.text_black, styles.textSize_12 ]}>بيرجر بيف</Text>
                                        <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                            <Text style={[ styles.textRegular, styles.text_black_gray, styles.textSize_12 ]}>حاله الطلب : تحت التنفيذ</Text>
                                            <Text style={[ styles.textRegular, styles.text_black_gray, styles.textSize_12 ]}>SR 2000</Text>
                                        </View>
                                        <Text style={[ styles.textRegular, styles.text_black_gray, styles.textSize_12, styles.textLeft ]}>12 , 2020 Aug</Text>
                                    </View>
                                    <View style={[ styles.bg_gray, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.Width_100, styles.marginVertical_5, styles.rowCenter ]}>
                                        <Text style={[ styles.textRegular, styles.text_black, styles.textSize_12, styles.textCenter ]}>
                                            { i18n.t('numorders') } :
                                        </Text>
                                        <Text style={[ styles.textRegular, styles.text_black, styles.textSize_12, styles.textCenter, styles.marginHorizontal_5 ]}>
                                            233
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    </View>

                </Content>

                <Tabs routeName="ManageRequests" navigation={this.props.navigation}/>

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
export default connect(mapStateToProps, { chooseLang })(ManageRequests);
