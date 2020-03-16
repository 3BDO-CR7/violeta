import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Icon, Toast} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import CONST from '../consts';
import Tabs from './Tabs';
import axios from "axios";
import {NavigationEvents} from "react-navigation";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            orders                      : [],
            latitude                    : null,
            longitude                   : null,
        }
    }

    componentWillMount() {

        this.setState({spinner: true});
        this.getLocation();

    }

    getOrders () {
        axios({
            url         : CONST.url + 'orders',
            method      : 'POST',
            data : {
                lang        : this.props.lang,
                status      : 2,
                lat         : this.state.latitude,
                lng         : this.state.longitude,
                user_id     : this.props.auth.data.id,
            }
        }).then(response => {

            this.setState({
                orders                  : response.data.data,
                spinner                 : false
            });

            this.fetchData();
            this.noData();

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        })
    }

    getLocation = async () => {

        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            Toast.show({
                text: 'Permission to access location was denied',
                duration    : 4000,
                type        : 'danger',
                textStyle   : {
                    color       : "white" ,
                    textAlign   : 'center'
                }
            });
        }else {
            return await Location.getCurrentPositionAsync({
                enableHighAccuracy  : false,
                maximumAge          : 15000
            }).then((position) => {
                this.setState({
                    'longitude' : position.coords.longitude,
                    'latitude'  : position.coords.latitude,
                    spinner     : false
                },()=>{
                    setTimeout(()=>{ this.getOrders() },500)
                });
            }).catch(err => {
                console.log(err);
                this.setState({spinner : false});
            });
        }

    };

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16, styles.text_White]}>{i18n.translate('home')}</Text>) ,
        drawerIcon      : null
    });

    onFocus() {
        this.componentWillMount();
    }

    fetchData() {

        if (this.state.latitude || this.state.longitude !== null){
            return (
                this.state.orders.map((order, i) => (
                    <View style={[styles.overHidden]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" key={i} delay={300} style={[styles.flexCenter]}>
                            <TouchableOpacity
                                style={[styles.bg_White, styles.paddingVertical_10, styles.paddingHorizontal_10, styles.rowGroup, styles.Width_90, styles.flexCenter, styles.Radius_5, styles.marginVertical_5]}
                                onPress={() => this.props.navigation.navigate('DetailsOrder', {
                                    order_id    : order.id,
                                    name_order  : order.store,
                                    status_id   : 2
                                })}>
                                <View style={[styles.flex_30, styles.height_90, styles.Radius_5]}>
                                    <Image
                                        style={[styles.flexCenter, styles.Width_100, styles.height_full, styles.Radius_5]}
                                        source={{uri: order.image}}/>
                                </View>
                                <View
                                    style={[styles.flex_70, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                    <Text
                                        style={[styles.textRegular, styles.text_black, styles.textSize_12]}> {order.store} </Text>
                                    <View style={[styles.rowGroup, styles.marginVertical_5]}>
                                        <View style={[styles.row]}>
                                            <Text
                                                style={[styles.textRegular, styles.text_black_gray, styles.textSize_12]}>{i18n.t('orderund')} :</Text>
                                            <Text
                                                style={[styles.textRegular, styles.text_pink, styles.textSize_12]}> {i18n.t('Underway')}</Text>
                                        </View>
                                        <Text
                                            style={[styles.textRegular, styles.text_black_gray, styles.textSize_12]}>SR {order.price} </Text>
                                    </View>
                                    <Text
                                        style={[styles.textRegular, styles.text_black_gray, styles.textSize_12, styles.textLeft]}>{order.date}</Text>
                                </View>
                                <View
                                    style={[styles.bg_gray, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.Width_100, styles.marginVertical_5, styles.rowCenter]}>
                                    <Text
                                        style={[styles.textRegular, styles.text_black, styles.textSize_12, styles.textCenter]}>
                                        {i18n.t('numorders')} :
                                    </Text>
                                    <Text
                                        style={[styles.textRegular, styles.text_black, styles.textSize_12, styles.textCenter, styles.marginHorizontal_5]}>
                                        {order.number}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                ))
            );
        }else {

            return (
                <View style={[ styles.overHidden ]}>
                    <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.flexCenter, styles.Width_90]}>
                        <View style={[ styles.Width_100, styles.flexCenter, styles.height_full ]}>
                            <Image style={[styles.icoImage]} source={require('../../assets/img/error.png')}/>
                            <Text style={[ styles.textRegular, styles.text_black, styles.marginVertical_15 ]}>
                                { i18n.t('gogo') }
                            </Text>
                            <TouchableOpacity
                                style       = {[styles.bg_pink, styles.width_150, styles.flexCenter, styles.marginVertical_10, styles.height_45, styles.Radius_50]}
                                onPress     = {()=> {this.getLocation()}}>
                                <Text style = {[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                    {i18n.translate('Location')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>
            )

        }

    }

    noData(){
        return (
            <View style={[ styles.overHidden ]}>
                <Animatable.View animation="fadeInUp" easing="ease-out" delay={300} style={[styles.flexCenter, styles.Width_90]}>
                    <View style={[ styles.Width_100, styles.flexCenter, styles.height_full ]}>
                        <Image style={[styles.icoImage]} source={require('../../assets/img/no_data.png')}/>
                    </View>
                </Animatable.View>
            </View>
        );
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
                            <Button style={styles.Button} transparent onPress={() => { this.props.navigation.openDrawer()} }>
                                <Icon style={[styles.text_White, styles.textSize_22]} type="SimpleLineIcons" name='menu' />
                            </Button>
                        </Left>
                        <Body style={[ styles.bodyText ]}>
                            <Title style={[styles.textRegular , styles.text_White, styles.textSize_16, styles.textCenter, styles.Width_100, { paddingLeft : 0, paddingRight : 0 }]}>
                                { i18n.t('home') }
                            </Title>
                        </Body>
                    </ImageBackground>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={[ { backgroundColor : '#f4f4f4', paddingVertical : 20 }]}>


                    {
                        this.fetchData()
                    }


                    { (this.state.orders.length === 0 && this.state.spinner === false) ? this.noData() : null}


                </Content>

                <Tabs routeName="Home" navigation={this.props.navigation}/>

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
export default connect(mapStateToProps, {userLogin, profile, chooseLang})(Home);
