import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Form, Textarea, Right, Icon
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import Tabs from './Tabs';

class Home extends Component {
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
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16, styles.text_White]}>{i18n.translate('home')}</Text>) ,
        drawerIcon      : null
    });

    render() {

        return (
            <Container>

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

                </Content>

                <Tabs routeName="Home" navigation={this.props.navigation}/>

            </Container>

        );
    }
}

export default Home;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
