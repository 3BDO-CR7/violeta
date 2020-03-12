import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Icon, Toast} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import CONST from '../consts';
import axios from "axios";
import {NavigationEvents} from "react-navigation";

class DetailsOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            price                       : '',
            store_address               : '',
            store_email                 : '',
            store_phone                 : '',
            user_address                : '',
            user_email                  : '',
            user_phone                  : '',
            commission                  : '',
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'orderDetailes',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                order_id        : this.props.navigation.state.params.order_id,
            }
        }).then(response => {

            this.setState({
                price                   : response.data.data.order_info.price,
                store_address           : response.data.data.store_info.address,
                store_email             : response.data.data.store_info.email,
                store_phone             : response.data.data.store_info.phone,
                user_address            : response.data.data.user_info.address,
                user_email              : response.data.data.user_info.email,
                user_phone              : response.data.data.user_info.phone,
                commission              : response.data.data.commission,
                spinner                 : false
            });

            console.log('response', response.data.data)

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        });

    }

    clickAccepted (){

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'acceptOrder',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                order_id        : this.props.navigation.state.params.order_id,
                user_id         : this.props.user.id
            }
        }).then(response => {

            this.setState({spinner : false});

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

            this.props.navigation.navigate('drawerNavigator');


        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        });

    }

    clickRefuse (){

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'refuseOrder',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                order_id        : this.props.navigation.state.params.order_id,
                user_id         : this.props.user.id
            }
        }).then(response => {

            this.setState({spinner : false});

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

            this.props.navigation.navigate('drawerNavigator');

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        });

    }

    clickComplete (){

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'completeOrder',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                order_id        : this.props.navigation.state.params.order_id,
                user_id         : this.props.user.id
            }
        }).then(response => {

            this.setState({spinner : false});

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

            this.props.navigation.navigate('drawerNavigator');

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        });

    }

    clickRemove (){

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'deleteFinishedOrders',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                order_id        : this.props.navigation.state.params.order_id,
                user_id         : this.props.user.id
            }
        }).then(response => {

            this.setState({spinner : false});

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

            this.props.navigation.navigate('drawerNavigator');

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        });

    }

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
                                { this.props.navigation.state.params.name_order }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={[ { backgroundColor : '#f4f4f4', paddingVertical : 20 }]}>

                    <View style={[ styles.overHidden, styles.paddingHorizontal_10 ]}>
                        {
                            (this.props.navigation.state.params.status_id === 2) ?
                                <View style={[styles.overHidden, styles.marginVertical_10, styles.rowCenter]}>
                                    <Icon style={[styles.text_pink, styles.textSize_18, styles.marginHorizontal_5]}
                                          type="AntDesign" name='clockcircleo'/>
                                    <Text
                                        style={[styles.textRegular, styles.text_pink, styles.textSize_13]}>{i18n.t('acceptedyet')}</Text>
                                </View>
                                :
                                <View/>
                        }
                        {
                            (this.props.navigation.state.params.status_id === 5) ?
                                <View style={[styles.overHidden, styles.marginVertical_10, styles.rowCenter]}>
                                    <Icon style={[styles.text_pink, styles.textSize_18, styles.marginHorizontal_5]} type="Octicons" name='checklist'/>
                                    <Text style={[styles.textRegular, styles.text_black, styles.textSize_14]}>{i18n.t('Totalorder')} : </Text>
                                    <Text style={[styles.textRegular, styles.text_red, styles.textSize_14]}>{ this.state.price } { i18n.t('ryal') } </Text>
                                </View>
                                :
                                <View/>
                        }
                        <View style={[ styles.overHidden, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_10, styles.paddingVertical_10 ]}>
                            <View style={[ styles.marginVertical_5 ]}>
                                <Text style={[ styles.textRegular, styles.text_black, styles.textSize_14 ]}>{ i18n.t('Customersite') } : </Text>
                                <Text style={[ styles.textRegular, styles.text_black_gray, styles.textSize_12 ]}>{ this.state.user_address }</Text>
                            </View>
                            <View style={[ styles.marginVertical_5 ]}>
                                <Text style={[ styles.textRegular, styles.text_black, styles.textSize_14 ]}>{ i18n.t('Storelocation') } : </Text>
                                <Text style={[ styles.textRegular, styles.text_black_gray, styles.textSize_12 ]}>{ this.state.store_address }</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={[ styles.textRegular, styles.text_black, styles.textSize_13, styles.marginVertical_10 ]}>{ i18n.t('information') }</Text>
                            <View style={[ styles.overHidden, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_10, styles.paddingVertical_10 ]}>
                                <View style={[ styles.row, styles.marginVertical_5 ]}>
                                    <Icon style={[styles.text_pink, styles.textSize_18, styles.marginHorizontal_15]} type="AntDesign" name='mobile1' />
                                    <Text style={[ styles.textRegular, styles.text_black, styles.textSize_14 ]}>{ this.state.user_phone }</Text>
                                </View>
                                <View style={[ styles.row, styles.marginVertical_5 ]}>
                                    <Icon style={[styles.text_pink, styles.textSize_18 , styles.marginHorizontal_15]} type="MaterialCommunityIcons" name='email' />
                                    <Text style={[ styles.textRegular, styles.text_black, styles.textSize_14 ]}>{ this.state.user_email }</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={[ styles.textRegular, styles.text_black, styles.textSize_13, styles.marginVertical_10 ]}>{ i18n.t('shop') }</Text>
                            <View style={[ styles.overHidden, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_10, styles.paddingVertical_10 ]}>
                                <View style={[ styles.row, styles.marginVertical_5 ]}>
                                    <Icon style={[styles.text_pink, styles.textSize_18, styles.marginHorizontal_15]} type="AntDesign" name='mobile1' />
                                    <Text style={[ styles.textRegular, styles.text_black, styles.textSize_14 ]}>{ this.state.store_phone }</Text>
                                </View>
                                <View style={[ styles.row, styles.marginVertical_5 ]}>
                                    <Icon style={[styles.text_pink, styles.textSize_18, styles.marginHorizontal_15]} type="MaterialCommunityIcons" name='email' />
                                    <Text style={[ styles.textRegular, styles.text_black, styles.textSize_14 ]}>{ this.state.store_email }</Text>
                                </View>
                            </View>
                        </View>
                        {
                            (this.props.navigation.state.params.status_id !== 5) ?
                                <View
                                    style={[styles.overHidden, styles.bg_White, styles.Border, styles.border_gray, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10]}>
                                    <View style={[styles.row, styles.marginVertical_5, styles.flexCenter]}>
                                        <Text
                                            style={[styles.textRegular, styles.text_black, styles.textSize_14]}>{i18n.t('Bill')} : </Text>
                                        <Text
                                            style={[styles.textRegular, styles.text_red, styles.textSize_14]}>{this.state.price} {i18n.t('ryal')}</Text>
                                    </View>
                                </View>
                                :
                                <View/>
                        }

                        {
                            (this.props.navigation.state.params.status_id === 2) ?
                                <View style={[styles.rowCenter, styles.marginVertical_15, styles.paddingVertical_10]}>
                                    <TouchableOpacity
                                        style={[styles.bg_pink, styles.width_150, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50, styles.marginHorizontal_5]}
                                        onPress={() => {
                                            this.clickAccepted()
                                        }}>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                            {i18n.translate('acc')}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.bg_light_gray, styles.width_150, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50, styles.marginHorizontal_5]}
                                        onPress={() => {
                                            this.clickRefuse()
                                        }}>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_black]}>
                                            {i18n.translate('refuse')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View/>
                        }

                        {
                            (this.props.navigation.state.params.status_id === 4) ?
                                <View style={[styles.rowCenter, styles.marginVertical_15, styles.paddingVertical_10]}>
                                    <TouchableOpacity
                                        style={[styles.bg_pink, styles.width_150, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50, styles.marginHorizontal_5]}
                                        onPress={() => {this.clickComplete()}}>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                            {i18n.translate('finishOrder')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View/>
                        }

                        {
                            (this.props.navigation.state.params.status_id === 5) ?
                                <View style={[styles.rowCenter, styles.marginVertical_15, styles.paddingVertical_10]}>
                                    <TouchableOpacity
                                        style={[styles.bg_pink, styles.width_150, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50, styles.marginHorizontal_5]}
                                        onPress={() => {this.clickRemove()}}>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                            {i18n.translate('deleteOrder')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View/>
                        }


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
export default connect(mapStateToProps, {userLogin, profile, chooseLang})(DetailsOrder);
